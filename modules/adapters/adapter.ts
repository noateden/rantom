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
      return new Web3HelperProvider();
    }
  }

  public supportedSignature(signature: string): boolean {
    return !!this.eventMappings[signature];
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    return null;
  }
}
