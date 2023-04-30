import { AbracadabraContracts } from '../../configs/contracts/abracadabra';
import { AgilityContracts } from '../../configs/contracts/agility';
import { ArrakisContracts } from '../../configs/contracts/arrakis';
import { AurafinanceContracts } from '../../configs/contracts/aurafinance';
import { BinanceContracts } from '../../configs/contracts/binance';
import { CarbonContracts } from '../../configs/contracts/carbon';
import { ConicContracts } from '../../configs/contracts/conic';
import { ConvexContracts } from '../../configs/contracts/convex';
import { EnsContracts } from '../../configs/contracts/ens';
import { ExactlyContracts } from '../../configs/contracts/exactly';
import { FraxethContracts } from '../../configs/contracts/fraxeth';
import { FraxlendContracts } from '../../configs/contracts/fraxlend';
import { GearboxContracts } from '../../configs/contracts/gearbox';
import { KyberswapAggregatorContracts } from '../../configs/contracts/kyperswap';
import { LidoContracts } from '../../configs/contracts/lido';
import { LiquityContracts } from '../../configs/contracts/liquity';
import { LybraContracts } from '../../configs/contracts/lybra';
import { MakerContracts } from '../../configs/contracts/maker';
import { OpenseaContracts } from '../../configs/contracts/opensea';
import { PendleContracts } from '../../configs/contracts/pendle';
import { SiloContracts } from '../../configs/contracts/silo';
import { StakewiseContracts } from '../../configs/contracts/stakewise';
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
    lido: new ContractWorker(providers, LidoContracts),
    stakewise: new ContractWorker(providers, StakewiseContracts),
    liquity: new ContractWorker(providers, LiquityContracts),
    conic: new ContractWorker(providers, ConicContracts),
    kyberswap: new ContractWorker(providers, KyberswapAggregatorContracts),
    arrakis: new ContractWorker(providers, ArrakisContracts),
    lybra: new ContractWorker(providers, LybraContracts),
    pendle: new ContractWorker(providers, PendleContracts),
    binance: new ContractWorker(providers, BinanceContracts),
    agility: new ContractWorker(providers, AgilityContracts),
  };
}
