import BigNumber from 'bignumber.js';

import { normalizeAddress } from '../../../lib/helper';
import { ProtocolSubgraphConfig, Token } from '../../../types/configs';
import { TradingEvent } from '../../../types/domains';

export class UniswapHelper {
  public static transformSubgraphSwapEvent(
    subgraphConfig: ProtocolSubgraphConfig,
    subgraphEvents: Array<any>
  ): Array<TradingEvent> {
    const events: Array<TradingEvent> = [];

    for (const swap of subgraphEvents) {
      const event =
        subgraphConfig.version === 'univ2'
          ? UniswapHelper.transformSubgraphSwapEventV2(subgraphConfig, swap)
          : UniswapHelper.transformSubgraphSwapEventV3(subgraphConfig, swap);
      events.push(event);
    }

    return events;
  }

  public static transformSubgraphSwapEventV2(subgraphConfig: ProtocolSubgraphConfig, swap: any): TradingEvent {
    let tokens: Array<Token> = [];
    let amounts: Array<string> = [];

    if (swap.amount0In === '0') {
      tokens = [
        {
          chain: subgraphConfig.chain,
          symbol: swap.pair.token1.symbol,
          address: swap.pair.token1.id,
          decimals: Number(swap.pair.token1.decimals),
        },
        {
          chain: subgraphConfig.chain,
          symbol: swap.pair.token0.symbol,
          address: swap.pair.token0.id,
          decimals: Number(swap.pair.token0.decimals),
        },
      ];
      amounts = [
        new BigNumber(swap.amount1In).multipliedBy(new BigNumber(10).pow(swap.pair.token1.decimals)).toString(10),
        new BigNumber(swap.amount0Out).multipliedBy(new BigNumber(10).pow(swap.pair.token0.decimals)).toString(10),
      ];
    } else {
      tokens = [
        {
          chain: subgraphConfig.chain,
          symbol: swap.pair.token0.symbol,
          address: swap.pair.token0.id,
          decimals: Number(swap.pair.token0.decimals),
        },
        {
          chain: subgraphConfig.chain,
          symbol: swap.pair.token1.symbol,
          address: swap.pair.token1.id,
          decimals: Number(swap.pair.token1.decimals),
        },
      ];
      amounts = [
        new BigNumber(swap.amount0In).multipliedBy(new BigNumber(10).pow(swap.pair.token0.decimals)).toString(10),
        new BigNumber(swap.amount1Out).multipliedBy(new BigNumber(10).pow(swap.pair.token1.decimals)).toString(10),
      ];
    }

    return {
      chain: subgraphConfig.chain,
      contract: normalizeAddress(swap.pair.id),
      transactionHash: swap.transaction.id,
      logIndex: Number(swap.logIndex),
      protocol: subgraphConfig.protocol,
      timestamp: Number(swap.timestamp),
      blockNumber:
        subgraphConfig.filters && subgraphConfig.filters.transactionBlockNumber
          ? Number(swap.transaction[subgraphConfig.filters.transactionBlockNumber])
          : Number(swap.transaction.blockNumber),
      action: 'swap',
      tokens,
      amounts,
      caller: normalizeAddress(swap.sender),
      user: normalizeAddress(swap.to),
    };
  }

  public static transformSubgraphSwapEventV3(subgraphConfig: ProtocolSubgraphConfig, swap: any): TradingEvent {
    let tokens: Array<Token> = [];
    let amounts: Array<string> = [];

    const amount0 = new BigNumber(swap.amount0).multipliedBy(new BigNumber(10).pow(swap.pool.token0.decimals));
    const amount1 = new BigNumber(swap.amount1).multipliedBy(new BigNumber(10).pow(swap.pool.token1.decimals));

    if (amount0.lt(0)) {
      tokens = [
        {
          chain: subgraphConfig.chain,
          symbol: swap.pool.token1.symbol,
          address: swap.pool.token1.id,
          decimals: Number(swap.pool.token1.decimals),
        },
        {
          chain: subgraphConfig.chain,
          symbol: swap.pool.token0.symbol,
          address: swap.pool.token0.id,
          decimals: Number(swap.pool.token0.decimals),
        },
      ];
      amounts = [amount1.abs().toString(10), amount0.abs().toString(10)];
    } else {
      tokens = [
        {
          chain: subgraphConfig.chain,
          symbol: swap.pool.token0.symbol,
          address: swap.pool.token0.id,
          decimals: Number(swap.pool.token0.decimals),
        },
        {
          chain: subgraphConfig.chain,
          symbol: swap.pool.token1.symbol,
          address: swap.pool.token1.id,
          decimals: Number(swap.pool.token1.decimals),
        },
      ];
      amounts = [amount0.abs().toString(10), amount1.abs().toString(10)];
    }

    return {
      chain: subgraphConfig.chain,
      contract: normalizeAddress(swap.pool.id),
      transactionHash: swap.transaction.id,
      logIndex: Number(swap.logIndex),
      protocol: subgraphConfig.protocol,
      timestamp: Number(swap.timestamp),
      blockNumber: Number(swap.transaction.blockNumber),
      action: 'swap',
      tokens,
      amounts,
      caller: normalizeAddress(swap.sender),
      user: normalizeAddress(swap.recipient),
    };
  }

  public static transformSubgraphDepositEvent(
    subgraphConfig: ProtocolSubgraphConfig,
    subgraphEvents: Array<any>
  ): Array<TradingEvent> {
    const events: Array<TradingEvent> = [];

    for (const event of subgraphEvents) {
      const token0: Token = {
        chain: subgraphConfig.chain,
        symbol: event.pair.token0.symbol,
        address: event.pair.token0.id,
        decimals: Number(event.pair.token0.decimals),
      };
      const token1: Token = {
        chain: subgraphConfig.chain,
        symbol: event.pair.token1.symbol,
        address: event.pair.token1.id,
        decimals: Number(event.pair.token1.decimals),
      };

      events.push({
        chain: subgraphConfig.chain,
        contract: normalizeAddress(event.pair.id),
        transactionHash: event.transaction.id,
        logIndex: Number(event.logIndex),
        protocol: subgraphConfig.protocol,
        timestamp: Number(event.timestamp),
        blockNumber:
          subgraphConfig.filters && subgraphConfig.filters.transactionBlockNumber
            ? Number(event.transaction[subgraphConfig.filters.transactionBlockNumber])
            : Number(event.transaction.blockNumber),
        action: 'deposit',
        tokens: [token0, token1],
        amounts: [
          new BigNumber(event.amount0.toString()).multipliedBy(new BigNumber(10).pow(token0.decimals)).toString(10),
          new BigNumber(event.amount1.toString()).multipliedBy(new BigNumber(10).pow(token1.decimals)).toString(10),
        ],
        caller: normalizeAddress(event.sender),
        user: normalizeAddress(event.sender),
      });
    }

    return events;
  }

  public static transformSubgraphWithdrawEvent(
    subgraphConfig: ProtocolSubgraphConfig,
    subgraphEvents: Array<any>
  ): Array<TradingEvent> {
    const events: Array<TradingEvent> = [];

    for (const event of subgraphEvents) {
      const token0: Token = {
        chain: subgraphConfig.chain,
        symbol: event.pair.token0.symbol,
        address: event.pair.token0.id,
        decimals: Number(event.pair.token0.decimals),
      };
      const token1: Token = {
        chain: subgraphConfig.chain,
        symbol: event.pair.token1.symbol,
        address: event.pair.token1.id,
        decimals: Number(event.pair.token1.decimals),
      };

      events.push({
        chain: subgraphConfig.chain,
        contract: normalizeAddress(event.pair.id),
        transactionHash: event.transaction.id,
        logIndex: Number(event.logIndex),
        protocol: subgraphConfig.protocol,
        timestamp: Number(event.timestamp),
        blockNumber:
          subgraphConfig.filters && subgraphConfig.filters.transactionBlockNumber
            ? Number(event.transaction[subgraphConfig.filters.transactionBlockNumber])
            : Number(event.transaction.blockNumber),
        action: 'withdraw',
        tokens: [token0, token1],
        amounts: [
          new BigNumber(event.amount0.toString()).multipliedBy(new BigNumber(10).pow(token0.decimals)).toString(10),
          new BigNumber(event.amount1.toString()).multipliedBy(new BigNumber(10).pow(token1.decimals)).toString(10),
        ],
        caller: normalizeAddress(event.sender),
        user: normalizeAddress(event.sender),
      });
    }

    return events;
  }
}
