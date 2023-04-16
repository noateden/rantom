import Web3 from 'web3';

import MarketAbi from '../../../configs/abi/exactly/Market.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface ExactlyMarketInfo {
  chain: string;
  address: string;
  asset: Token;
}

export class ExactlyHelper {
  public static async getMarketInfo(chain: string, address: string): Promise<ExactlyMarketInfo | null> {
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(MarketAbi as any, address);
    const web3Helper = new Web3HelperProvider(null);
    try {
      const asset = await contract.methods.asset().call();
      const token = await web3Helper.getErc20Metadata(chain, asset);
      if (token) {
        return {
          chain,
          address: normalizeAddress(address),
          asset: token,
        };
      }
    } catch (e: any) {}

    return null;
  }
}
