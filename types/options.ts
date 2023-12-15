export interface BlockchainIndexingRunOptions {
  chain: string;

  // force to sync from the contract birthBlock
  fromBlock: number;
}

export interface EventlogIndexingRunOptions {
  chain: string;

  // force to sync from the contract birthBlock
  fromBlock: number;
}

export interface ProtocolIndexingRunOptions {
  protocol: string;

  // if chain was given
  // sync only data from given chain
  chain?: string;

  // sync only data from contract
  // if it was given
  contract?: string;

  // it works only when combine with
  // chain, contract, ot both options
  fromBlock?: number;
}

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
