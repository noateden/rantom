import { Collection } from 'mongodb';

import {
  Contract,
  EventMapping,
  NonFungibleToken,
  NonFungibleTokenMetadata,
  ProtocolConfig,
  ProtocolSubgraphConfig,
  Token,
} from './configs';
import { MongoCollections, TokenOracleResult, Transaction, TransactionAction, TransactionTransfer } from './domains';
import {
  AdapterParseLogOptions,
  OracleGetTokenPriceOptions,
  ParseTransactionOptions,
  ProxyGetDataSubgraphOptions,
  SubgraphJobRunOptions,
  TransferParseLogOptions,
  WorkerRunOptions,
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

export interface ICachingProvider extends IProvider {
  getCachingData: (name: string) => Promise<any>;
  setCachingData: (name: string, data: any) => Promise<void>;
}

export interface IWeb3HelperProvider extends ICachingProvider {
  getBlockTime: (chain: string, blockNumber: number) => Promise<number>;
  getErc20Metadata: (chain: string, tokenAddress: string) => Promise<Token | null>;
  getNonFungibleTokenMetadata: (chain: string, tokenAddress: string) => Promise<NonFungibleTokenMetadata | null>;
  getNonFungibleTokenData: (chain: string, tokenAddress: string, tokenId: string) => Promise<NonFungibleToken | null>;
  getUniPoolFactoryAddress: (chain: string, poolAddress: string) => Promise<string | null>;
}

export interface GlobalProviders {
  mongodb: IMongodbProvider;
  sentry: ISentryProvider;
  caching: ICachingProvider;
  web3Helper: IWeb3HelperProvider;
  oracle: IOracleProvider;
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
  processEvents: (contract: Contract, events: Array<any>, options: any) => Promise<any>;
}

export interface IProxyProvider extends ICachingProvider {
  getEvents: (options: ProxyGetDataSubgraphOptions) => Promise<Array<any>>;
}

export interface IOracleProvider extends IProvider {
  getTokenSpotPriceUsd: (options: OracleGetTokenPriceOptions) => Promise<TokenOracleResult | null>;
}

export interface IWorkerProvider extends IProvider {
  providers: GlobalProviders;

  run: (options: WorkerRunOptions) => Promise<void>;
}

export interface ISubgraphJobProvider extends IProvider {
  config: ProtocolSubgraphConfig;
  providers: GlobalProviders;

  run: (options: SubgraphJobRunOptions) => Promise<void>;
}
