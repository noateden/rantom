// get all convexfinance.com curve booster pool from booster contract
import fs from 'fs';
import Web3 from 'web3';

import ConvexBoosterAbi from '../configs/abi/convex/Booster.json';
import EnvConfig from '../configs/envConfig';
import { ConvexBoosterPool, ConvexHelper } from '../modules/adapters/convex/helper';

const BoosterAddresses: Array<string> = [
  'arbitrum:0xF403C135812408BFbE8713b5A23a04b3D48AAE31',
  'ethereum:0xF403C135812408BFbE8713b5A23a04b3D48AAE31',
];

(async function () {
  const allPools: Array<ConvexBoosterPool> = [];

  for (const config of BoosterAddresses) {
    const [chain, address] = config.split(':');
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const boosterContract = new web3.eth.Contract(ConvexBoosterAbi as any, address);

    const poolLength = await boosterContract.methods.poolLength().call();
    for (let i = 0; i < Number(poolLength); i++) {
      let poolInfo: ConvexBoosterPool | null = null;

      if (chain === 'ethereum') {
        poolInfo = await ConvexHelper.getBoosterPool(chain, address, i);
      } else {
        poolInfo = await ConvexHelper.getBoosterPoolV2(chain, address, i);
      }

      if (poolInfo) {
        allPools.push(poolInfo);
        console.info(
          `Got pool info chain:${poolInfo.chain} poolId:${poolInfo.poolId} token:${poolInfo.lpToken.symbol}`
        );
      }
    }
  }

  fs.writeFileSync(`./configs/data/ConvexBoosterPools.json`, JSON.stringify(allPools));
})();
