import { Collection } from 'mongodb';

import { NonFungibleTokenMetadata, Token } from './configs';

export interface MongoCollections {
  statesCollection: Collection;
  cachingCollection: Collection;

  // save logs, v2 API
  logsCollection: Collection;

  // save system reports
  reportsCollection: Collection;

  // save protocol metrics
  metricsCollection: Collection;
}

export const Actions = [
  'swap',
  'collect',
  'deposit',
  'withdraw',
  'borrow',
  'repay',
  'flashloan',
  'liquidate',
  'bridge',
  'register',
  'renew',
  'list',
  'buy',
  'offer',
  'trade',
  'sow',
  'createLiquidityPool',
  'lock',
  'unlock',
  'update',

  'useContract', // for calls to smart contracts: DSProxy, Instadapp account, ...
  'executeRecipe', // execute recipe on DeFi Saver
  'executeTask', // execute task on gelato.network

  // these actions used for leveraged functional
  'leverage',
  'increaseShort',
  'increaseLong',
  'decreaseShort',
  'decreaseLong',
  'liquidateShort',
  'liquidateLong',

  'openAccount',
  'closeAccount',
] as const;
export type KnownAction = (typeof Actions)[number];

export interface TransactionActionBase {
  protocol: string;
  action: KnownAction;
  addresses: Array<string>;
  readableString: string;

  tokens: Array<Token>;

  // should match with tokens
  tokenAmounts: Array<string>;

  // some protocol return amount in USD
  usdAmounts?: Array<string>;
}

export interface TransactionAction extends TransactionActionBase {
  logIndex?: number;
  addition?: any;
  subActions?: Array<TransactionActionBase>;
}

// data parse from transaction input
export interface TransactionFunction extends TransactionActionBase {
  signature: string;
  contract: string; // to contract
}

export interface TransactionTransfer {
  token: Token | NonFungibleTokenMetadata;
  from: string;
  to: string;
  amount: string;
  logIndex?: number;
}

export interface Transaction {
  chain: string;
  hash: string;
  from: string; // sender address
  to: string;

  // we also try to get information and label for to addresses
  addressesLabels?: {
    [key: string]: string;
  };

  input: string;
  status: boolean;
  version: string;
  timestamp: number;
  functions: Array<TransactionFunction>;
  actions: Array<TransactionAction>;
  transfers: Array<TransactionTransfer>;
}

export interface EventBase {
  // write index
  chain: string;
  contract: string;
  transactionHash: string;
  logIndex: number;

  protocol: string;
  timestamp: number;
  blockNumber: number;
}

export interface TradingEvent extends EventBase {
  action: KnownAction;
  tokens: Array<Token>;
  amounts: Array<string>;
  caller: string;
  user: string;
  addition?: any;
}

export interface UniLiquidityPool {
  chain: string;
  protocol: string;
  version: 'univ2' | 'univ3';
  address: string;
  token0: Token;
  token1: Token;
}

export interface TokenOracleResult {
  chain: string;
  token: Token;
  timestamp: number;
  spotPriceUsd: string;
}
