import { BalancerSDK, BalancerSdkConfig, Network } from '@balancer-labs/sdk';

import EnvConfig from '../../../configs/envConfig';
import { Token } from '../../../types/configs';

export interface BalancerGetSpotPriceOptions {
  poolId: string;
  baseToken: Token;
  quotaToken: Token;
}

export class BalancerOracleLib {
  public static async getSpotPrice(options: BalancerGetSpotPriceOptions): Promise<string> {
    const config: BalancerSdkConfig = {
      network: Network.MAINNET,
      rpcUrl: EnvConfig.blockchains.ethereum.nodeRpc,
    };

    const balancer = new BalancerSDK(config);

    const pool = await balancer.pools.find(options.poolId);
    if (!pool) return '0';
    const spotPrice = await pool.calcSpotPrice(options.baseToken.address, options.quotaToken.address);

    return spotPrice.toString();
  }
}
