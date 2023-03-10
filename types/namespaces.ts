import { Collection } from 'mongodb';

import { Contract, EventMapping, ProtocolConfig, Token } from './configs';
import { MongoCollections, NonFungibleTokenData, Transaction, TransactionAction, TransactionTransfer } from './domains';
import { AdapterParseLogOptions, ParseTransactionOptions, TransferParseLogOptions, WorkerRunOptions } from './options';

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
  getBlockTime: (chain: string, blockNumber: number) => Promise<number>;
  getErc20Metadata: (chain: string, tokenAddress: string) => Promise<Token | null>;
  getErc721Metadata: (chain: string, tokenAddress: string) => Promise<Token | null>;
  getNonFungibleTokenData: (
    chain: string,
    tokenAddress: string,
    tokenId: string
  ) => Promise<NonFungibleTokenData | null>;
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

export interface IContractWorker extends IProvider {
  contracts: Array<Contract>;
  providers: GlobalProviders;

  // run indexer
  run: (options: WorkerRunOptions) => Promise<void>;
  processEvents: (contract: Contract, events: Array<any>) => Promise<any>;
}
