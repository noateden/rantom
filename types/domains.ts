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

export type KnownAction =
  | 'swap'
  | 'deposit'
  | 'supply'
  | 'withdraw'
  | 'collect'
  | 'borrow'
  | 'repay'
  | 'flashloan'
  | 'liquidate'
  | 'bridge'

  // use for ENS domains
  | 'register'
  | 'renew'

  // use for NFT trading
  | 'list'
  | 'buy'
  | 'sell'
  | 'bid'
  | 'offer'
  | 'cancel'
  | 'trade'

  // for beanstalk sow beans
  | 'sow'

  // for liquidity pool created
  | 'createLiquidityPool'

  // for token locking
  | 'lock'
  | 'unlock'

  // use for service transaction
  | 'update';

export interface TransactionActionBase {
  protocol: string;
  action: KnownAction;
  tokens: Array<Token>;
  tokenAmounts: Array<string>; // should match with tokens
  addresses: Array<string>;
  readableString: string;
}

export interface TransactionAction extends TransactionActionBase {
  logIndex?: number;
  addition?: any;
  subActions?: Array<TransactionActionBase>;
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
  input: string;
  status: boolean;
  version: string;
  timestamp: number;
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

export interface ProtocolSystemReport {
  protocol: string;

  // latest event timestamp which found from block logs
  latestEventTimestamp: number;

  // oldest event timestamp which found from block logs
  oldestEventTimestamp: number;

  // total number of events all time which found from block logs
  totalEventAllTime: number;
}

export interface SystemReport {
  timestamp: number;
  protocols: Array<string>;
  reports: Array<ProtocolSystemReport>;
}

export interface ProtocolDailyStats {
  protocol: string;

  // data collected between timestampFrom and timestampTo
  timestampFrom: number;
  timestamp: number;

  totalEventCount: number;
  totalTransactionCount: number;

  volumeUsdByActions: {
    [key: string]: number;
  };

  eventCountByActions: {
    [key: string]: number;
  };
}

export interface ProtocolStats {
  protocol: string;

  // unique actions which occur on this protocol
  actions: Array<string>;

  // unique tokens which used in this protocol
  tokens: Array<Token>;
}

export interface AddressStats {
  address: string;

  // unique protocols which this address interact with
  protocols: Array<string>;

  // unique actions which occur on this protocol
  actions: Array<string>;

  // unique tokens which used in this protocol
  tokens: Array<Token>;
}
