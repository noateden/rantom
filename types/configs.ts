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

// we get this token price USD from ChainLink price feed
// it should be ETH, WETH, USDC, USDT, DAI
export interface TokenOracleBase {
  token: Token;
  priceFeed: string;
  priceFeedDecimals: number;
}

export type TokenOracleSourceType = 'pool2' | 'pool3';
export interface TokenOracleSource {
  chain: string;
  source: string;
  type: TokenOracleSourceType;
  factory: string;
  factoryAbi: any;
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
