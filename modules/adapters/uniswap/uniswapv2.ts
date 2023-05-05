import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction, UniLiquidityPool } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { UniswapAdapter } from './uniswap';

const Signatures = {
  Swap: '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
  Mint: '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
  Burn: '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496',
  PairCreated: '0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9',
};

export class Uniswapv2Adapter extends UniswapAdapter {
  public readonly name: string = 'adapter.uniswapv2';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);

    this.eventMappings = {
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
      [Signatures.Mint]: EventSignatureMapping[Signatures.Mint],
      [Signatures.Burn]: EventSignatureMapping[Signatures.Burn],
      [Signatures.PairCreated]: EventSignatureMapping[Signatures.PairCreated],
    };
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);

    if (signature === Signatures.Swap || signature === Signatures.Mint || signature === Signatures.Burn) {
      // first, we use known pools from configs
      let poolConfig: UniLiquidityPool | null = await this.getPoolConfig(chain, address);

      if (poolConfig) {
        const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

        switch (signature) {
          case Signatures.Swap: {
            const amount0In = new BigNumber(event.amount0In.toString()).dividedBy(
              new BigNumber(10).pow(poolConfig.token0.decimals)
            );
            const amount1In = new BigNumber(event.amount1In.toString()).dividedBy(
              new BigNumber(10).pow(poolConfig.token1.decimals)
            );
            const amount0Out = new BigNumber(event.amount0Out.toString()).dividedBy(
              new BigNumber(10).pow(poolConfig.token0.decimals)
            );
            const amount1Out = new BigNumber(event.amount1Out.toString()).dividedBy(
              new BigNumber(10).pow(poolConfig.token1.decimals)
            );

            const amountIn = amount0In.gt(0) ? amount0In.toString(10) : amount1In.toString(10);
            const amountOut = amount0Out.gt(0) ? amount0Out.toString(10) : amount1Out.toString(10);

            const tokenIn = amount0In.gt(0) ? poolConfig.token0 : poolConfig.token1;
            const tokenOut = amount0In.gt(0) ? poolConfig.token1 : poolConfig.token0;

            const sender = await this.getSenderAddress(options);
            const to = normalizeAddress(event.to);

            return {
              protocol: this.config.protocol,
              action: 'swap',
              addresses: [to, sender],
              tokens: [tokenIn, tokenOut],
              tokenAmounts: [amountIn, amountOut],
              readableString: `${sender} swaps ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.Mint: {
            const amount0 = new BigNumber(event.amount0.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token0.decimals))
              .toString(10);
            const amount1 = new BigNumber(event.amount1.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token1.decimals))
              .toString(10);
            const sender = await this.getSenderAddress(options);
            const caller = normalizeAddress(event.sender);

            return {
              protocol: this.config.protocol,
              action: 'deposit',
              addresses: [caller, sender],
              tokens: [poolConfig.token0, poolConfig.token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${caller} adds ${amount0} ${poolConfig.token0.symbol} and ${amount1} ${poolConfig.token1.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.Burn: {
            const amount0 = new BigNumber(event.amount0.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token0.decimals))
              .toString(10);
            const amount1 = new BigNumber(event.amount1.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token1.decimals))
              .toString(10);
            const sender = await this.getSenderAddress(options);
            const to = normalizeAddress(event.to);

            return {
              protocol: this.config.protocol,
              action: 'withdraw',
              addresses: [to, sender],
              tokens: [poolConfig.token0, poolConfig.token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${to} removes ${amount0} ${poolConfig.token0.symbol} and ${amount1} ${poolConfig.token1.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    } else if (signature === Signatures.PairCreated && this.config.contracts[chain].indexOf(address) !== -1) {
      // new pair created on factory contract
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
      const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.token0);
      const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.token1);
      const factory = normalizeAddress(address);
      const sender = await this.getSenderAddress(options);

      if (token0 && token1) {
        return {
          protocol: this.config.protocol,
          action: 'createLiquidityPool',
          addresses: [factory, sender],
          tokens: [token0, token1],
          tokenAmounts: ['0', '0'],
          readableString: `${sender} create liquidity pool ${token0.symbol} and ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
          addition: {
            pairAddress: normalizeAddress(event.pair),
          },
        };
      }
    }

    return null;
  }
}
