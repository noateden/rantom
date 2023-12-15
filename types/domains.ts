import { NonFungibleToken, Token } from './configs';

export type LiquidityPoolVersion = 'basic' | 'univ2' | 'univ3' | 'mav' | 'traderjoev2.1' | 'stableswap';

export interface LiquidityPoolConstant {
  chain: string;
  version: LiquidityPoolVersion;
  protocol: string;

  // the factory address if any
  factory: string;

  // pool contract address
  address: string;

  // a list of tokens
  tokens: Array<Token>;
}

export type StakingPoolVersion = 'basic' | 'masterchef' | 'booster';

// staking pool present a staking info of a staking contract
// which identify by poolId
// for example, these pools on sushi masterchef or convex finance booster, ...
export interface StakingPoolConstant {
  chain: string;

  protocol: string;

  version: StakingPoolVersion;

  // the staking contract address
  address: string;

  // pool ID
  poolId: number;

  // staking or locking token
  token: Token;

  // the reward token if any
  rewardToken?: Token;
}

export const Actions = [
  // define atomic token exchange actions
  // for example, the exchange of USDC for ETH is a swap action
  'swap',

  // define token exchange via multiple routes actions
  // for example, the exchange of USDC -> DAI -> USDT -> ETH
  // is a trade action (trade USDC for ETH)
  'trade',

  // define token transfer from users to protocol contracts actions
  // it could be the add liquidity, lend or stake tokens actions,
  'deposit',

  // define token transfer from protocol contracts to users actions
  // it could be the remove liquidity, or unstake tokens actions,
  'withdraw',

  // define token borrow actions on lending protocols
  'borrow',

  // define token repaid actions on lending protocols
  'repay',

  // liquidation action
  'liquidate',

  // collect rewards, fees, ...
  'collect',

  // define lock/unlock token actions
  'lock',
  'unlock',

  // define flashloan actions
  'flashloan',

  // perpetual increase/decrease long position
  'increaseLong',
  'decreaseLong',

  // perpetual increase/decrease short position
  'increaseShort',
  'decreaseShort',

  // perpetual liquidate long/short
  'liquidateLong',
  'liquidateShort',

  // register/renew domain name, services
  'register',
  'renew',

  // cross-chain transfer/swap actions
  'bridge',
] as const;
export type KnownAction = (typeof Actions)[number];

export interface TransactionAction {
  protocol: string;

  chain: string;

  action: KnownAction;

  transactionHash: string;

  // log index format: logIndex:actionIndex
  // some protocol have multiple actions in a single log entry
  // so, to make a unique action, we need to combine longIndex with the actionIndex
  logIndex: string;

  blockNumber: number;

  // the contract address that emitted this log
  contract: string;

  // a list of involve addresses
  // could be users, external address, periphery contracts
  addresses: Array<string>;

  // a list of tokens
  tokens: Array<Token>;

  // a list of token amounts
  // should match with tokens indies
  tokenAmounts: Array<string>;

  // some protocol return amount in USD
  usdAmounts?: Array<string>;

  // additional info
  addition?: any;
}

export interface TokenTransfer {
  token: Token | NonFungibleToken;
  from: string;
  to: string;
  amount: string;
}
