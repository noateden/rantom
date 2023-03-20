// get all aura.finance balancer booster pool from booster contract
import fs from 'fs';
import Web3 from 'web3';

import ConvexBoosterAbi from '../configs/abi/convex/Booster.json';
import EnvConfig from '../configs/envConfig';
import { ConvexBoosterPool, ConvexHelper } from '../modules/adapters/convex/helper';

const BoosterAddress = '0xa57b8d98dae62b26ec3bcc4a365338157060b234';

(async function () {
  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);
  const boosterContract = new web3.eth.Contract(ConvexBoosterAbi as any, BoosterAddress);

  const allPools: Array<ConvexBoosterPool> = [];
  const poolLength = await boosterContract.methods.poolLength().call();
  for (let i = 0; i < Number(poolLength); i++) {
    const poolInfo = await ConvexHelper.getBoosterPool('ethereum', BoosterAddress, i);
    if (poolInfo) {
      allPools.push(poolInfo);

      console.info(`Got pool info chain:${poolInfo.chain} poolId:${poolInfo.poolId} token:${poolInfo.lpToken.symbol}`);
    }
  }

  fs.writeFileSync(`./configs/data/AuraFinanceBoosterPools.json`, JSON.stringify(allPools));
})();
