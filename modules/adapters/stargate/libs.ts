import { AddressZero } from '../../../configs/constants/addresses';
import { NativeTokens } from '../../../configs/constants/nativeTokens';
import logger from '../../../lib/logger';
import { normalizeAddress } from '../../../lib/utils';
import BlockchainService from '../../../services/blockchains/blockchain';
import { LiquidityPoolConstant } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';

export interface GetStargateLiquidityPoolOptions {
  services: ContextServices | null;
  chain: string;
  address: string;
  protocol: string;
}

const TokenFunctionAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    name: 'token',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
  },
];

export default class StargateLibs {
  public static async getLiquidityPoolInfo(
    options: GetStargateLiquidityPoolOptions
  ): Promise<LiquidityPoolConstant | null> {
    const blockchain = new BlockchainService(options.services ? options.services.database : null);
    try {
      const tokenAddress = await blockchain.singlecall({
        chain: options.chain,
        abi: TokenFunctionAbi,
        target: options.address,
        method: 'token',
        params: [],
      });

      const token = await blockchain.getTokenInfo({
        chain: options.chain,
        address: tokenAddress,
      });
      if (token) {
        if (token.symbol === 'SGETH') {
          token.symbol = NativeTokens[options.chain].symbol;
          token.address = AddressZero;
        }

        return {
          version: 'basic',
          protocol: options.protocol,
          chain: options.chain,
          address: normalizeAddress(options.address),
          factory: AddressZero,
          tokens: [token],
        };
      }
    } catch (e: any) {
      logger.warn('failed to get liquidity pool info', {
        service: 'lib.stargate',
        chain: options.chain,
        address: options.address,
        error: e.message,
      });
    }

    return null;
  }
}
