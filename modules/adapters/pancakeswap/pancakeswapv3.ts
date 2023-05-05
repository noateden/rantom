import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction, UniLiquidityPool } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Uniswapv3Adapter } from '../uniswap/uniswapv3';

const Signatures = {
  Swap: '0x19b47279256b2a23a1665c810c8d55a1758940ee09377d4f8d26497a3577dc83',
};

export class Pancakeswapv3Adapter extends Uniswapv3Adapter {
  public readonly name: string = 'adapter.uniswapv3';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);

    // Swap signature on pancakeswap v3
    this.eventMappings[Signatures.Swap] = EventSignatureMapping[Signatures.Swap];
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const action: TransactionAction | null = await super.tryParsingActions(options);
    if (action != null) {
      return action;
    }

    const { chain, address, topics, data } = options;

    const signature = topics[0];
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    if (signature === Signatures.Swap) {
      const poolConfig: UniLiquidityPool | null = await this.getPoolConfig(chain, address);
      if (poolConfig) {
        const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

        const sender = normalizeAddress(event.sender);
        const recipient = normalizeAddress(event.recipient);

        let amount0 = new BigNumber(event.amount0.toString()).dividedBy(
          new BigNumber(10).pow(poolConfig.token0.decimals)
        );
        let amount1 = new BigNumber(event.amount1.toString()).dividedBy(
          new BigNumber(10).pow(poolConfig.token1.decimals)
        );

        let tokenIn = poolConfig.token0;
        let tokenOut = poolConfig.token1;
        let amountIn = '0';
        let amountOut = '0';

        // we detect swap route
        if (amount0.lt(0)) {
          // swap from token1 -> token0
          tokenIn = poolConfig.token1;
          tokenOut = poolConfig.token0;
          amountIn = amount1.abs().toString(10);
          amountOut = amount0.abs().toString(10);
        } else {
          // swap from token0 -> token1
          tokenIn = poolConfig.token0;
          tokenOut = poolConfig.token1;
          amountIn = amount0.abs().toString(10);
          amountOut = amount1.abs().toString(10);
        }

        return {
          protocol: this.config.protocol,
          action: 'swap',
          addresses: [recipient, sender],
          tokens: [tokenIn, tokenOut],
          tokenAmounts: [amountIn, amountOut],
          readableString: `${sender} swaps ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
