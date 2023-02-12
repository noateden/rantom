import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import UniswapV2PairAbi from '../../../configs/abi/uniswap/UniswapV2Pair.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Swap: '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
  Mint: '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
  Burn: '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496',
};

export class Uniswapv2Adapter extends Adapter {
  public readonly name: string = 'adapter.uniswapv2';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, signature, event } = options;

    if (signature === Signatures.Swap || signature === Signatures.Mint || signature === Signatures.Burn) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const poolContract = new web3.eth.Contract(UniswapV2PairAbi as any, address);

      let factoryAddress;
      let token0Address;
      let token1Address;

      try {
        [factoryAddress, token0Address, token1Address] = await Promise.all([
          poolContract.methods.factory().call(),
          poolContract.methods.token0().call(),
          poolContract.methods.token1().call(),
        ]);
      } catch (e: any) {
        logger.onError({
          service: this.name,
          message: 'failed to get pool info',
          props: {
            protocol: this.config.protocol,
            pool: normalizeAddress(address),
          },
          error: e,
        });
      }

      if (this.config.contracts[chain].indexOf(normalizeAddress(factoryAddress)) !== -1) {
        const token0 = await this.getWeb3Helper().getErc20Metadata(chain, token0Address);
        const token1 = await this.getWeb3Helper().getErc20Metadata(chain, token1Address);

        if (token0 && token1) {
          switch (signature) {
            case Signatures.Swap: {
              const amount0In = new BigNumber(event.amount0In.toString()).dividedBy(
                new BigNumber(10).pow(token0.decimals)
              );
              const amount1In = new BigNumber(event.amount1In.toString()).dividedBy(
                new BigNumber(10).pow(token1.decimals)
              );
              const amount0Out = new BigNumber(event.amount0Out.toString()).dividedBy(
                new BigNumber(10).pow(token0.decimals)
              );
              const amount1Out = new BigNumber(event.amount1Out.toString()).dividedBy(
                new BigNumber(10).pow(token1.decimals)
              );

              const amountIn = amount0In.gt(0) ? amount0In.toString(10) : amount1In.toString(10);
              const amountOut = amount0Out.gt(0) ? amount0Out.toString(10) : amount1Out.toString(10);

              const tokenIn = amount0In.gt(0) ? token0 : token1;
              const tokenOut = amount0In.gt(0) ? token1 : token0;

              const sender = normalizeAddress(event.sender);
              const to = normalizeAddress(event.to);

              return {
                protocol: this.config.protocol,
                action: 'swap',
                addresses: [sender, to],
                tokens: [tokenIn, tokenOut],
                tokenAmounts: [amountIn, amountOut],
                readableString: `${sender} swaps ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }
            case Signatures.Mint: {
              const amount0 = new BigNumber(event.amount0.toString())
                .dividedBy(new BigNumber(10).pow(token0.decimals))
                .toString(10);
              const amount1 = new BigNumber(event.amount1.toString())
                .dividedBy(new BigNumber(10).pow(token1.decimals))
                .toString(10);
              const sender = normalizeAddress(event.sender);

              return {
                protocol: this.config.protocol,
                action: 'addLiquidity',
                addresses: [sender],
                tokens: [token0, token1],
                tokenAmounts: [amount0, amount1],
                readableString: `${sender} adds ${amount0} ${token0.symbol} and ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }
            case Signatures.Burn: {
              const amount0 = new BigNumber(event.amount0.toString())
                .dividedBy(new BigNumber(10).pow(token0.decimals))
                .toString(10);
              const amount1 = new BigNumber(event.amount1.toString())
                .dividedBy(new BigNumber(10).pow(token1.decimals))
                .toString(10);
              const sender = normalizeAddress(event.sender);
              const to = normalizeAddress(event.to);
              return {
                protocol: this.config.protocol,
                action: 'removeLiquidity',
                addresses: [sender, to],
                tokens: [token0, token1],
                tokenAmounts: [amount0, amount1],
                readableString: `${sender} removes ${amount0} ${token0.symbol} and ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }
          }
        }
      }
    }

    return null;
  }
}
