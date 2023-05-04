export type ChainName = 'ethereum';

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

export type TokenOracleType = 'chainlink' | 'pool2' | 'pool3' | 'coingecko';
export type TokenOracleBase = 'USD' | 'ETH' | 'BTC';

export interface TokenOracleBasic {
  type: TokenOracleType;
  base: TokenOracleBase;
  source: string;
  chain: string;
  address: string;
}

export interface TokenOracleChainlinkAggregator extends TokenOracleBasic {
  decimals: number;
}

export interface TokenOraclePool2 extends TokenOracleBasic {
  baseToken: Token;
  quotaToken: Token;
}

export interface TokenOracle {
  token: Token;
  oracles: Array<TokenOracleChainlinkAggregator | TokenOraclePool2>;
}

export interface EnvConfig {
  mongodb: {
    databaseName: string;
    connectionUri: string;
    collections: {
      states: string;
      caching: string;

      logs: string;
      reports: string;
    };
  };
  sentry: {
    dns: string;
  };
  blockchains: {
    [key: string]: Blockchain;
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
