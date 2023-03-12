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
  to?: string; // transaction to address
  address: string;
  topics: Array<string>;
  data: string;

  input?: string;
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
  fromBlock: number;
}
