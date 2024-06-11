// get static data of convexfinance.com
import fs from 'fs';

import ConvexBoosterAbi from '../configs/abi/convex/Booster.json';
import { AddressZero } from '../configs/constants/addresses';
import { ConvexStakingPoolConstant } from '../configs/protocols/convex';
import EthereumTokenList from '../configs/tokenlists/ethereum.json';
import { compareAddress } from '../lib/utils';
import ConvexLibs from '../modules/adapters/convex/libs';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const ConvexBoosters: Array<any> = [
  {
    chain: 'ethereum',
    protocol: 'convex',
    version: 'convexBooster',
    address: '0xf403c135812408bfbe8713b5a23a04b3d48aae31',
  },
  {
    chain: 'arbitrum',
    protocol: 'convex',
    version: 'convexBoosterV2',
    address: '0xf403c135812408bfbe8713b5a23a04b3d48aae31',
  },
  {
    chain: 'polygon',
    protocol: 'convex',
    version: 'convexBoosterV2',
    address: '0xf403c135812408bfbe8713b5a23a04b3d48aae31',
  },
];

const stakingPoolFilePath = './configs/data/ConvexStakingPools.json';

(async function () {
  const blockchain = new BlockchainService();

  for (const config of ConvexBoosters) {
    let existedPools: Array<ConvexStakingPoolConstant> = [];
    if (fs.existsSync(stakingPoolFilePath)) {
      existedPools = JSON.parse(fs.readFileSync(stakingPoolFilePath).toString());
    }

    if (existedPools.length === 0) {
      existedPools.push({
        chain: 'ethereum',
        version: 'basic',
        protocol: 'convex',
        address: '0xcf50b810e57ac33b91dcf525c6ddd9881b139332', // stake CVX earn CRV
        token: EthereumTokenList.CVX,
        poolId: 0,
        rewardToken: EthereumTokenList.CRV,
        rewardContract: AddressZero,
      });
      existedPools.push({
        chain: 'ethereum',
        version: 'basic',
        protocol: 'convex',
        address: '0x3fe65692bfcd0e6cf84cb1e7d24108e434a7587e', // stake cvxCRV earn CRV
        token: EthereumTokenList.cvxCRV,
        poolId: 0,
        rewardToken: EthereumTokenList.CRV,
        rewardContract: AddressZero,
      });
      existedPools.push({
        chain: 'ethereum',
        version: 'basic',
        protocol: 'convex',
        address: '0xd18140b4b819b895a3dba5442f959fa44994af50', // CVX locker old
        token: EthereumTokenList.CVX,
        poolId: 0,
        rewardToken: EthereumTokenList.CVX,
        rewardContract: AddressZero,
      });
      existedPools.push({
        chain: 'ethereum',
        version: 'basic',
        protocol: 'convex',
        address: '0x72a19342e8f1838460ebfccef09f6585e32db86e', // CVX locker v2
        token: EthereumTokenList.CVX,
        poolId: 0,
        rewardToken: EthereumTokenList.CVX,
        rewardContract: AddressZero,
      });
    }

    const poolLength = await blockchain.singlecall({
      chain: config.chain,
      abi: ConvexBoosterAbi,
      target: config.address,
      method: 'poolLength',
      params: [],
    });

    for (let poolId = 0; poolId < Number(poolLength); poolId++) {
      if (
        existedPools.filter(
          (item) =>
            item.chain === config.chain && compareAddress(item.address, config.address) && item.poolId === poolId
        ).length === 0
      ) {
        const stakingPool = await ConvexLibs.getBoosterPoolInfo({
          services: null,
          chain: config.chain,
          address: config.address,
          protocol: config.protocol,
          version: config.version,
          poolId: poolId,
        });
        if (stakingPool) {
          updateToken(stakingPool.token);
          if (stakingPool.rewardToken) {
            updateToken(stakingPool.rewardToken);
          }

          existedPools.push(stakingPool);
          fs.writeFileSync(stakingPoolFilePath, JSON.stringify(existedPools));

          console.log(
            `Got staking pool ${config.protocol} ${config.chain} ${config.address} ${stakingPool.poolId} ${stakingPool.token.symbol}`
          );
        }
      }
    }
  }
})();
