import Web3 from 'web3';

import BeefyVaultAbi from '../../../configs/abi/beefy/BeefyVaultV7.json';
import EnvConfig from '../../../configs/envConfig';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface BeefyVaultInfo {
  chain: string;
  address: string;
  token: Token;
}

export class BeefyHelper {
  public static async getVaultInfo(chain: string, address: string): Promise<BeefyVaultInfo | null> {
    try {
      const web3Helper = new Web3HelperProvider(null);
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const contract = new web3.eth.Contract(BeefyVaultAbi as any, address);
      const tokenAddress = await contract.methods.want().call();
      const token = await web3Helper.getErc20Metadata(chain, tokenAddress);
      if (token) {
        return {
          chain,
          address,
          token,
        };
      } else {
        return null;
      }
    } catch (e: any) {
      return null;
    }
  }
}
