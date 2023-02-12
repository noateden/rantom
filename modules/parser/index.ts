import Web3 from 'web3';

import { ParserVersion } from '../../configs';
import EnvConfig from '../../configs/envConfig';
import { normalizeAddress } from '../../lib/helper';
import { MongoCollections, Transaction, TransactionAction, TransactionTransfer } from '../../types/domains';
import { GlobalProviders, IAdapter, ILogParser, IParserProvider, ITransferParser } from '../../types/namespaces';
import { ParseTransactionOptions } from '../../types/options';
import { getAdapters } from '../adapters';
import { LogParser } from './log';
import { TransferParser } from './transfer';

export class ParserProvider implements IParserProvider {
  public readonly name: string = 'parser';

  public providers: GlobalProviders | null;
  public adapters: Array<IAdapter>;
  public transferParser: ITransferParser;
  public logParser: ILogParser;

  constructor(providers: GlobalProviders | null) {
    this.providers = providers;

    this.adapters = getAdapters(this.providers);
    this.transferParser = new TransferParser(this.providers);
    this.logParser = new LogParser();
  }

  public async parseTransaction(options: ParseTransactionOptions): Promise<Array<Transaction>> {
    if (this.providers) {
      const collections: MongoCollections = await this.providers.mongodb.requireCollections();

      // query previous parsing data from database
      const existedTransactions: Array<any> = await collections.transactionsCollection
        .find({ hash: options.hash, version: ParserVersion })
        .toArray();
      if (existedTransactions.length > 0) {
        return existedTransactions as Array<Transaction>;
      }
    }

    // get actions from transaction receipt
    const transactions: Array<Transaction> = [];
    for (const [, blockchain] of Object.entries(EnvConfig.blockchains)) {
      const transaction: Transaction = {
        chain: blockchain.name,
        hash: options.hash,
        version: ParserVersion,
        actions: [],
        transfers: [],
      };

      const web3 = new Web3(blockchain.nodeRpcs[0]);
      const receipt = await web3.eth.getTransactionReceipt(options.hash);

      // for every log, we try to found the signature
      for (const log of receipt.logs) {
        const logDecodedData = await this.logParser.tryParsingLogs({
          topics: log.topics,
          data: log.data,
        });

        // we parse token transfer if have
        const transfer: TransactionTransfer | null = await this.transferParser.tryParsingTransfers({
          chain: blockchain.name,
          address: normalizeAddress(log.address),
          signature: log.topics[0],
          event: logDecodedData,
        });

        if (transfer) {
          transaction.transfers.push(transfer);

          // its a token transfer, ignore adapter parsers
          continue;
        }

        if (logDecodedData) {
          // we found the event, now we try to pass event into adapters to get readable event data
          for (const adapter of this.adapters) {
            const action: TransactionAction | null = await adapter.tryParsingActions({
              chain: blockchain.name,
              sender: normalizeAddress(receipt.from),
              address: normalizeAddress(log.address),
              signature: log.topics[0],
              event: logDecodedData,
            });
            if (action) {
              transaction.actions.push(action);
            }
          }
        }
      }

      if (transaction.actions.length > 0 || transaction.transfers.length > 0) {
        transactions.push(transaction);
      }
    }

    // save transactions info database
    if (this.providers) {
      const collections: MongoCollections = await this.providers.mongodb.requireCollections();
      const operations: Array<any> = [];
      for (const transaction of transactions) {
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
      }

      if (operations.length > 0) {
        await collections.transactionsCollection.bulkWrite(operations);
      }
    }

    return transactions;
  }
}
