import axios from 'axios';

import { getTimestamp, normalizeAddress, sleep } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { ProtocolSubgraphConfig } from '../../../types/configs';
import { MongoCollections, TradingEvent } from '../../../types/domains';
import { GlobalProviders, IProvider } from '../../../types/namespaces';
import { WorkerRunOptions } from '../../../types/options';
import { UniswapHelper } from '../../adapters/uniswap/helper';

export interface QuerySubgraphResult {
  trades: Array<any>;
  deposits: Array<any>;
  withdrawals: Array<any>;
  nextTimestamp: number;
}

export class UniswapSubgraphHook implements IProvider {
  public readonly name: string = 'worker.subgraph';
  public readonly providers: GlobalProviders;

  private readonly config: ProtocolSubgraphConfig;

  constructor(providers: GlobalProviders, subgraph: ProtocolSubgraphConfig) {
    this.providers = providers;
    this.config = subgraph;
  }

  protected async querySubgraph(timestamp: number): Promise<QuerySubgraphResult> {
    const result: QuerySubgraphResult = {
      trades: [],
      deposits: [],
      withdrawals: [],
      nextTimestamp: 0,
    };

    const response = await axios.post(this.config.endpoint, {
      query: `
				{
					trades: swaps(first: 1000, where: {timestamp_gte: ${timestamp}}, orderBy: timestamp, orderDirection: asc) {
						transaction {
							id  
							${
                this.config.filters && this.config.filters.transactionBlockNumber
                  ? this.config.filters.transactionBlockNumber
                  : 'blockNumber'
              }
						}
						${this.config.version === 'univ2' ? 'pair' : 'pool'} {
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
						
						${this.config.version === 'univ2' ? 'to' : 'recipient'}
						${this.config.version === 'univ2' ? 'amount0In\namount0Out\namount1In\namount1Out' : ''}
						${this.config.version === 'univ3' ? 'amount0\namount1' : ''}
					}
					deposits: mints(first: 1000, where: {timestamp_gte: ${timestamp}}, orderBy: timestamp, orderDirection: desc) {
						transaction {
							id
							${
                this.config.filters && this.config.filters.transactionBlockNumber
                  ? this.config.filters.transactionBlockNumber
                  : 'blockNumber'
              }
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
							${
                this.config.filters && this.config.filters.transactionBlockNumber
                  ? this.config.filters.transactionBlockNumber
                  : 'blockNumber'
              }
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

  public async indexSubgraphs(options: WorkerRunOptions): Promise<void> {
    // if fromBlock was given, start sync from fromBlock value
    // and do not save contract state
    let stateTime = options.fromTime;

    const { statesCollection } = await this.providers.mongodb.requireCollections();
    const stateKey = `index-subgraph-${this.config.chain}-${this.config.version}-${this.config.protocol}`;
    if (stateTime === 0) {
      stateTime = this.config.birthday;
      const states = await statesCollection.find({ name: stateKey }).limit(1).toArray();
      if (states.length > 0) {
        stateTime = states[0].timestamp;
      }
    }

    const tip = getTimestamp();

    logger.onInfo({
      service: this.name,
      message: 'start subgraph worker',
      props: {
        chain: this.config.chain,
        protocol: this.config.protocol,
        subgraph: this.config.endpoint,
        fromTime: stateTime,
        toTime: tip,
      },
    });

    while (stateTime <= tip) {
      try {
        const startExeTime = Math.floor(new Date().getTime() / 1000);
        const result: QuerySubgraphResult = await this.querySubgraph(stateTime);

        let events: Array<TradingEvent> = this.transformSwapEvents(this.config, result.trades);
        events = events.concat(this.transformDepositEvents(this.config, result.deposits));
        events = events.concat(this.transformWithdrawEvents(this.config, result.withdrawals));

        const operations: Array<any> = [];
        for (const event of events) {
          operations.push({
            updateOne: {
              filter: {
                chain: event.chain,
                contract: event.contract,
                transactionHash: event.transactionHash,
                logIndex: event.logIndex,
              },
              update: {
                $set: {
                  chain: this.config.chain,
                  contract: normalizeAddress(event.contract),
                  transactionHash: event.transactionHash,
                  logIndex: event.logIndex,
                  blockNumber: event.blockNumber,
                  timestamp: event.timestamp,

                  protocol: event.protocol,
                  action: event.action,
                  addresses: event.caller ? [event.user, event.caller] : [event.user],
                  tokens: event.tokens,
                  amounts: event.amounts,
                  addition: event.addition,
                },
              },
              upsert: true,
            },
          });
        }

        if (operations.length > 0) {
          const collections = await this.providers.mongodb.requireCollections();
          await collections.logsCollection.bulkWrite(operations);
        }

        // save state only when fromBlock was not given
        if (options.fromTime === 0) {
          const collections: MongoCollections = await this.providers.mongodb.requireCollections();
          await collections.statesCollection.updateOne(
            {
              name: stateKey,
            },
            {
              $set: {
                name: stateKey,
                timestamp: stateTime,
              },
            },
            { upsert: true }
          );
        }

        stateTime = result.nextTimestamp;

        const endExeTime = Math.floor(new Date().getTime() / 1000);
        const elapsed = endExeTime - startExeTime;
        logger.onInfo({
          service: this.name,
          message: 'got subgraph swap events',
          props: {
            chain: this.config.chain,
            protocol: this.config.protocol,
            subgraph: this.config.endpoint,
            toTime: stateTime,
            events: operations.length,
            elapsed: `${elapsed}s`,
          },
        });
      } catch (e: any) {
        logger.onError({
          service: this.name,
          message: 'failed to query subgraph swap events',
          props: {
            chain: this.config.chain,
            protocol: this.config.protocol,
            subgraph: this.config.endpoint,
          },
          error: e,
        });
        await sleep(5);
      }
    }
  }
}
