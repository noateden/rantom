import { AbracadabraConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { AbracadabraAdapter } from '../../adapters/abracadabra/abracadabra';
import { LendingWorkerHook } from '../extends/lending';

export class AbracadabraWorkerHook extends LendingWorkerHook {
  public readonly name: string = 'worker.abracadabra';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new AbracadabraAdapter(AbracadabraConfigs, this.providers);
  }
}
