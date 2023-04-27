import Web3 from 'web3';

import ArrakisVaultV1Abi from '../../../configs/abi/arrakis/ArrakisV1.json';
import ArrakisVaultV2Abi from '../../../configs/abi/arrakis/ArrakisV2.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface ArrakisVaultInfo {
  version: 1 | 2;
  chain: string;
  address: string;
  token0: Token;
  token1: Token;
}

export class ArrakisHelper {
  public static async getVaultInfo(chain: string, version: 1 | 2, address: string): Promise<ArrakisVaultInfo | null> {
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const web3Helper = new Web3HelperProvider(null);
    const contract = new web3.eth.Contract(
      version === 1 ? (ArrakisVaultV1Abi as any) : (ArrakisVaultV2Abi as any),
      address
    );
    const [token0Address, token1Address] = await Promise.all([
      contract.methods.token0().call(),
      contract.methods.token1().call(),
    ]);

    const [token0, token1] = await Promise.all([
      web3Helper.getErc20Metadata(chain, token0Address),
      web3Helper.getErc20Metadata(chain, token1Address),
    ]);

    if (token0 && token1) {
      return {
        version,
        chain,
        address: normalizeAddress(address),
        token0,
        token1,
      };
    }

    return null;
  }
}
