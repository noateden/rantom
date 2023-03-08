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
  erc721?: boolean;
}

export interface NonFungibleToken {
  chain: string;
  symbol: string;
  address: string;
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
      transactions: string;

      lendingActions: string;
      marketplaceActions: string;
      stakingActions: string;
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
  indexingContracts?: Array<Contract>;
}
