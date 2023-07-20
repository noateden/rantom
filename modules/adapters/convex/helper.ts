import Web3 from 'web3';

import BaseRewardPoolAbi from '../../../configs/abi/convex/BaseRewardPool.json';
import ConvexBoosterAbi from '../../../configs/abi/convex/Booster.json';
import EnvConfig from '../../../configs/envConfig';
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
          rewardPool: crvRewards,
          rewardToken: rewardToken,
        };
      }
    } catch (e: any) {
      console.info(e);
    }

    return null;
  }
}
