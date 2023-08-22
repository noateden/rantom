import Web3 from 'web3';

import MasterchefAbi from '../../../configs/abi/sushi/masterchef.json';
import MasterchefV2Abi from '../../../configs/abi/sushi/masterchefV2.json';
import MinichefAbi from '../../../configs/abi/sushi/minichef.json';
import UniswapV2Pool from '../../../configs/abi/uniswap/UniswapV2Pair.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface UniswapLpToken extends Token {
  token0: Token;
  token1: Token;
}

export interface SushiMasterchefPoolInfo {
  pid: number;
  chain: string;
  address: string;
  version: 'masterchef' | 'masterchefV2' | 'minichef';
  lpToken: UniswapLpToken;
}

export class SushiHelper {
  public static async getAllPool(
    chain: string,
    masterchefAddress: string,
    version: 'masterchef' | 'masterchefV2' | 'minichef'
  ): Promise<Array<SushiMasterchefPoolInfo>> {
    const pools: Array<SushiMasterchefPoolInfo> = [];

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const web3Helper = new Web3HelperProvider(null);

    let contract = new web3.eth.Contract(MasterchefAbi as any, masterchefAddress);
    if (version === 'masterchefV2') {
      contract = new web3.eth.Contract(MasterchefV2Abi as any, masterchefAddress);
    }
    if (version === 'minichef') {
      contract = new web3.eth.Contract(MinichefAbi as any, masterchefAddress);
    }

    // get the pool length
    const poolLength = await contract.methods.poolLength().call();
    for (let i = 0; i < Number(poolLength); i++) {
      try {
        let lpToken = null;
        if (version == 'masterchef') {
          const poolInfo = await contract.methods.poolInfo(i).call();
          lpToken = await web3Helper.getErc20Metadata(chain, poolInfo.lpToken);
        } else {
          const lpTokenAddress = await contract.methods.lpToken(i).call();
          lpToken = await web3Helper.getErc20Metadata(chain, lpTokenAddress);
        }

        if (lpToken) {
          const lpContract = new web3.eth.Contract(UniswapV2Pool as any, lpToken.address);
          const [token0Address, token1Address] = await Promise.all([
            lpContract.methods.token0().call(),
            lpContract.methods.token1().call(),
          ]);

          const token0 = await web3Helper.getErc20Metadata(chain, token0Address);
          const token1 = await web3Helper.getErc20Metadata(chain, token1Address);

          if (token0 && token1) {
            pools.push({
              chain,
              pid: i,
              version,
              address: normalizeAddress(masterchefAddress),
              lpToken: {
                ...lpToken,
                token0,
                token1,
              },
            });
            console.info(
              `Got pool ${chain} ${masterchefAddress} ${version} pid:${i} ${token0.symbol}-${token1.symbol}`
            );
          }
        }
      } catch (e: any) {
        console.info(`Failed to get pool pid:${i} error:${e.message}`);
      }
    }

    return pools;
  }
}
