import Web3 from 'web3';

import BaseRewardPoolAbi from '../../../configs/abi/convex/BaseRewardPool.json';
import ConvexBoosterAbi from '../../../configs/abi/convex/Booster.json';
import ConvexBoosterV2Abi from '../../../configs/abi/convex/BoosterV2.json';
import ConvexRewardPoolAbi from '../../../configs/abi/convex/ConvexRewardPool.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface ConvexBoosterPool {
  chain: string;
  poolId: number;
  lpToken: Token;
  rewardPool: string;
  rewardToken: Token;
}

export class ConvexHelper {
  public static async getBoosterPool(
    chain: string,
    boosterAddress: string,
    poolId: number
  ): Promise<ConvexBoosterPool | null> {
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(ConvexBoosterAbi as any, boosterAddress);
    try {
      const { lptoken, crvRewards } = await contract.methods.poolInfo(poolId).call();

      const rewardPoolContract = new web3.eth.Contract(BaseRewardPoolAbi as any, crvRewards);
      const rewardTokenAddress = await rewardPoolContract.methods.rewardToken().call();

      const web3Helper = new Web3HelperProvider(null);
      const token = await web3Helper.getErc20Metadata(chain, lptoken);
      const rewardToken = await web3Helper.getErc20Metadata(chain, rewardTokenAddress);
      if (token && rewardToken) {
        return {
          chain,
          poolId: poolId,
          lpToken: token,
          rewardPool: normalizeAddress(crvRewards),
          rewardToken: rewardToken,
        };
      }
    } catch (e: any) {
      console.info(e);
    }

    return null;
  }

  public static async getBoosterPoolV2(
    chain: string,
    boosterAddress: string,
    poolId: number
  ): Promise<ConvexBoosterPool | null> {
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(ConvexBoosterV2Abi as any, boosterAddress);
    try {
      const { lptoken, rewards } = await contract.methods.poolInfo(poolId).call();

      const rewardPoolContract = new web3.eth.Contract(ConvexRewardPoolAbi as any, rewards);
      const { reward_token } = await rewardPoolContract.methods.rewards(0).call();

      const web3Helper = new Web3HelperProvider(null);
      const token = await web3Helper.getErc20Metadata(chain, lptoken);
      const rewardToken = await web3Helper.getErc20Metadata(chain, reward_token);
      if (token && rewardToken) {
        return {
          chain,
          poolId: poolId,
          lpToken: token,
          rewardPool: normalizeAddress(rewards),
          rewardToken: rewardToken,
        };
      }
    } catch (e: any) {
      console.info(e);
    }

    return null;
  }
}
