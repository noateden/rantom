import { Collection } from 'mongodb';

import { EventMapping, ProtocolConfig, Token } from './configs';
import { MongoCollections, Transaction, TransactionAction, TransactionTransfer } from './domains';
import {
  AdapterParseLogOptions,
  ExploreLatestTransactionsOptions,
  ParseTransactionOptions,
  TransferParseLogOptions,
} from './options';

export interface IProvider {
  name: string;
}

export interface IMongodbProvider extends IProvider {
  connect: (url: string, name: string) => Promise<void>;
  getCollection: (name: string) => Promise<Collection>;
  requireCollections: () => Promise<MongoCollections>;
}

export interface ISentryProvider extends IProvider {
  capture: (e: Error) => void;
}

export interface IWeb3HelperProvider extends IProvider {
  getErc20Metadata: (chain: string, tokenAddress: string) => Promise<Token | null>;
  getErc721Metadata: (chain: string, tokenAddress: string) => Promise<Token | null>;
}

export interface GlobalProviders {
  mongodb: IMongodbProvider;
  sentry: ISentryProvider;
  web3Helper: IWeb3HelperProvider;
}

export interface IAdapter extends IProvider {
  config: ProtocolConfig;
  providers: GlobalProviders | null;
  eventMappings: { [key: string]: EventMapping };

  supportedSignature(signature: string): boolean;
  tryParsingActions: (options: AdapterParseLogOptions) => Promise<TransactionAction | null>;
}

export interface ITransferParser extends IProvider {
  providers: GlobalProviders | null;

  tryParsingTransfers: (options: TransferParseLogOptions) => Promise<TransactionTransfer | null>;
}

export interface IParserProvider extends IProvider {
  providers: GlobalProviders | null;
  adapters: Array<IAdapter>;
  transferParser: ITransferParser;

  parseTransaction: (options: ParseTransactionOptions) => Promise<Array<Transaction>>;
}

export interface IExplorerProvider extends IProvider {
  parser: IParserProvider;

  exploreLatestTransactions(options: ExploreLatestTransactionsOptions): Promise<Array<Transaction>>;
}
