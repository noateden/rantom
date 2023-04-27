import {
  Aavev1Configs,
  Aavev2Configs,
  Aavev3Configs,
  AbracadabraConfigs,
  ApecoinConfigs,
  AurafinanceConfigs,
  BalancerConfigs,
  BancorConfigs,
  BeanstalkConfigs,
  BeefyConfigs,
  BlurConfigs,
  CarbonConfigs,
  ChainlinkConfigs,
  CompoundConfigs,
  Compoundv3Configs,
  ConicConfigs,
  ConvexConfigs,
  CowswapConfigs,
  CurveConfigs,
  EnsConfigs,
  Eth2Configs,
  EulerConfigs,
  ExactlyConfigs,
  FraxethConfigs,
  FraxlendConfigs,
  FraxswapConfigs,
  GearboxConfigs,
  HopConfigs,
  IronbankConfigs,
  KyberswapAggregatorConfigs,
  LidoConfigs,
  LiquityConfigs,
  LooksrareConfigs,
  LoopringConfigs,
  MakerConfigs,
  MultichainConfigs,
  OpenseaConfigs,
  OptimismConfigs,
  PancakeswapConfigs,
  PancakeswapV3Configs,
  RaribleConfigs,
  RocketpoolConfigs,
  ShibaswapConfigs,
  SiloConfigs,
  StakewiseConfigs,
  StargateConfigs,
  SushiConfigs,
  TornadocashConfigs,
  Uniswapv2Configs,
  Uniswapv3Configs,
  X2y2Configs,
  YearnConfigs,
  ZeroxConfigs,
} from '../../configs/protocols';
import { GlobalProviders, IAdapter } from '../../types/namespaces';
import { Aavev1Adapter } from './aave/aavev1';
import { Aavev2Adapter } from './aave/aavev2';
import { Aavev3Adapter } from './aave/aavev3';
import { AbracadabraAdapter } from './abracadabra/abracadabra';
import { ApecoinAdapter } from './apecoin/apecoin';
import { AurafinanceAdapter } from './aurafinance/aurafinance';
import { BalancerAdapter } from './balancer/balancer';
import { BancorAdapter } from './bancor/bancor';
import { BeanstalkAdapter } from './beanstalk/beanstalk';
import { BeefyAdapter } from './beefy/beefy';
import { BlurAdapter } from './blur/blur';
import { CarbonAdapter } from './carbon/carbon';
import { ChainlinkAdapter } from './chainlink/chainlink';
import { CompoundAdapter } from './compound/compound';
import { Compoundv3Adapter } from './compound/compoundv3';
import { ConicAdapter } from './conic/conic';
import { ConvexAdapter } from './convex/convex';
import { CowswapAdapter } from './cowswap/cowswap';
import { CurveAdapter } from './curve/curve';
import { EnsAdapter } from './ens/ens';
import { Eth2Adapter } from './eth2/eth2';
import { EulerAdapter } from './euler/euler';
import { ExactlyAdapter } from './exactly/exactly';
import { FraxethAdapter } from './fraxeth/fraxeth';
import { FraxlendAdapter } from './fraxlend/fraxlend';
import { GearboxAdapter } from './gearbox/gearbox';
import { HopAdapter } from './hop/hop';
import { IronbankAdapter } from './ironbank/ironbank';
import { KyberswapAggregatorAdapter } from './kyberswap/kyberswap';
import { LidoAdapter } from './lido/lido';
import { LiquityAdapter } from './liquity/liquity';
import { LooksrareAdapter } from './looksrare/looksrare';
import { LoopringAdapter } from './loopring/loopring';
import { MakerAdapter } from './maker/maker';
import { MultichainAdapter } from './multichain/multichain';
import { OpenseaAdapter } from './opensea/opensea';
import { OptimismAdapter } from './optimism/optimism';
import { Pancakeswapv3Adapter } from './pancakeswap/pancakeswapv3';
import { RaribleAdapter } from './rarible/rarible';
import { RocketpoolAdapter } from './rocketpool/rocketpool';
import { SiloAdapter } from './silo/silo';
import { StakewiseAdapter } from './stakewise/stakewise';
import { StargateAdapter } from './stargate/stargate';
import { SushiAdapter } from './sushi/sushi';
import { TornadocashAdapter } from './tornadocash/tornadocash';
import { Uniswapv2Adapter } from './uniswap/uniswapv2';
import { Uniswapv3Adapter } from './uniswap/uniswapv3';
import { X2y2Adapter } from './x2y2/x2y2';
import { YearnAdapter } from './yearn/yearn';
import { ZeroxAdapter } from './zerox/zerox';

export function getAdapters(providers: GlobalProviders | null): Array<IAdapter> {
  return [
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
    new BeanstalkAdapter(BeanstalkConfigs, providers),
    new LooksrareAdapter(LooksrareConfigs, providers),
    new BlurAdapter(BlurConfigs, providers),
    new OpenseaAdapter(OpenseaConfigs, providers),
    new X2y2Adapter(X2y2Configs, providers),
    new Eth2Adapter(Eth2Configs, providers),
    new ChainlinkAdapter(ChainlinkConfigs, providers),
    new ZeroxAdapter(ZeroxConfigs, providers),
    new YearnAdapter(YearnConfigs, providers),
    new TornadocashAdapter(TornadocashConfigs, providers),
    new ConvexAdapter(ConvexConfigs, providers),
    new EulerAdapter(EulerConfigs, providers),
    new LiquityAdapter(LiquityConfigs, providers),
    new AbracadabraAdapter(AbracadabraConfigs, providers),
    new MakerAdapter(MakerConfigs, providers),
    new StargateAdapter(StargateConfigs, providers),
    new SiloAdapter(SiloConfigs, providers),
    new Uniswapv2Adapter(Uniswapv2Configs, providers),
    new Uniswapv2Adapter(PancakeswapConfigs, providers),
    new Uniswapv2Adapter(ShibaswapConfigs, providers),
    new Uniswapv2Adapter(FraxswapConfigs, providers),
    new Uniswapv3Adapter(Uniswapv3Configs, providers),
    new Pancakeswapv3Adapter(PancakeswapV3Configs, providers),
    new SushiAdapter(SushiConfigs, providers),
    new BeefyAdapter(BeefyConfigs, providers),
    new GearboxAdapter(GearboxConfigs, providers),
    new ApecoinAdapter(ApecoinConfigs, providers),
    new FraxlendAdapter(FraxlendConfigs, providers),
    new RaribleAdapter(RaribleConfigs, providers),
    new ExactlyAdapter(ExactlyConfigs, providers),
    new FraxethAdapter(FraxethConfigs, providers),
    new CarbonAdapter(CarbonConfigs, providers),
    new StakewiseAdapter(StakewiseConfigs, providers),
    new ConicAdapter(ConicConfigs, providers),
    new KyberswapAggregatorAdapter(KyberswapAggregatorConfigs, providers),
  ];
}
