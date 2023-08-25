// this script get all pool created by factory
// query factory events
import fs from 'fs';

import { UniswapHelper, UniswapPoolConstant } from '../modules/adapters/uniswap/helper';
import { UniLiquidityPool } from '../types/domains';

const Factories: Array<string> = ['baseswap:base:0xfda619b6d20975be80a10332cd39b9a4b0faa8bb:2059124'];

(async function () {
  let allPools: Array<UniLiquidityPool> = [];

  for (const config of Factories) {
    const [protocol, chain, factory, fromBlock] = config.split(':');
    const pools: Array<UniswapPoolConstant> = await UniswapHelper.getFactoryPoolsV2(
      chain,
      protocol,
      factory,
      Number(fromBlock)
    );

    allPools = allPools.concat(pools);
  }

  fs.writeFileSync('./configs/data/UniFactoryPools.json', JSON.stringify(allPools));
})();
