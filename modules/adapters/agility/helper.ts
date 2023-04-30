import Web3 from 'web3';

import StakingPoolAbi from '../../../configs/abi/agility/StakingPool.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface AgilityStakingPoolInfo {
  chain: string;
  address: string;
  stakingToken: Token;
  rewardToken: Token;
}

export class AgilityHelper {
  public static async getStakingPoolInfo(chain: string, address: string): Promise<AgilityStakingPoolInfo | null> {
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const web3Helper = new Web3HelperProvider(null);
    const contract = new web3.eth.Contract(StakingPoolAbi as any, address);
    const [stakingTokenAddress, rewardTokenAddress] = await Promise.all([
      contract.methods.stakingToken().call(),
      contract.methods.rewardsToken().call(),
    ]);

    const stakingToken = await web3Helper.getErc20Metadata(chain, stakingTokenAddress);
    const rewardToken = await web3Helper.getErc20Metadata(chain, rewardTokenAddress);

    if (stakingToken && rewardToken) {
      return {
        chain,
        address: normalizeAddress(address),
        stakingToken,
        rewardToken,
      };
    }

    return null;
  }
}
