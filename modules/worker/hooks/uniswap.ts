import axios from 'axios';

import { getTimestamp, sleep } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { Contract, ProtocolSubgraphConfig } from '../../../types/configs';
import { MongoCollections, TradingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { WorkerRunOptions } from '../../../types/options';
import { UniswapHelper } from '../../adapters/uniswap/helper';
import { SubgraphWorker } from '../subgraph';

export class UniswapWorkerHook extends SubgraphWorker {
  public readonly name: string = 'worker.uniswap';

  constructor(providers: GlobalProviders, contracts: Array<Contract>, subgraphs: Array<ProtocolSubgraphConfig>) {
    super(providers, contracts, subgraphs);
  }

  protected async indexSubgraphs(config: ProtocolSubgraphConfig, options: WorkerRunOptions): Promise<void> {
    // if fromBlock was given, start sync from fromBlock value
    // and do not save contract state
    let stateTime = options.fromTime;

    const { statesCollection } = await this.providers.mongodb.requireCollections();
    const stateKey = `index-subgraph-${config.chain}-${config.version}-${config.protocol}`;
    if (stateTime === 0) {
      stateTime = config.birthday;
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
        chain: config.chain,
        protocol: config.protocol,
        subgraph: config.endpoint,
        fromTime: stateTime,
        toTime: tip,
      },
    });

    while (stateTime <= tip) {
      try {
        const startExeTime = Math.floor(new Date().getTime() / 1000);
        const response = await axios.post(config.endpoint, {
          query: `
						{
							swaps(first: 1000, where: {timestamp_gte: ${stateTime}}, orderBy: timestamp, orderDirection: asc) {
								transaction {
									id  
									blockNumber
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
						}
					`,
        });

        const events: Array<TradingEvent> = UniswapHelper.transformSubgraphSwapEvent(config, response.data.data.swaps);
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
                  ...event,
                },
              },
              upsert: true,
            },
          });
        }

        if (operations.length > 0) {
          const collections = await this.providers.mongodb.requireCollections();
          await collections.tradingActionsCollection.bulkWrite(operations);
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

        stateTime = events.length > 0 ? events[events.length - 1].timestamp : stateTime + 1;

        const endExeTime = Math.floor(new Date().getTime() / 1000);
        const elapsed = endExeTime - startExeTime;
        logger.onInfo({
          service: this.name,
          message: 'got subgraph swap events',
          props: {
            chain: config.chain,
            protocol: config.protocol,
            subgraph: config.endpoint,
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
            chain: config.chain,
            protocol: config.protocol,
            subgraph: config.endpoint,
          },
          error: e,
        });
        await sleep(5);
      }
    }
  }
}
