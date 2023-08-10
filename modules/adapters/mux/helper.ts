import Web3 from 'web3';

import MuxLiquidityPoolAbi from '../../../configs/abi/mux/LiquidityPoolHop1.json';
import EnvConfig from '../../../configs/envConfig';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface MuxAssetInfo {
  chain: string;
  assetId: number;
  token: Token;
}

export class MuxHelper {
  public static async getAllAssetInfo(chain: string, liquidityPool: string): Promise<Array<MuxAssetInfo>> {
    const assets: Array<MuxAssetInfo> = [];

    const web3Helper = new Web3HelperProvider(null);
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(MuxLiquidityPoolAbi as any, liquidityPool);
    const allAssets = await contract.methods.getAllAssetInfo().call();
    for (let i = 0; i < allAssets.length; i++) {
      const token = await web3Helper.getErc20Metadata(chain, allAssets[i][1]);
      if (token) {
        assets.push({
          chain,
          assetId: i,
          token,
        });
      }
    }

    return assets;
  }
}
