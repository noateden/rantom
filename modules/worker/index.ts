import { AaveContracts } from '../../configs/contracts/aave';
import { AurafinanceContracts } from '../../configs/contracts/aurafinance';
import { BalancerContracts } from '../../configs/contracts/balancer';
import { BeanstalkContracts } from '../../configs/contracts/beanstalk';
import { CompoundContracts, Compoundv3Contracts } from '../../configs/contracts/compound';
import { ConvexContracts } from '../../configs/contracts/convex';
import { CurveContracts } from '../../configs/contracts/curve';
import { Erc20Contracts } from '../../configs/contracts/erc20';
import { Eth2Contracts } from '../../configs/contracts/eth2';
import { LidoContracts } from '../../configs/contracts/lido';
import { LooksrareContracts } from '../../configs/contracts/looksrare';
import { OpenseaContracts } from '../../configs/contracts/opensea';
import { RocketpoolContracts } from '../../configs/contracts/rocketpool';
import { SushiContracts } from '../../configs/contracts/sushi';
import { YearnContracts } from '../../configs/contracts/yearn';
import { GlobalProviders, IContractWorker } from '../../types/namespaces';
import { Erc20SupplyWorker } from './extends/erc20';
import { AaveWorkerHook } from './hooks/aave';
import { AurafinanceWorkerHook } from './hooks/aurafinance';
import { BalancerWorkerHook } from './hooks/balancer';
import { BeanstalkWorkerHook } from './hooks/beanstalk';
import { CompoundWorkerHook, Compoundv3WorkerHook } from './hooks/compound';
import { ConvexWorkerHook } from './hooks/convex';
import { CurveWorkerHook } from './hooks/curve';
import { Eth2WorkerHook } from './hooks/eth2';
import { LidoWorkerHook } from './hooks/lido';
import { LooksrareWorkerHook } from './hooks/looksrare';
import { OpenseaWorkerHook } from './hooks/opensea';
import { RocketpoolWorkerHook } from './hooks/rocketpool';
import { SushiWorkerHook } from './hooks/sushi';
import { YearnWorkerHook } from './hooks/yearn';

export function getWorkers(providers: GlobalProviders): { [key: string]: IContractWorker } {
  return {
    aave: new AaveWorkerHook(providers, AaveContracts),
    opensea: new OpenseaWorkerHook(providers, OpenseaContracts),
    compound: new CompoundWorkerHook(providers, CompoundContracts),
    compoundv3: new Compoundv3WorkerHook(providers, Compoundv3Contracts),
    lido: new LidoWorkerHook(providers, LidoContracts),
    rocketpool: new RocketpoolWorkerHook(providers, RocketpoolContracts),
    beanstalk: new BeanstalkWorkerHook(providers, BeanstalkContracts),
    curve: new CurveWorkerHook(providers, CurveContracts),
    sushi: new SushiWorkerHook(providers, SushiContracts),
    erc20: new Erc20SupplyWorker(providers, Erc20Contracts),
    balancer: new BalancerWorkerHook(providers, BalancerContracts),
    eth2: new Eth2WorkerHook(providers, Eth2Contracts),
    looksrare: new LooksrareWorkerHook(providers, LooksrareContracts),
    yearn: new YearnWorkerHook(providers, YearnContracts),
    convex: new ConvexWorkerHook(providers, ConvexContracts),
    aurafinance: new AurafinanceWorkerHook(providers, AurafinanceContracts),
  };
}
