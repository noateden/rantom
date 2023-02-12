export interface ParseTransactionOptions {
  hash: string;
}

export interface TransferParseLogOptions {
  chain: string;
  address: string;
  signature: string;
  event: any;
}

export interface LogParserOptions {
  topics: Array<string>;
  data: string;
}

export interface AdapterParseLogOptions {
  chain: string;
  sender: string; // transaction caller address
  address: string;
  signature: string;
  event: any;
}
