import Web3 from 'web3';

import EnvConfig from '../../configs/envConfig';
import { normalizeAddress } from '../../lib/helper';
import { Web3HelperProvider } from '../../services/web3';
import { EventMapping, ProtocolConfig } from '../../types/configs';
import { TransactionAction } from '../../types/domains';
import { GlobalProviders, IAdapter, IWeb3HelperProvider } from '../../types/namespaces';
import { AdapterParseLogOptions } from '../../types/options';

export class Adapter implements IAdapter {
  public readonly name: string = 'adapter';

  public config: ProtocolConfig;
  public providers: GlobalProviders | null;
  public eventMappings: { [key: string]: EventMapping };

  constructor(config: ProtocolConfig, providers: GlobalProviders | null, mappings: { [key: string]: EventMapping }) {
    this.config = config;
    this.providers = providers;
    this.eventMappings = mappings;
  }

  public getWeb3Helper(): IWeb3HelperProvider {
    if (this.providers) {
      return this.providers.web3Helper;
    } else {
      return new Web3HelperProvider(null);
    }
  }

  public supportedSignature(signature: string): boolean {
    return !!this.eventMappings[signature];
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    return null;
  }

  public async getSenderAddress(options: AdapterParseLogOptions): Promise<string> {
    if (options.sender && options.sender !== '') {
      return options.sender;
    } else if (options.hash) {
      const web3 = new Web3(EnvConfig.blockchains[options.chain].nodeRpc);
      const tx = await web3.eth.getTransaction(options.hash);
      return normalizeAddress(tx.from);
    } else {
      return '';
    }
  }

  public async getTargetAddress(options: AdapterParseLogOptions): Promise<string> {
    if (options.to && options.to !== '') {
      return options.to;
    } else if (options.hash) {
      const web3 = new Web3(EnvConfig.blockchains[options.chain].nodeRpc);
      const tx = await web3.eth.getTransaction(options.hash);
      return tx.to ? normalizeAddress(tx.to) : '';
    } else {
      return '';
    }
  }
}
