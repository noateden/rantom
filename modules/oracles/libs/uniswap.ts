import { Token as UniswapSdkToken } from '@uniswap/sdk-core';
import { Pool } from '@uniswap/v3-sdk';
import BigNumber from 'bignumber.js';

import Erc20Abi from '../../../configs/abi/ERC20.json';
import UniswapV3PoolAbi from '../../../configs/abi/uniswap/UniswapV3Pool.json';
import { normalizeAddress } from '../../../lib/helper';
import { RpcWrapperProvider } from '../../../services/rpc';
import { Token } from '../../../types/configs';

export interface UniswapGetSpotPriceOptions {
  chain: string;
  poolAddress: string;
  baseToken: Token;
  quotaToken: Token;
  blockNumber: number;
}

export class UniswapOracleLib {
  public static async getSpotPriceV2(options: UniswapGetSpotPriceOptions): Promise<string> {
    const rpcWrapper = new RpcWrapperProvider(null);

    const [baseBalance, quotaBalance] = await Promise.all([
      rpcWrapper.queryContract({
        chain: options.chain,
        abi: Erc20Abi,
        contract: options.baseToken.address,
        method: 'balanceOf',
        params: [options.poolAddress],
        blockNumber: options.blockNumber,
      }),
      rpcWrapper.queryContract({
        chain: options.chain,
        abi: Erc20Abi,
        contract: options.quotaToken.address,
        method: 'balanceOf',
        params: [options.poolAddress],
        blockNumber: options.blockNumber,
      }),
    ]);

    return new BigNumber(baseBalance.toString())
      .multipliedBy(new BigNumber(10).pow(options.quotaToken.decimals))
      .dividedBy(new BigNumber(quotaBalance.toString()))
      .dividedBy(1e18)
      .toString(10);
  }

  public static async getSpotPriceV3(options: UniswapGetSpotPriceOptions): Promise<string> {
    const rpcWrapper = new RpcWrapperProvider(null);

    const [poolFee, state, liquidity] = await Promise.all([
      rpcWrapper.queryContract({
        chain: options.chain,
        abi: UniswapV3PoolAbi,
        contract: options.poolAddress,
        method: 'fee',
        params: [],
      }),
      rpcWrapper.queryContract({
        chain: options.chain,
        abi: UniswapV3PoolAbi,
        contract: options.poolAddress,
        method: 'slot0',
        params: [],
      }),
      rpcWrapper.queryContract({
        chain: options.chain,
        abi: UniswapV3PoolAbi,
        contract: options.poolAddress,
        method: 'liquidity',
        params: [],
      }),
    ]);

    const baseTokenConfig = new UniswapSdkToken(1, options.baseToken.address, options.baseToken.decimals, '', '');
    const quoteTokenConfig = new UniswapSdkToken(1, options.quotaToken.address, options.quotaToken.decimals, '', '');

    const pool = new Pool(
      baseTokenConfig,
      quoteTokenConfig,
      Number(poolFee),
      state.sqrtPriceX96.toString(),
      liquidity.toString(),
      new BigNumber(state.tick.toString()).toNumber()
    );

    if (normalizeAddress(pool.token0.address) === normalizeAddress(options.baseToken.address)) {
      return new BigNumber(pool.token1Price.toFixed(12)).toString(10);
    } else {
      return new BigNumber(pool.token0Price.toFixed(12)).toString(10);
    }
  }
}
