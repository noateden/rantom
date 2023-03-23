import { IronbankConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { IronbankAdapter } from '../../adapters/ironbank/ironbank';
import { LendingWorkerHook } from '../extends/lending';

export class IronbankWorkerHook extends LendingWorkerHook {
  public readonly name: string = 'worker.ironbank';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new IronbankAdapter(IronbankConfigs, this.providers);
  }
}
