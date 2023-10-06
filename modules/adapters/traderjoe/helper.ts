import Web3 from 'web3';

import LBPairAbi from '../../../configs/abi/traderjoe/LBPair.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface TraderjoeLBPairInfo {
  chain: string;
  address: string;
  factory: string;
  tokenX: Token;
  tokenY: Token;
}

export class TraderjoeHelper {
  public static async getLBPairInfo(chain: string, address: string): Promise<TraderjoeLBPairInfo | null> {
    const web3Helper = new Web3HelperProvider(null);
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(LBPairAbi as any, address);

    try {
      const [tokenXAddress, tokenYAddress, factoryAddress] = await Promise.all([
        contract.methods.tokenX().call(),
        contract.methods.tokenY().call(),
        contract.methods.factory().call(),
      ]);

      const tokenX = await web3Helper.getErc20Metadata(chain, tokenXAddress);
      const tokenY = await web3Helper.getErc20Metadata(chain, tokenYAddress);
      if (tokenX && tokenY) {
        return {
          chain,
          address,
          tokenX,
          tokenY,
          factory: normalizeAddress(factoryAddress),
        };
      }
    } catch (e: any) {}

    return null;
  }
}
