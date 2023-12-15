import { DefaultQueryLogsBlockRangeSingleContract } from '../../configs';
import EnvConfig from '../../configs/envConfig';
import { ProtocolConfigs } from '../../configs/protocols';
import logger from '../../lib/logger';
import { queryBlockTimestamps } from '../../lib/subsgraph';
import { sleep } from '../../lib/utils';
import { ContractConfig, ProtocolConfig } from '../../types/configs';
import { TransactionAction } from '../../types/domains';
import { ContextServices, IAdapter, IProtocolIndexing } from '../../types/namespaces';
import { ProtocolIndexingRunOptions } from '../../types/options';
import { getAdapters } from '../adapters';

// when onboard a new protocol, we need to sync historical data
// this indexing helps to sync historical data
// using the corresponding adapter
export default class ProtocolIndexing implements IProtocolIndexing {
  public readonly name: string = 'indexing.protocol';
  public readonly services: ContextServices;

  protected readonly adapters: { [key: string]: IAdapter } = {};

  constructor(services: ContextServices) {
    this.services = services;

    this.adapters = getAdapters(services);
  }

  public async run(options: ProtocolIndexingRunOptions): Promise<void> {
    const config: ProtocolConfig | undefined = ProtocolConfigs[options.protocol];
    if (!config) {
      logger.debug('ignore to run protocol indexing service', {
        service: this.name,
        protocol: options.protocol,
        reason: 'config not found',
      });
      return;
    }

    const adapter: IAdapter = this.adapters[options.protocol];
    if (!adapter) {
      logger.debug('ignore to run protocol indexing service', {
        service: this.name,
        protocol: options.protocol,
        reason: 'adapter not found',
      });
      return;
    }

    const contractConfigs: Array<ContractConfig> = config.contracts
      .filter((item) => !options.chain || options.chain === item.chain)
      .filter((item) => !options.contract || options.contract === item.address);

    for (const contractConfig of contractConfigs) {
      if (!contractConfig.topics) {
        continue;
      }

      let startBlock = contractConfig.birthblock ? contractConfig.birthblock : 0;
      if (options.fromBlock) {
        startBlock = options.fromBlock;
      }

      const stateKey = `indexing-historical-${options.protocol}-contract-${contractConfig.chain}-${contractConfig.address}`;

      if (!options.fromBlock) {
        const state = await this.services.database.find({
          collection: EnvConfig.mongodb.collections.states,
          query: {
            name: stateKey,
          },
        });
        if (state) {
          startBlock = Number(state.blockNumber);
        }
      }

      const web3 = this.services.blockchain.getProvider(contractConfig.chain);
      const latestBlock = await web3.eth.getBlockNumber();

      logger.info('start to get contract historical data', {
        service: this.name,
        protocol: options.protocol,
        contract: contractConfig.address,
        topics: contractConfig.topics.length,
        fromBlock: startBlock,
        toBlock: Number(latestBlock),
      });

      while (startBlock < Number(latestBlock)) {
        const startExeTime = Math.floor(new Date().getTime() / 1000);

        const toBlock =
          startBlock + DefaultQueryLogsBlockRangeSingleContract > latestBlock
            ? latestBlock
            : startBlock + DefaultQueryLogsBlockRangeSingleContract;

        const blocktimes = await queryBlockTimestamps(
          EnvConfig.blockchains[contractConfig.chain].blockSubgraph as string,
          startBlock,
          toBlock
        );

        if (blocktimes) {
          let logs: Array<any> = [];
          for (const topic0 of contractConfig.topics) {
            const rawlogs = await web3.eth.getPastLogs({
              address: contractConfig.address,
              fromBlock: startBlock,
              toBlock: toBlock,
              topics: [topic0],
            });
            logs = logs.concat(rawlogs);
          }

          let actions: Array<TransactionAction> = [];
          for (const log of logs) {
            const transaction = await this.services.blockchain.getTransaction({
              chain: contractConfig.chain,
              hash: log.transactionHash,
            });

            actions = actions.concat(
              await adapter.parseEventLog({
                chain: contractConfig.chain,
                log: log,
                allLogs: logs.filter((item) => item.transactionHash === log.transactionHash),
                transaction: transaction,
              })
            );
          }

          const operations: Array<any> = [];
          for (const action of actions) {
            operations.push({
              updateOne: {
                filter: {
                  chain: contractConfig.chain,
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

          await this.services.database.bulkWrite({
            collection: EnvConfig.mongodb.collections.actions,
            operations: operations,
          });

          await this.services.database.update({
            collection: EnvConfig.mongodb.collections.states,
            keys: {
              name: stateKey,
            },
            updates: {
              name: stateKey,
              blockNumber: startBlock,
            },
            upsert: true,
          });

          const endExeTime = Math.floor(new Date().getTime() / 1000);
          const elapsed = endExeTime - startExeTime;

          logger.info('got contract historical data', {
            service: this.name,
            chain: contractConfig.chain,
            fromBlock: startBlock,
            toBlock: toBlock,
            actions: actions.length,
            elapses: `${elapsed}s`,
          });

          startBlock += DefaultQueryLogsBlockRangeSingleContract;
        } else {
          logger.warn('failed to get block timestamp', {
            service: this.name,
            chain: contractConfig.chain,
            fromBlock: startBlock,
            toBlock: toBlock,
          });
          await sleep(5);
        }
      }
    }
  }
}
