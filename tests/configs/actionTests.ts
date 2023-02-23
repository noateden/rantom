import { TestLog } from '../types';
import { AaveActionTestLogs } from './protocols/aave';
import { AurafinanceActionTestLogs } from './protocols/aurafinance';
import { BalancerActionTestLogs } from './protocols/balancer';
import { BancorActionTestLogs } from './protocols/bancor';
import { BeanstalkActionTestLogs } from './protocols/beanstalk';
import { BlurActionTestLogs } from './protocols/blur';
import { Compound3ActionTestLogs, CompoundActionTestLogs } from './protocols/compound';
import { CowswapActionTestLogs } from './protocols/cowswap';
import { CurveActionTestLogs } from './protocols/curve';
import { EnsActionTestLogs } from './protocols/ens';
import { HopActionTestLogs } from './protocols/hop';
import { IronbankActionTestLogs } from './protocols/ironbank';
import { LidoActionTestLogs } from './protocols/lido';
import { LoopringActionTestLogs } from './protocols/loopring';
import { MultichainActionTestLogs } from './protocols/multichain';
import { OptimismActionTestLogs } from './protocols/optimism';
import { PancakeswapActionTestLogs } from './protocols/pancakeswap';
import { RocketpoolActionTestLogs } from './protocols/rocketpool';
import { SushiActionTestLogs } from './protocols/sushi';
import { UniswapActionTestLogs } from './protocols/uniswap';

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
];
