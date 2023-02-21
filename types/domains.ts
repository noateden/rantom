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
  | 'liquidate'
  | 'stake'
  | 'unstake'
  | 'bridge'

  // use for ENS domains
  | 'register'
  | 'renew'

  // use for layer 2 batch transaction
  | 'batch';

export interface TransactionAction {
  protocol: string;
  action: KnownAction;
  tokens: Array<Token>;
  tokenAmounts: Array<string>; // should match with tokens
  addresses: Array<string>;
  readableString: string;
  addition?: any;
}

export interface TransactionTransfer {
  token: Token;
  from: string;
  to: string;
  amount: string;
  tokenId?: string;
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
