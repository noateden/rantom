import { CompoundConfigs, Compoundv3Configs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { CompoundAdapter } from '../../adapters/compound/compound';
import { Compoundv3Adapter } from '../../adapters/compound/compoundv3';
import { LendingWorkerHook } from '../extends/lending';

export class CompoundWorkerHook extends LendingWorkerHook {
  public readonly name: string = 'worker.compound';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new CompoundAdapter(CompoundConfigs, this.providers);
  }
}

export class Compoundv3WorkerHook extends LendingWorkerHook {
  public readonly name: string = 'worker.compoundv3';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter {
    return new Compoundv3Adapter(Compoundv3Configs, this.providers);
  }
}
