import axios from 'axios';

import { Contract, ProtocolSubgraphConfig } from '../../../types/configs';
import { TradingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { BalancerHelper } from '../../adapters/balancer/helper';
import { DexSubgraphWorkerHook, QuerySubgraphResult } from '../extends/dexSubgraph';

export class BalancerWorkerHook extends DexSubgraphWorkerHook {
  public readonly name: string = 'worker.balancer';

  constructor(providers: GlobalProviders, contracts: Array<Contract>, subgraphs: Array<ProtocolSubgraphConfig>) {
    super(providers, contracts, subgraphs);
  }

  protected async querySubgraph(config: ProtocolSubgraphConfig, timestamp: number): Promise<QuerySubgraphResult> {
    const result: QuerySubgraphResult = {
      trades: [],
      deposits: [],
      withdrawals: [],
      nextTimestamp: 0,
    };

    const response = await axios.post(config.endpoint, {
      query: `
        {
          trades: swaps(first: 1000, where: {timestamp_gte: ${timestamp}}, orderBy: timestamp, orderDirection: asc) {
            caller
            tokenIn
            tokenOut
            tokenAmountIn
            tokenAmountOut
            userAddress {
              id
            }
            timestamp
            poolId {
              tokens(first: 100) {
                address
                decimals
                symbol
              }
            }
            id
          }
          
          joinExits: joinExits(first: 1000, where: {timestamp_gte: ${timestamp}}, orderBy: timestamp, orderDirection: asc) {
            id
            type
            sender
            amounts
            timestamp
            pool {
              tokens(first: 100) {
                address,
                symbol,
                decimals
              }
            }
          }
        }
      `,
    });

    result.trades = response.data.data.trades as Array<any>;

    for (const event of response.data.data.joinExits) {
      if (event.type === 'Join') {
        result.deposits.push(event);
      }
      if (event.type === 'Exit') {
        result.withdrawals.push(event);
      }
    }

    const lastTrade = result.trades.length > 0 ? Number(result.trades[result.trades.length - 1].timestamp) : timestamp;
    const lastDeposit =
      result.deposits.length > 0 ? Number(result.deposits[result.deposits.length - 1].timestamp) : timestamp;
    const lastWithdraw =
      result.withdrawals.length > 0 ? Number(result.withdrawals[result.withdrawals.length - 1].timestamp) : timestamp;

    result.nextTimestamp = lastTrade;
    if (result.nextTimestamp > lastDeposit) {
      result.nextTimestamp = lastDeposit;
    }
    if (result.nextTimestamp > lastWithdraw) {
      result.nextTimestamp = lastWithdraw;
    }

    if (result.nextTimestamp === timestamp) {
      result.nextTimestamp += 600;
    }

    return result;
  }

  protected transformSwapEvents(config: ProtocolSubgraphConfig, events: Array<any>): Array<TradingEvent> {
    return BalancerHelper.transformSubgraphSwapEvent(config, events);
  }

  protected transformDepositEvents(config: ProtocolSubgraphConfig, events: Array<any>): Array<TradingEvent> {
    return BalancerHelper.transformSubgraphLiquidityEvent(config, events);
  }

  protected transformWithdrawEvents(config: ProtocolSubgraphConfig, events: Array<any>): Array<TradingEvent> {
    return BalancerHelper.transformSubgraphLiquidityEvent(config, events);
  }
}
