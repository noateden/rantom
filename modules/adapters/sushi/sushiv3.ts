import { ProtocolConfig } from '../../../types/configs';
import { GlobalProviders } from '../../../types/namespaces';
import { Uniswapv3Adapter } from '../uniswap/uniswapv3';

export class Sushiv3Adapter extends Uniswapv3Adapter {
  public readonly name: string = 'adapter.uniswapv3';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);
  }
}
