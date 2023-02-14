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
  Supply: '0x2b627736bca15cd5381dcf80b0bf11fd197d01a037c52b927a881a10fb73ba61',
  Withdraw: '0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7',
  Borrow: '0xb3d084820fb1a9decffb176436bd02558d15fac9b0ddfed8c465bc7359d7dce0',
  Repay: '0xa534c8dbe71f871f9f3530e97a74601fea17b426cae02e1c5aee42c96c784051',
  FlashLoan: '0xefefaba5e921573100900a3ad9cf29f222d995fb3b6045797eaea7521bd8d6f0',
};

export class Aavev3Adapter extends Adapter {
  public readonly name: string = 'adapter.aavev3';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Supply]: EventSignatureMapping[Signatures.Supply],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
      [Signatures.Borrow]: EventSignatureMapping[Signatures.Borrow],
      [Signatures.Repay]: EventSignatureMapping[Signatures.Repay],
      [Signatures.FlashLoan]: EventSignatureMapping[Signatures.FlashLoan],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(address) !== -1 && EventSignatureMapping[signature]) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      switch (signature) {
        case Signatures.Supply:
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
            if (signature === Signatures.Supply) {
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
