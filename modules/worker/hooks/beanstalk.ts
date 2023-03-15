import { BeanstalkConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { BeanstalkAdapter } from '../../adapters/beanstalk/beanstalk';
import { StakingWorkerHook } from '../extends/staking';

export class BeanstalkWorkerHook extends StakingWorkerHook {
  public readonly name: string = 'worker.beanstalk';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new BeanstalkAdapter(BeanstalkConfigs, this.providers);
  }
}
