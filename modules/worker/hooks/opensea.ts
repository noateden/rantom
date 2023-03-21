import { OpenseaConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { OpenseaAdapter } from '../../adapters/opensea/opensea';
import { MarketplaceWorkerHook } from '../extends/marketplace';

export class OpenseaWorkerHook extends MarketplaceWorkerHook {
  public readonly name: string = 'worker.opensea';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new OpenseaAdapter(OpenseaConfigs, this.providers);
  }
}
