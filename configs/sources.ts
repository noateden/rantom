import { LiquidityPoolConstant, StakingPoolConstant } from '../types/domains';
import AurafinanceStakingPools from './data/AurafinanceStakingPools.json';
import CamelotLiquidityPools from './data/CamelotPools.json';
import Camelotv3LiquidityPools from './data/Camelotv3Pools.json';
import ConvexStakingPools from './data/ConvexStakingPools.json';
import DodoLiquidityPools from './data/DodoLiquidityPools.json';
import KyberswapElasticLiquidityPools from './data/KyberswapElasticPools.json';
import MaverickLiquidityPools from './data/MaverickPools.json';
import PancakeStableSwapLiquidityPools from './data/PancakeStableSwapPools.json';
import PancakeswapLiquidityPools from './data/PancakeswapPools.json';
import PancakeswapStakingPools from './data/PancakeswapStakingPools.json';
import Pancakeswapv3LiquidityPools from './data/Pancakeswapv3Pools.json';
import ShibaswapLiquidityPools from './data/ShibaswapPools.json';
import StargateLiquidityPools from './data/StargateLiquidityPools.json';
import SushiLiquidityPools from './data/SushiPools.json';
import SushiStakingPools from './data/SushiStakingPools.json';
import Sushiv3LiquidityPools from './data/Sushiv3Pools.json';
import TraderjoeLiquidityPools from './data/TraderjoePools.json';
import Traderjoev2LiquidityPools from './data/Traderjoev2Pools.json';
import Uniswapv2LiquidityPools from './data/Uniswapv2Pools.json';
import Uniswapv3LiquidityPools from './data/Uniswapv3Pools.json';
import YearnVaults from './data/YearnVaults.json';
import { BalancerVeBalStaking } from './protocols/balancer';

export const SourceLiquidityPools: Array<LiquidityPoolConstant> = [
  ...(Uniswapv2LiquidityPools as Array<LiquidityPoolConstant>),
  ...(Uniswapv3LiquidityPools as Array<LiquidityPoolConstant>),
  ...(SushiLiquidityPools as Array<LiquidityPoolConstant>),
  ...(Sushiv3LiquidityPools as Array<LiquidityPoolConstant>),
  ...(CamelotLiquidityPools as Array<LiquidityPoolConstant>),
  ...(Camelotv3LiquidityPools as Array<LiquidityPoolConstant>),
  ...(PancakeswapLiquidityPools as Array<LiquidityPoolConstant>),
  ...(Pancakeswapv3LiquidityPools as Array<LiquidityPoolConstant>),
  ...(PancakeStableSwapLiquidityPools as Array<LiquidityPoolConstant>),
  ...(MaverickLiquidityPools as Array<LiquidityPoolConstant>),
  ...(ShibaswapLiquidityPools as Array<LiquidityPoolConstant>),
  ...(StargateLiquidityPools as Array<LiquidityPoolConstant>),
  ...(DodoLiquidityPools as Array<LiquidityPoolConstant>),
  ...(TraderjoeLiquidityPools as Array<LiquidityPoolConstant>),
  ...(Traderjoev2LiquidityPools as Array<LiquidityPoolConstant>),
  ...(KyberswapElasticLiquidityPools as Array<LiquidityPoolConstant>),
];

export const SourceStakingPools: Array<StakingPoolConstant> = [
  ...(SushiStakingPools as Array<StakingPoolConstant>),
  ...(PancakeswapStakingPools as Array<StakingPoolConstant>),
  ...(ConvexStakingPools as Array<StakingPoolConstant>),
  ...(AurafinanceStakingPools as Array<StakingPoolConstant>),
  ...(YearnVaults as Array<StakingPoolConstant>),

  // balancer veBAL
  BalancerVeBalStaking,
];
