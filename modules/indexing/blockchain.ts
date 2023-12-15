import { DefaultQueryLogsBlockRange, DefaultQueryLogsRanges } from '../../configs';
import EnvConfig from '../../configs/envConfig';
import logger from '../../lib/logger';
import { queryBlockTimestamps } from '../../lib/subsgraph';
import { sleep } from '../../lib/utils';
import { ContractConfig } from '../../types/configs';
import { TransactionAction } from '../../types/domains';
import { ContextServices, IAdapter, IBlockchainIndexing } from '../../types/namespaces';
import { BlockchainIndexingRunOptions } from '../../types/options';
import { getAdapters } from '../adapters';

export default class BlockchainIndexing implements IBlockchainIndexing {
  public readonly name: string = 'indexing.blockchain';
  public readonly services: ContextServices;

  protected readonly contracts: Array<ContractConfig> = [];
  protected readonly adapters: { [key: string]: IAdapter } = {};

  constructor(services: ContextServices) {
    this.services = services;

    this.adapters = getAdapters(services);
  }

  public async run(options: BlockchainIndexingRunOptions): Promise<void> {
    const { chain, fromBlock } = options;

    if (!EnvConfig.blockchains[chain]) {
      return;
    }

    let startBlock = fromBlock;
    const stateKey = `indexing-chain-${chain}`;
    const state = await this.services.database.find({
      collection: EnvConfig.mongodb.collections.states,
      query: {
        name: stateKey,
      },
    });
    if (state) {
      if (fromBlock < state.blockNumber) {
        startBlock = state.blockNumber;
      }
    }

    const web3 = await this.services.blockchain.getProvider(chain);
    const latestBlock = Number(await web3.eth.getBlockNumber());

    if (startBlock === 0) {
      // sync from latest 1000 blocks
      startBlock = latestBlock - 1000;
    }

    logger.info('start index blockchain data', {
      service: this.name,
      chain: chain,
      fromBlock: startBlock,
      toBlock: latestBlock,
    });

    const blockRange = DefaultQueryLogsRanges[chain] ? DefaultQueryLogsRanges[chain] : DefaultQueryLogsBlockRange;
    while (startBlock <= latestBlock) {
      const startExeTime = Math.floor(new Date().getTime() / 1000);

      const toBlock = startBlock + blockRange > latestBlock ? latestBlock : startBlock + blockRange;
      const logs: Array<any> = await web3.eth.getPastLogs({
        fromBlock: startBlock,
        toBlock,
      });

      const blocktimes = await queryBlockTimestamps(
        EnvConfig.blockchains[chain].blockSubgraph as string,
        startBlock,
        toBlock
      );

      if (blocktimes) {
        const actionOperations: Array<any> = [];
        for (const log of logs) {
          const signature = log.topics[0];

          // first of all, we process logs by adapter hooks
          for (const [, adapter] of Object.entries(this.adapters)) {
            await adapter.handleEventLog({
              chain: chain,
              log,
            });
          }

          // process actions
          for (const [, adapter] of Object.entries(this.adapters)) {
            if (adapter.supportedSignature(signature)) {
              const actions: Array<TransactionAction> = await adapter.parseEventLog({
                chain: chain,
                log: log,
                allLogs: logs.filter((item) => item.transactionHash === log.transactionHash),
              });

              for (const action of actions) {
                actionOperations.push({
                  updateOne: {
                    filter: {
                      chain: chain,
                      transactionHash: action.transactionHash,
                      logIndex: action.logIndex,
                    },
                    update: {
                      $set: {
                        ...action,
                        timestamp: blocktimes[action.blockNumber] ? blocktimes[action.blockNumber] : 0,
                      },
                    },
                    upsert: true,
                  },
                });
              }
            }
          }
        }

        await this.services.database.bulkWrite({
          collection: EnvConfig.mongodb.collections.actions,
          operations: actionOperations,
        });

        await this.services.database.update({
          collection: EnvConfig.mongodb.collections.states,
          keys: {
            name: stateKey,
          },
          updates: {
            name: stateKey,
            blockNumber: toBlock,
          },
          upsert: true,
        });

        const endExeTime = Math.floor(new Date().getTime() / 1000);
        const elapsed = endExeTime - startExeTime;

        logger.info('got blockchain data', {
          service: this.name,
          chain: chain,
          fromBlock: startBlock,
          toBlock: toBlock,
          logs: logs.length,
          actions: actionOperations.length,
          elapses: `${elapsed}s`,
        });

        startBlock += blockRange;
      } else {
        logger.warn('failed to get block timestamp', {
          service: this.name,
          chain: chain,
          fromBlock: startBlock,
          toBlock: toBlock,
        });
        await sleep(5);
      }
    }
  }
}
