import Web3 from 'web3';

import FraxlendPairAbi from '../../../configs/abi/fraxlend/FraxlendPair.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface FraxlendPairInfo {
  chain: string;
  address: string;
  asset: Token;
  collateral: Token;
}

export class FraxlendHelper {
  public static async getLendPairInfo(chain: string, address: string): Promise<FraxlendPairInfo | null> {
    const web3Helper = new Web3HelperProvider(null);
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(FraxlendPairAbi as any, address);

    try {
      const [assetAddress, collateralAddress] = await Promise.all([
        contract.methods.asset().call(),
        contract.methods.collateralContract().call(),
      ]);
      const asset = await web3Helper.getErc20Metadata(chain, assetAddress);
      const collateral = await web3Helper.getErc20Metadata(chain, collateralAddress);

      if (asset && collateral) {
        return {
          chain,
          address: normalizeAddress(address),
          asset: asset,
          collateral: collateral,
        };
      }
    } catch (e: any) {}

    return null;
  }
}
