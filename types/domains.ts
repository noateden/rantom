import { Collection } from 'mongodb';

import { Token } from './configs';

export interface MongoCollections {
  transactionsCollection: Collection;
}

export type KnownAction =
  | 'swap'
  | 'deposit'
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
  | 'buy'
  | 'sell'

  // use for layer 2 batch transaction
  | 'update';

export interface NonFungibleTokenData {
  token: Token;
  tokenId: string;
  image: string;
}

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
  token: Token;
  from: string;
  to: string;
  amount: string;
  logIndex?: number;
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
