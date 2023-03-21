import { LooksrareConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { LooksrareAdapter } from '../../adapters/looksrare/looksrare';
import { MarketplaceWorkerHook } from '../extends/marketplace';

export class LooksrareWorkerHook extends MarketplaceWorkerHook {
  public readonly name: string = 'worker.looksrare';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new LooksrareAdapter(LooksrareConfigs, this.providers);
  }
}
