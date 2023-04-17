import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import SiloAbi from '../../../configs/abi/silo/Silo.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0xdd160bb401ec5b5e5ca443d41e8e7182f3fe72d70a04b9c0ba844483d212bcb5',
  Withdraw: '0x3b5f15635b488fe265654176726b3222080f3d6500a562f4664233b3ea2f0283',
  Borrow: '0x312a5e5e1079f5dda4e95dbbd0b908b291fd5b992ef22073643ab691572c5b52',
  Repay: '0x05f2eeda0e08e4b437f487c8d7d29b14537d15e3488170dc3de5dbdf8dac4684',
  Liquidate: '0xf3fa0eaee8f258c23b013654df25d1527f98a5c7ccd5e951dd77caca400ef972',
};

export class SiloAdapter extends Adapter {
  public readonly name: string = 'adapter.silo';

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
    try {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const siloRepository = await this.getRpcWrapper().queryContract({
        chain,
        abi: SiloAbi,
        contract: address,
        method: 'siloRepository',
        params: [],
      });
      if (
        this.config.contracts[chain] &&
        this.config.contracts[chain].indexOf(normalizeAddress(siloRepository)) != -1
      ) {
        let event;
        if (this.config.customEventMapping && this.config.customEventMapping[signature]) {
          event = web3.eth.abi.decodeLog(this.config.customEventMapping[signature].abi, data, topics.slice(1));
        } else {
          event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
        }

        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.asset);
        if (token) {
          if (signature === Signatures.Deposit || signature === Signatures.Withdraw) {
            const action: KnownAction = signature === Signatures.Deposit ? 'deposit' : 'withdraw';
            const depositor = normalizeAddress(event.depositor);
            const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [depositor],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${depositor} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          } else if (signature === Signatures.Borrow || signature === Signatures.Repay) {
            const action: KnownAction = signature === Signatures.Borrow ? 'borrow' : 'repay';
            const user = normalizeAddress(event.user);
            const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [user],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${user} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          } else if (signature === Signatures.Liquidate) {
            const user = normalizeAddress(event.user);
            const amount = new BigNumber(event.seizedCollateral)
              .dividedBy(new BigNumber(10).pow(token.decimals))
              .toString(10);

            return {
              protocol: this.config.protocol,
              action: 'liquidate',
              addresses: [user],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${user} liquidate ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    } catch (e: any) {
      console.log(e);
    }

    return null;
  }
}
