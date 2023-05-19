// this script get top liquidity pools on Uniswap v2, Uniswap vb3 and forks
// sorted by total value locked
import axios from 'axios';
import fs from 'fs';
import Web3 from 'web3';

import UniswapV3FactoryAbi from '../configs/abi/uniswap/UniswapV3Factory.json';
import UniswapV3PoolAbi from '../configs/abi/uniswap/UniswapV3Pool.json';
import EnvConfig from '../configs/envConfig';
import {
  PancakeswapConfigs,
  PancakeswapV3Configs,
  SushiConfigs,
  Uniswapv2Configs,
  Uniswapv3Configs,
} from '../configs/protocols';
import { normalizeAddress } from '../lib/helper';
import { Web3HelperProvider } from '../services/web3';
import { ProtocolConfig } from '../types/configs';
import { UniLiquidityPool } from '../types/domains';

const HidePools: Array<string> = [
  '0x86d257cdb7bc9c0df10e84c8709697f92770b335',
  '0xf8dbd52488978a79dfe6ffbd81a01fc5948bf9ee',
  '0x8fe8d9bb8eeba3ed688069c3d6b556c9ca258248',
  '0xa850478adaace4c08fc61de44d8cf3b64f359bec',
  '0x277667eb3e34f134adf870be9550e9f323d0dc24',
  '0x8c0411f2ad5470a66cb2e9c64536cfb8dcd54d51',
  '0x055284a4ca6532ecc219ac06b577d540c686669d',
];

const TopPoolCount = 50;

(async function () {
  const allPools: Array<UniLiquidityPool> = [];

  const configs: Array<ProtocolConfig> = [
    Uniswapv2Configs,
    Uniswapv3Configs,
    SushiConfigs,
    PancakeswapConfigs,
    PancakeswapV3Configs,
  ];

  for (const config of configs) {
    if (config.subgraphs) {
      for (const subgraph of config.subgraphs) {
        if (subgraph.version === 'univ2') {
          const response = await axios.post(subgraph.endpoint, {
            query: `
							{
								pairs(first: ${TopPoolCount}, orderBy: trackedReserveETH, orderDirection:desc) {
									id
									token0 {
										id
										symbol
										decimals
									}
									token1 {
										id
										symbol
										decimals
									}
								}
							}
						`,
          });
          for (const pair of response.data.data.pairs) {
            allPools.push({
              chain: 'ethereum',
              protocol: subgraph.protocol,
              version: 'univ2',
              address: normalizeAddress(pair.id),
              token0: {
                chain: 'ethereum',
                address: normalizeAddress(pair.token0.id),
                symbol: pair.token0.symbol,
                decimals: Number(pair.token0.decimals),
              },
              token1: {
                chain: 'ethereum',
                address: normalizeAddress(pair.token1.id),
                symbol: pair.token1.symbol,
                decimals: Number(pair.token1.decimals),
              },
            });
          }
        } else if (subgraph.version === 'univ3') {
          const response = await axios.post(subgraph.endpoint, {
            query: `
							{
								pools(first: ${TopPoolCount}, where: {id_not_in: ${JSON.stringify(
              HidePools
            )}} orderBy: totalValueLockedUSD, orderDirection: desc) {
									id
									token0 {
										id
										symbol
										decimals
									}
									token1 {
										id
										symbol
										decimals
									}
								}
							}
						`,
          });
          for (const pool of response.data.data.pools) {
            allPools.push({
              chain: 'ethereum',
              protocol: subgraph.protocol,
              version: 'univ3',
              address: normalizeAddress(pool.id),
              token0: {
                chain: 'ethereum',
                address: normalizeAddress(pool.token0.id),
                symbol: pool.token0.symbol,
                decimals: Number(pool.token0.decimals),
              },
              token1: {
                chain: 'ethereum',
                address: normalizeAddress(pool.token1.id),
                symbol: pool.token1.symbol,
                decimals: Number(pool.token1.decimals),
              },
            });
          }
        }
      }
    }
  }

  const sushiv3Factory: string = '0xbaceb8ec6b9355dfc0269c18bac9d6e2bdc29c4f';
  let startBlock = 16955547;
  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);
  const web3Helper = new Web3HelperProvider(null);
  const latestBlock = await web3.eth.getBlockNumber();
  const factoryContract = new web3.eth.Contract(UniswapV3FactoryAbi as any, sushiv3Factory);
  while (startBlock <= latestBlock) {
    const toBlock = startBlock + 1000 > latestBlock ? latestBlock : startBlock + 1000;
    const events: Array<any> = await factoryContract.getPastEvents('PoolCreated', { fromBlock: startBlock, toBlock });
    for (const event of events) {
      const poolContract = new web3.eth.Contract(UniswapV3PoolAbi as any, event.returnValues.pool);
      const [token0Address, token1Address] = await Promise.all([
        poolContract.methods.token0().call(),
        poolContract.methods.token1().call(),
      ]);
      const token0 = await web3Helper.getErc20Metadata('ethereum', token0Address);
      const token1 = await web3Helper.getErc20Metadata('ethereum', token1Address);
      if (token0 && token1) {
        allPools.push({
          chain: 'ethereum',
          protocol: 'sushiv3',
          version: 'univ3',
          address: normalizeAddress(event.returnValues.pool),
          token0: token0,
          token1: token1,
        });

        console.info(`Got sushiv3 pool pool:${event.returnValues.pool} token:${token0.symbol}-${token1.symbol}`);
      }
    }

    startBlock += 1000;
  }

  const savePools: Array<UniLiquidityPool> = JSON.parse(
    fs.readFileSync('./configs/data/UniLiquidityPools.json').toString()
  );

  const exitedPools: { [key: string]: boolean } = {};
  if (fs.existsSync('./configs/data/UniLiquidityPools.json')) {
    for (const savedPool of savePools) {
      exitedPools[savedPool.address] = true;
    }
  }

  for (const pool of allPools) {
    if (!exitedPools[pool.address]) {
      savePools.push(pool);
    }
  }

  fs.writeFileSync('./configs/data/UniLiquidityPools.json', JSON.stringify(savePools));
})();
