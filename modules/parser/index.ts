import Web3 from 'web3';

import { ParserVersion } from '../../configs';
import EnvConfig from '../../configs/envConfig';
import { normalizeAddress } from '../../lib/helper';
import { Transaction, TransactionAction, TransactionTransfer } from '../../types/domains';
import { GlobalProviders, IAdapter, IParserProvider, ITransferParser } from '../../types/namespaces';
import { ParseTransactionOptions } from '../../types/options';
import { getAdapters } from '../adapters';
import { TransferParser } from './transfer';

export class ParserProvider implements IParserProvider {
  public readonly name: string = 'parser';

  public providers: GlobalProviders | null;
  public adapters: Array<IAdapter>;
  public transferParser: ITransferParser;

  constructor(providers: GlobalProviders | null) {
    this.providers = providers;

    this.adapters = getAdapters(this.providers);
    this.transferParser = new TransferParser(this.providers);
  }

  public async parseTransaction(options: ParseTransactionOptions): Promise<Array<Transaction>> {
    // if (this.providers && !options.force) {
    //   const collections: MongoCollections = await this.providers.mongodb.requireCollections();
    //
    //   // query previous parsing data from database
    //   const existedTransactions: Array<any> = await collections.transactionsCollection
    //     .find({ hash: options.hash, version: ParserVersion })
    //     .toArray();
    //   if (existedTransactions.length > 0) {
    //     return existedTransactions as Array<Transaction>;
    //   }
    // }

    // get actions from transaction receipt
    const transactions: Array<Transaction> = [];
    for (const [, blockchain] of Object.entries(EnvConfig.blockchains)) {
      const web3 = new Web3(blockchain.nodeRpc);

      try {
        const tx = await web3.eth.getTransaction(options.hash);
        const block = await web3.eth.getBlock(Number(tx.blockNumber), false);
        const receipt = await web3.eth.getTransactionReceipt(options.hash);

        const transaction: Transaction = {
          chain: blockchain.name,
          hash: options.hash,
          input: tx.input,
          timestamp: Number(block.timestamp),
          status: receipt.status,
          version: ParserVersion,
          from: receipt.from ? normalizeAddress(receipt.from) : '',
          to: receipt.to ? normalizeAddress(receipt.to) : '',
          actions: [],
          transfers: [],
        };

        // for every log, we try to found the signature
        for (const log of receipt.logs) {
          // we parse token transfer if have
          const transfer: TransactionTransfer | null = await this.transferParser.tryParsingTransfers({
            chain: blockchain.name,
            address: normalizeAddress(log.address),
            topics: log.topics,
            data: log.data,
          });

          if (transfer) {
            transaction.transfers.push(transfer);

            // its a token transfer, ignore adapter parsers
            continue;
          }

          // now we try to pass log into adapters to get readable event data
          for (const adapter of this.adapters) {
            if (adapter.supportedSignature(log.topics[0])) {
              const action: TransactionAction | null = await adapter.tryParsingActions({
                chain: blockchain.name,
                sender: normalizeAddress(receipt.from),
                address: normalizeAddress(log.address),
                topics: log.topics,
                data: log.data,
              });
              if (action) {
                transaction.actions.push(action);
              }
            }
          }
        }

        transactions.push(transaction);
      } catch (e: any) {}
    }

    // save transactions info database
    // if (this.providers && !options.force) {
    //   const collections: MongoCollections = await this.providers.mongodb.requireCollections();
    //   const operations: Array<any> = [];
    //   for (const transaction of transactions) {
    //     operations.push({
    //       updateOne: {
    //         filter: {
    //           chain: transaction.chain,
    //           hash: transaction.hash,
    //         },
    //         update: {
    //           $set: {
    //             ...transaction,
    //           },
    //         },
    //         upsert: true,
    //       },
    //     });
    //   }
    //
    //   if (operations.length > 0) {
    //     await collections.transactionsCollection.bulkWrite(operations);
    //   }
    // }

    return transactions;
  }
}
