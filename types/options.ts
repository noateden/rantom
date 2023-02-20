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
  address: string;
  topics: Array<string>;
  data: string;
}

export interface ExploreLatestTransactionsOptions {
  chain: string;
}
