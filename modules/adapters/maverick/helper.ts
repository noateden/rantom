import Web3 from 'web3';

import MaverickPoolAbi from '../../../configs/abi/maverick/IPool.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface MaverickPoolInfo {
  chain: string;
  address: string;
  tokenA: Token;
  tokenB: Token;
}

export class MaverickHelper {
  public static async getPoolInfo(chain: string, address: string): Promise<MaverickPoolInfo | null> {
    const web3Helper = new Web3HelperProvider(null);
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(MaverickPoolAbi as any, address);

    const [tokenAAddress, tokenBAddress] = await Promise.all([
      contract.methods.tokenA().call(),
      contract.methods.tokenB().call(),
    ]);

    const tokenA = await web3Helper.getErc20Metadata(chain, tokenAAddress);
    const tokenB = await web3Helper.getErc20Metadata(chain, tokenBAddress);

    if (tokenA && tokenB) {
      return {
        chain,
        address: normalizeAddress(address),
        tokenA,
        tokenB,
      };
    }

    return null;
  }
}
