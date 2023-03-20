import { YearnConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { YearnAdapter } from '../../adapters/yearn/yearn';
import { StakingWorkerHook } from '../extends/staking';

export class YearnWorkerHook extends StakingWorkerHook {
  public readonly name: string = 'worker.yearn';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new YearnAdapter(YearnConfigs, this.providers);
  }
}
