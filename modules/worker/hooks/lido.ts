import { LidoConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { LidoAdapter } from '../../adapters/lido/lido';
import { StakingWorkerHook } from '../extends/staking';

export class LidoWorkerHook extends StakingWorkerHook {
  public readonly name: string = 'worker.lido';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new LidoAdapter(LidoConfigs, this.providers);
  }
}
