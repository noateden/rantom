import { ConvexConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { ConvexAdapter } from '../../adapters/convex/convex';
import { StakingWorkerHook } from '../extends/staking';

export class ConvexWorkerHook extends StakingWorkerHook {
  public readonly name: string = 'worker.convex';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new ConvexAdapter(ConvexConfigs, this.providers);
  }
}
