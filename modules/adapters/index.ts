import {
  BalancerConfigs,
  LidoConfigs,
  PancakeswapConfigs,
  SushiConfigs,
  Uniswapv2Configs,
  Uniswapv3Configs,
} from '../../configs/protocols';
import { GlobalProviders, IAdapter } from '../../types/namespaces';
import { BalancerAdapter } from './balancer/balancer';
import { LidoAdapter } from './lido/lido';
import { Uniswapv2Adapter } from './uniswap/uniswapv2';
import { Uniswapv3Adapter } from './uniswap/uniswapv3';

export function getAdapters(providers: GlobalProviders | null): Array<IAdapter> {
  return [
    new Uniswapv3Adapter(Uniswapv3Configs, providers),
    new Uniswapv2Adapter(Uniswapv2Configs, providers),
    new Uniswapv2Adapter(SushiConfigs, providers),
    new Uniswapv2Adapter(PancakeswapConfigs, providers),

    new LidoAdapter(LidoConfigs, providers),

    new BalancerAdapter(BalancerConfigs, providers),
  ];
}
