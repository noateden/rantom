import { LiquityConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { LiquityAdapter } from '../../adapters/liquity/liquity';
import { LendingWorkerHook } from '../extends/lending';

export class LiquityWorkerHook extends LendingWorkerHook {
  public readonly name: string = 'worker.liquity';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new LiquityAdapter(LiquityConfigs, this.providers);
  }
}
