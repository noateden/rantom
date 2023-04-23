import { Collection } from 'mongodb';

import { NonFungibleTokenMetadata, Token } from './configs';

export interface MongoCollections {
  statesCollection: Collection;
  cachingCollection: Collection;

  // save logs, v2 API
  logsCollection: Collection;

  // save system reports
  reportsCollection: Collection;
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

  // use for service transaction
  | 'update';

export interface TransactionAction {
  protocol: string;
  action: KnownAction;
  tokens: Array<Token>;
  tokenAmounts: Array<string>; // should match with tokens
  addresses: Array<string>;
  readableString: string;
  logIndex?: number;
  addition?: any;
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

export interface TokenOracleSource {
  source: string;
  spotPrice: string;
}

export interface TokenOracleResult {
  token: string;
  timestamp: number;
  sources: Array<TokenOracleSource>;
}

export interface ProtocolSystemReport {
  protocol: string;

  // latest event timestamp which found from block logs
  latestEventTimestamp: number;

  // total number of events all time which found from block logs
  totalEventAllTime: number;
}

export interface SystemReport {
  timestamp: number;
  protocols: Array<string>;
  reports: Array<ProtocolSystemReport>;
}

export interface ProtocolStats {
  protocol: string;

  // unique actions on protocol
  actions: Array<KnownAction>;

  // unique tokens on protocol
  tokens: Array<string>;
}
