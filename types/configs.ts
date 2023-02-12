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

export interface EnvConfig {
  mongodb: {
    databaseName: string;
    connectionUri: string;
    collections: {
      transactions: string;
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

export interface ProtocolConfig {
  protocol: string; // protocol id, ex: uniswap, lido, ...
  contracts: {
    [key: string]: Array<string>;
  };
}

export interface EventMapping {
  abi: Array<any>;
  signature: string;
}
