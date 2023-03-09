import { AaveContracts } from '../../configs/contracts/aave';
import { BeanstalkContracts } from '../../configs/contracts/beanstalk';
import { CompoundContracts } from '../../configs/contracts/compound';
import { LidoContracts } from '../../configs/contracts/lido';
import { OpenseaContracts } from '../../configs/contracts/opensea';
import { RocketpoolContracts } from '../../configs/contracts/rocketpool';
import { GlobalProviders, IContractWorker } from '../../types/namespaces';
import { AaveWorkerHook } from './hooks/aave';
import { BeanstalkWorkerHook } from './hooks/beanstalk';
import { CompoundWorkerHook } from './hooks/compound';
import { LidoWorkerHook } from './hooks/lido';
import { OpenseaWorkerHook } from './hooks/opensea';
import { RocketpoolWorkerHook } from './hooks/rocketpool';

export function getWorkers(providers: GlobalProviders): { [key: string]: IContractWorker } {
  return {
    aave: new AaveWorkerHook(providers, AaveContracts),
    opensea: new OpenseaWorkerHook(providers, OpenseaContracts),
    compound: new CompoundWorkerHook(providers, CompoundContracts),
    lido: new LidoWorkerHook(providers, LidoContracts),
    rocketpool: new RocketpoolWorkerHook(providers, RocketpoolContracts),
    beanstalk: new BeanstalkWorkerHook(providers, BeanstalkContracts),
  };
}
