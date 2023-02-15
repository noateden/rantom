import {
  Aavev1Configs,
  Aavev2Configs,
  Aavev3Configs,
  BalancerConfigs,
  CompoundConfigs,
  FraxswapConfigs,
  IronbankConfigs,
  LidoConfigs,
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
import { BalancerAdapter } from './balancer/balancer';
import { CompoundAdapter } from './compound/compound';
import { IronbankAdapter } from './ironbank/ironbank';
import { LidoAdapter } from './lido/lido';
import { RocketpoolAdapter } from './rocketpool/rocketpool';
import { Uniswapv2Adapter } from './uniswap/uniswapv2';
import { Uniswapv3Adapter } from './uniswap/uniswapv3';

export function getAdapters(providers: GlobalProviders | null): Array<IAdapter> {
  return [
    new Uniswapv3Adapter(Uniswapv3Configs, providers),
    new Uniswapv2Adapter(Uniswapv2Configs, providers),
    new Uniswapv2Adapter(SushiConfigs, providers),
    new Uniswapv2Adapter(PancakeswapConfigs, providers),
    new Uniswapv2Adapter(ShibaswapConfigs, providers),
    new Uniswapv2Adapter(FraxswapConfigs, providers),

    new LidoAdapter(LidoConfigs, providers),

    new BalancerAdapter(BalancerConfigs, providers),

    new Aavev1Adapter(Aavev1Configs, providers),
    new Aavev2Adapter(Aavev2Configs, providers),
    new Aavev3Adapter(Aavev3Configs, providers),

    new CompoundAdapter(CompoundConfigs, providers),
    new IronbankAdapter(IronbankConfigs, providers),

    new RocketpoolAdapter(RocketpoolConfigs, providers),
  ];
}
