import SiloAbi from '../../../configs/abi/silo/Silo.json';
import { normalizeAddress } from '../../../lib/helper';
import { RpcWrapperProvider } from '../../../services/rpc';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface SiloPoolInfo {
  chain: string;
  address: string;
  assets: Array<Token>;
}

export class SiloHelper {
  public static async getSiloInfo(chain: string, address: string): Promise<SiloPoolInfo | null> {
    const silo: SiloPoolInfo = {
      chain,
      address: normalizeAddress(address),
      assets: [],
    };

    const web3Helper = new Web3HelperProvider(null);
    const rpcWrapper = new RpcWrapperProvider(null);

    try {
      const assets = await rpcWrapper.queryContract({
        chain,
        abi: SiloAbi,
        contract: address,
        method: 'getAssets',
        params: [],
      });
      for (const asset of assets) {
        const token = await web3Helper.getErc20Metadata(chain, asset);
        if (token) {
          silo.assets.push(token);
        }
      }
      return silo;
    } catch (e: any) {
      return null;
    }
  }
}
