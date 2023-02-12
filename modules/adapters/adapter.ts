import { Web3HelperProvider } from '../../services/web3';
import { ProtocolConfig } from '../../types/configs';
import { TransactionAction } from '../../types/domains';
import { GlobalProviders, IAdapter, IWeb3HelperProvider } from '../../types/namespaces';
import { AdapterParseLogOptions } from '../../types/options';

export class Adapter implements IAdapter {
  public readonly name: string = 'adapter';

  public config: ProtocolConfig;
  public providers: GlobalProviders | null;

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    this.config = config;
    this.providers = providers;
  }

  public getWeb3Helper(): IWeb3HelperProvider {
    if (this.providers) {
      return this.providers.web3Helper;
    } else {
      return new Web3HelperProvider();
    }
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    return null;
  }
}
