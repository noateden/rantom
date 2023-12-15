import { compareAddress, normalizeAddress } from '../../lib/utils';
import { EventMapping, ProtocolConfig, Token } from '../../types/configs';
import { KnownAction, TransactionAction } from '../../types/domains';
import { ContextServices, IAdapter } from '../../types/namespaces';
import { HandleHookEventLogOptions, ParseEventLogOptions } from '../../types/options';

export interface BuildUpActionOptions extends ParseEventLogOptions {
  action: KnownAction;
  addresses: Array<string>;
  tokens: Array<Token>;
  tokenAmounts: Array<string>;
}

export default class Adapter implements IAdapter {
  public readonly name: string = 'adapter';
  public readonly services: ContextServices;
  public readonly config: ProtocolConfig;

  protected eventMappings: { [key: string]: EventMapping } = {};

  constructor(services: ContextServices, config: ProtocolConfig) {
    this.services = services;
    this.config = config;
  }

  protected buildUpAction(options: BuildUpActionOptions): TransactionAction {
    return {
      chain: options.chain,
      protocol: this.config.protocol,
      action: options.action,
      transactionHash: options.log.transactionHash,
      logIndex: `${options.log.logIndex}:0`,
      blockNumber: Number(options.log.blockNumber),
      contract: normalizeAddress(options.log.address),
      addresses: options.addresses,
      tokens: options.tokens,
      tokenAmounts: options.tokenAmounts,
    };
  }

  public supportedContract(chain: string, address: string): boolean {
    for (const contract of this.config.contracts) {
      if (contract.chain === chain && compareAddress(contract.address, address)) {
        return true;
      }
    }

    return false;
  }

  public supportedSignature(signature: string): boolean {
    return !!this.eventMappings[signature];
  }

  // must be implemented in children
  public async handleEventLog(options: HandleHookEventLogOptions): Promise<void> {
    return Promise.resolve(undefined);
  }

  // must be implemented in children
  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    return [];
  }

  // must be implemented in children
  public async parseInputData(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    return [];
  }
}
