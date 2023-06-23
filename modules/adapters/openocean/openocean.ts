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
  Swapped: '0x76af224a143865a50b41496e1a73622698692c565c1214bc862f18e22d829c5e',
};

export class OpenoceanAdapter extends Adapter {
  public readonly name: string = 'adapter.openocean';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swapped]: EventSignatureMapping[Signatures.Swapped],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (signature === Signatures.Swapped && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.srcToken);
      const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.dstToken);

      if (token0 && token1) {
        const sender = normalizeAddress(event.sender);
        const receiver = normalizeAddress(event.receiver);
        const amount0 = new BigNumber(event.spentAmount).dividedBy(new BigNumber(10).pow(token0.decimals)).toString(10);
        const amount1 = new BigNumber(event.returnAmount)
          .dividedBy(new BigNumber(10).pow(token1.decimals))
          .toString(10);

        return {
          protocol: this.config.protocol,
          action: 'trade',
          addresses: [sender, receiver],
          tokens: [token0, token1],
          tokenAmounts: [amount0, amount1],
          readableString: `${sender} trade ${amount0} ${token0.symbol} for ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
