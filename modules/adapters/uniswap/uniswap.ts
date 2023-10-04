import UniswapV2PairAbi from '../../../configs/abi/uniswap/UniswapV2Pair.json';
import UniswapV3PairAbi from '../../../configs/abi/uniswap/UniswapV3Pool.json';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { multicallv2 } from '../../../lib/multicall';
import { ProtocolConfig } from '../../../types/configs';
import { UniLiquidityPool } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { MulticallCall } from '../../../types/options';
import { Adapter } from '../adapter';

export class UniswapAdapter extends Adapter {
  public readonly name: string = 'adapter.uniswap';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {});
  }

  protected async getPoolConfig(chain: string, address: string): Promise<UniLiquidityPool | null> {
    // first, we use known pools from configs
    let poolConfig: UniLiquidityPool | null = null;
    if (this.config.staticData) {
      for (const pool of this.config.staticData.liquidityPools) {
        if (chain === pool.chain && compareAddress(address, pool.address)) {
          poolConfig = pool;
        }
      }
    }

    if (!poolConfig) {
      try {
        let calls: Array<MulticallCall> = [
          {
            name: 'factory',
            address: address,
            params: [],
          },
          {
            name: 'token0',
            address: address,
            params: [],
          },
          {
            name: 'token1',
            address: address,
            params: [],
          },
        ];

        let results: any;
        try {
          results = await multicallv2(chain, UniswapV2PairAbi, calls);
        } catch (e: any) {
          try {
            results = await multicallv2(chain, UniswapV3PairAbi, calls);
          } catch (e: any) {}
        }

        if (results) {
          const factoryAddress = results[0][0];
          const token0Address = results[1][0];
          const token1Address = results[2][0];

          if (
            this.config.contracts[chain] &&
            this.config.contracts[chain].indexOf(normalizeAddress(factoryAddress)) !== -1
          ) {
            const token0 = await this.getWeb3Helper().getErc20Metadata(chain, token0Address);
            const token1 = await this.getWeb3Helper().getErc20Metadata(chain, token1Address);

            if (token0 && token1) {
              poolConfig = {
                chain,
                protocol: this.config.protocol,
                version: 'univ2',
                address: normalizeAddress(address),
                token0: token0,
                token1: token1,
              };
            }
          }
        } else {
          return null;
        }
      } catch (e: any) {
        logger.onDebug({
          service: this.name,
          message: 'failed to get uni pool info',
          props: {
            protocol: this.config.protocol,
            chain: chain,
            pool: normalizeAddress(address),
            error: e.message,
          },
        });
      }
    }

    return poolConfig;
  }
}
