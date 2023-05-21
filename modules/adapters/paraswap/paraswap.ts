import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  BoughtV3: '0x4cc7e95e48af62690313a0733e93308ac9a73326bc3c29f1788b1191c376d5b6',
  SwappedV3: '0xe00361d207b252a464323eb23d45d42583e391f2031acdd2e9fa36efddd43cb0',
};

export class ParaswapAdapter extends Adapter {
  public readonly name: string = 'adapter.paraswap';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.BoughtV3]: EventSignatureMapping[Signatures.BoughtV3],
      [Signatures.SwappedV3]: EventSignatureMapping[Signatures.SwappedV3],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.srcToken);
      const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.destToken);

      if (token0 && token1) {
        const initiator = normalizeAddress(event.initiator);
        const beneficiary = normalizeAddress(event.beneficiary);
        const amount0 = new BigNumber(event.srcAmount).dividedBy(new BigNumber(10).pow(token0.decimals)).toString(10);
        const amount1 = new BigNumber(event.receivedAmount)
          .dividedBy(new BigNumber(10).pow(token1.decimals))
          .toString(10);

        return {
          protocol: this.config.protocol,
          action: 'trade',
          addresses: [initiator, beneficiary],
          tokens: [token0, token1],
          tokenAmounts: [amount0, amount1],
          readableString: `${initiator} trade ${amount0} ${token0.symbol} for ${amount1} ${token0.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
