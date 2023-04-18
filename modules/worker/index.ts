import { AbracadabraContracts } from '../../configs/contracts/abracadabra';
import { EnsContracts } from '../../configs/contracts/ens';
import { ExactlyContracts } from '../../configs/contracts/exactly';
import { FraxlendContracts } from '../../configs/contracts/fraxlend';
import { GearboxContracts } from '../../configs/contracts/gearbox';
import { OpenseaContracts } from '../../configs/contracts/opensea';
import { SiloContracts } from '../../configs/contracts/silo';
import { TornadocashContracts } from '../../configs/contracts/tornadocash';
import { GlobalProviders, IContractWorker } from '../../types/namespaces';
import { ContractWorker } from './contract';

export function getContractWorkers(providers: GlobalProviders): { [key: string]: IContractWorker } {
  return {
    abracadabra: new ContractWorker(providers, AbracadabraContracts),
    gearbox: new ContractWorker(providers, GearboxContracts),
    exactly: new ContractWorker(providers, ExactlyContracts),
    fraxlend: new ContractWorker(providers, FraxlendContracts),
    tornadocash: new ContractWorker(providers, TornadocashContracts),
    ens: new ContractWorker(providers, EnsContracts),
    opensea: new ContractWorker(providers, OpenseaContracts),
    silo: new ContractWorker(providers, SiloContracts),
  };
}
