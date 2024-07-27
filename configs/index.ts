import { ProtocolConfig, Token } from '../types/configs';
import { Aavev1Configs, Aavev2Configs, Aavev3Configs } from './protocols/aave';
import { AbracadabraConfigs } from './protocols/abracadabra';
import { AirswapConfigs } from './protocols/airswap';
import { AnkrConfigs } from './protocols/ankr';
import { ApecoinConfigs } from './protocols/apecoin';
import { AurafinanceConfigs } from './protocols/aurafinance';
import { BalancerConfigs } from './protocols/balancer';
import { BancorConfigs } from './protocols/bancor';
import { BasebridgeConfigs } from './protocols/base';
import { BasinConfigs } from './protocols/basin';
import { BeethovenxConfigs } from './protocols/beethovenx';
import { BungeeConfigs } from './protocols/bungee';
import { CamelotConfigs, Camelotv3Configs } from './protocols/camelot';
import { CarbonConfigs } from './protocols/carbon';
import { CelerbridgeConfigs } from './protocols/celerbridge';
import { ChaiConfigs } from './protocols/chai';
import { ClipperConfigs } from './protocols/clipper';
import { CompoundConfigs, Compoundv3Configs } from './protocols/compound';
import { ConvexConfigs } from './protocols/convex';
import { CowswapConfigs } from './protocols/cowswap';
import { CrvusdConfigs, CurveConfigs } from './protocols/curve';
import { DodoConfigs, DodoexConfigs } from './protocols/dodo';
import { EnsConfigs } from './protocols/ens';
import { Eth2Configs } from './protocols/eth2';
import { EtherfiConfigs } from './protocols/etherfi';
import { ExactlyConfigs } from './protocols/exactly';
import { FluxfinanceConfigs } from './protocols/fluxfinance';
import { FraxethConfigs } from './protocols/fraxeth';
import { FraxlendConfigs } from './protocols/fraxlend';
import { FraxswapConfigs } from './protocols/fraxswap';
import { GearboxConfigs } from './protocols/gearbox';
import { GmxConfigs, Gmxv2Configs } from './protocols/gmx';
import { GravitaConfigs } from './protocols/gravita';
import { IronbankConfigs } from './protocols/ironbank';
import { KelpdaoConfigs } from './protocols/kelpdao';
import { KyberswapAggregatorConfigs, KyberswapElasticConfigs } from './protocols/kyberswap';
import { LevelfinanceConfigs } from './protocols/levelfinance';
import { LidoConfigs } from './protocols/lido';
import { LiquityConfigs } from './protocols/liquity';
import { MakerConfigs } from './protocols/maker';
import { MaverickConfigs } from './protocols/maverick';
import { MetamaskConfigs } from './protocols/metamask';
import { MorphoConfigs } from './protocols/morpho';
import { MuxConfigs } from './protocols/mux';
import { NativeConfigs } from './protocols/native';
import { OdosConfigs } from './protocols/odos';
import { OneinchConfigs } from './protocols/oneinch';
import { OpenoceanConfigs } from './protocols/openocean';
import { PancakeswapConfigs, Pancakeswapv3Configs } from './protocols/pancakeswap';
import { ParaswapConfigs } from './protocols/paraswap';
import { PrismaConfigs } from './protocols/prisma';
import { PufferConfigs } from './protocols/puffer';
import { RadiantConfigs } from './protocols/radiant';
import { ReflexerConfigs } from './protocols/reflexer';
import { RenzoConfigs } from './protocols/renzo';
import { RocketpoolConfigs } from './protocols/rocketpool';
import { SeamlessConfigs } from './protocols/seamless';
import { ShibaswapConfigs } from './protocols/shibaswap';
import { SiloConfigs } from './protocols/silo';
import { SonnefinanceConfigs } from './protocols/sonnefinance';
import { SparkConfigs } from './protocols/spark';
import { StakewiseConfigs } from './protocols/stakewise';
import { StargateConfigs } from './protocols/stargate';
import { SturdyConfigs } from './protocols/sturdy';
import { SushiConfigs, Sushiv3Configs } from './protocols/sushi';
import { SwellConfigs } from './protocols/swell';
import { TraderjoeConfigs, Traderjoev2Configs } from './protocols/traderjoe';
import { Uniswapv2Configs, Uniswapv3Configs } from './protocols/uniswap';
import { VenusConfigs } from './protocols/venus';
import { YearnConfigs, YearnV3VaultConfigs, YearnyethConfig } from './protocols/yearn';
import { ZeroxConfigs } from './protocols/zerox';
import TokenListArbitrum from './tokenlists/arbitrum.json';
import TokenListAvalanche from './tokenlists/avalanche.json';
import TokenListBase from './tokenlists/base.json';
import TokenListBnbchain from './tokenlists/bnbchain.json';
import TokenListCelo from './tokenlists/celo.json';
import TokenListEthereum from './tokenlists/ethereum.json';
import TokenListFantom from './tokenlists/fantom.json';
import TokenListGnosis from './tokenlists/gnosis.json';
import TokenListLinea from './tokenlists/linea.json';
import TokenListMetis from './tokenlists/metis.json';
import TokenListOptimism from './tokenlists/optimism.json';
import TokenListPolygon from './tokenlists/polygon.json';
import TokenListPolygonzkevm from './tokenlists/polygonzkevm.json';
import TokenListZksyncera from './tokenlists/zksyncera.json';

export const TokenList: {
  [key: string]: {
    [key: string]: Token;
  };
} = {
  ethereum: TokenListEthereum,
  arbitrum: TokenListArbitrum,
  base: TokenListBase,
  optimism: TokenListOptimism,
  polygon: TokenListPolygon,
  bnbchain: TokenListBnbchain,
  avalanche: TokenListAvalanche,
  fantom: TokenListFantom,
  linea: TokenListLinea,
  zksyncera: TokenListZksyncera,
  polygonzkevm: TokenListPolygonzkevm,
  celo: TokenListCelo,
  metis: TokenListMetis,
  gnosis: TokenListGnosis,
};

export const DefaultQueryLogsBlockRange = 50;
export const DefaultQueryLogsBlockRangeSingleContract = 5000;

// chain => ethereum
export const DefaultQueryLogsRanges: { [key: string]: number } = {
  polygon: 50,
  linea: 50,
  zksyncera: 20,
};

// we save latest parsed transactions into database for fast query
// this value is the number of seconds of the caching
export const DefaultParserCachingTime = 5 * 60;

// api server
export const DefaultQueryResultLimit = 200;

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
  renzo: RenzoConfigs,
  etherfi: EtherfiConfigs,
  puffer: PufferConfigs,
  kelpdao: KelpdaoConfigs,
  curve: CurveConfigs,
  yearnV3Vault: YearnV3VaultConfigs,
};
