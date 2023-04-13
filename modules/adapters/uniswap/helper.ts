import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import UniswapPoolAbiV2 from '../../../configs/abi/uniswap/UniswapV2Pair.json';
import UniswapPoolAbiV3 from '../../../configs/abi/uniswap/UniswapV3Pool.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolSubgraphConfig, Token } from '../../../types/configs';
import { TradingEvent } from '../../../types/domains';

export interface UniswapPoolConstant {
  chain: string;
  version: 2 | 3;
  poolAddress: string; // LP address
  token0: Token;
  token1: Token;

  // the fee amount to enable, denominated in hundredths of a bip (i.e. 1e-6)
  // if this a v3 pool, this value should be difference
  // otherwise, this value should be 3000 ~ 0.3%
  fee: number;
}

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
      amounts = [swap.amount1In.toString(), swap.amount0Out.toString()];
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
      amounts = [swap.amount0In.toString(), swap.amount1Out.toString()];
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

    const amount0 = new BigNumber(swap.amount0);
    const amount1 = new BigNumber(swap.amount1);

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
      const token0: Token =
        subgraphConfig.version === 'univ2'
          ? {
              chain: subgraphConfig.chain,
              symbol: event.pair.token0.symbol,
              address: event.pair.token0.id,
              decimals: Number(event.pair.token0.decimals),
            }
          : {
              chain: subgraphConfig.chain,
              symbol: event.pool.token0.symbol,
              address: event.pool.token0.id,
              decimals: Number(event.pool.token0.decimals),
            };
      const token1: Token =
        subgraphConfig.version === 'univ2'
          ? {
              chain: subgraphConfig.chain,
              symbol: event.pair.token1.symbol,
              address: event.pair.token1.id,
              decimals: Number(event.pair.token1.decimals),
            }
          : {
              chain: subgraphConfig.chain,
              symbol: event.pool.token1.symbol,
              address: event.pool.token1.id,
              decimals: Number(event.pool.token1.decimals),
            };

      events.push({
        chain: subgraphConfig.chain,
        contract:
          subgraphConfig.version === 'univ2' ? normalizeAddress(event.pair.id) : normalizeAddress(event.pool.id),
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
        amounts: [event.amount0.toString(), event.amount1.toString()],
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
      const token0: Token =
        subgraphConfig.version === 'univ2'
          ? {
              chain: subgraphConfig.chain,
              symbol: event.pair.token0.symbol,
              address: event.pair.token0.id,
              decimals: Number(event.pair.token0.decimals),
            }
          : {
              chain: subgraphConfig.chain,
              symbol: event.pool.token0.symbol,
              address: event.pool.token0.id,
              decimals: Number(event.pool.token0.decimals),
            };
      const token1: Token =
        subgraphConfig.version === 'univ2'
          ? {
              chain: subgraphConfig.chain,
              symbol: event.pair.token1.symbol,
              address: event.pair.token1.id,
              decimals: Number(event.pair.token1.decimals),
            }
          : {
              chain: subgraphConfig.chain,
              symbol: event.pool.token1.symbol,
              address: event.pool.token1.id,
              decimals: Number(event.pool.token1.decimals),
            };

      events.push({
        chain: subgraphConfig.chain,
        contract:
          subgraphConfig.version === 'univ2' ? normalizeAddress(event.pair.id) : normalizeAddress(event.pool.id),
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
        amounts: [event.amount0.toString(), event.amount1.toString()],
        caller: event.sender ? normalizeAddress(event.sender) : normalizeAddress(event.owner),
        user: event.sender ? normalizeAddress(event.sender) : normalizeAddress(event.owner),
      });
    }

    return events;
  }

  public static async getFactoryAddress(chain: string, poolAddress: string): Promise<string | null> {
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);

    try {
      const contract = new web3.eth.Contract(UniswapPoolAbiV2 as any, poolAddress);
      const factory = await contract.methods.factory().call();
      return normalizeAddress(factory);
    } catch (e: any) {}

    try {
      const contract = new web3.eth.Contract(UniswapPoolAbiV3 as any, poolAddress);
      const factory = await contract.methods.factory().call();
      return normalizeAddress(factory);
    } catch (e: any) {}

    return null;
  }
}
