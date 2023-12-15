import { ConvexStakingPoolConstant } from '../../configs/protocols/convex';
import { SourceLiquidityPools, SourceStakingPools } from '../../configs/sources';
import logger from '../../lib/logger';
import { compareAddress } from '../../lib/utils';
import { LiquidityPoolConstant, StakingPoolConstant } from '../../types/domains';
import { GetLiquidityPoolConstantOptions, GetStakingPoolConstantOptions, IDatastoreService } from './domains';

export default class Datastore implements IDatastoreService {
  public readonly name: string = 'datastore';

  private _liquidityPools: Array<LiquidityPoolConstant> = [];
  private _stakingPools: Array<StakingPoolConstant> = [];

  constructor() {
    this._liquidityPools = SourceLiquidityPools;
    this._stakingPools = SourceStakingPools;
  }

  public async loadData(): Promise<void> {
    logger.info('loaded constant data', {
      service: this.name,
      liquidityPools: Object.keys(this._liquidityPools).length,
      stakingPools: Object.keys(this._stakingPools).length,
    });
  }

  public async getLiquidityPoolConstant(
    options: GetLiquidityPoolConstantOptions
  ): Promise<LiquidityPoolConstant | null | undefined> {
    return this._liquidityPools.filter(
      (item) =>
        item.chain === options.chain &&
        compareAddress(item.address, options.address) &&
        options.protocol === item.protocol
    )[0];
  }

  public async getLiquidityPoolConstants(
    options: GetLiquidityPoolConstantOptions
  ): Promise<Array<LiquidityPoolConstant>> {
    return this._liquidityPools.filter(
      (item) =>
        item.chain === options.chain &&
        compareAddress(item.address, options.address) &&
        options.protocol === item.protocol
    );
  }

  public async getStakingPoolConstant(
    options: GetStakingPoolConstantOptions
  ): Promise<StakingPoolConstant | null | undefined> {
    if (options.rewardContract) {
      return this._stakingPools.filter(
        (item) =>
          item.chain === options.chain &&
          options.protocol === item.protocol &&
          options.rewardContract &&
          compareAddress((item as ConvexStakingPoolConstant).rewardContract, options.rewardContract)
      )[0];
    } else {
      return this._stakingPools.filter(
        (item) =>
          item.chain === options.chain &&
          compareAddress(item.address, options.address) &&
          options.protocol === item.protocol
      )[0];
    }
  }

  public async getStakingPoolConstants(options: GetStakingPoolConstantOptions): Promise<Array<StakingPoolConstant>> {
    return this._stakingPools.filter(
      (item) =>
        item.chain === options.chain &&
        compareAddress(item.address, options.address) &&
        options.protocol === item.protocol
    );
  }
}
