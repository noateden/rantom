// get static data of Uniswap protocol: uniswapv2, uniswapv3
import fs from 'fs';

import { PublicSubGraphEndpoints } from '../configs/constants/subgraphEndpoints';
import UniswapLibs from '../modules/adapters/uniswap/libs';
import { LiquidityPoolConstant } from '../types/domains';
import updateToken from './helpers/updateToken';

const Uniswapv3Factories: Array<any> = [
  {
    chain: 'ethereum',
    address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    subgraph: PublicSubGraphEndpoints.uniswapv3,
  },
  {
    chain: 'arbitrum',
    address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    subgraph: PublicSubGraphEndpoints.uniswapv3Arbitrum,
  },
  {
    chain: 'optimism',
    address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    subgraph: PublicSubGraphEndpoints.uniswapv3Optimism,
  },
  {
    chain: 'polygon',
    address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    subgraph: PublicSubGraphEndpoints.uniswapv3Polygon,
  },
  {
    chain: 'base',
    address: '0x33128a8fc17869897dce68ed026d694621f6fdfd',
    subgraph: PublicSubGraphEndpoints.uniswapv3Base,
  },
  {
    chain: 'bnbchain',
    address: '0xdb1d10011ad0ff90774d0c6bb92e5c5c8b4461f7',
    subgraph: PublicSubGraphEndpoints.uniswapv3Bnbchain,
  },
  {
    chain: 'avalanche',
    address: '0x740b1c1de25031c31ff4fc9a62f554a55cdc1bad',
    subgraph: PublicSubGraphEndpoints.uniswapv3Avalanche,
  },
  {
    chain: 'celo',
    address: '0xafe208a311b21f13ef87e33a90049fc17a7acdec',
    subgraph: PublicSubGraphEndpoints.uniswapv3Celo,
  },
];

(async function () {
  console.log(`Getting top liquidity pool ethereum uniswapv2 ${PublicSubGraphEndpoints.uniswapv2}`);
  const pools: Array<LiquidityPoolConstant> = await UniswapLibs.getTopLiquidityPools({
    top: 100,
    chain: 'ethereum',
    protocol: 'uniswapv2',
    version: 'univ2',
    factoryAddress: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    endpoint: PublicSubGraphEndpoints.uniswapv2,
    filters: {
      orderBy: 'txCount',
    },
  });

  fs.writeFileSync('./configs/data/Uniswapv2Pools.json', JSON.stringify(pools));

  let v3Pools: Array<LiquidityPoolConstant> = [];
  for (const config of Uniswapv3Factories) {
    console.log(`Getting top liquidity pool ${config.chain} uniswapv3 ${config.subgraph}`);
    v3Pools = v3Pools.concat(
      await UniswapLibs.getTopLiquidityPools({
        top: 100,
        chain: config.chain,
        protocol: 'uniswapv3',
        version: 'univ3',
        factoryAddress: config.address,
        endpoint: config.subgraph,
        filters: {
          orderBy: 'txCount',
        },
      })
    );
  }

  fs.writeFileSync('./configs/data/Uniswapv3Pools.json', JSON.stringify(v3Pools));

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
