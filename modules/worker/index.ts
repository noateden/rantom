import { AaveContracts } from '../../configs/contracts/aave';
import { OpenseaContracts } from '../../configs/contracts/opensea';
import { GlobalProviders, IContractWorker } from '../../types/namespaces';
import { AaveWorkerHook } from './hooks/aave';
import { OpenseaWorkerHook } from './hooks/opensea';

export function getWorkers(providers: GlobalProviders): { [key: string]: IContractWorker } {
  return {
    aave: new AaveWorkerHook(providers, AaveContracts),
    opensea: new OpenseaWorkerHook(providers, OpenseaContracts),
  };
}
