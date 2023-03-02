import { Collection } from 'mongodb';

import { NonFungibleToken, Token } from './configs';

export interface MongoCollections {
  statesCollection: Collection;
  transactionsCollection: Collection;

  // save action related to lending protocol: aave, compound, ...
  lendingActionsCollection: Collection;

  // save action related to marketplace: opensea, looksrare, ...
  marketplaceActionsCollection: Collection;
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

export type LendingAction = 'supply' | 'withdraw' | 'borrow' | 'repay' | 'liquidate' | 'flashloan';
export interface LendingEvent extends EventBase {
  action: LendingAction;
  token: Token;
  amount: string;
  caller: string;
  user: string;

  // optional metrics
  borrowRate?: string;
  debtToken?: Token;
  debtAmount?: string;
}

export type MarketplaceAction = 'buy' | 'bid' | 'cancel';
export interface MarketplaceEvent extends EventBase {
  action: MarketplaceAction;
  nonFungibleToken: NonFungibleToken;
  nonFungibleTokenAmount: string;
  paymentToken: Token;
  paymentTokenAmount: string;
  seller: string;
  buyer: string;
}
