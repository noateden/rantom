import { RocketpoolConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { RocketpoolAdapter } from '../../adapters/rocketpool/rocketpool';
import { StakingWorker } from '../worker';

export class RocketpoolWorkerHook extends StakingWorker {
  public readonly name: string = 'worker.rocketpool';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new RocketpoolAdapter(RocketpoolConfigs, this.providers);
  }
}
