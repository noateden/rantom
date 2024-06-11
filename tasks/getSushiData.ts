// get static data of Uniswap protocol: uniswapv2, uniswapv3
import fs from 'fs';

import SushiMasterchefAbi from '../configs/abi/sushi/Masterchef.json';
import { PublicSubGraphEndpoints } from '../configs/constants/subgraphEndpoints';
import SushiLibs from '../modules/adapters/sushi/libs';
import UniswapLibs from '../modules/adapters/uniswap/libs';
import BlockchainService from '../services/blockchains/blockchain';
import { LiquidityPoolConstant, StakingPoolConstant } from '../types/domains';
import updateToken from './helpers/updateToken';

const SushiFactories: Array<any> = [
  {
    chain: 'ethereum',
    address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
    subgraph: PublicSubGraphEndpoints.sushi,
  },
  {
    chain: 'arbitrum',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    subgraph: PublicSubGraphEndpoints.sushiArbitrum,
  },
  {
    chain: 'polygon',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    subgraph: PublicSubGraphEndpoints.sushiPolygon,
  },
  {
    chain: 'bnbchain',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    subgraph: PublicSubGraphEndpoints.sushiBnbchain,
  },
  {
    chain: 'avalanche',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    subgraph: PublicSubGraphEndpoints.sushiAvalanche,
  },
  {
    chain: 'fantom',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    subgraph: PublicSubGraphEndpoints.sushiFantom,
  },
  {
    chain: 'celo',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    subgraph: PublicSubGraphEndpoints.sushiCelo,
  },
];

const Sushiv3Factories: Array<any> = [
  {
    chain: 'ethereum',
    address: '0xbaceb8ec6b9355dfc0269c18bac9d6e2bdc29c4f',
    subgraph: PublicSubGraphEndpoints.sushiv3,
  },
  {
    chain: 'arbitrum',
    address: '0x1af415a1eba07a4986a52b6f2e7de7003d82231e',
    subgraph: PublicSubGraphEndpoints.sushiv3Arbitrum,
  },
  {
    chain: 'base',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    subgraph: PublicSubGraphEndpoints.sushiv3Base,
  },
  {
    chain: 'polygon',
    address: '0x917933899c6a5f8e37f31e19f92cdbff7e8ff0e2',
    subgraph: PublicSubGraphEndpoints.sushiv3Polygon,
  },
  {
    chain: 'optimism',
    address: '0x9c6522117e2ed1fe5bdb72bb0ed5e3f2bde7dbe0',
    subgraph: PublicSubGraphEndpoints.sushiv3Optimism,
  },
  {
    chain: 'bnbchain',
    address: '0x126555dd55a39328f69400d6ae4f782bd4c34abb',
    subgraph: PublicSubGraphEndpoints.sushiv3Bnbchain,
  },
  {
    chain: 'avalanche',
    address: '0x3e603c14af37ebdad31709c4f848fc6ad5bec715',
    subgraph: PublicSubGraphEndpoints.sushiv3Avalanche,
  },
  {
    chain: 'fantom',
    address: '0x7770978eed668a3ba661d51a773d3a992fc9ddcb',
    subgraph: PublicSubGraphEndpoints.sushiv3Fantom,
  },
];

const Masterchefs: Array<any> = [
  {
    chain: 'ethereum',
    protocol: 'sushi',
    version: 'masterchef',
    address: '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd',
  },
  {
    chain: 'ethereum',
    protocol: 'sushi',
    version: 'masterchefV2',
    address: '0xef0881ec094552b2e128cf945ef17a6752b4ec5d',
  },
  {
    chain: 'arbitrum',
    protocol: 'sushi',
    version: 'minichef',
    address: '0xf4d73326c13a4fc5fd7a064217e12780e9bd62c3',
  },
  {
    chain: 'polygon',
    protocol: 'sushi',
    version: 'minichef',
    address: '0x0769fd68dfb93167989c6f7254cd0d766fb2841f',
  },
];

export interface GetMasterChefPoolsOptions {
  filePath: string;
  chain: string;
  address: string;
  protocol: string;
  version: 'masterchef' | 'masterchefV2' | 'minichef';
}

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
      updateToken(poolInfo.token);
      if (poolInfo.rewardToken) {
        updateToken(poolInfo.rewardToken);
      }

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
      filePath: './configs/data/SushiStakingPools.json',
    });
  }

  let pools: Array<LiquidityPoolConstant> = [];
  for (const config of SushiFactories) {
    console.log(`Getting top liquidity pool ${config.chain} sushi ${config.subgraph}`);
    pools = pools.concat(
      await UniswapLibs.getTopLiquidityPools({
        top: 100,
        chain: config.chain,
        protocol: 'sushi',
        version: 'univ2',
        factoryAddress: config.address,
        endpoint: config.subgraph,
        filters: {
          orderBy: 'txCount',
        },
      })
    );
  }
  fs.writeFileSync('./configs/data/SushiPools.json', JSON.stringify(pools));

  let v3Pools: Array<LiquidityPoolConstant> = [];
  for (const config of Sushiv3Factories) {
    console.log(`Getting top liquidity pool ${config.chain} sushiv3 ${config.subgraph}`);
    v3Pools = v3Pools.concat(
      await UniswapLibs.getTopLiquidityPools({
        top: 100,
        chain: config.chain,
        protocol: 'sushiv3',
        version: 'univ3',
        factoryAddress: config.address,
        endpoint: config.subgraph,
        filters: {
          orderBy: 'txCount',
        },
      })
    );
  }
  fs.writeFileSync('./configs/data/Sushiv3Pools.json', JSON.stringify(v3Pools));

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
