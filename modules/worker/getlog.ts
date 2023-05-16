import Web3 from 'web3';

import { WorkerGenesisBlocks } from '../../configs';
import { BlockSubgraphs } from '../../configs/constants';
import EnvConfig from '../../configs/envConfig';
import { ContractWhitelistedGetLogs } from '../../configs/logs';
import { normalizeAddress } from '../../lib/helper';
import logger from '../../lib/logger';
import { getBlockTimestamps } from '../../lib/subgraph';
import { TransactionAction } from '../../types/domains';
import { GlobalProviders, IAdapter, IWorkerProvider } from '../../types/namespaces';
import { WorkerRunOptions } from '../../types/options';
import { getAdapters } from '../adapters';

export class GetlogWorker implements IWorkerProvider {
  public readonly name: string = 'worker.getlog';
  public readonly providers: GlobalProviders;

  private readonly adapters: Array<IAdapter>;

  constructor(providers: GlobalProviders) {
    this.providers = providers;

    this.adapters = getAdapters(providers);
  }

  // check where this contract is whitelisted or not
  private async shouldGetThisLog(chain: string, log: any): Promise<boolean> {
    return ContractWhitelistedGetLogs[chain].indexOf(normalizeAddress(log.address)) !== -1;
  }

  public async run(options: WorkerRunOptions): Promise<void> {
    const { fromBlock } = options;

    const chain = options.chain ? options.chain : 'ethereum';
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const stateKey = `logs-index-${chain}`;
    const collections = await this.providers.mongodb.requireCollections();

    let startBlock = fromBlock;
    const latestBlock = await web3.eth.getBlockNumber();

    if (startBlock === 0) {
      const states = await collections.statesCollection.find({ name: stateKey }).limit(1).toArray();
      if (states.length > 0) {
        startBlock = states[0].blockNumber;
      } else {
        startBlock = WorkerGenesisBlocks[chain];
      }
    }

    logger.onInfo({
      service: this.name,
      message: 'start get logs worker',
      props: {
        chain,
        fromBlock: startBlock,
        toBlock: latestBlock,
      },
    });

    const RANGE = 100;
    while (startBlock <= latestBlock) {
      const startExeTime = Math.floor(new Date().getTime() / 1000);

      const toBlock = startBlock + RANGE > latestBlock ? latestBlock : startBlock + RANGE;
      const logs = await web3.eth.getPastLogs({
        fromBlock: startBlock,
        toBlock,
      });

      const blockTimes = await getBlockTimestamps({
        endpoint: BlockSubgraphs[chain],
        fromBlock: startBlock,
        numberOfBlocks: RANGE,
      });

      const operations: Array<any> = [];
      for (const log of logs) {
        // now we try to pass log into adapters to get readable event data
        for (const adapter of this.adapters) {
          if (adapter.supportedSignature(log.topics[0])) {
            // only sync whitelisted contracts
            if (await this.shouldGetThisLog(chain, log)) {
              try {
                const action: TransactionAction | null = await adapter.tryParsingActions({
                  chain: chain,
                  sender: '', // adapter should get sender address
                  address: normalizeAddress(log.address),
                  hash: log.transactionHash,
                  topics: log.topics,
                  data: log.data,
                  blockNumber: log.blockNumber,
                });
                if (action) {
                  let timestamp =
                    blockTimes && blockTimes[Number(log.blockNumber)]
                      ? Number(blockTimes[Number(log.blockNumber)].timestamp)
                      : null;
                  if (!timestamp) {
                    timestamp = await this.providers.web3Helper.getBlockTime(chain, log.blockNumber);
                  }

                  operations.push({
                    updateOne: {
                      filter: {
                        chain: chain,
                        contract: normalizeAddress(log.address),
                        transactionHash: log.transactionHash,
                        logIndex: log.logIndex,
                      },
                      update: {
                        $set: {
                          chain: chain,
                          contract: normalizeAddress(log.address),
                          transactionHash: log.transactionHash,
                          logIndex: log.logIndex,
                          blockNumber: log.blockNumber,
                          timestamp: timestamp,

                          protocol: action.protocol,
                          action: action.action,
                          addresses: action.addresses,
                          tokens: action.tokens,
                          amounts: action.tokenAmounts,
                          addition: action.addition,
                        },
                      },
                      upsert: true,
                    },
                  });
                }
              } catch (e: any) {
                logger.onError({
                  service: this.name,
                  message: 'failed to parse transaction',
                  props: {
                    chain: chain,
                    tx: log.transactionHash,
                    signature: log.topics[0],
                  },
                  error: e,
                });

                if (this.providers) {
                  this.providers.sentry.capture(e);
                }
              }
            }
          }
        }
      }

      if (operations.length > 0) {
        await collections.logsCollection.bulkWrite(operations);
      }

      // save state if fromBlock === 0
      if (fromBlock === 0) {
        await collections.statesCollection.updateOne(
          {
            name: stateKey,
          },
          {
            $set: {
              name: stateKey,
              blockNumber: toBlock,
            },
          },
          { upsert: true }
        );
      }

      const endExeTime = Math.floor(new Date().getTime() / 1000);
      const elapsed = endExeTime - startExeTime;
      logger.onInfo({
        service: this.name,
        message: 'got block logs',
        props: {
          chain: chain,
          logs: logs.length,
          actions: operations.length,
          toBlock: toBlock,
          elapsed: `${elapsed}s`,
        },
      });

      startBlock = toBlock + 1;
    }
  }
}
