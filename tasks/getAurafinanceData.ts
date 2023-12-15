// get static data of aura.finance
import fs from 'fs';

import ConvexBoosterAbi from '../configs/abi/convex/Booster.json';
import { AddressZero } from '../configs/constants/addresses';
import { ConvexStakingPoolConstant } from '../configs/protocols/convex';
import EthereumTokenList from '../configs/tokenlists/ethereum.json';
import { compareAddress } from '../lib/utils';
import ConvexLibs from '../modules/adapters/convex/libs';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const Boosters: Array<any> = [
  {
    chain: 'ethereum',
    protocol: 'aurafinance',
    version: 'convexBooster',
    address: '0xa57b8d98dae62b26ec3bcc4a365338157060b234',
  },
  {
    chain: 'arbitrum',
    protocol: 'aurafinance',
    version: 'convexBooster',
    address: '0x98ef32edd24e2c92525e59afc4475c1242a30184',
  },
  {
    chain: 'polygon',
    protocol: 'aurafinance',
    version: 'convexBooster',
    address: '0x98ef32edd24e2c92525e59afc4475c1242a30184',
  },
  {
    chain: 'base',
    protocol: 'aurafinance',
    version: 'convexBooster',
    address: '0x98ef32edd24e2c92525e59afc4475c1242a30184',
  },
  {
    chain: 'optimism',
    protocol: 'aurafinance',
    version: 'convexBooster',
    address: '0x98ef32edd24e2c92525e59afc4475c1242a30184',
  },
];

const stakingPoolFilePath = './configs/data/AurafinanceStakingPools.json';

(async function () {
  const blockchain = new BlockchainService(null);

  for (const config of Boosters) {
    let existedPools: Array<ConvexStakingPoolConstant> = [];
    if (fs.existsSync(stakingPoolFilePath)) {
      existedPools = JSON.parse(fs.readFileSync(stakingPoolFilePath).toString());
    }

    if (existedPools.length === 0) {
      existedPools.push({
        chain: 'ethereum',
        version: 'basic',
        protocol: 'aurafinance',
        address: '0x00a7ba8ae7bca0b10a32ea1f8e2a1da980c6cad2', // stake auraBAL earn BAL
        token: {
          chain: 'ethereum',
          symbol: 'auraBAL',
          decimals: 18,
          address: '0x616e8bfa43f920657b3497dbf40d6b1a02d4608d',
        },
        poolId: 0,
        rewardToken: EthereumTokenList.BAL,
        rewardContract: AddressZero,
      });
      existedPools.push({
        chain: 'ethereum',
        version: 'basic',
        protocol: 'aurafinance',
        address: '0x5e5ea2048475854a5702f5b8468a51ba1296efcc', // stake auraBAL earn BAL
        token: {
          chain: 'ethereum',
          symbol: 'auraBAL',
          decimals: 18,
          address: '0x616e8bfa43f920657b3497dbf40d6b1a02d4608d',
        },
        poolId: 0,
        rewardToken: EthereumTokenList.BAL,
        rewardContract: AddressZero,
      });
      existedPools.push({
        chain: 'ethereum',
        version: 'basic',
        protocol: 'aurafinance',
        address: '0x3fa73f1e5d8a792c80f426fc8f84fbf7ce9bbcac', // stake auraBAL earn BAL
        token: EthereumTokenList.AURA,
        poolId: 0,
        rewardToken: EthereumTokenList.AURA,
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
