import { AaveContracts } from '../../configs/contracts/aave';
import { GlobalProviders, IContractWorker } from '../../types/namespaces';
import { AaveWorkerHook } from './hooks/aave';

export function getWorkers(providers: GlobalProviders): { [key: string]: IContractWorker } {
  return {
    aave: new AaveWorkerHook(providers, AaveContracts),
  };
}
