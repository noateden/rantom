import { AbracadabraContracts } from '../../configs/contracts/abracadabra';
import { AgilityContracts } from '../../configs/contracts/agility';
import { AirswapContracts } from '../../configs/contracts/airswap';
import { AnkrContracts } from '../../configs/contracts/ankr';
import { ArrakisContracts } from '../../configs/contracts/arrakis';
import { AurafinanceContracts } from '../../configs/contracts/aurafinance';
import { BalancerContracts } from '../../configs/contracts/balancer';
import { BinanceContracts } from '../../configs/contracts/binance';
import { BlurContracts } from '../../configs/contracts/blur';
import { BungeeContracts } from '../../configs/contracts/bungee';
import { CarbonContracts } from '../../configs/contracts/carbon';
import { ChaiContracts } from '../../configs/contracts/chai';
import { Compoundv3Contracts } from '../../configs/contracts/compound';
import { ConicContracts } from '../../configs/contracts/conic';
import { ConvexContracts } from '../../configs/contracts/convex';
import { CrvusdContracts } from '../../configs/contracts/crvusd';
import { CurveContracts } from '../../configs/contracts/curve';
import { DodoContracts } from '../../configs/contracts/dodo';
import { EnsContracts } from '../../configs/contracts/ens';
import { Eth2Contracts } from '../../configs/contracts/eth2';
import { ExactlyContracts } from '../../configs/contracts/exactly';
import { FraxethContracts } from '../../configs/contracts/fraxeth';
import { FraxlendContracts } from '../../configs/contracts/fraxlend';
import { GearboxContracts } from '../../configs/contracts/gearbox';
import { KyberswapClassicContracts } from '../../configs/contracts/kyperswap';
import { LidoContracts } from '../../configs/contracts/lido';
import { LiquityContracts } from '../../configs/contracts/liquity';
import { LybraContracts } from '../../configs/contracts/lybra';
import { MakerContracts } from '../../configs/contracts/maker';
import { MaverickContracts } from '../../configs/contracts/maverick';
import { MetamaskContracts } from '../../configs/contracts/metamask';
import { MorphoContracts } from '../../configs/contracts/morpho';
import { OpenoceanContracts } from '../../configs/contracts/openocean';
import { OpenseaContracts } from '../../configs/contracts/opensea';
import { ParaswapContracts } from '../../configs/contracts/paraswap';
import { PendleContracts } from '../../configs/contracts/pendle';
import { RaftContracts } from '../../configs/contracts/raft';
import { SiloContracts } from '../../configs/contracts/silo';
import { SparkContracts } from '../../configs/contracts/spark';
import { StakewiseContracts } from '../../configs/contracts/stakewise';
import { SturdyContracts } from '../../configs/contracts/sturdy';
import { SushiContracts } from '../../configs/contracts/sushi';
import { SwellContracts } from '../../configs/contracts/swell';
import { TornadocashContracts } from '../../configs/contracts/tornadocash';
import { YearnContracts } from '../../configs/contracts/yearn';
import { GlobalProviders, IContractWorker } from '../../types/namespaces';
import { ContractWorker } from './contract';

export function getContractWorkers(providers: GlobalProviders): { [key: string]: IContractWorker } {
  return {
    eth2: new ContractWorker(providers, Eth2Contracts),
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
    kyberswap: new ContractWorker(providers, KyberswapClassicContracts),
    arrakis: new ContractWorker(providers, ArrakisContracts),
    lybra: new ContractWorker(providers, LybraContracts),
    pendle: new ContractWorker(providers, PendleContracts),
    binance: new ContractWorker(providers, BinanceContracts),
    agility: new ContractWorker(providers, AgilityContracts),
    dodo: new ContractWorker(providers, DodoContracts),
    curve: new ContractWorker(providers, CurveContracts),
    yearn: new ContractWorker(providers, YearnContracts),
    balancer: new ContractWorker(providers, BalancerContracts),
    morpho: new ContractWorker(providers, MorphoContracts),
    sushi: new ContractWorker(providers, SushiContracts),
    chai: new ContractWorker(providers, ChaiContracts),
    ankr: new ContractWorker(providers, AnkrContracts),
    paraswap: new ContractWorker(providers, ParaswapContracts),
    compoundv3: new ContractWorker(providers, Compoundv3Contracts),
    metamask: new ContractWorker(providers, MetamaskContracts),
    airswap: new ContractWorker(providers, AirswapContracts),
    bungee: new ContractWorker(providers, BungeeContracts),
    blur: new ContractWorker(providers, BlurContracts),
    spark: new ContractWorker(providers, SparkContracts),
    raft: new ContractWorker(providers, RaftContracts),
    sturdy: new ContractWorker(providers, SturdyContracts),
    swell: new ContractWorker(providers, SwellContracts),
    crvusd: new ContractWorker(providers, CrvusdContracts),
    openocean: new ContractWorker(providers, OpenoceanContracts),
    maverick: new ContractWorker(providers, MaverickContracts),
  };
}
