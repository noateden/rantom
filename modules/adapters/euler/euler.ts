import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62',
  Withdraw: '0x9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb',
  Borrow: '0x312a5e5e1079f5dda4e95dbbd0b908b291fd5b992ef22073643ab691572c5b52',
  Repay: '0x05f2eeda0e08e4b437f487c8d7d29b14537d15e3488170dc3de5dbdf8dac4684',
  Liquidate: '0xbba0f1d6fb8b9abe2bbc543b7c13d43faba91c6f78da4700381c94041ac7267d',
};

export class EulerAdapter extends Adapter {
  public readonly name: string = 'adapter.euler';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
      [Signatures.Borrow]: EventSignatureMapping[Signatures.Borrow],
      [Signatures.Repay]: EventSignatureMapping[Signatures.Repay],
      [Signatures.Liquidate]: EventSignatureMapping[Signatures.Liquidate],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      this.config.contracts[chain] &&
      this.config.contracts[chain].indexOf(address) !== -1 &&
      (EventSignatureMapping[signature] ||
        (this.config.customEventMapping && this.config.customEventMapping[signature]))
    ) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      let event;
      if (this.config.customEventMapping && this.config.customEventMapping[signature]) {
        event = web3.eth.abi.decodeLog(this.config.customEventMapping[signature].abi, data, topics.slice(1));
      } else {
        event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
      }

      if (signature === Signatures.Liquidate) {
        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.collateral);
        if (token) {
          const account = normalizeAddress(event.violator);
          const liquidator = normalizeAddress(event.liquidator);
          const amount = new BigNumber(event.yield).dividedBy(1e18).toString(10);

          return {
            protocol: this.config.protocol,
            action: 'liquidate',
            addresses: [liquidator, account],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${account} liquidate ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else {
        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.underlying);
        if (token) {
          let action = 'deposit';
          switch (signature) {
            case Signatures.Withdraw: {
              action = 'withdraw';
              break;
            }
            case Signatures.Borrow: {
              action = 'borrow';
              break;
            }
            case Signatures.Repay: {
              action = 'repay';
              break;
            }
          }
          const account = normalizeAddress(event.account);
          const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);

          return {
            protocol: this.config.protocol,
            action: action as KnownAction,
            addresses: [account],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${account} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
