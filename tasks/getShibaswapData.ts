// get static data of Uniswap protocol: uniswapv2, uniswapv3
import fs from 'fs';

import { PublicSubGraphEndpoints } from '../configs/constants/subgraphEndpoints';
import { normalizeAddress } from '../lib/utils';
import UniswapLibs from '../modules/adapters/uniswap/libs';
import { LiquidityPoolConstant } from '../types/domains';
import updateToken from './helpers/updateToken';

const Factories: Array<any> = [
  {
    chain: 'ethereum',
    address: '0x115934131916c8b277dd010ee02de363c09d037c',
    subgraph: PublicSubGraphEndpoints.shibaswap,
  },
];

(async function () {
  let pools: Array<LiquidityPoolConstant> = [];
  for (const config of Factories) {
    console.log(`Getting top liquidity pool ${config.chain} shibaswap ${config.subgraph}`);
    pools = pools.concat(
      await UniswapLibs.getTopLiquidityPools({
        top: 100,
        chain: config.chain,
        protocol: 'shibaswap',
        version: 'univ2',
        factoryAddress: normalizeAddress(config.address),
        endpoint: config.subgraph,
        filters: {
          orderBy: 'txCount',
        },
      })
    );
  }

  fs.writeFileSync('./configs/data/ShibaswapPools.json', JSON.stringify(pools));

  for (const pool of pools) {
    for (const token of pool.tokens) {
      updateToken(token);
    }
  }
})();
