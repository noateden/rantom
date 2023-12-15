import Web3 from 'web3';

import { NonFungibleToken, Token } from '../../types/configs';

export interface ContractCall {
  chain: string;
  target: string;
  abi: Array<any>;
  method: string;
  params: Array<any>;

  // sometime, we need query data at a given block
  // this call requires RPC is an archived node
  blockNumber?: number;
}

export interface GetTokenOptions {
  chain: string;
  address: string;

  // force to query data onchain
  onchain?: boolean;
}

export interface GetNonFungibleTokenOptions {
  chain: string;
  address: string;
  tokenId: string;

  // force to query data onchain
  onchain?: boolean;
}

export interface GetTransactionOptions {
  chain: string;
  hash: string;
}

export interface IBlockchainService {
  // should be labeled as blockchain
  name: string;

  // we use web3js version 4.0 as EVM blockchain sdk
  providers: { [key: string]: Web3 };

  // get provider sdk
  getProvider: (chain: string) => Web3;

  // get block data
  getBlock: (chain: string, blockNumber: number) => Promise<any>;

  // get timestamp of a block
  getBlockTimestamp: (chain: string, blockNumber: number) => Promise<number>;

  // get token info
  getTokenInfo: (options: GetTokenOptions) => Promise<Token | null>;

  // get non fungible token info
  getNonFungibleTokenInfo: (options: GetNonFungibleTokenOptions) => Promise<NonFungibleToken | null>;

  // get transaction
  getTransaction: (options: GetTransactionOptions) => Promise<any>;

  // get transaction receipt
  getTransactionReceipt: (options: GetTransactionOptions) => Promise<any>;

  // query single
  singlecall: (call: ContractCall) => Promise<any>;
}
