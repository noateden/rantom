import { AurafinanceConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { AurafinanceAdapter } from '../../adapters/aurafinance/aurafinance';
import { StakingWorkerHook } from '../extends/staking';

export class AurafinanceWorkerHook extends StakingWorkerHook {
  public readonly name: string = 'worker.aurafinance';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new AurafinanceAdapter(AurafinanceConfigs, this.providers);
  }
}
