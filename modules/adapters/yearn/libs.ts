import YearnVaultAbi from '../../../configs/abi/yearn/YearnVault-0.3.3.json';
import logger from '../../../lib/logger';
import { normalizeAddress } from '../../../lib/utils';
import BlockchainService from '../../../services/blockchains/blockchain';
import { StakingPoolConstant } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';

export interface GetYearnVaultInfoOptions {
  services: ContextServices | null;
  chain: string;
  address: string;
  protocol: string;
}

export default class YearnLibs {
  public static async getVaultInfo(options: GetYearnVaultInfoOptions): Promise<StakingPoolConstant | null> {
    const blockchain = new BlockchainService(options.services ? options.services.database : null);
    try {
      const tokenAddress = await blockchain.singlecall({
        chain: options.chain,
        abi: YearnVaultAbi,
        target: options.address,
        method: 'token',
        params: [],
      });

      const token = await blockchain.getTokenInfo({
        chain: options.chain,
        address: tokenAddress,
      });
      if (token) {
        return {
          poolId: 0, // ignore, don't use this value on Yearn vaults
          version: 'basic',
          protocol: options.protocol,
          chain: options.chain,
          address: normalizeAddress(options.address),
          token: token,
        };
      }
    } catch (e: any) {
      logger.warn('failed to get yearn vault info', {
        service: 'lib.yearn',
        chain: options.chain,
        address: options.address,
        error: e.message,
      });
    }

    return null;
  }
}
