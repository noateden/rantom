import { ProtocolConfig } from '../../../types/configs';
import { GlobalProviders } from '../../../types/namespaces';
import { Aavev2Adapter } from '../aave/aavev2';

export class SturdyAdapter extends Aavev2Adapter {
  public readonly name: string = 'adapter.sturdy';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);
  }
}
