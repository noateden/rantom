import { IBlockchainService } from '../services/blockchains/domains';
import { IDatastoreService } from '../services/datastore/domains';
import { ProtocolConfig } from './configs';
import { TokenTransfer, TransactionAction } from './domains';
import { HandleHookEventLogOptions, ParseEventLogOptions, ParseTransactionOptions } from './options';

export interface ContextServices {
  blockchain: IBlockchainService;
  datastore: IDatastoreService;
}

export interface IModule {
  name: string;
  services: ContextServices;
}

export interface IAdapter extends IModule {
  config: ProtocolConfig;

  // every adapter should support a list of log signatures
  supportedSignature: (signature: string) => boolean;

  // every adapter should support a list of contract address
  supportedContract: (chain: string, address: string) => boolean;

  // when index logs from blockchain, we forward raw logs to every single adapter
  // if the adapter recognize the log signature (topic 0)
  // this function should handle all necessary tasks.
  // ex, when uniswap adapter got the log with signature:
  // 0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9
  // this function parses the log and save liquidity pool data into database
  handleEventLog: (options: HandleHookEventLogOptions) => Promise<void>;

  // parse an event log into list of transaction actions
  parseEventLog: (options: ParseEventLogOptions) => Promise<Array<TransactionAction>>;

  // parse transaction input
  parseInputData: (options: ParseEventLogOptions) => Promise<Array<TransactionAction>>;
}

export interface ITransferAdapter extends IModule {
  // every adapter should support a list of log signatures
  supportedSignature: (signature: string) => boolean;

  // parse an event log into list of transaction token transfers
  parseEventLog: (options: ParseEventLogOptions) => Promise<TokenTransfer | null>;
}

// the entry point for parser service
export interface ITransactionParser extends IModule {
  // fetch raw transaction data
  fetchTransaction: (options: ParseTransactionOptions) => Promise<Array<any>>;

  // fetch and parser transaction logs
  parseTransaction: (options: ParseTransactionOptions) => Promise<Array<any>>;
}
