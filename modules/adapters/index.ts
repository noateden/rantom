import {
  Aavev1Configs,
  Aavev2Configs,
  Aavev3Configs,
  AurafinanceConfigs,
  BalancerConfigs,
  BancorConfigs,
  CompoundConfigs,
  Compoundv3Configs,
  CowswapConfigs,
  CurveConfigs,
  EnsConfigs,
  FraxswapConfigs,
  HopConfigs,
  IronbankConfigs,
  LidoConfigs,
  LoopringConfigs,
  MultichainConfigs,
  OptimismConfigs,
  PancakeswapConfigs,
  RocketpoolConfigs,
  ShibaswapConfigs,
  SushiConfigs,
  Uniswapv2Configs,
  Uniswapv3Configs,
} from '../../configs/protocols';
import { GlobalProviders, IAdapter } from '../../types/namespaces';
import { Aavev1Adapter } from './aave/aavev1';
import { Aavev2Adapter } from './aave/aavev2';
import { Aavev3Adapter } from './aave/aavev3';
import { AurafinanceAdapter } from './aurafinance/aurafinance';
import { BalancerAdapter } from './balancer/balancer';
import { BancorAdapter } from './bancor/bancor';
import { CompoundAdapter } from './compound/compound';
import { Compoundv3Adapter } from './compound/compoundv3';
import { CowswapAdapter } from './cowswap/cowswap';
import { CurveAdapter } from './curve/curve';
import { EnsAdapter } from './ens/ens';
import { HopAdapter } from './hop/hop';
import { IronbankAdapter } from './ironbank/ironbank';
import { LidoAdapter } from './lido/lido';
import { LoopringAdapter } from './loopring/loopring';
import { MultichainAdapter } from './multichain/multichain';
import { OptimismAdapter } from './optimism/optimism';
import { RocketpoolAdapter } from './rocketpool/rocketpool';
import { SushiAdapter } from './sushi/sushi';
import { Uniswapv2Adapter } from './uniswap/uniswapv2';
import { Uniswapv3Adapter } from './uniswap/uniswapv3';

export function getAdapters(providers: GlobalProviders | null): Array<IAdapter> {
  return [
    new Uniswapv3Adapter(Uniswapv3Configs, providers),
    new Uniswapv2Adapter(Uniswapv2Configs, providers),
    new Uniswapv2Adapter(PancakeswapConfigs, providers),
    new Uniswapv2Adapter(ShibaswapConfigs, providers),
    new Uniswapv2Adapter(FraxswapConfigs, providers),

    new SushiAdapter(SushiConfigs, providers),
    new LidoAdapter(LidoConfigs, providers),
    new CurveAdapter(CurveConfigs, providers),

    new BalancerAdapter(BalancerConfigs, providers),

    new Aavev1Adapter(Aavev1Configs, providers),
    new Aavev2Adapter(Aavev2Configs, providers),
    new Aavev3Adapter(Aavev3Configs, providers),

    new CompoundAdapter(CompoundConfigs, providers),
    new Compoundv3Adapter(Compoundv3Configs, providers),
    new IronbankAdapter(IronbankConfigs, providers),

    new RocketpoolAdapter(RocketpoolConfigs, providers),
    new CowswapAdapter(CowswapConfigs, providers),
    new LoopringAdapter(LoopringConfigs, providers),
    new BancorAdapter(BancorConfigs, providers),
    new AurafinanceAdapter(AurafinanceConfigs, providers),
    new EnsAdapter(EnsConfigs, providers),
    new OptimismAdapter(OptimismConfigs, providers),
    new HopAdapter(HopConfigs, providers),
    new MultichainAdapter(MultichainConfigs, providers),
  ];
}
