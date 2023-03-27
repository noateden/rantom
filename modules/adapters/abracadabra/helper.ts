import Web3 from 'web3';

import CauldronV4Abi from '../../../configs/abi/abracadabra/CauldronV4.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface AbracadabraCauldron {
  chain: string;
  address: string;
  version: string;
  token: Token;
}

export class AbracadabraHelper {
  public static async getCauldronInfo(
    chain: string,
    version: string,
    address: string
  ): Promise<AbracadabraCauldron | null> {
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(CauldronV4Abi as any, address);
    const web3Helper = new Web3HelperProvider(null);
    try {
      const collateralAddress = await contract.methods.collateral().call();
      const token = await web3Helper.getErc20Metadata(chain, collateralAddress);
      if (token) {
        return {
          chain,
          version,
          address: normalizeAddress(address),
          token,
        };
      }
    } catch (e: any) {}

    return null;
  }
}
