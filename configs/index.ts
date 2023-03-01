// The version value tracks known actions and transfers of a release version
// If a transaction is found in database with the same version, Rantom will not parse that transaction
// Otherwise, Rantom will get transaction from blockchain, parse and save into database
// If there is any updates or integrations, we need to increase this version value
import { ProtocolConfig } from '../types/configs';
import {
  Aavev1Configs,
  Aavev2Configs,
  Aavev3Configs,
  AurafinanceConfigs,
  BalancerConfigs,
  BancorConfigs,
  BeanstalkConfigs,
  BlurConfigs,
  CompoundConfigs,
  Compoundv3Configs,
  CowswapConfigs,
  CurveConfigs,
  EnsConfigs,
  FraxswapConfigs,
  HopConfigs,
  IronbankConfigs,
  LidoConfigs,
  LooksrareConfigs,
  LoopringConfigs,
  MultichainConfigs,
  OpenseaConfigs,
  OptimismConfigs,
  PancakeswapConfigs,
  RocketpoolConfigs,
  ShibaswapConfigs,
  SushiConfigs,
  Uniswapv2Configs,
  Uniswapv3Configs,
  X2y2Configs,
} from './protocols';

export const ParserVersion = '1.0.1';

// return latest transactions on-chain
export const MaxExploreTransactions = 3;

// return initial block for worker syncing
export const WorkerGenesisBlocks: { [key: string]: number } = {
  ethereum: 16720733, // Feb-27-2023 04:30:59 PM +UTC
};

export const AllProtocolConfigs: { [key: string]: ProtocolConfig } = {
  uniswapv2: Uniswapv2Configs,
  uniswapv3: Uniswapv3Configs,
  lido: LidoConfigs,
  sushi: SushiConfigs,
  pancakeswap: PancakeswapConfigs,
  balancer: BalancerConfigs,
  aavev1: Aavev1Configs,
  aavev2: Aavev2Configs,
  aavev3: Aavev3Configs,
  shibaswap: ShibaswapConfigs,
  fraxswap: FraxswapConfigs,
  compound: CompoundConfigs,
  compoundv3: Compoundv3Configs,
  ironbank: IronbankConfigs,
  rocketpool: RocketpoolConfigs,
  curve: CurveConfigs,
  cowswap: CowswapConfigs,
  loopring: LoopringConfigs,
  bancor: BancorConfigs,
  aurafinance: AurafinanceConfigs,
  ens: EnsConfigs,
  optimism: OptimismConfigs,
  hop: HopConfigs,
  multichain: MultichainConfigs,
  beanstalk: BeanstalkConfigs,
  blur: BlurConfigs,
  looksrare: LooksrareConfigs,
  opensea: OpenseaConfigs,
  x2y2: X2y2Configs,
};
