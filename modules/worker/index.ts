import Web3 from 'web3';

import EnvConfig from '../../configs/envConfig';
import { sleep } from '../../lib/helper';
import logger from '../../lib/logger';
import { Transaction } from '../../types/domains';
import { GlobalProviders, IParserProvider, IWorkerProvider } from '../../types/namespaces';
import { WorkerRunOptions } from '../../types/options';

export class WorkerProvider implements IWorkerProvider {
  public readonly name: string = 'worker';
  public parser: IParserProvider;
  public providers: GlobalProviders | null;

  constructor(parser: IParserProvider, providers: GlobalProviders) {
    this.parser = parser;
    this.providers = providers;
  }

  public async run(options: WorkerRunOptions) {
    const nodeRpc = EnvConfig.blockchains[options.chain].nodeRpc;
    const web3 = new Web3(nodeRpc);

    logger.onInfo({
      service: this.name,
      message: 'started blockchain worker',
      props: {
        chain: options.chain,
        rpc: nodeRpc,
      },
    });

    while (true) {
      const tip = await web3.eth.getBlockNumber();
      const block = await web3.eth.getBlock(tip, false);

      if (block) {
        const operations: Array<any> = [];
        for (const hash of block.transactions) {
          const transactions: Array<Transaction> = await this.parser.parseTransaction({ hash: hash, force: true });
          for (const transaction of transactions) {
            if (transaction.actions.length > 0) {
              operations.push({
                updateOne: {
                  filter: {
                    chain: transaction.chain,
                    hash: transaction.hash,
                  },
                  update: {
                    $set: {
                      ...transaction,
                    },
                  },
                  upsert: true,
                },
              });

              logger.onInfo({
                service: this.name,
                message: 'parsing transaction',
                props: {
                  chain: options.chain,
                  hash: hash,
                },
              });
            }
          }
        }

        if (this.providers && operations.length > 0) {
          const collections = await this.providers.mongodb.requireCollections();
          await collections.transactionsCollection.bulkWrite(operations);
        }

        logger.onInfo({
          service: this.name,
          message: 'updated latest block',
          props: {
            chain: options.chain,
            block: tip,
            updatedTxs: operations.length,
          },
        });
      } else {
        logger.onError({
          service: this.name,
          message: 'failed to get block data',
          props: {
            chain: options.chain,
            block: tip,
          },
        });
      }

      await sleep(60);
    }
  }
}
