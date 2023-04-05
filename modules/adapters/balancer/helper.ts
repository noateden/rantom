import BigNumber from 'bignumber.js';

import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolSubgraphConfig, Token } from '../../../types/configs';
import { TradingEvent } from '../../../types/domains';

export class BalancerHelper {
  public static transformSubgraphSwapEvent(
    subgraphConfig: ProtocolSubgraphConfig,
    subgraphEvents: Array<any>
  ): Array<TradingEvent> {
    const events: Array<TradingEvent> = [];

    for (const swap of subgraphEvents) {
      let tokens: Array<Token> = [];
      let amounts: Array<string> = [];

      let tokenIn: Token | null = null;
      let tokenOut: Token | null = null;
      for (const token of swap.poolId.tokens) {
        if (compareAddress(swap.tokenIn, token.address)) {
          tokenIn = {
            chain: subgraphConfig.chain,
            address: normalizeAddress(token.address),
            symbol: token.symbol,
            decimals: Number(token.decimals),
          };
        }
        if (compareAddress(swap.tokenOut, token.address)) {
          tokenOut = {
            chain: subgraphConfig.chain,
            address: normalizeAddress(token.address),
            symbol: token.symbol,
            decimals: Number(token.decimals),
          };
        }
      }

      if (!tokenIn || !tokenOut) {
        continue;
      }

      tokens = [tokenIn, tokenOut];
      amounts = [
        new BigNumber(swap.tokenAmountIn.toString()).multipliedBy(new BigNumber(10).pow(tokenIn.decimals)).toString(10),
        new BigNumber(swap.tokenAmountOut.toString())
          .multipliedBy(new BigNumber(10).pow(tokenOut.decimals))
          .toString(10),
      ];

      events.push({
        chain: subgraphConfig.chain,
        contract: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        transactionHash: swap.id.slice(0, 66),
        logIndex: Number(swap.id.slice(66)),
        protocol: subgraphConfig.protocol,
        timestamp: Number(swap.timestamp),
        blockNumber: 0,
        action: 'swap',
        tokens,
        amounts,
        caller: normalizeAddress(swap.caller),
        user: normalizeAddress(swap.userAddress.id),
      });
    }

    return events;
  }
}
