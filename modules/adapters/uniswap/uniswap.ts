import { ProtocolConfig } from '../../../types/configs';
import { LiquidityPoolConstant } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import Adapter from '../adapter';

export default class UniswapAdapter extends Adapter {
  public readonly name: string = 'adapter.uniswap';

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);
  }

  /**
   * @description check a liquidity pool contract is belong to this protocol or not
   * by getting event from a liquidity pool, we can know which protocol it was owned
   * by checking the factory address of that liquidity pool contract
   */
  protected async getLiquidityPool(chain: string, address: string): Promise<LiquidityPoolConstant | null | undefined> {
    return await this.services.datastore.getLiquidityPoolConstant({
      chain: chain,
      address: address,
      protocol: this.config.protocol,
    });
  }
}
