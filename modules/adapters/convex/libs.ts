import BaseRewardPoolAbi from '../../../configs/abi/convex/BaseRewardPool.json';
import BoosterAbi from '../../../configs/abi/convex/Booster.json';
import BoosterV2Abi from '../../../configs/abi/convex/BoosterV2.json';
import ConvexRewardPoolAbi from '../../../configs/abi/convex/ConvexRewardPool.json';
import { ConvexStakingPoolConstant } from '../../../configs/protocols/convex';
import { normalizeAddress } from '../../../lib/utils';
import BlockchainService from '../../../services/blockchains/blockchain';
import { ContextServices } from '../../../types/namespaces';

export interface GetBoosterPoolInfoOptions {
  services: ContextServices | null;
  protocol: string;
  chain: string;
  address: string;
  version: 'convexBooster' | 'convexBoosterV2';
  poolId: number;
}

export default class ConvexLibs {
  public static async getBoosterPoolInfo(
    options: GetBoosterPoolInfoOptions
  ): Promise<ConvexStakingPoolConstant | null> {
    const blockchain = options.services ? options.services.blockchain : new BlockchainService(null);

    if (options.version === 'convexBooster') {
      const poolInfo = await blockchain.singlecall({
        chain: options.chain,
        abi: BoosterAbi,
        target: options.address,
        method: 'poolInfo',
        params: [options.poolId],
      });
      const token = await blockchain.getTokenInfo({
        chain: options.chain,
        address: poolInfo.lptoken,
      });
      if (token) {
        const rewardTokenAddress = await blockchain.singlecall({
          chain: options.chain,
          abi: BaseRewardPoolAbi,
          target: poolInfo.crvRewards,
          method: 'rewardToken',
          params: [],
        });
        const rewardToken = await blockchain.getTokenInfo({
          chain: options.chain,
          address: rewardTokenAddress,
        });

        if (rewardToken) {
          return {
            chain: options.chain,
            protocol: options.protocol,
            version: 'booster',
            address: normalizeAddress(options.address),
            poolId: options.poolId,
            token: token,
            rewardContract: normalizeAddress(poolInfo.crvRewards),
            rewardToken: rewardToken,
          };
        }
      }
    } else if (options.version === 'convexBoosterV2') {
      const poolInfo = await blockchain.singlecall({
        chain: options.chain,
        abi: BoosterV2Abi,
        target: options.address,
        method: 'poolInfo',
        params: [options.poolId],
      });
      const token = await blockchain.getTokenInfo({
        chain: options.chain,
        address: poolInfo.lptoken,
      });
      if (token) {
        const rewardTokenAddress = await blockchain.singlecall({
          chain: options.chain,
          abi: ConvexRewardPoolAbi,
          target: poolInfo.rewards,
          method: 'crv',
          params: [],
        });
        const rewardToken = await blockchain.getTokenInfo({
          chain: options.chain,
          address: rewardTokenAddress,
        });

        if (rewardToken) {
          return {
            chain: options.chain,
            protocol: options.protocol,
            address: normalizeAddress(options.address),
            poolId: options.poolId,
            version: 'booster',
            token: token,
            rewardContract: normalizeAddress(poolInfo.rewards),
            rewardToken: rewardToken,
          };
        }
      }
    } else {
      return null;
    }

    return null;
  }
}
