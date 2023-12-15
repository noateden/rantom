// get static data of Uniswap protocol: uniswapv2, uniswapv3
import fs from 'fs';

import { PublicSubGraphEndpoints } from '../configs/constants/subgraphEndpoints';
import UniswapLibs from '../modules/adapters/uniswap/libs';
import { LiquidityPoolConstant } from '../types/domains';
import updateToken from './helpers/updateToken';

const CamelotFactories: Array<any> = [
  {
    chain: 'arbitrum',
    address: '0x6eccab422d763ac031210895c81787e87b43a652',
    subgraph: PublicSubGraphEndpoints.camelot,
  },
];

const Camelotv3Factories: Array<any> = [
  {
    chain: 'arbitrum',
    address: '0x1a3c9b1d2f0529d97f2afc5136cc23e58f1fd35b',
    subgraph: PublicSubGraphEndpoints.camelotv3,
  },
];

(async function () {
  let pools: Array<LiquidityPoolConstant> = [];
  for (const config of CamelotFactories) {
    console.log(`Getting top liquidity pool ${config.chain} camelot ${config.subgraph}`);
    pools = pools.concat(
      await UniswapLibs.getTopLiquidityPools({
        top: 100,
        chain: config.chain,
        protocol: 'camelot',
        version: 'univ2',
        factoryAddress: config.address,
        endpoint: config.subgraph,
        filters: {
          orderBy: 'txCount',
        },
      })
    );
  }
  fs.writeFileSync('./configs/data/CamelotPools.json', JSON.stringify(pools));

  let v3Pools: Array<LiquidityPoolConstant> = [];
  for (const config of Camelotv3Factories) {
    console.log(`Getting top liquidity pool ${config.chain} camelotv3 ${config.subgraph}`);
    v3Pools = v3Pools.concat(
      await UniswapLibs.getTopLiquidityPools({
        top: 100,
        chain: config.chain,
        protocol: 'camelotv3',
        version: 'univ3',
        factoryAddress: config.address,
        endpoint: config.subgraph,
        filters: {
          orderBy: 'txCount',
        },
      })
    );
  }
  fs.writeFileSync('./configs/data/Camelotv3Pools.json', JSON.stringify(v3Pools));

  for (const pool of pools) {
    for (const token of pool.tokens) {
      updateToken(token);
    }
  }
  for (const pool of v3Pools) {
    for (const token of pool.tokens) {
      updateToken(token);
    }
  }
})();
