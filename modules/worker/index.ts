import { AaveContracts } from '../../configs/contracts/aave';
import { MarketplaceContracts } from '../../configs/contracts/marketplace';
import { GlobalProviders, IContractWorker } from '../../types/namespaces';
import { AaveWorkerHook } from './hooks/aave';
import { MarketplaceWorkerHook } from './hooks/marketplace';

export function getWorkers(providers: GlobalProviders): { [key: string]: IContractWorker } {
  return {
    aave: new AaveWorkerHook(providers, AaveContracts),
    marketplace: new MarketplaceWorkerHook(providers, MarketplaceContracts),
  };
}
