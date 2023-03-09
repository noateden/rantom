import { SushiConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { SushiAdapter } from '../../adapters/sushi/sushi';
import { StakingWorker } from '../worker';

export class SushiWorkerHook extends StakingWorker {
  public readonly name: string = 'worker.sushi';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new SushiAdapter(SushiConfigs, this.providers);
  }
}
