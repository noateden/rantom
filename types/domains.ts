import { Collection } from 'mongodb';

import { NonFungibleToken, Token } from './configs';

export interface MongoCollections {
  statesCollection: Collection;

  // save action related to lending protocol: aave, compound, ...
  lendingActionsCollection: Collection;

  // save action related to marketplace: opensea, looksrare, ...
  marketplaceActionsCollection: Collection;

  // save action related to staking protocol: lido, ...
  stakingActionsCollection: Collection;

  // save action related to trading protocol: curve, cowswap, ...
  tradingActionsCollection: Collection;
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
  | 'cancel'

  // for beanstalk sow beans
  | 'sow'

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

export interface LendingEvent extends EventBase {
  action: KnownAction;
  token: Token;
  amount: string;
  caller: string;
  user: string;

  // optional metrics
  borrowRate?: string;
  debtToken?: Token;
  debtAmount?: string;
}

export interface MarketplaceEvent extends EventBase {
  action: KnownAction;
  nonFungibleToken: NonFungibleToken;
  nonFungibleTokenAmount: string;
  paymentToken: Token;
  paymentTokenAmount: string;
  seller: string;
  buyer: string;
}

export interface StakingEvent extends EventBase {
  action: KnownAction;
  token: Token;
  amount: string;
  caller: string;
  user: string;
  addition?: any;
}

export interface TradingEvent extends EventBase {
  action: KnownAction;
  tokens: Array<Token>;
  amounts: Array<string>;
  caller: string;
  user: string;
  addition?: any;
}
