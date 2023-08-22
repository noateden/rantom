import Web3 from 'web3';

import { ParserVersion } from '../../configs';
import { AddressZero } from '../../configs/constants';
import EnvConfig from '../../configs/envConfig';
import { normalizeAddress } from '../../lib/helper';
import logger from '../../lib/logger';
import { Transaction, TransactionAction, TransactionFunction, TransactionTransfer } from '../../types/domains';
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
    // get actions from transaction receipt
    const transactions: Array<Transaction> = [];
    for (const [, blockchain] of Object.entries(EnvConfig.blockchains)) {
      const web3 = new Web3(blockchain.nodeRpc);

      let tx = null;
      try {
        tx = await web3.eth.getTransaction(options.hash);
      } catch (e: any) {}

      if (!tx) continue;

      try {
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
          functions: [],
          actions: [],
          transfers: [],
        };

        for (const adapter of this.adapters) {
          const decodedFunction: TransactionFunction | null = await adapter.tryParsingFunctionCallData({
            chain: blockchain.name,
            address: normalizeAddress(tx.to ? tx.to : AddressZero),
            input: tx.input,
            context: receipt,
          });
          if (decodedFunction) {
            transaction.functions.push(decodedFunction);
          }
        }

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
            transaction.transfers.push({
              ...transfer,
              logIndex: log.logIndex,
            });
          }

          // despite we detect this is a transfer event
          // we use transfer event to get more action on some protocols

          // now we try to pass log into adapters to get readable event data
          for (const adapter of this.adapters) {
            if (adapter.supportedSignature(log.topics[0])) {
              const options = {
                chain: blockchain.name,
                sender: normalizeAddress(receipt.from),
                to: normalizeAddress(receipt.to),
                address: normalizeAddress(log.address),
                hash: receipt.transactionHash,
                topics: log.topics,
                data: log.data,
                input: transaction.input,
                context: receipt,
              };

              const action: TransactionAction | null = await adapter.tryParsingActions(options);
              if (action) {
                transaction.actions.push({
                  ...action,
                  logIndex: log.logIndex,
                });
              }
            }
          }
        }

        for (const adapter of this.adapters) {
          const label = await adapter.tryParsingContractInfo({
            chain: blockchain.name,
            address: tx.to ? tx.to : AddressZero,
          });
          if (label) {
            transaction.addressesLabels = {
              [normalizeAddress(tx.to ? tx.to : AddressZero)]: label,
            };
            break;
          }
        }

        transactions.push(transaction);
      } catch (e: any) {
        logger.onError({
          service: this.name,
          message: 'failed to parse transaction',
          props: {
            chain: blockchain.name,
            rpc: blockchain.nodeRpc,
            hash: options.hash,
          },
          error: e,
        });

        if (this.providers) {
          this.providers.sentry.capture(e);
        }
      }
    }

    return transactions;
  }
}
