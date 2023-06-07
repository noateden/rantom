import { TestLog } from '../types';
import { AaveActionTestLogs } from './protocols/aave';
import { AbracadabraActionTestLogs } from './protocols/abracadabra';
import { AgilityActionTestLogs } from './protocols/agility';
import { AirswapActionTestLogs } from './protocols/airswap';
import { AnkrActionTestLogs } from './protocols/ankr';
import { ApecoinActionTestLogs } from './protocols/apecoin';
import { ArrakisActionTestLogs } from './protocols/arrakis';
import { AurafinanceActionTestLogs } from './protocols/aurafinance';
import { BalancerActionTestLogs } from './protocols/balancer';
import { BancorActionTestLogs } from './protocols/bancor';
import { BeanstalkActionTestLogs } from './protocols/beanstalk';
import { BeefyActionTestLogs } from './protocols/beefy';
import { BlurActionTestLogs } from './protocols/blur';
import { BungeeActionTestLogs } from './protocols/bungee';
import { CarbonActionTestLogs } from './protocols/carbon';
import { ChaiActionTestLogs } from './protocols/chai';
import { ChainlinkActionTestLogs } from './protocols/chainlink';
import { Compound3ActionTestLogs, CompoundActionTestLogs } from './protocols/compound';
import { ConicActionTestLogs } from './protocols/conic';
import { ConvexActionTestLogs } from './protocols/convex';
import { CowswapActionTestLogs } from './protocols/cowswap';
import { CrvusdActionTestLogs } from './protocols/crvusd';
import { CurveActionTestLogs } from './protocols/curve';
import { DodoActionTestLogs } from './protocols/dodo';
import { EnsActionTestLogs } from './protocols/ens';
import { Eth2ActionTestLogs } from './protocols/eth2';
import { EulerActionTestLogs } from './protocols/euler';
import { ExactlyActionTestLogs } from './protocols/exactly';
import { FraxethActionTestLogs } from './protocols/fraxeth';
import { FraxlendActionTestLogs } from './protocols/fraxlend';
import { GearboxActionTestLogs } from './protocols/gearbox';
import { HopActionTestLogs } from './protocols/hop';
import { IronbankActionTestLogs } from './protocols/ironbank';
import { KyberswapActionTestLogs } from './protocols/kyberswap';
import { LidoActionTestLogs } from './protocols/lido';
import { LiquityActionTestLogs } from './protocols/liquity';
import { LooksrareActionTestLogs } from './protocols/looksrare';
import { LoopringActionTestLogs } from './protocols/loopring';
import { LybraActionTestLogs } from './protocols/lybra';
import { MakerActionTestLogs } from './protocols/maker';
import { MetamaskActionTestLogs } from './protocols/metamask';
import { MorphoActionTestLogs } from './protocols/morpho';
import { MultichainActionTestLogs } from './protocols/multichain';
import { OpenseaActionTestLogs } from './protocols/opensea';
import { OptimismActionTestLogs } from './protocols/optimism';
import { PancakeswapActionTestLogs } from './protocols/pancakeswap';
import { ParaswapActionTestLogs } from './protocols/paraswap';
import { PendleActionTestLogs } from './protocols/pendle';
import { RaribleActionTestLogs } from './protocols/rarible';
import { RocketpoolActionTestLogs } from './protocols/rocketpool';
import { SiloActionTestLogs } from './protocols/silo';
import { SparkActionTestLogs } from './protocols/spark';
import { StargateActionTestLogs } from './protocols/stargate';
import { SturdyActionTestLogs } from './protocols/sturdy';
import { SushiActionTestLogs } from './protocols/sushi';
import { TornadocashActionTestLogs } from './protocols/tornadocash';
import { UniswapActionTestLogs } from './protocols/uniswap';
import { X2y2ActionTestLogs } from './protocols/x2y2';
import { YearnActionTestLogs } from './protocols/yearn';
import { ZeroxActionTestLogs } from './protocols/zerox';

export const ActionTestLogs: Array<TestLog> = [
  ...UniswapActionTestLogs,
  ...SushiActionTestLogs,
  ...BalancerActionTestLogs,
  ...PancakeswapActionTestLogs,
  ...LidoActionTestLogs,
  ...AaveActionTestLogs,
  ...CompoundActionTestLogs,
  ...Compound3ActionTestLogs,
  ...IronbankActionTestLogs,
  ...RocketpoolActionTestLogs,
  ...CurveActionTestLogs,
  ...CowswapActionTestLogs,
  ...LoopringActionTestLogs,
  ...BancorActionTestLogs,
  ...AurafinanceActionTestLogs,
  ...EnsActionTestLogs,
  ...OptimismActionTestLogs,
  ...HopActionTestLogs,
  ...MultichainActionTestLogs,
  ...BeanstalkActionTestLogs,
  ...BlurActionTestLogs,
  ...LooksrareActionTestLogs,
  ...X2y2ActionTestLogs,
  ...OpenseaActionTestLogs,
  ...Eth2ActionTestLogs,
  ...ChainlinkActionTestLogs,
  ...ZeroxActionTestLogs,
  ...ParaswapActionTestLogs,
  ...YearnActionTestLogs,
  ...TornadocashActionTestLogs,
  ...ConvexActionTestLogs,
  ...EulerActionTestLogs,
  ...LiquityActionTestLogs,
  ...AbracadabraActionTestLogs,
  ...MakerActionTestLogs,
  ...StargateActionTestLogs,
  ...SiloActionTestLogs,
  ...BeefyActionTestLogs,
  ...FraxlendActionTestLogs,
  ...ApecoinActionTestLogs,
  ...GearboxActionTestLogs,
  ...RaribleActionTestLogs,
  ...ExactlyActionTestLogs,
  ...FraxethActionTestLogs,
  ...CarbonActionTestLogs,
  ...ConicActionTestLogs,
  ...KyberswapActionTestLogs,
  ...ArrakisActionTestLogs,
  ...LybraActionTestLogs,
  ...PendleActionTestLogs,
  ...AgilityActionTestLogs,
  ...DodoActionTestLogs,
  ...MorphoActionTestLogs,
  ...ChaiActionTestLogs,
  ...AnkrActionTestLogs,
  ...MetamaskActionTestLogs,
  ...AirswapActionTestLogs,
  ...BungeeActionTestLogs,
  ...SparkActionTestLogs,
  ...SturdyActionTestLogs,
  ...CrvusdActionTestLogs,
];
