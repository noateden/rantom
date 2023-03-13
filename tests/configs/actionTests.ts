import { TestLog } from '../types';
import { AaveActionTestLogs } from './protocols/aave';
import { AurafinanceActionTestLogs } from './protocols/aurafinance';
import { BalancerActionTestLogs } from './protocols/balancer';
import { BancorActionTestLogs } from './protocols/bancor';
import { BeanstalkActionTestLogs } from './protocols/beanstalk';
import { BlurActionTestLogs } from './protocols/blur';
import { ChainlinkActionTestLogs } from './protocols/chainlink';
import { Compound3ActionTestLogs, CompoundActionTestLogs } from './protocols/compound';
import { CowswapActionTestLogs } from './protocols/cowswap';
import { CurveActionTestLogs } from './protocols/curve';
import { EnsActionTestLogs } from './protocols/ens';
import { Eth2ActionTestLogs } from './protocols/eth2';
import { HopActionTestLogs } from './protocols/hop';
import { IronbankActionTestLogs } from './protocols/ironbank';
import { LidoActionTestLogs } from './protocols/lido';
import { LooksrareActionTestLogs } from './protocols/looksrare';
import { LoopringActionTestLogs } from './protocols/loopring';
import { MultichainActionTestLogs } from './protocols/multichain';
import { OpenseaActionTestLogs } from './protocols/opensea';
import { OptimismActionTestLogs } from './protocols/optimism';
import { PancakeswapActionTestLogs } from './protocols/pancakeswap';
import { RocketpoolActionTestLogs } from './protocols/rocketpool';
import { SushiActionTestLogs } from './protocols/sushi';
import { UniswapActionTestLogs } from './protocols/uniswap';
import { X2y2ActionTestLogs } from './protocols/x2y2';

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
];
