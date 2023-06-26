export interface ParseTransactionOptions {
  hash: string;
  force: boolean;
}

export interface TransferParseLogOptions {
  chain: string;
  address: string;
  topics: Array<string>;
  data: string;
}

export interface AdapterParseLogOptions {
  chain: string;
  sender: string; // transaction caller address
  hash?: string;
  to?: string; // transaction to address
  address: string;
  topics: Array<string>;
  data: string;

  blockNumber?: number;

  input?: string;

  // full transaction receipt
  context?: any;
}

export interface AdapterParseContractInfoOptions {
  chain: string;
  address: string;
}

export type MultiCallResponse<T> = T | null;

export interface MulticallCall {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
}

export interface MulticallOptions {
  requireSuccess?: boolean;
}

export interface WorkerRunOptions {
  chain?: string;
  force?: boolean;
  fromBlock: number;
  fromTime: number;
}

export interface SubgraphJobRunOptions {
  job: string;
  fromTime: number;
}

export interface OracleGetTokenPriceOptions {
  chain: string;
  address: string;
  timestamp: number;
}

export interface ApiQueryLogOptions {
  query: any;
  limit: number;
  order: number;
  skip: number;
}

export interface RpcWrapperQueryContractOptions {
  chain: string;
  abi: any;
  contract: string;
  method: string;
  params: Array<any>;

  // if blockNumber is not given, just call data from latest block
  blockNumber?: number;
}
