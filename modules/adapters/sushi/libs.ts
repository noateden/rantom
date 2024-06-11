import SushiMasterchefAbi from '../../../configs/abi/sushi/Masterchef.json';
import SushiMasterchefV2Abi from '../../../configs/abi/sushi/MasterchefV2.json';
import SushiMinichefAbi from '../../../configs/abi/sushi/Minichef.json';
import UniswapV2PairAbi from '../../../configs/abi/uniswap/UniswapV2Pair.json';
import { normalizeAddress } from '../../../lib/utils';
import BlockchainService from '../../../services/blockchains/blockchain';
import { StakingPoolConstant } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';

export interface GetMasterchefPoolInfoOptions {
  services: ContextServices | null;
  protocol: string;
  chain: string;
  address: string;
  version: 'masterchef' | 'masterchefV2' | 'minichef';
  poolId: number;
}

export default class SushiLibs {
  public static async getMasterchefPoolInfo(
    options: GetMasterchefPoolInfoOptions
  ): Promise<StakingPoolConstant | null> {
    const blockchain = options.services ? options.services.blockchain : new BlockchainService();
    let lpToken = null;

    if (options.version === 'masterchef') {
      const poolInfo = await blockchain.singlecall({
        chain: options.chain,
        abi: SushiMasterchefAbi,
        target: options.address,
        method: 'poolInfo',
        params: [options.poolId],
      });

      lpToken = poolInfo.lpToken;
    } else if (options.version === 'masterchefV2') {
      // v2
      lpToken = await blockchain.singlecall({
        chain: options.chain,
        abi: SushiMasterchefV2Abi,
        target: options.address,
        method: 'lpToken',
        params: [options.poolId],
      });
    } else if (options.version === 'minichef') {
      // minichef
      lpToken = await blockchain.singlecall({
        chain: options.chain,
        abi: SushiMinichefAbi,
        target: options.address,
        method: 'lpToken',
        params: [options.poolId],
      });
    } else {
      return null;
    }

    const token = await blockchain.getTokenInfo({
      chain: options.chain,
      address: lpToken,
    });
    if (token) {
      // try to check where it
      try {
        const token0Address = await blockchain.singlecall({
          chain: options.chain,
          abi: UniswapV2PairAbi,
          target: token.address,
          method: 'token0',
          params: [],
        });
        const token1Address = await blockchain.singlecall({
          chain: options.chain,
          abi: UniswapV2PairAbi,
          target: token.address,
          method: 'token1',
          params: [],
        });

        const token0 = await blockchain.getTokenInfo({
          chain: options.chain,
          address: token0Address,
        });
        const token1 = await blockchain.getTokenInfo({
          chain: options.chain,
          address: token1Address,
        });

        if (token0 && token1) {
          token.symbol = `${token0.symbol}-${token1.symbol} ${token.symbol}`;
        }
      } catch (e: any) {}

      return {
        chain: options.chain,
        protocol: options.protocol,
        address: normalizeAddress(options.address),
        poolId: options.poolId,
        version: 'masterchef',
        token: token,
      };
    }

    return null;
  }
}
