import Web3 from 'web3';

import { WorkerGenesisBlocks } from '../../configs';
import { BlockSubgraphs } from '../../configs/constants';
import EnvConfig from '../../configs/envConfig';
import { normalizeAddress, sleep } from '../../lib/helper';
import logger from '../../lib/logger';
import { getBlockTimestamps } from '../../lib/subgraph';
import { Contract } from '../../types/configs';
import { TransactionAction } from '../../types/domains';
import { GlobalProviders, IAdapter, IContractWorker } from '../../types/namespaces';
import { WorkerRunOptions } from '../../types/options';
import { getAdapters } from '../adapters';

export class ContractWorker implements IContractWorker {
  public readonly name: string = 'worker.contract';
  public readonly providers: GlobalProviders;
  public readonly contracts: Array<Contract>;

  protected readonly adapters: Array<IAdapter>;

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    this.providers = providers;
    this.contracts = contracts;

    this.adapters = getAdapters(providers);
  }

  protected async indexContract(contract: Contract, options: WorkerRunOptions): Promise<void> {
    if (!contract.topics || contract.topics.length === 0) return;

    const { fromBlock } = options;

    const web3 = new Web3(EnvConfig.blockchains[contract.chain].nodeRpc);
    const stateKey = `contract-index-${contract.chain}-${normalizeAddress(contract.address)}`;
    const collections = await this.providers.mongodb.requireCollections();

    let startBlock = fromBlock;
    const latestBlock = await web3.eth.getBlockNumber();

    if (startBlock === 0) {
      const states = await collections.statesCollection.find({ name: stateKey }).limit(1).toArray();
      if (states.length > 0) {
        startBlock = states[0].blockNumber;
      } else {
        startBlock = WorkerGenesisBlocks[contract.chain];
      }
    }

    logger.onInfo({
      service: this.name,
      message: 'start contract worker',
      props: {
        chain: contract.chain,
        protocol: contract.protocol,
        contract: normalizeAddress(contract.address),
        topics: contract.topics.length,
        fromBlock: startBlock,
        toBlock: latestBlock,
      },
    });

    const RANGE = 2000;
    while (startBlock <= latestBlock) {
      const startExeTime = Math.floor(new Date().getTime() / 1000);

      const toBlock = startBlock + RANGE > latestBlock ? latestBlock : startBlock + RANGE;

      const blockTimes = await getBlockTimestamps({
        endpoint: BlockSubgraphs[contract.chain],
        fromBlock: startBlock,
        numberOfBlocks: RANGE,
      });

      let logs: Array<any> = [];
      try {
        for (const topic of contract.topics) {
          logs = logs.concat(
            await web3.eth.getPastLogs({
              address: normalizeAddress(contract.address),
              fromBlock: startBlock,
              toBlock,
              topics: [topic],
            })
          );
        }
      } catch (e: any) {
        logger.onWarn({
          service: this.name,
          message: 'failed to get logs by topic',
          props: {
            chain: contract.chain,
            protocol: contract.protocol,
            contract: normalizeAddress(contract.address),
            error: e.message,
          },
        });

        // will retry to get logs at this block
        await sleep(60);
        continue;
      }

      const operations: Array<any> = [];
      for (const log of logs) {
        for (const adapter of this.adapters) {
          if (adapter.supportedSignature(log.topics[0])) {
            const action: TransactionAction | null = await adapter.tryParsingActions({
              chain: contract.chain,
              sender: '',
              address: normalizeAddress(log.address),
              hash: log.transactionHash,
              topics: log.topics,
              data: log.data,
            });
            if (action) {
              let timestamp =
                blockTimes && blockTimes[Number(log.blockNumber)]
                  ? Number(blockTimes[Number(log.blockNumber)].timestamp)
                  : null;
              if (!timestamp) {
                timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, log.blockNumber);
              }

              operations.push({
                updateOne: {
                  filter: {
                    chain: contract.chain,
                    contract: normalizeAddress(log.address),
                    transactionHash: log.transactionHash,
                    logIndex: log.logIndex,
                  },
                  update: {
                    $set: {
                      chain: contract.chain,
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

              break;
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
        message: 'got contract logs',
        props: {
          chain: contract.chain,
          protocol: contract.protocol,
          contract: normalizeAddress(contract.address),
          logs: logs.length,
          actions: operations.length,
          toBlock: toBlock,
          elapsed: `${elapsed}s`,
        },
      });

      startBlock = toBlock + 1;
    }
  }

  public async run(options: WorkerRunOptions): Promise<void> {
    for (const contract of this.contracts) {
      await this.indexContract(contract, options);
    }
  }
}
