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
  Swap: '0x06dfeb25e76d44e08965b639a9d9307df8e1c3dbe2a6364194895e9c3992f033',
};

export class AirswapAdapter extends Adapter {
  public readonly name: string = 'adapter.airswap';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== 1) {
      if (signature === Signatures.Swap) {
        const web3 = new Web3();
        const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

        const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.senderToken);
        const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.signerToken);

        if (token0 && token1) {
          const trader = normalizeAddress(event.signerWallet);
          const amount0 = new BigNumber(event.senderAmount)
            .dividedBy(new BigNumber(10).pow(token0.decimals))
            .toString(10);
          const amount1 = new BigNumber(event.signerAmount)
            .dividedBy(new BigNumber(10).pow(token1.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'trade',
            addresses: [trader],
            tokens: [token0, token1],
            tokenAmounts: [amount0, amount1],
            readableString: `${trader} trade ${amount0} ${token0.symbol} for ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
