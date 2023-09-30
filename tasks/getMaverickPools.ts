import fs from 'fs';
import Web3 from 'web3';

import MaverickFactoryAbi from '../configs/abi/maverick/IFactory.json';
import EnvConfig from '../configs/envConfig';
import { MaverickHelper, MaverickPoolInfo } from '../modules/adapters/maverick/helper';

const Factories: Array<string> = [
  'ethereum:0xEb6625D65a0553c9dBc64449e56abFe519bd9c9B:17210221',
  'base:0xB2855783a346735e4AAe0c1eb894DEf861Fa9b45:1489615',
];

(async function () {
  const allPools: Array<MaverickPoolInfo> = [];

  for (const factory of Factories) {
    const [chain, address, block] = factory.split(':');

    let startBlock = Number(block);

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(MaverickFactoryAbi as any, address);
    const latestBlock = await web3.eth.getBlockNumber();

    while (startBlock <= latestBlock) {
      const toBlock = startBlock + 1000 > latestBlock ? latestBlock : startBlock + 1000;
      const events = await contract.getPastEvents('PoolCreated', { fromBlock: startBlock, toBlock });
      for (const event of events) {
        const poolInfo = await MaverickHelper.getPoolInfo(chain, event.returnValues.poolAddress);
        if (poolInfo) {
          allPools.push(poolInfo);
          console.log(`Got pool into ${chain} ${poolInfo.tokenA.symbol}-${poolInfo.tokenB.symbol} ${poolInfo.address}`);
        }
      }

      startBlock += 1000;
    }
  }

  fs.writeFileSync(`./configs/data/MaverickPools.json`, JSON.stringify(allPools));
})();
