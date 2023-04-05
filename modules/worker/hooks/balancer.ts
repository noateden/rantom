import axios from 'axios';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { AddressZero } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { BalancerConfigs } from '../../../configs/protocols';
import { getTimestamp, normalizeAddress, sleep } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { Contract, ProtocolSubgraphConfig } from '../../../types/configs';
import { KnownAction, MongoCollections, TradingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { WorkerRunOptions } from '../../../types/options';
import { BalancerAdapter } from '../../adapters/balancer/balancer';
import { BalancerHelper } from '../../adapters/balancer/helper';
import { TradingWorkerHook } from '../extends/trading';
import { SubgraphWorker } from '../subgraph';

export class BalancerWorkerHook extends TradingWorkerHook {
  public readonly name: string = 'worker.balancer';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async parseEvent(contract: Contract, event: any, options: any): Promise<TradingEvent | null> {
    let timestamp =
      options && options.blockTimes && options.blockTimes[event.blockNumber.toString()]
        ? Number(options.blockTimes[event.blockNumber.toString()].timestamp)
        : null;
    if (!timestamp) {
      timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, event.blockNumber);
    }

    const logIndex = event.logIndex;
    const transactionHash = event.transactionHash;
    const blockNumber = event.blockNumber;

    const web3 = new Web3(EnvConfig.blockchains[contract.chain].nodeRpc);
    const receipt = await web3.eth.getTransactionReceipt(transactionHash);
    const adapter = new BalancerAdapter(BalancerConfigs, this.providers);
    const action = await adapter.tryParsingActions({
      chain: contract.chain,
      sender: receipt ? receipt.from : AddressZero, // don't use this field
      address: contract.address,
      data: event.raw.data,
      topics: event.raw.topics,
    });

    if (action !== null) {
      return {
        chain: contract.chain,
        contract: normalizeAddress(contract.address),
        transactionHash: transactionHash,
        logIndex: logIndex,
        protocol: contract.protocol,
        timestamp,
        blockNumber: blockNumber,
        action: action.action as KnownAction,
        tokens: action.tokens,
        amounts: action.tokenAmounts.map((amount, index) => {
          return new BigNumber(amount)
            .multipliedBy(new BigNumber(10).pow((action as any).tokens[index].decimals))
            .toString(10);
        }),
        caller: action.addresses.length > 0 ? action.addresses[1] : action.addresses[0],
        user: action.addresses[0],
        addition: action.addition ? action.addition : undefined,
      };
    }

    return null;
  }
}

export class BalancerSubgraphWorkerHook extends SubgraphWorker {
  public readonly name: string = 'worker.balancer';

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
						}
					`,
        });

        const events: Array<TradingEvent> = BalancerHelper.transformSubgraphSwapEvent(config, response.data.data.swaps);
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
