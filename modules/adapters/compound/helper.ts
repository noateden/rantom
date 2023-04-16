import Web3 from 'web3';

import CompoundCometAbi from '../../../configs/abi/compound/Comet.json';
import CompoundCTokenAbi from '../../../configs/abi/compound/cErc20.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface CompoundMarketInfo {
  chain: string;
  address: string;
  etherPool: boolean;
  underlying: Token;
}

export interface CompoundMarketInfoV3 {
  chain: string;
  address: string;
  baseToken: Token;
  collaterals: Array<Token>;
}

export class CompoundHelper {
  public static async getMarketInfo(
    chain: string,
    etherPool: boolean,
    address: string
  ): Promise<CompoundMarketInfo | null> {
    if (etherPool) {
      return {
        chain,
        address: normalizeAddress(address),
        etherPool: true,
        underlying: Tokens.ethereum.NativeCoin,
      };
    }

    const web3Helper = new Web3HelperProvider(null);
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(CompoundCTokenAbi as any, address);
    try {
      const underlying = await contract.methods.underlying().call();
      const token = await web3Helper.getErc20Metadata(chain, underlying);
      if (token) {
        return {
          chain,
          address: normalizeAddress(address),
          etherPool: false,
          underlying: token,
        };
      }
    } catch (e: any) {}

    return null;
  }

  public static async getMarketInfoV3(chain: string, address: string): Promise<CompoundMarketInfoV3 | null> {
    const web3Helper = new Web3HelperProvider(null);
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(CompoundCometAbi as any, address);
    try {
      const baseTokenAddress = await contract.methods.baseToken().call();
      const baseToken = await web3Helper.getErc20Metadata(chain, baseTokenAddress);
      if (baseToken) {
        const market: CompoundMarketInfoV3 = {
          chain,
          address: normalizeAddress(address),
          baseToken: baseToken,
          collaterals: [],
        };
        const totalAsset = await contract.methods.numAssets().call();
        for (let i = 0; i < Number(totalAsset); i++) {
          const assetInfo = await contract.methods.getAssetInfo(i).call();
          const collateral = await web3Helper.getErc20Metadata(chain, assetInfo[1]);
          if (collateral) {
            market.collaterals.push(collateral);
          }
        }

        return market;
      }
    } catch (e: any) {}

    return null;
  }
}
