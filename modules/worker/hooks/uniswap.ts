import axios from 'axios';

import { Contract, ProtocolSubgraphConfig } from '../../../types/configs';
import { TradingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { UniswapHelper } from '../../adapters/uniswap/helper';
import { DexSubgraphWorkerHook, QuerySubgraphResult } from '../extends/dexSubgraph';

export class UniswapWorkerHook extends DexSubgraphWorkerHook {
  public readonly name: string = 'worker.uniswap';

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
						transaction {
							id  
							${config.filters && config.filters.transactionBlockNumber ? config.filters.transactionBlockNumber : 'blockNumber'}
						}
						${config.version === 'univ2' ? 'pair' : 'pool'} {
							id
							token0 {
								id
								symbol
								decimals
							}
							token1 {
								id
								symbol
								decimals
							}
						}
						sender
						timestamp
						logIndex
						
						${config.version === 'univ2' ? 'to' : 'recipient'}
						${config.version === 'univ2' ? 'amount0In\namount0Out\namount1In\namount1Out' : ''}
						${config.version === 'univ3' ? 'amount0\namount1' : ''}
					}
					deposits: mints(first: 1000, where: {timestamp_gte: ${timestamp}}, orderBy: timestamp, orderDirection: desc) {
						transaction {
							id
							${config.filters && config.filters.transactionBlockNumber ? config.filters.transactionBlockNumber : 'blockNumber'}
						}
						logIndex
						timestamp
						pair {
						  id
							token0 {
								symbol
								decimals
								id
							}
							token1 {
								symbol
								decimals
								id
							}
						}
						amount0
						amount1
						sender
					}
					withdrawals: burns(first: 1000, where: {timestamp_gte: ${timestamp}}, orderBy: timestamp, orderDirection: desc) {
						transaction {
							id
							${config.filters && config.filters.transactionBlockNumber ? config.filters.transactionBlockNumber : 'blockNumber'}
						}
						logIndex
						timestamp
						pair {
						  id
							token0 {
								symbol
								decimals
								id
							}
							token1 {
								symbol
								decimals
								id
							}
						}
						amount0
						amount1
						sender
					}
				}
			`,
    });

    result.trades = response.data.data.trades as Array<any>;
    result.deposits = response.data.data.deposits as Array<any>;
    result.withdrawals = response.data.data.withdrawals as Array<any>;

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
    return UniswapHelper.transformSubgraphSwapEvent(config, events);
  }

  protected transformDepositEvents(config: ProtocolSubgraphConfig, events: Array<any>): Array<TradingEvent> {
    return UniswapHelper.transformSubgraphDepositEvent(config, events);
  }

  protected transformWithdrawEvents(config: ProtocolSubgraphConfig, events: Array<any>): Array<TradingEvent> {
    return UniswapHelper.transformSubgraphWithdrawEvent(config, events);
  }
}
