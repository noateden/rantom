// get all aura.finance balancer booster pool from booster contract
import fs from 'fs';
import Web3 from 'web3';

import ConvexBoosterAbi from '../configs/abi/convex/Booster.json';
import EnvConfig from '../configs/envConfig';
import { ConvexBoosterPool, ConvexHelper } from '../modules/adapters/convex/helper';

const BoosterAddresses: Array<string> = [
  'ethereum:0xa57b8d98dae62b26ec3bcc4a365338157060b234',
  'arbitrum:0x98Ef32edd24e2c92525E59afc4475C1242a30184',
];

(async function () {
  const allPools: Array<ConvexBoosterPool> = [];

  for (const config of BoosterAddresses) {
    const [chain, address] = config.split(':');
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const boosterContract = new web3.eth.Contract(ConvexBoosterAbi as any, address);

    const poolLength = await boosterContract.methods.poolLength().call();
    for (let i = 0; i < Number(poolLength); i++) {
      const poolInfo = await ConvexHelper.getBoosterPool(chain, address, i);
      if (poolInfo) {
        allPools.push(poolInfo);

        console.info(
          `Got pool info chain:${poolInfo.chain} poolId:${poolInfo.poolId} token:${poolInfo.lpToken.symbol}`
        );
      }
    }
  }

  fs.writeFileSync(`./configs/data/AuraFinanceBoosterPools.json`, JSON.stringify(allPools));
})();
