import { ProtocolConfig } from '../../types/configs';
import { Aavev1Configs, Aavev2Configs, Aavev3Configs } from './aave';
import { AbracadabraConfigs } from './abracadabra';
import { AirswapConfigs } from './airswap';
import { AnkrConfigs } from './ankr';
import { ApecoinConfigs } from './apecoin';
import { AurafinanceConfigs } from './aurafinance';
import { BalancerConfigs } from './balancer';
import { BancorConfigs } from './bancor';
import { BasebridgeConfigs } from './base';
import { BasinConfigs } from './basin';
import { BeethovenxConfigs } from './beethovenx';
import { BungeeConfigs } from './bungee';
import { CamelotConfigs, Camelotv3Configs } from './camelot';
import { CarbonConfigs } from './carbon';
import { CelerbridgeConfigs } from './celerbridge';
import { ChaiConfigs } from './chai';
import { ClipperConfigs } from './clipper';
import { CompoundConfigs, Compoundv3Configs } from './compound';
import { ConvexConfigs } from './convex';
import { CowswapConfigs } from './cowswap';
import { CrvusdConfigs } from './curve';
import { DodoConfigs, DodoexConfigs } from './dodo';
import { EnsConfigs } from './ens';
import { Eth2Configs } from './eth2';
import { ExactlyConfigs } from './exactly';
import { FluxfinanceConfigs } from './fluxfinance';
import { FraxethConfigs } from './fraxeth';
import { FraxlendConfigs } from './fraxlend';
import { FraxswapConfigs } from './fraxswap';
import { GearboxConfigs } from './gearbox';
import { GmxConfigs, Gmxv2Configs } from './gmx';
import { GravitaConfigs } from './gravita';
import { IronbankConfigs } from './ironbank';
import { KyberswapAggregatorConfigs, KyberswapElasticConfigs } from './kyberswap';
import { LevelfinanceConfigs } from './levelfinance';
import { LidoConfigs } from './lido';
import { LiquityConfigs } from './liquity';
import { MakerConfigs } from './maker';
import { MaverickConfigs } from './maverick';
import { MetamaskConfigs } from './metamask';
import { MorphoConfigs } from './morpho';
import { MuxConfigs } from './mux';
import { NativeConfigs } from './native';
import { OdosConfigs } from './odos';
import { OneinchConfigs } from './oneinch';
import { OpenoceanConfigs } from './openocean';
import { PancakeswapConfigs, Pancakeswapv3Configs } from './pancakeswap';
import { ParaswapConfigs } from './paraswap';
import { PrismaConfigs } from './prisma';
import { RadiantConfigs } from './radiant';
import { ReflexerConfigs } from './reflexer';
import { RocketpoolConfigs } from './rocketpool';
import { SeamlessConfigs } from './seamless';
import { ShibaswapConfigs } from './shibaswap';
import { SiloConfigs } from './silo';
import { SonnefinanceConfigs } from './sonnefinance';
import { SparkConfigs } from './spark';
import { StakewiseConfigs } from './stakewise';
import { StargateConfigs } from './stargate';
import { SturdyConfigs } from './sturdy';
import { SushiConfigs, Sushiv3Configs } from './sushi';
import { SwellConfigs } from './swell';
import { TraderjoeConfigs, Traderjoev2Configs } from './traderjoe';
import { Uniswapv2Configs, Uniswapv3Configs } from './uniswap';
import { VenusConfigs } from './venus';
import { YearnConfigs, YearnyethConfig } from './yearn';
import { ZeroxConfigs } from './zerox';

export const ProtocolConfigs: { [key: string]: ProtocolConfig } = {
  aavev1: Aavev1Configs,
  aavev2: Aavev2Configs,
  aavev3: Aavev3Configs,
  uniswapv2: Uniswapv2Configs,
  uniswapv3: Uniswapv3Configs,
  compound: CompoundConfigs,
  compoundv3: Compoundv3Configs,
  sushi: SushiConfigs,
  sushiv3: Sushiv3Configs,
  pancakeswap: PancakeswapConfigs,
  pancakeswapv3: Pancakeswapv3Configs,
  'kyberswap-elastic': KyberswapElasticConfigs,
  'kyberswap-aggregator': KyberswapAggregatorConfigs,
  camelot: CamelotConfigs,
  camelotv3: Camelotv3Configs,
  balancer: BalancerConfigs,
  beethovenx: BeethovenxConfigs,
  maverick: MaverickConfigs,
  ironbank: IronbankConfigs,
  fluxfinance: FluxfinanceConfigs,
  crvusd: CrvusdConfigs,
  abracadabra: AbracadabraConfigs,
  fraxlend: FraxlendConfigs,
  exactly: ExactlyConfigs,
  liquity: LiquityConfigs,
  gravita: GravitaConfigs,
  maker: MakerConfigs,
  morpho: MorphoConfigs,
  prisma: PrismaConfigs,
  radiant: RadiantConfigs,
  seamless: SeamlessConfigs,
  sonnefinance: SonnefinanceConfigs,
  spark: SparkConfigs,
  silo: SiloConfigs,
  sturdy: SturdyConfigs,
  airswap: AirswapConfigs,
  bancor: BancorConfigs,
  basin: BasinConfigs,
  carbon: CarbonConfigs,
  cowswap: CowswapConfigs,
  dodo: DodoConfigs,
  dodoex: DodoexConfigs,
  fraxswap: FraxswapConfigs,
  paraswap: ParaswapConfigs,
  shibaswap: ShibaswapConfigs,
  zerox: ZeroxConfigs,
  clipper: ClipperConfigs,
  odos: OdosConfigs,
  gmx: GmxConfigs,
  gmxv2: Gmxv2Configs,
  levelfinance: LevelfinanceConfigs,
  traderjoe: TraderjoeConfigs,
  traderjoev2: Traderjoev2Configs,
  openocean: OpenoceanConfigs,
  mux: MuxConfigs,
  apecoin: ApecoinConfigs,
  ankr: AnkrConfigs,
  eth2: Eth2Configs,
  convex: ConvexConfigs,
  aurafinance: AurafinanceConfigs,
  chai: ChaiConfigs,
  lido: LidoConfigs,
  fraxeth: FraxethConfigs,
  rocketpool: RocketpoolConfigs,
  stakewise: StakewiseConfigs,
  swell: SwellConfigs,
  ens: EnsConfigs,
  reflexer: ReflexerConfigs,
  yearn: YearnConfigs,
  yearnyeth: YearnyethConfig,
  stargate: StargateConfigs,
  bungee: BungeeConfigs,
  basebridge: BasebridgeConfigs,
  celerbridge: CelerbridgeConfigs,
  oneinch: OneinchConfigs,
  metamask: MetamaskConfigs,
  gearbox: GearboxConfigs,
  venus: VenusConfigs,
  native: NativeConfigs,
};
