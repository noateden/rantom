import { Collection } from 'mongodb';

import { Token } from './configs';

export interface MongoCollections {
  transactionsCollection: Collection;
}

export type KnownAction =
  | 'swap'
  | 'addLiquidity'
  | 'removeLiquidity'
  | 'collect'
  | 'supply'
  | 'deposit'
  | 'withdraw'
  | 'borrow'
  | 'repay'
  | 'flashloan'
  | 'stake'
  | 'unstake'
  | 'liquidate';

export interface TransactionAction {
  protocol: string;
  action: KnownAction;
  tokens: Array<Token>;
  tokenAmounts: Array<string>; // should match with tokens
  addresses: Array<string>;
  readableString: string;
}

export interface TransactionTransfer {
  token: Token;
  from: string;
  to: string;
  amount: string;
  tokenId?: number;
}

export interface Transaction {
  chain: string;
  hash: string;
  from: string; // sender address
  to: string;
  version: string;
  actions: Array<TransactionAction>;
  transfers: Array<TransactionTransfer>;
}
