// this script get all pool created by factory
// query factory events
import fs from 'fs';

import AerodromeFactoryAbi from '../configs/abi/aerodrome/Factory.json';
import { UniswapHelper, UniswapPoolConstant } from '../modules/adapters/uniswap/helper';
import { UniLiquidityPool } from '../types/domains';

const Factories: Array<string> = ['aerodrome:base:0x420dd381b31aef6683db6b902084cb0ffece40da:3200559'];

(async function () {
  let allPools: Array<UniLiquidityPool> = [];

  for (const config of Factories) {
    const [protocol, chain, factory, fromBlock] = config.split(':');
    const pools: Array<UniswapPoolConstant> = await UniswapHelper.getFactoryPoolsV2(
      chain,
      protocol,
      factory,
      AerodromeFactoryAbi,
      'PoolCreated',
      Number(fromBlock)
    );

    allPools = allPools.concat(pools);
  }

  fs.writeFileSync('./configs/data/UniFactoryPools.json', JSON.stringify(allPools));
})();
