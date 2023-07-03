import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
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
  Liquidate: '0x56864757fd5b1fc9f38f5f3a981cd8ae512ce41b902cf73fc506ee369c6bc237',
};

export class Aavev1Adapter extends Adapter {
  public readonly name: string = 'adapter.aavev1';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Redeem]: EventSignatureMapping[Signatures.Redeem],
      [Signatures.Borrow]: EventSignatureMapping[Signatures.Borrow],
      [Signatures.Repay]: EventSignatureMapping[Signatures.Repay],
      [Signatures.FlashLoan]: EventSignatureMapping[Signatures.FlashLoan],
      [Signatures.Liquidate]: EventSignatureMapping[Signatures.Liquidate],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

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

            let action: KnownAction = 'deposit';
            if (signature === Signatures.Deposit) {
              action = 'deposit';
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
              action: action,
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
            const sender = await this.getSenderAddress(options);
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
          break;
        }
        case Signatures.Liquidate: {
          const collateral = await this.getWeb3Helper().getErc20Metadata(chain, event._collateral);
          if (collateral) {
            const liquidator = normalizeAddress(event._liquidator);
            const user = normalizeAddress(event._user);

            const amount = new BigNumber(event._liquidatedCollateralAmount.toString())
              .dividedBy(new BigNumber(10).pow(collateral.decimals))
              .toString(10);

            return {
              protocol: this.config.protocol,
              action: 'liquidate',
              addresses: [liquidator, user],
              tokens: [collateral],
              tokenAmounts: [amount],
              readableString: `${liquidator} liquidate ${amount} ${collateral.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }
}
