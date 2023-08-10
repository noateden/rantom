export type ChainName = 'ethereum' | 'arbitrum';

export interface Blockchain {
  name: ChainName;
  nodeRpc: string;
}

export interface Token {
  chain: string;
  symbol: string;
  decimals: number;
  address: string;
}

export interface NonFungibleTokenMetadata {
  chain: string;
  symbol: string; // name on contract
  address: string;
}

export interface NonFungibleToken extends NonFungibleTokenMetadata {
  tokenId: string;
  image: string;
}

export interface Contract {
  chain: string;
  protocol: string;
  abi: any;
  address: string;
  birthday: number;
  events: Array<string>;

  // for getting custom events
  topics?: Array<string>;
}

export type TokenOracleSource = 'chainlink' | 'pool2' | 'pool3' | 'curveMeta' | 'curvePol' | 'balancer';
export interface TokenOracleChainlink {
  priceFeed: string;
  priceFeedDecimals: number;
}
export interface TokenOraclePool2 {
  poolAddress: string;
  baseToken: Token;
}
export interface TokenOracleCurvePool {
  poolAddress: string;
  poolAbi: Array<any>;
  baseToken: Token;

  // the pricing coin index
  indies: Array<number>;
}
export interface TokenOracle {
  chain: string;
  source: TokenOracleSource;
  token: Token;
  config: TokenOracleChainlink | TokenOraclePool2 | TokenOracleCurvePool;
}

export interface EnvConfig {
  mongodb: {
    databaseName: string;
    connectionUri: string;
    collections: {
      states: string;
      caching: string;
      apiLogs: string;

      logs: string;
      reports: string;
      metrics: string;
    };
  };
  sentry: {
    dns: string;
  };
  blockchains: {
    [key: string]: Blockchain;
  };
  security: {
    systemApiKey: string;
  };
  ipfs: {
    uploadGateway: string;
    contentGateway: string;
  };
}

export interface EventMapping {
  abi: Array<any>;
}

export type ProtocolCategory =
  | 'lending'
  | 'staking'
  | 'marketplace'
  | 'trading'
  | 'perpetual'
  | 'dexAggregator'
  | 'service'
  | 'bridge';

export interface ProtocolSubgraphConfig {
  chain: string;
  protocol: string;
  version: 'univ2' | 'univ3';
  filters: any;
  endpoint: string;
  birthday: number;
}

export interface ProtocolConfig {
  protocol: string; // protocol id, ex: uniswap, lido, ...
  categories: Array<ProtocolCategory>;
  contracts: {
    [key: string]: Array<string>;
  };
  customEventMapping?: {
    [key: string]: EventMapping;
  };
  staticData?: any;
  subgraphs?: Array<ProtocolSubgraphConfig>;
}

export type LiquidityPoolType = 'univ2' | 'univ3' | 'curve';
export interface FactoryContract extends Contract {
  type: LiquidityPoolType;
}
