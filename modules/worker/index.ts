import { AbracadabraContracts } from '../../configs/contracts/abracadabra';
import { ExactlyContracts } from '../../configs/contracts/exactly';
import { FraxlendContracts } from '../../configs/contracts/fraxlend';
import { GearboxContracts } from '../../configs/contracts/gearbox';
import { GlobalProviders, IContractWorker } from '../../types/namespaces';
import { ContractWorker } from './contract';

export function getContractWorkers(providers: GlobalProviders): { [key: string]: IContractWorker } {
  return {
    abracadabra: new ContractWorker(providers, AbracadabraContracts),
    gearbox: new ContractWorker(providers, GearboxContracts),
    exactly: new ContractWorker(providers, ExactlyContracts),
    fraxlend: new ContractWorker(providers, FraxlendContracts),
  };
}
