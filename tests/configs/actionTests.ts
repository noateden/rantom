import { TestLog } from '../types';
import { AaveActionTestLogs } from './protocols/aave';
import { BalancerActionTestLogs } from './protocols/balancer';
import { CompoundActionTestLogs } from './protocols/compound';
import { IronbankActionTestLogs } from './protocols/ironbank';
import { LidoActionTestLogs } from './protocols/lido';
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
  ...IronbankActionTestLogs,
  ...RocketpoolActionTestLogs,
];
