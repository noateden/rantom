import Web3 from 'web3';

import YearnVaultAbi from '../../../configs/abi/yearn/YearnVault-0.3.3.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';
import { IProvider } from '../../../types/namespaces';

export interface YearnVaultToken {
  chain: string;
  address: string;
  token: Token;
}

export class YearnHelper implements IProvider {
  public readonly name: string = 'helper.yearn';

  public static async getYearnVaultToken(chain: string, vaultAddress: string): Promise<YearnVaultToken | null> {
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const vaultContract = new web3.eth.Contract(YearnVaultAbi as any, vaultAddress);

    try {
      const tokenAddress = await vaultContract.methods.token().call();
      const web3Helper = new Web3HelperProvider(null);
      const token = await web3Helper.getErc20Metadata(chain, tokenAddress);
      if (token) {
        return {
          chain,
          address: normalizeAddress(vaultAddress),
          token,
        };
      }
    } catch (e: any) {
      logger.onWarn({
        service: this.name,
        message: 'failed to get vault token',
        props: {
          chain,
          vault: normalizeAddress(vaultAddress),
          error: e.message,
        },
      });
    }

    return null;
  }
}
