import { AbracadabraContracts } from '../../configs/contracts/abracadabra';
import { AurafinanceContracts } from '../../configs/contracts/aurafinance';
import { CarbonContracts } from '../../configs/contracts/carbon';
import { ConvexContracts } from '../../configs/contracts/convex';
import { EnsContracts } from '../../configs/contracts/ens';
import { ExactlyContracts } from '../../configs/contracts/exactly';
import { FraxethContracts } from '../../configs/contracts/fraxeth';
import { FraxlendContracts } from '../../configs/contracts/fraxlend';
import { GearboxContracts } from '../../configs/contracts/gearbox';
import { MakerContracts } from '../../configs/contracts/maker';
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
    fraxeth: new ContractWorker(providers, FraxethContracts),
    convex: new ContractWorker(providers, ConvexContracts),
    aurafinance: new ContractWorker(providers, AurafinanceContracts),
    carbon: new ContractWorker(providers, CarbonContracts),
    maker: new ContractWorker(providers, MakerContracts),
  };
}
