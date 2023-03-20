import Web3 from 'web3';

import ConvexBoosterAbi from '../../../configs/abi/convex/Booster.json';
import EnvConfig from '../../../configs/envConfig';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface ConvexBoosterPool {
  chain: string;
  poolId: number;
  lpToken: Token;
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
      const { lptoken } = await contract.methods.poolInfo(poolId).call();

      const web3Helper = new Web3HelperProvider(null);
      const token = await web3Helper.getErc20Metadata(chain, lptoken);
      if (token) {
        return {
          chain,
          poolId: poolId,
          lpToken: token,
        };
      }
    } catch (e: any) {}

    return null;
  }
}
