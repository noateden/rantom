export type ChainFamily = 'evm';

// Native token on chain
// Can assign any address later
export interface NativeToken {
  symbol: string;
  decimals: number;
  logoURI?: string;
}

// Token defines a ERC20 standard token on EVM chains
export interface Token extends NativeToken {
  chain: string;
  address: string;
}

export interface NonFungibleToken {
  eip: 'ERC721' | 'ERC1155';

  chain: string;
  name: string;
  address: string;
  tokenId: string;

  logoURI?: string; // the collection logo image
  imageURI?: string; // the token id image
}

export interface Blockchain {
  // ex: ethereum
  name: string;

  chainId: number;

  // default: evm, more coming soon
  family: ChainFamily;

  // default node RPC endpoint
  nodeRpc: string;

  // the native token on chain
  nativeToken: NativeToken;

  // some time we need to get multiple block timestamp
  // subgraph helps us query them in a single API call
  blockSubgraph?: string;
}

export interface EnvConfig {
  mongodb: {
    databaseName: string;
    connectionUri: string;
    collections: {
      // states collection is used to save any states of any services
      // for example, when we sync logs from a contract,
      // we need to save the latest block where logs were sync
      states: string;

      // caching collection used to save any cache data at database level
      // make sure these data can be safety deleted without any issues on services
      caching: string;

      // we save all known tokens into this collections
      tokens: string;
      nonFungibleTokens: string;

      // save transaction actions
      actions: string;

      // save raw transactions
      transactions: string;
    };
  };

  // some sentry config for monitoring purposes
  sentry: {
    dns: string;
  };

  // we pre-define supported blockchains here
  blockchains: {
    [key: string]: Blockchain;
  };

  policies: {
    enableParserCaching: boolean;
  };
}

export interface EventMapping {
  abi: Array<any>;
}

export interface ContractConfig {
  chain: string;

  // the protocol id
  protocol: string;

  // the factory contract address
  address: string;

  // the block number when contract was deployed
  birthblock?: number;

  // used to filter logs
  topics?: Array<string>;
}

export interface ProtocolConfig {
  protocol: string;
  contracts: Array<ContractConfig>;
}
