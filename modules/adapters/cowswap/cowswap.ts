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
  Trade: '0xa07a543ab8a018198e99ca0184c93fe9050a79400a0a723441f84de1d972cc17',
};

export class CowswapAdapter extends Adapter {
  public readonly name: string = 'adapter.cowswap';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Trade]: EventSignatureMapping[Signatures.Trade],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.sellToken);
      const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.buyToken);

      if (token0 && token1) {
        const owner = normalizeAddress(event.owner);
        const amount0 = new BigNumber(event.sellAmount).dividedBy(new BigNumber(10).pow(token0.decimals)).toString(10);
        const amount1 = new BigNumber(event.buyAmount).dividedBy(new BigNumber(10).pow(token1.decimals)).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'trade',
          addresses: [owner],
          tokens: [token0, token1],
          tokenAmounts: [amount0, amount1],
          readableString: `${owner} trade ${amount0} ${token0.symbol} for ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
