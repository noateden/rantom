// get static data of Uniswap protocol: uniswapv2, uniswapv3
import axios from 'axios';
import fs from 'fs';

import { PublicSubGraphEndpoints } from '../configs/constants/subgraphEndpoints';
import { normalizeAddress } from '../lib/utils';
import UniswapLibs from '../modules/adapters/uniswap/libs';
import { LiquidityPoolConstant } from '../types/domains';
import updateToken from './helpers/updateToken';

const Factories: Array<any> = [
  {
    chain: 'avalanche',
    address: '0x9ad6c38be94206ca50bb0d90783181662f0cfa10',
    subgraph: PublicSubGraphEndpoints.traderjoeAvalanche,
  },
  {
    chain: 'arbitrum',
    address: '0xae4ec9901c3076d0ddbe76a520f9e90a6227acb7',
    subgraph: PublicSubGraphEndpoints.traderjoeArbitrum,
  },
  {
    chain: 'bnbchain',
    address: '0x4f8bdc85e3eec5b9de67097c3f59b6db025d9986',
    subgraph: PublicSubGraphEndpoints.traderjoeBnbchain,
  },
];

const v2PoolApis = [
  {
    factory: '0xdc8d77b69155c7e68a95a4fb0f06a71ff90b943a',
    api: 'https://barn.traderjoexyz.com/v1/pools/ethereum?pageNum=1&pageSize=100',
  },
  {
    factory: '0x8e42f2f4101563bf679975178e880fd87d3efd4e',
    api: 'https://barn.traderjoexyz.com/v1/pools/arbitrum?pageNum=1&pageSize=100',
  },
  {
    factory: '0x8e42f2f4101563bf679975178e880fd87d3efd4e',
    api: 'https://barn.traderjoexyz.com/v1/pools/binance?pageNum=1&pageSize=100',
  },
  {
    factory: '0x8e42f2f4101563bf679975178e880fd87d3efd4e',
    api: 'https://barn.traderjoexyz.com/v1/pools/avalanche?pageNum=1&pageSize=100',
  },
];

(async function () {
  const protocol = 'traderjoe';

  let pools: Array<LiquidityPoolConstant> = [];
  for (const config of Factories) {
    console.log(`Getting top liquidity pool ${config.chain} ${protocol} ${config.subgraph}`);
    pools = pools.concat(
      await UniswapLibs.getTopLiquidityPools({
        top: 100,
        chain: config.chain,
        protocol: protocol,
        version: 'univ2',
        factoryAddress: normalizeAddress(config.address),
        endpoint: config.subgraph,
        filters: {
          orderBy: 'txCount',
        },
      })
    );
  }

  fs.writeFileSync('./configs/data/TraderjoePools.json', JSON.stringify(pools));

  for (const pool of pools) {
    for (const token of pool.tokens) {
      updateToken(token);
    }
  }

  const v2Protocol = 'traderjoev2';
  const liquidityPools: Array<LiquidityPoolConstant> = [];

  for (const config of v2PoolApis) {
    const pools = (await axios.get(config.api)).data;
    for (const pool of pools) {
      const chain = pool.chain === 'binance' ? 'bnbchain' : pool.chain;

      const token0 = {
        chain: chain,
        symbol: (pool as any).tokenX.symbol,
        decimals: (pool as any).tokenX.decimals,
        address: normalizeAddress((pool as any).tokenX.address),
      };
      const token1 = {
        chain: chain,
        symbol: (pool as any).tokenY.symbol,
        decimals: (pool as any).tokenY.decimals,
        address: normalizeAddress((pool as any).tokenY.address),
      };

      updateToken(token0);
      updateToken(token1);

      liquidityPools.push({
        chain: chain,
        version: 'traderjoev2.1',
        protocol: v2Protocol,
        factory: normalizeAddress(config.factory),
        address: normalizeAddress((pool as any).pairAddress),
        tokens: [token0, token1],
      });
    }
  }
  fs.writeFileSync('./configs/data/Traderjoev2Pools.json', JSON.stringify(liquidityPools));
})();
