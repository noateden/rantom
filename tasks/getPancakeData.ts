// get static data of Uniswap protocol: uniswapv2, uniswapv3
import fs from 'fs';

import PancakeStableSwapAbi from '../configs/abi/pancake/PancakeStableSwap.json';
import SushiMasterchefAbi from '../configs/abi/sushi/Masterchef.json';
import { ChainLinea, ChainPolygonZkEVM, ChainZksyncEra } from '../configs/constants/chains';
import { PublicSubGraphEndpoints } from '../configs/constants/subgraphEndpoints';
import { normalizeAddress } from '../lib/utils';
import SushiLibs from '../modules/adapters/sushi/libs';
import UniswapLibs from '../modules/adapters/uniswap/libs';
import BlockchainService from '../services/blockchains/blockchain';
import { LiquidityPoolConstant, StakingPoolConstant } from '../types/domains';
import { GetMasterChefPoolsOptions } from './getSushiData';
import updateToken from './helpers/updateToken';

const Factories: Array<any> = [
  {
    chain: 'ethereum',
    address: '0x1097053fd2ea711dad45caccc45eff7548fcb362',
    subgraph: PublicSubGraphEndpoints.pancakeswap,
  },
  {
    chain: 'arbitrum',
    address: '0x02a84c1b3bbd7401a5f7fa98a384ebc70bb5749e',
    subgraph: PublicSubGraphEndpoints.pancakeswapArbitrum,
  },
  {
    chain: 'base',
    address: '0x02a84c1b3bbd7401a5f7fa98a384ebc70bb5749e',
    subgraph: PublicSubGraphEndpoints.pancakeswapBase,
  },
  {
    chain: 'bnbchain',
    address: '0xca143ce32fe78f1f7019d7d551a6402fc5350c73',
    subgraph: PublicSubGraphEndpoints.pancakeswapBnbchain,
  },
  {
    chain: ChainLinea,
    address: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
    subgraph: PublicSubGraphEndpoints.pancakeswapLinea,
  },
  {
    chain: ChainZksyncEra,
    address: '0xd03d8d566183f0086d8d09a84e1e30b58dd5619d',
    subgraph: PublicSubGraphEndpoints.pancakeswapZksyncera,
  },
  {
    chain: ChainPolygonZkEVM,
    address: '0x02a84c1b3bbd7401a5f7fa98a384ebc70bb5749e',
    subgraph: PublicSubGraphEndpoints.pancakeswapPolygonzkevm,
  },
];

const v3Factories: Array<any> = [
  {
    chain: 'ethereum',
    address: '0x0bfbcf9fa4f9c56b0f40a671ad40e0805a091865',
    subgraph: PublicSubGraphEndpoints.pancakeswapv3,
  },
  {
    chain: 'arbitrum',
    address: '0x0bfbcf9fa4f9c56b0f40a671ad40e0805a091865',
    subgraph: PublicSubGraphEndpoints.pancakeswapv3Arbitrum,
  },
  {
    chain: 'base',
    address: '0x0bfbcf9fa4f9c56b0f40a671ad40e0805a091865',
    subgraph: PublicSubGraphEndpoints.pancakeswapv3Base,
  },
  {
    chain: 'bnbchain',
    address: '0x0bfbcf9fa4f9c56b0f40a671ad40e0805a091865',
    subgraph: PublicSubGraphEndpoints.pancakeswapv3Bnbchain,
  },
  {
    chain: ChainLinea,
    address: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
    subgraph: PublicSubGraphEndpoints.pancakeswapv3Linea,
  },
  {
    chain: ChainZksyncEra,
    address: '0x1BB72E0CbbEA93c08f535fc7856E0338D7F7a8aB',
    subgraph: PublicSubGraphEndpoints.pancakeswapv3Zksyncera,
  },
  {
    chain: ChainPolygonZkEVM,
    address: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
    subgraph: PublicSubGraphEndpoints.pancakeswapv3Polygonzkevm,
  },
];

const Masterchefs: Array<any> = [
  {
    chain: 'bnbchain',
    protocol: 'pancakeswap',
    version: 'masterchef',
    address: '0x73feaa1ee314f8c655e354234017be2193c9e24e',
  },
  {
    chain: 'bnbchain',
    protocol: 'pancakeswap',
    version: 'masterchefV2',
    address: '0xa5f8c5dbd5f286960b9d90548680ae5ebff07652',
  },
];

const StableswapFactory = '0x25a55f9f2279a54951133d503490342b50e5cd15';
const StableswapPools: Array<string> = [
  'bnbchain:0x49079d07ef47449af808a4f36c2a8dec975594ec',
  'bnbchain:0x3efebc418efb585248a0d2140cfb87afcc2c63dd',
  'bnbchain:0xc2f5b9a3d9138ab2b74d581fc11346219ebf43fe',
  'bnbchain:0x169f653a54acd441ab34b73da9946e2c451787ef',
  'bnbchain:0x6d8fba276ec6f1eda2344da48565adbca7e4ffa5',
  'bnbchain:0x0b03e3d6ec0c5e5bbf993ded8d947c6fb6eec18d',
  'bnbchain:0x9c138be1d76ee4c5162e0fe9d4eea5542a23d1bd',
  'bnbchain:0xb1da7d2c257c5700612bde35c8d7187dc80d79f1',
  'bnbchain:0xfc17919098e9f0a0d72093e25ad052a359ae3e43',
];

async function getMasterchefPools(options: GetMasterChefPoolsOptions): Promise<void> {
  let existedPools: Array<StakingPoolConstant> = [];
  let poolId = 0;
  if (fs.existsSync(options.filePath)) {
    existedPools = JSON.parse(fs.readFileSync(options.filePath).toString()) as Array<StakingPoolConstant>;
    for (const existedPool of existedPools) {
      if (existedPool.address === options.address && existedPool.poolId > poolId) {
        poolId = existedPool.poolId;
      }
    }
  }

  if (poolId > 0) {
    poolId += 1;
  }

  const allPools: Array<StakingPoolConstant> = existedPools;

  const blockchain = new BlockchainService();

  const poolLength = await blockchain.singlecall({
    chain: options.chain,
    abi: SushiMasterchefAbi,
    target: options.address,
    method: 'poolLength',
    params: [],
  });

  while (poolId < poolLength) {
    const poolInfo = await SushiLibs.getMasterchefPoolInfo({
      services: null,
      protocol: options.protocol,
      chain: options.chain,
      address: options.address,
      version: options.version,
      poolId,
    });
    if (poolInfo) {
      allPools.push(poolInfo);
      fs.writeFileSync(options.filePath, JSON.stringify(allPools));

      console.log(
        `Got staking pool ${options.protocol} ${options.chain} ${options.address} ${poolId} ${poolInfo.token.symbol}`
      );
    }

    poolId++;
  }
}

(async function () {
  // get masterchef staking pools
  for (const config of Masterchefs) {
    await getMasterchefPools({
      ...config,
      filePath: './configs/data/PancakeswapStakingPools.json',
    });
  }

  let pools: Array<LiquidityPoolConstant> = [];
  for (const config of Factories) {
    console.log(`Getting top liquidity pool ${config.chain} pancakeswap ${config.subgraph}`);
    pools = pools.concat(
      await UniswapLibs.getTopLiquidityPools({
        top: 100,
        chain: config.chain,
        protocol: 'pancakeswap',
        version: 'univ2',
        factoryAddress: config.address,
        endpoint: config.subgraph,
        filters: {
          orderBy: config.chain === 'bnbchain' ? 'trackedReserveBNB' : 'totalTransactions',
        },
        httpRequestOptions: {
          referer: 'https://pancakeswap.finance/',
          origin: 'https://pancakeswap.finance',
        },
      })
    );
  }
  fs.writeFileSync('./configs/data/PancakeswapPools.json', JSON.stringify(pools));

  let v3Pools: Array<LiquidityPoolConstant> = [];
  for (const config of v3Factories) {
    console.log(`Getting top liquidity pool ${config.chain} pancakeswapv3 ${config.subgraph}`);
    v3Pools = v3Pools.concat(
      await UniswapLibs.getTopLiquidityPools({
        top: 100,
        chain: config.chain,
        protocol: 'pancakeswapv3',
        version: 'univ3',
        factoryAddress: config.address,
        endpoint: config.subgraph,
        filters: {
          orderBy: 'txCount',
        },
      })
    );
  }
  fs.writeFileSync('./configs/data/Pancakeswapv3Pools.json', JSON.stringify(v3Pools));

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

  const stableswapPools: Array<LiquidityPoolConstant> = [];
  const blockchain = new BlockchainService();
  for (const config of StableswapPools) {
    const [chain, address] = config.split(':');
    const pool: LiquidityPoolConstant = {
      chain: chain,
      protocol: 'pancakeswap',
      version: 'stableswap',
      address: normalizeAddress(address),
      factory: normalizeAddress(StableswapFactory),
      tokens: [],
    };

    let i = 0;
    while (true) {
      try {
        const tokenAddress = await blockchain.singlecall({
          chain,
          target: address,
          abi: PancakeStableSwapAbi,
          method: 'coins',
          params: [i],
        });
        const token = await blockchain.getTokenInfo({
          chain,
          address: tokenAddress,
        });
        if (token) {
          updateToken(token);
          pool.tokens.push(token);
        } else {
          console.log(`failed to get token info ${chain} ${tokenAddress}`);
          process.exit(1);
        }
        i += 1;
      } catch (e: any) {
        break;
      }
    }

    stableswapPools.push(pool);
  }

  fs.writeFileSync('./configs/data/PancakeStableSwapPools.json', JSON.stringify(stableswapPools));
})();
