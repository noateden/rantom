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
  Swapped: '0x4be05c8d54f5e056ab2cfa033e9f582057001268c3e28561bb999d35d2c8f2c8',
};

export class ClipperAdapter extends Adapter {
  public readonly name: string = 'adapter.clipper';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swapped]: EventSignatureMapping[Signatures.Swapped],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.inAsset);
      const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.outAsset);

      if (token0 && token1) {
        const recipient = normalizeAddress(event.recipient);
        const amount0 = new BigNumber(event.inAmount).dividedBy(new BigNumber(10).pow(token0.decimals)).toString(10);
        const amount1 = new BigNumber(event.outAmount).dividedBy(new BigNumber(10).pow(token1.decimals)).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'swap',
          addresses: [recipient],
          tokens: [token0, token1],
          tokenAmounts: [amount0, amount1],
          readableString: `${recipient} swap ${amount0} ${token0.symbol} for ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
