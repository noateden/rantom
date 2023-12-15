// get static data of kyberswap elastic
import fs from 'fs';

import { ChainPolygonZkEVM } from '../configs/constants/chains';
import { PublicSubGraphEndpoints } from '../configs/constants/subgraphEndpoints';
import UniswapLibs from '../modules/adapters/uniswap/libs';
import { LiquidityPoolConstant } from '../types/domains';
import updateToken from './helpers/updateToken';

const Factories: Array<any> = [
  {
    chain: 'ethereum',
    address: '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a',
    subgraph: PublicSubGraphEndpoints.kyberswapElastic,
  },
  {
    chain: 'arbitrum',
    address: '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a',
    subgraph: PublicSubGraphEndpoints.kyberswapElasticArbitrum,
  },
  {
    chain: 'base',
    address: '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a',
    subgraph: PublicSubGraphEndpoints.kyberswapElasticBase,
  },
  {
    chain: 'optimism',
    address: '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a',
    subgraph: PublicSubGraphEndpoints.kyberswapElasticOptimism,
  },
  {
    chain: 'polygon',
    address: '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a',
    subgraph: PublicSubGraphEndpoints.kyberswapElasticPolygon,
  },
  {
    chain: 'bnbchain',
    address: '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a',
    subgraph: PublicSubGraphEndpoints.kyberswapElasticBnbchain,
  },
  {
    chain: 'avalanche',
    address: '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a',
    subgraph: PublicSubGraphEndpoints.kyberswapElasticAvalanche,
  },
  {
    chain: 'fantom',
    address: '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a',
    subgraph: PublicSubGraphEndpoints.kyberswapElasticFantom,
  },
  {
    chain: 'linea',
    address: '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a',
    subgraph: PublicSubGraphEndpoints.kyberswapElasticLinea,
  },
  {
    chain: ChainPolygonZkEVM,
    address: '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a',
    subgraph: PublicSubGraphEndpoints.kyberswapElasticPolygonzkevm,
  },
];

(async function () {
  let v3Pools: Array<LiquidityPoolConstant> = [];
  for (const config of Factories) {
    console.log(`Getting top liquidity pool ${config.chain} kyberswap elastic ${config.subgraph}`);
    v3Pools = v3Pools.concat(
      await UniswapLibs.getTopLiquidityPools({
        top: 100,
        chain: config.chain,
        protocol: 'kyberswap-elastic',
        version: 'univ3',
        factoryAddress: config.address,
        endpoint: config.subgraph,
        filters: {
          orderBy: 'txCount',
        },
      })
    );
  }

  fs.writeFileSync('./configs/data/KyberswapElasticPools.json', JSON.stringify(v3Pools));

  for (const pool of v3Pools) {
    for (const token of pool.tokens) {
      updateToken(token);
    }
  }
})();
