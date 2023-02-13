import BigNumber from 'bignumber.js';

import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0xc12c57b1c73a2c3a2ea4613e9476abb3d8d146857aab7329e24243fb59710c82',
  Redeem: '0x9c4ed599cd8555b9c1e8cd7643240d7d71eb76b792948c49fcb4d411f7b6b3c6',
  Borrow: '0x1e77446728e5558aa1b7e81e0cdab9cc1b075ba893b740600c76a315c2caa553',
  Repay: '0xb718f0b14f03d8c3adf35b15e3da52421b042ac879e5a689011a8b1e0036773d',
  FlashLoan: '0x5b8f46461c1dd69fb968f1a003acee221ea3e19540e350233b612ddb43433b55',
};

export class Aavev1Adapter extends Adapter {
  public readonly name: string = 'adapter.aavev1';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, signature, event } = options;

    if (this.config.contracts[chain].indexOf(address) !== -1) {
      switch (signature) {
        case Signatures.Deposit:
        case Signatures.Redeem:
        case Signatures.Repay:
        case Signatures.Borrow: {
          const reserve = await this.getWeb3Helper().getErc20Metadata(chain, event._reserve);
          if (reserve) {
            const user = normalizeAddress(event._user);
            const repayer = event._repayer ? normalizeAddress(event._repayer) : user;
            const amount = event._amount
              ? new BigNumber(event._amount.toString()).dividedBy(new BigNumber(10).pow(reserve.decimals)).toString(10)
              : new BigNumber(event._amountMinusFees.toString())
                  .dividedBy(new BigNumber(10).pow(reserve.decimals))
                  .toString(10);

            let action = 'supply';
            if (signature === Signatures.Deposit) {
              action = 'supply';
            }
            if (signature === Signatures.Redeem) {
              action = 'withdraw';
            }
            if (signature === Signatures.Borrow) {
              action = 'borrow';
            }
            if (signature === Signatures.Repay) {
              action = 'repay';
            }

            return {
              protocol: this.config.protocol,
              action: action as KnownAction,
              addresses: [user, repayer],
              tokens: [reserve],
              tokenAmounts: [amount],
              readableString: `${user} ${action} ${amount} ${reserve.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          break;
        }
        case Signatures.FlashLoan: {
          const reserve = await this.getWeb3Helper().getErc20Metadata(chain, event._reserve);
          if (reserve) {
            const sender = normalizeAddress(options.sender);
            const target = normalizeAddress(event._target);

            const amount = new BigNumber(event._amount.toString())
              .dividedBy(new BigNumber(10).pow(reserve.decimals))
              .toString(10);
            return {
              protocol: this.config.protocol,
              action: 'flashloan',
              addresses: [sender, target],
              tokens: [reserve],
              tokenAmounts: [amount],
              readableString: `${sender} flashloan ${amount} ${reserve.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }
}
