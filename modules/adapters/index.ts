import {
  Aavev1Configs,
  Aavev2Configs,
  Aavev3Configs,
  AbracadabraConfigs,
  AgilityConfigs,
  AirswapConfigs,
  AnkrConfigs,
  ApecoinConfigs,
  ArrakisConfigs,
  AurafinanceConfigs,
  BalancerConfigs,
  BancorConfigs,
  BeanstalkConfigs,
  BeefyConfigs,
  BinanceStakedEthConfigs,
  BlurConfigs,
  BungeeConfigs,
  CarbonConfigs,
  ChaiConfigs,
  ChainlinkConfigs,
  CompoundConfigs,
  Compoundv3Configs,
  ConicConfigs,
  ConvexConfigs,
  CowswapConfigs,
  CrvusdConfigs,
  CurveConfigs,
  DodoConfigs,
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
  KyberswapClassicConfigs,
  LidoConfigs,
  LiquityConfigs,
  LooksrareConfigs,
  LoopringConfigs,
  LybraConfigs,
  MakerConfigs,
  MetamaskConfigs,
  MorphoConfigs,
  MultichainConfigs,
  OpenseaConfigs,
  OptimismConfigs,
  PancakeswapConfigs,
  PancakeswapV3Configs,
  ParaswapConfigs,
  PendleConfigs,
  RaftConfigs,
  RaribleConfigs,
  RocketpoolConfigs,
  ShibaswapConfigs,
  SiloConfigs,
  SparkConfigs,
  StakewiseConfigs,
  StargateConfigs,
  SturdyConfigs,
  SushiConfigs,
  Sushiv3Configs,
  SwellConfigs,
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
import { AgilityAdapter } from './agility/agility';
import { AirswapAdapter } from './airswap/airswap';
import { AnkrAdapter } from './ankr/ankr';
import { ApecoinAdapter } from './apecoin/apecoin';
import { ArrakisAdapter } from './arrakis/arrakis';
import { AurafinanceAdapter } from './aurafinance/aurafinance';
import { BalancerAdapter } from './balancer/balancer';
import { BancorAdapter } from './bancor/bancor';
import { BeanstalkAdapter } from './beanstalk/beanstalk';
import { BeefyAdapter } from './beefy/beefy';
import { BinanceStakedAdapter } from './binance/stakedEth';
import { BlurAdapter } from './blur/blur';
import { BungeeAdapter } from './bungee/bungee';
import { CarbonAdapter } from './carbon/carbon';
import { ChaiAdapter } from './chai/chai';
import { ChainlinkAdapter } from './chainlink/chainlink';
import { CompoundAdapter } from './compound/compound';
import { Compoundv3Adapter } from './compound/compoundv3';
import { ConicAdapter } from './conic/conic';
import { ConvexAdapter } from './convex/convex';
import { CowswapAdapter } from './cowswap/cowswap';
import { CrvusdAdapter } from './crvusd/crvusd';
import { CurveAdapter } from './curve/curve';
import { DodoAdapter } from './dodo/dodo';
import { EnsAdapter } from './ens/ens';
import { Eth2Adapter } from './eth2/eth2';
import { EulerAdapter } from './euler/euler';
import { ExactlyAdapter } from './exactly/exactly';
import { FraxethAdapter } from './fraxeth/fraxeth';
import { FraxlendAdapter } from './fraxlend/fraxlend';
import { GearboxAdapter } from './gearbox/gearbox';
import { HopAdapter } from './hop/hop';
import { IronbankAdapter } from './ironbank/ironbank';
import { KyberswapAggregatorAdapter } from './kyberswap/kyberswapAggregator';
import { KyberswapClassicAdapter } from './kyberswap/kyberswapClassic';
import { LidoAdapter } from './lido/lido';
import { LiquityAdapter } from './liquity/liquity';
import { LooksrareAdapter } from './looksrare/looksrare';
import { LoopringAdapter } from './loopring/loopring';
import { LybraAdapter } from './lybra/lybra';
import { MakerAdapter } from './maker/maker';
import { MetamaskAdapter } from './metamask/metamask';
import { MorphoAdapter } from './morpho/morpho';
import { MultichainAdapter } from './multichain/multichain';
import { OpenseaAdapter } from './opensea/opensea';
import { OptimismAdapter } from './optimism/optimism';
import { Pancakeswapv3Adapter } from './pancakeswap/pancakeswapv3';
import { ParaswapAdapter } from './paraswap/paraswap';
import { PendleAdapter } from './pendle/pendle';
import { RaftAdapter } from './raft/raft';
import { RaribleAdapter } from './rarible/rarible';
import { RocketpoolAdapter } from './rocketpool/rocketpool';
import { SiloAdapter } from './silo/silo';
import { StakewiseAdapter } from './stakewise/stakewise';
import { StargateAdapter } from './stargate/stargate';
import { SturdyAdapter } from './sturdy/sturdy';
import { SushiAdapter } from './sushi/sushi';
import { Sushiv3Adapter } from './sushi/sushiv3';
import { SwellAdapter } from './swell/swell';
import { TornadocashAdapter } from './tornadocash/tornadocash';
import { Uniswapv2Adapter } from './uniswap/uniswapv2';
import { Uniswapv3Adapter } from './uniswap/uniswapv3';
import { X2y2Adapter } from './x2y2/x2y2';
import { YearnAdapter } from './yearn/yearn';
import { ZeroxAdapter } from './zerox/zerox';

export function getAdapters(providers: GlobalProviders | null): Array<IAdapter> {
  const mapping = getAdapterMapping(providers);
  return [...Object.keys(mapping).map((key) => mapping[key])];
}

export function getAdapterMapping(providers: GlobalProviders | null): { [key: string]: IAdapter } {
  return {
    lido: new LidoAdapter(LidoConfigs, providers),
    balancer: new BalancerAdapter(BalancerConfigs, providers),
    aavev1: new Aavev1Adapter(Aavev1Configs, providers),
    aavev2: new Aavev2Adapter(Aavev2Configs, providers),
    aavev3: new Aavev3Adapter(Aavev3Configs, providers),
    compound: new CompoundAdapter(CompoundConfigs, providers),
    compoundv3: new Compoundv3Adapter(Compoundv3Configs, providers),
    ironbank: new IronbankAdapter(IronbankConfigs, providers),
    rocketpool: new RocketpoolAdapter(RocketpoolConfigs, providers),
    cowswap: new CowswapAdapter(CowswapConfigs, providers),
    loopring: new LoopringAdapter(LoopringConfigs, providers),
    bancor: new BancorAdapter(BancorConfigs, providers),
    aurafinance: new AurafinanceAdapter(AurafinanceConfigs, providers),
    ens: new EnsAdapter(EnsConfigs, providers),
    optimism: new OptimismAdapter(OptimismConfigs, providers),
    hop: new HopAdapter(HopConfigs, providers),
    multichain: new MultichainAdapter(MultichainConfigs, providers),
    beanstalk: new BeanstalkAdapter(BeanstalkConfigs, providers),
    looksrare: new LooksrareAdapter(LooksrareConfigs, providers),
    blur: new BlurAdapter(BlurConfigs, providers),
    opensea: new OpenseaAdapter(OpenseaConfigs, providers),
    x2y2: new X2y2Adapter(X2y2Configs, providers),
    eth2: new Eth2Adapter(Eth2Configs, providers),
    chainlink: new ChainlinkAdapter(ChainlinkConfigs, providers),
    zerox: new ZeroxAdapter(ZeroxConfigs, providers),
    yearn: new YearnAdapter(YearnConfigs, providers),
    tornadocash: new TornadocashAdapter(TornadocashConfigs, providers),
    convex: new ConvexAdapter(ConvexConfigs, providers),
    euler: new EulerAdapter(EulerConfigs, providers),
    liquity: new LiquityAdapter(LiquityConfigs, providers),
    abracadabra: new AbracadabraAdapter(AbracadabraConfigs, providers),
    maker: new MakerAdapter(MakerConfigs, providers),
    stargate: new StargateAdapter(StargateConfigs, providers),
    silo: new SiloAdapter(SiloConfigs, providers),
    uniswapv2: new Uniswapv2Adapter(Uniswapv2Configs, providers),
    pancakeswap: new Uniswapv2Adapter(PancakeswapConfigs, providers),
    shibaswap: new Uniswapv2Adapter(ShibaswapConfigs, providers),
    fraxswap: new Uniswapv2Adapter(FraxswapConfigs, providers),
    uniswapv3: new Uniswapv3Adapter(Uniswapv3Configs, providers),
    pancakeswapv3: new Pancakeswapv3Adapter(PancakeswapV3Configs, providers),
    sushi: new SushiAdapter(SushiConfigs, providers),
    sushiv3: new Sushiv3Adapter(Sushiv3Configs, providers),
    beefy: new BeefyAdapter(BeefyConfigs, providers),
    gearbox: new GearboxAdapter(GearboxConfigs, providers),
    apecoin: new ApecoinAdapter(ApecoinConfigs, providers),
    fraxlend: new FraxlendAdapter(FraxlendConfigs, providers),
    rarible: new RaribleAdapter(RaribleConfigs, providers),
    exactly: new ExactlyAdapter(ExactlyConfigs, providers),
    fraxeth: new FraxethAdapter(FraxethConfigs, providers),
    carbon: new CarbonAdapter(CarbonConfigs, providers),
    stakewise: new StakewiseAdapter(StakewiseConfigs, providers),
    conic: new ConicAdapter(ConicConfigs, providers),
    'kyberswap-aggregator': new KyberswapAggregatorAdapter(KyberswapAggregatorConfigs, providers),
    'kyberswap-classic': new KyberswapClassicAdapter(KyberswapClassicConfigs, providers),
    arrakis: new ArrakisAdapter(ArrakisConfigs, providers),
    lybra: new LybraAdapter(LybraConfigs, providers),
    pendle: new PendleAdapter(PendleConfigs, providers),
    'binance-staked-eth': new BinanceStakedAdapter(BinanceStakedEthConfigs, providers),
    agility: new AgilityAdapter(AgilityConfigs, providers),
    dodo: new DodoAdapter(DodoConfigs, providers),
    curve: new CurveAdapter(CurveConfigs, providers),
    morpho: new MorphoAdapter(MorphoConfigs, providers),
    chai: new ChaiAdapter(ChaiConfigs, providers),
    ankr: new AnkrAdapter(AnkrConfigs, providers),
    paraswap: new ParaswapAdapter(ParaswapConfigs, providers),
    metamask: new MetamaskAdapter(MetamaskConfigs, providers),
    airswap: new AirswapAdapter(AirswapConfigs, providers),
    bungee: new BungeeAdapter(BungeeConfigs, providers),
    spark: new Aavev3Adapter(SparkConfigs, providers),
    raft: new RaftAdapter(RaftConfigs, providers),
    sturdy: new SturdyAdapter(SturdyConfigs, providers),
    swell: new SwellAdapter(SwellConfigs, providers),
    crvusd: new CrvusdAdapter(CrvusdConfigs, providers),
  };
}
