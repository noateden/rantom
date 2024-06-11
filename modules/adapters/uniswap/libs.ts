import UniswapPoolV2Abi from '../../../configs/abi/uniswap/UniswapV2Pair.json';
import UniswapPoolV3Abi from '../../../configs/abi/uniswap/UniswapV3Pool.json';
import { querySubgraph } from '../../../lib/subsgraph';
import { normalizeAddress } from '../../../lib/utils';
import BlockchainService from '../../../services/blockchains/blockchain';
import { LiquidityPoolConstant, LiquidityPoolVersion } from '../../../types/domains';

export interface GetUniswapLiquidityPoolOptions {
  chain: string;
  address: string; // pool address
  version: LiquidityPoolVersion;
  protocol: string;
}

export interface GetTopLiquidityPoolSubgraphOptions {
  top: number;
  chain: string;
  protocol: string;
  version: LiquidityPoolVersion;
  factoryAddress: string;
  endpoint: string;
  filters: any;

  // http request custom headers
  httpRequestOptions?: any;
}

export default class UniswapLibs {
  public static async getLiquidityPoolOnchain(
    options: GetUniswapLiquidityPoolOptions
  ): Promise<LiquidityPoolConstant | null> {
    const { chain, address, version, protocol } = options;
    const blockchain = new BlockchainService();
    try {
      const [token0Address, token1Address, factoryAddress] = await Promise.all([
        blockchain.singlecall({
          chain,
          abi: version === 'univ2' ? UniswapPoolV2Abi : UniswapPoolV3Abi,
          target: address,
          method: 'token0',
          params: [],
        }),
        blockchain.singlecall({
          chain,
          abi: version === 'univ2' ? UniswapPoolV2Abi : UniswapPoolV3Abi,
          target: address,
          method: 'token1',
          params: [],
        }),
        blockchain.singlecall({
          chain,
          abi: version === 'univ2' ? UniswapPoolV2Abi : UniswapPoolV3Abi,
          target: address,
          method: 'factory',
          params: [],
        }),
      ]);

      const token0 = await blockchain.getTokenInfo({
        chain: chain,
        address: token0Address,
      });
      const token1 = await blockchain.getTokenInfo({
        chain: chain,
        address: token1Address,
      });

      if (token0 && token1) {
        return {
          chain: chain,
          version: version,
          address: normalizeAddress(address),
          protocol: protocol,
          factory: normalizeAddress(factoryAddress),
          tokens: [token0, token1],
        };
      }
    } catch (e: any) {}

    return null;
  }

  public static async getTopLiquidityPools(
    options: GetTopLiquidityPoolSubgraphOptions
  ): Promise<Array<LiquidityPoolConstant>> {
    const pools: Array<LiquidityPoolConstant> = [];

    const filterPools = options.version === 'univ2' ? 'pairs' : 'pools';

    const data = await querySubgraph(
      options.endpoint,
      `
            {
              pools: ${filterPools}(first: ${options.top}, orderBy: ${options.filters.orderBy}, orderDirection:desc) {
            id
            token0 {
              id
              symbol
              decimals
            }
            token1 {
              id
              symbol
              decimals
            }
          }
        }
      `,
      options.httpRequestOptions ? options.httpRequestOptions : {}
    );

    const rawPools: Array<any> = data.pools;
    for (const rawPool of rawPools) {
      pools.push({
        protocol: options.protocol,
        chain: options.chain,
        version: options.version,
        address: normalizeAddress(rawPool.id),
        factory: normalizeAddress(options.factoryAddress),
        tokens: [
          {
            chain: options.chain,
            address: normalizeAddress(rawPool.token0.id),
            symbol: rawPool.token0.symbol,
            decimals: Number(rawPool.token0.decimals),
          },
          {
            chain: options.chain,
            address: normalizeAddress(rawPool.token1.id),
            symbol: rawPool.token1.symbol,
            decimals: Number(rawPool.token1.decimals),
          },
        ],
      });
    }

    return pools;
  }
}
