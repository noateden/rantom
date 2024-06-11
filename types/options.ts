export interface HandleHookEventLogOptions {
  chain: string;
  log: any;
}

export interface ParseTransactionOptions {
  chain?: string;
  hash: string;
}

export interface ParseEventLogOptions {
  chain: string;

  // full list of logs were emitted in the same transaction
  // some protocol need these logs
  allLogs: Array<any>;

  // the main log entry
  log: any;

  // the transaction where the log was emitted
  transaction?: any;

  // get missing data onchain
  // this option will decrease parser speed
  onchain?: boolean;
}
