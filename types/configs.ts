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
}

export interface EnvConfig {
  blockchains: {
    [key: string]: Blockchain;
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
