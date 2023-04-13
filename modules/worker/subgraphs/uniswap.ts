import axios from 'axios';

import { getTimestamp, normalizeAddress, sleep } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { ProtocolSubgraphConfig } from '../../../types/configs';
import { MongoCollections, TradingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { SubgraphJobRunOptions } from '../../../types/options';
import { UniswapHelper } from '../../adapters/uniswap/helper';
import { SubgraphJobProvider } from './job';

export class UniswapSubgraphJob extends SubgraphJobProvider {
  constructor(config: ProtocolSubgraphConfig, providers: GlobalProviders) {
    super(config, providers);
  }

  protected async getEvents(job: string, timestamp: number): Promise<Array<TradingEvent>> {
    switch (job) {
      case 'swap': {
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
				}
			`,
        });

        const trades = response.data.data.trades as Array<any>;
        return UniswapHelper.transformSubgraphSwapEvent(this.config, trades);
      }
      case 'deposit': {
        const response = await axios.post(this.config.endpoint, {
          query: `
				{
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
				}
			`,
        });
        const deposits = response.data.data.deposits as Array<any>;
        return UniswapHelper.transformSubgraphDepositEvent(this.config, deposits);
      }
      case 'withdraw': {
        const response = await axios.post(this.config.endpoint, {
          query: `
				{
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
        const withdrawals = response.data.data.withdrawals as Array<any>;
        return UniswapHelper.transformSubgraphWithdrawEvent(this.config, withdrawals);
      }
    }

    return [];
  }

  public async run(options: SubgraphJobRunOptions): Promise<void> {
    // if fromBlock was given, start sync from fromBlock value
    // and do not save contract state
    let stateTime = options.fromTime;

    const { statesCollection } = await this.providers.mongodb.requireCollections();
    const stateKey = `index-subgraph-${options.job}-${this.config.chain}-${this.config.version}-${this.config.protocol}-${this.config.endpoint}`;
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
      message: `getting subgraph ${options.job} events`,
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

        const events: Array<TradingEvent> = await this.getEvents(options.job, stateTime);

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

        stateTime = events.length > 0 ? events[events.length - 1].timestamp + 1 : (stateTime += 1);

        const endExeTime = Math.floor(new Date().getTime() / 1000);
        const elapsed = endExeTime - startExeTime;
        logger.onInfo({
          service: this.name,
          message: `got subgraph ${options.job} events`,
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
          message: `failed to query subgraph ${options.job} events`,
          props: {
            chain: this.config.chain,
            protocol: this.config.protocol,
            subgraph: this.config.endpoint,
          },
          error: e,
        });
        await sleep(60);
      }
    }
  }
}
