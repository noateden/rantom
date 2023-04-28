import Web3 from 'web3';

import PendleMarketAbi from '../../../configs/abi/pendle/PendleMarket.json';
import PendleSyTokenAbi from '../../../configs/abi/pendle/PendleSYToken.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface PendleSyTokenInfo {
  chain: string;
  address: string;
  tokensIn: Array<Token>;
  tokensOut: Array<Token>;
}

export interface PendleMarketInfo {
  chain: string;
  address: string;
  syToken: Token;
  ptToken: Token;
  ytToken: Token;
}

export class PendleHelper {
  public static async getSyTokenInfo(chain: string, address: string): Promise<PendleSyTokenInfo | null> {
    const syTokenInfo: PendleSyTokenInfo = {
      chain,
      address: normalizeAddress(address),
      tokensIn: [],
      tokensOut: [],
    };

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const web3Helper = new Web3HelperProvider(null);
    const contract = new web3.eth.Contract(PendleSyTokenAbi as any, address);

    const [tokensInAddress, tokensOutAddress] = await Promise.all([
      contract.methods.getTokensIn().call(),
      contract.methods.getTokensOut().call(),
    ]);

    for (const tokenAddress of tokensInAddress) {
      const token = await web3Helper.getErc20Metadata(chain, tokenAddress);
      if (token) {
        syTokenInfo.tokensIn.push(token);
      }
    }

    for (const tokenAddress of tokensOutAddress) {
      const token = await web3Helper.getErc20Metadata(chain, tokenAddress);
      if (token) {
        syTokenInfo.tokensOut.push(token);
      }
    }

    return syTokenInfo;
  }

  public static async getMarketInfo(chain: string, address: string): Promise<PendleMarketInfo | null> {
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const web3Helper = new Web3HelperProvider(null);
    const contract = new web3.eth.Contract(PendleMarketAbi as any, address);

    const tokenAddresses = await contract.methods.readTokens().call();
    const syToken = await web3Helper.getErc20Metadata(chain, tokenAddresses._SY);
    const ptToken = await web3Helper.getErc20Metadata(chain, tokenAddresses._PT);
    const ytToken = await web3Helper.getErc20Metadata(chain, tokenAddresses._YT);

    if (syToken && ptToken && ytToken) {
      return {
        chain,
        address: normalizeAddress(address),
        syToken,
        ptToken,
        ytToken,
      };
    }

    return null;
  }
}
