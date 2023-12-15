import EnvConfig from '../../configs/envConfig';
import { TransactionAction } from '../../types/domains';
import { ContextServices, IAdapter, ITransactionParser, ITransferAdapter } from '../../types/namespaces';
import { ParseTransactionOptions } from '../../types/options';
import { getAdapters } from '../adapters';
import TransferAdapter from '../adapters/transfer/transfer';

export default class TransactionParser implements ITransactionParser {
  public readonly name: string = 'parser';
  public readonly services: ContextServices;

  protected readonly adapters: { [key: string]: IAdapter };
  protected readonly transferAdapter: ITransferAdapter;

  constructor(services: ContextServices) {
    this.services = services;

    // setup adapters
    this.adapters = getAdapters(services);
    this.transferAdapter = new TransferAdapter(services);
  }

  public async fetchTransaction(options: ParseTransactionOptions): Promise<Array<any>> {
    const transactions: Array<any> = [];

    const documents = await this.services.database.query({
      collection: EnvConfig.mongodb.collections.transactions,
      query: {
        hash: options.hash,
      },
    });
    if (documents.length > 0) {
      for (const document of documents) {
        delete document._id;
        transactions.push(document);
      }

      return transactions;
    }

    for (const [chain] of Object.entries(EnvConfig.blockchains)) {
      if (!options.chain || options.chain === chain) {
        let transaction = await this.services.blockchain.getTransaction({
          chain: chain,
          hash: options.hash,
        });
        if (transaction) {
          transaction.chain = chain;

          const receipt = await this.services.blockchain.getTransactionReceipt({
            chain: chain,
            hash: options.hash,
          });

          if (receipt) {
            transaction.receipt = receipt;
            const block = await this.services.blockchain.getBlock(chain, Number(transaction.blockNumber));
            if (block) {
              transaction.block = block;
            }
          }
          transactions.push(transaction);
        }
      }
    }

    for (const transaction of transactions) {
      await this.services.database.update({
        collection: EnvConfig.mongodb.collections.transactions,
        keys: {
          chain: transaction.chain,
          hash: transaction.hash,
        },
        updates: {
          ...transaction,
        },
        upsert: true,
      });
    }

    return transactions;
  }

  public async parseTransaction(options: ParseTransactionOptions): Promise<Array<any>> {
    const parsedTransactions: Array<any> = [];

    const transactions = await this.fetchTransaction(options);
    for (const transaction of transactions) {
      const parsedTransaction = {
        ...transaction,
        actions: [],
        transfers: [],
        inputDecoded: null,
        addressLabels: {},
      };

      // parse transaction input
      for (const [, adapter] of Object.entries(this.adapters)) {
        const inputActions = await adapter.parseInputData({
          chain: transaction.chain,
          log: transaction.receipt.logs[0], // don't care
          allLogs: transaction.receipt.logs,
          transaction: transaction,
        });

        for (const inputAction of inputActions) {
          parsedTransaction.actions.push(inputAction);
        }

        if (inputActions.length > 0) {
          // stop going to the next adapter
          break;
        }
      }

      // parse transaction receipt logs
      for (const log of transaction.receipt.logs) {
        if (this.transferAdapter.supportedSignature(log.topics[0])) {
          const tokenTransfer = await this.transferAdapter.parseEventLog({
            chain: transaction.chain,
            log: log,
            allLogs: transaction.receipt.logs,
            transaction: transaction,
          });

          parsedTransaction.transfers.push(tokenTransfer);
        }

        for (const [, adapter] of Object.entries(this.adapters)) {
          if (adapter.supportedSignature(log.topics[0])) {
            const actions: Array<TransactionAction> = await adapter.parseEventLog({
              chain: transaction.chain,
              log: log,
              allLogs: transaction.receipt.logs,
              transaction: transaction,
              onchain: true,
            });

            for (const action of actions) {
              parsedTransaction.actions.push(action);
            }

            if (actions.length > 0) {
              // stop going to the next adapter
              break;
            }
          }
        }
      }

      parsedTransactions.push(parsedTransaction);
    }

    return parsedTransactions;
  }
}
