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
}

export interface EnvConfig {
  mongodb: {
    databaseName: string;
    connectionUri: string;
    collections: {
      states: string;
      caching: string;

      lendingActions: string;
      marketplaceActions: string;
      stakingActions: string;
      tradingActions: string;
      erc20SupplyActions: string;
      serviceActions: string;
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

export interface ProtocolConfig {
  protocol: string; // protocol id, ex: uniswap, lido, ...
  contracts: {
    [key: string]: Array<string>;
  };
  customEventMapping?: {
    [key: string]: EventMapping;
  };
  staticData?: any;
}

export interface ProtocolSubgraphConfig {
  chain: string;
  protocol: string;
  version: 'univ2' | 'univ3';
  filters: any;
  endpoint: string;
  birthday: number;
}
