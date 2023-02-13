import BigNumber from 'bignumber.js';

import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0xde6857219544bb5b7746f48ed30be6386fefc61b2f864cacf559893bf50fd951',
  Withdraw: '0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7',
  Borrow: '0xc6a898309e823ee50bac64e45ca8adba6690e99e7841c45d754e2a38e9019d9b',
  Repay: '0x4cdde6e09bb755c9a5589ebaec640bbfedff1362d4b255ebf8339782b9942faa',
  FlashLoan: '0x631042c832b07452973831137f2d73e395028b44b250dedc5abb0ee766e168ac',
};

export class Aavev2Adapter extends Adapter {
  public readonly name: string = 'adapter.aavev1';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, signature, event } = options;

    if (this.config.contracts[chain].indexOf(address) !== -1) {
      switch (signature) {
        case Signatures.Deposit:
        case Signatures.Withdraw:
        case Signatures.Repay:
        case Signatures.Borrow: {
          const reserve = await this.getWeb3Helper().getErc20Metadata(chain, event.reserve);
          if (reserve) {
            const user = normalizeAddress(event.user);
            const onBehalfOf = event.onBehalfOf
              ? normalizeAddress(event.onBehalfOf)
              : event.to
              ? normalizeAddress(event.to)
              : normalizeAddress(event.repayer);
            const amount = new BigNumber(event.amount.toString())
              .dividedBy(new BigNumber(10).pow(reserve.decimals))
              .toString(10);

            let action = 'supply';
            if (signature === Signatures.Deposit) {
              action = 'supply';
            }
            if (signature === Signatures.Withdraw) {
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
              addresses: [user, onBehalfOf],
              tokens: [reserve],
              tokenAmounts: [amount],
              readableString: `${user} ${action} ${amount} ${reserve.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          break;
        }
        case Signatures.FlashLoan: {
          const reserve = await this.getWeb3Helper().getErc20Metadata(chain, event.asset);
          if (reserve) {
            const sender = normalizeAddress(options.sender);
            const initiator = normalizeAddress(event.initiator);
            const target = normalizeAddress(event.target);

            const amount = new BigNumber(event.amount.toString())
              .dividedBy(new BigNumber(10).pow(reserve.decimals))
              .toString(10);
            return {
              protocol: this.config.protocol,
              action: 'flashloan',
              addresses: [sender, initiator, target],
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