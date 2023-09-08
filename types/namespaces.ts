import { Collection } from 'mongodb';

import { EventMapping, NonFungibleToken, NonFungibleTokenMetadata, ProtocolConfig, Token } from './configs';
import {
  MongoCollections,
  TokenOracleResult,
  Transaction,
  TransactionAction,
  TransactionFunction,
  TransactionTransfer,
} from './domains';
import {
  AdapterParseContractInfoOptions,
  AdapterParseFunctionCallDataOptions,
  AdapterParseLogOptions,
  ApiQueryLogOptions,
  OracleGetTokenPriceOptions,
  ParseTransactionOptions,
  RpcWrapperQueryContractOptions,
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
}

export interface IRpcWrapperProvider extends IProvider {
  queryContract: (options: RpcWrapperQueryContractOptions) => Promise<any>;
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

  // try parsing actions from transaction logs
  tryParsingActions: (options: AdapterParseLogOptions) => Promise<TransactionAction | null>;

  // try to get actions from function call data
  tryParsingFunctionCallData: (options: AdapterParseFunctionCallDataOptions) => Promise<TransactionFunction | null>;

  // return address label or null on nothing found
  tryParsingContractInfo: (options: AdapterParseContractInfoOptions) => Promise<string | null>;
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

export interface IOracleProvider extends ICachingProvider {
  getTokenSpotPriceUsd: (options: OracleGetTokenPriceOptions) => Promise<TokenOracleResult | null>;
}

export interface IWorkerProvider extends IProvider {
  providers: GlobalProviders;

  run: (options: WorkerRunOptions) => Promise<void>;
}

export interface IApiCachingProvider extends IProvider {
  providers: GlobalProviders;

  queryLogs: (options: ApiQueryLogOptions) => Promise<Array<any>>;
}

export interface IContractWorker extends IProvider {
  providers: GlobalProviders;

  run: (options: WorkerRunOptions) => Promise<void>;
}
