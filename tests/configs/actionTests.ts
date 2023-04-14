import { TestLog } from '../types';
import { AaveActionTestLogs } from './protocols/aave';
import { AbracadabraActionTestLogs } from './protocols/abracadabra';
import { ApecoinActionTestLogs } from './protocols/apecoin';
import { AurafinanceActionTestLogs } from './protocols/aurafinance';
import { BalancerActionTestLogs } from './protocols/balancer';
import { BancorActionTestLogs } from './protocols/bancor';
import { BeanstalkActionTestLogs } from './protocols/beanstalk';
import { BeefyActionTestLogs } from './protocols/beefy';
import { BlurActionTestLogs } from './protocols/blur';
import { ChainlinkActionTestLogs } from './protocols/chainlink';
import { Compound3ActionTestLogs, CompoundActionTestLogs } from './protocols/compound';
import { ConvexActionTestLogs } from './protocols/convex';
import { CowswapActionTestLogs } from './protocols/cowswap';
import { CurveActionTestLogs } from './protocols/curve';
import { EnsActionTestLogs } from './protocols/ens';
import { Eth2ActionTestLogs } from './protocols/eth2';
import { EulerActionTestLogs } from './protocols/euler';
import { FraxlendActionTestLogs } from './protocols/fraxlend';
import { HopActionTestLogs } from './protocols/hop';
import { IronbankActionTestLogs } from './protocols/ironbank';
import { LidoActionTestLogs } from './protocols/lido';
import { LiquityActionTestLogs } from './protocols/liquity';
import { LooksrareActionTestLogs } from './protocols/looksrare';
import { LoopringActionTestLogs } from './protocols/loopring';
import { MakerActionTestLogs } from './protocols/maker';
import { MultichainActionTestLogs } from './protocols/multichain';
import { OpenseaActionTestLogs } from './protocols/opensea';
import { OptimismActionTestLogs } from './protocols/optimism';
import { PancakeswapActionTestLogs } from './protocols/pancakeswap';
import { ParaswapActionTestLogs } from './protocols/paraswap';
import { RocketpoolActionTestLogs } from './protocols/rocketpool';
import { SiloActionTestLogs } from './protocols/silo';
import { StargateActionTestLogs } from './protocols/stargate';
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
];
