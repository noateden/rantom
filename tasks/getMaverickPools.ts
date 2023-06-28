import fs from 'fs';
import Web3 from 'web3';

import MaverickFactoryAbi from '../configs/abi/maverick/IFactory.json';
import EnvConfig from '../configs/envConfig';
import { MaverickHelper, MaverickPoolInfo } from '../modules/adapters/maverick/helper';

const Factory = '0xEb6625D65a0553c9dBc64449e56abFe519bd9c9B';

(async function () {
  let startBlock = 17210221;

  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);
  const contract = new web3.eth.Contract(MaverickFactoryAbi as any, Factory);
  const latestBlock = await web3.eth.getBlockNumber();

  const allPools: Array<MaverickPoolInfo> = [];

  while (startBlock <= latestBlock) {
    const toBlock = startBlock + 1000 > latestBlock ? latestBlock : startBlock + 1000;
    const events = await contract.getPastEvents('PoolCreated', { fromBlock: startBlock, toBlock });
    for (const event of events) {
      const poolInfo = await MaverickHelper.getPoolInfo('ethereum', event.returnValues.poolAddress);
      if (poolInfo) {
        allPools.push(poolInfo);
        console.log(`Got pool into ${poolInfo.tokenA.symbol}-${poolInfo.tokenB.symbol} ${poolInfo.address}`);
      }
    }

    startBlock += 1000;
  }

  fs.writeFileSync(`./configs/data/MaverickPools.json`, JSON.stringify(allPools));
})();
