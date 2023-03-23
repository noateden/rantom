import { EulerConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { EulerAdapter } from '../../adapters/euler/euler';
import { LendingWorkerHook } from '../extends/lending';

export class EulerWorkerHook extends LendingWorkerHook {
  public readonly name: string = 'worker.euler';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new EulerAdapter(EulerConfigs, this.providers);
  }
}
