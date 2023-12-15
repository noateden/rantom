// some protocol have some static data
// we already saved them in database
// however, query database every request is very cost
// we load these data into memory when start the program
// to save the database query operations
import { LiquidityPoolConstant, StakingPoolConstant } from '../../types/domains';

export interface GetLiquidityPoolConstantOptions {
  chain: string;
  protocol: string;
  address: string;
}

export interface GetStakingPoolConstantOptions {
  chain: string;
  protocol: string;
  address: string;
  poolId?: number;

  rewardContract?: string;
}

export interface IDatastoreService {
  name: string;

  // load data from database into memory
  loadData: () => Promise<void>;

  // get staking pool constant
  getLiquidityPoolConstant: (
    options: GetLiquidityPoolConstantOptions
  ) => Promise<LiquidityPoolConstant | null | undefined>;

  // get all staking pool with a given contract address
  getLiquidityPoolConstants: (options: GetLiquidityPoolConstantOptions) => Promise<Array<LiquidityPoolConstant>>;

  // get staking pool constant
  getStakingPoolConstant: (options: GetStakingPoolConstantOptions) => Promise<StakingPoolConstant | null | undefined>;

  // get all staking pool with a given contract address
  getStakingPoolConstants: (options: GetStakingPoolConstantOptions) => Promise<Array<StakingPoolConstant>>;
}
