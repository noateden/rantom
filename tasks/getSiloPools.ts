// get all silo.finance pools
import fs from 'fs';
import Web3 from 'web3';

import SiloDepositoryAbi from '../configs/abi/silo/SiloDepository.json';
import EnvConfig from '../configs/envConfig';
import { SiloHelper, SiloPoolInfo } from '../modules/adapters/silo/helper';

const DepositoryAddress: string = '0xd998C35B7900b344bbBe6555cc11576942Cf309d';

(async function () {
  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);
  const depositoryContract = new web3.eth.Contract(SiloDepositoryAbi as any, DepositoryAddress);

  let startBlock = 15307297;
  const latestBlock = await web3.eth.getBlockNumber();

  const allPools: Array<SiloPoolInfo> = [];

  const RANGE = 2000;
  while (startBlock <= latestBlock) {
    const toBlock = startBlock + RANGE > latestBlock ? latestBlock : startBlock + RANGE;
    const events = await depositoryContract.getPastEvents('NewSilo', { fromBlock: startBlock, toBlock });
    for (const event of events) {
      const poolInfo = await SiloHelper.getSiloInfo('ethereum', event.returnValues.silo);
      if (poolInfo) {
        allPools.push(poolInfo);
        console.info(
          `Got silo info silo:${poolInfo.address} token:${poolInfo.assets.map((item) => item.symbol).toString()}`
        );
      }
    }

    startBlock = toBlock + 1;
  }

  fs.writeFileSync(`./configs/data/SiloPools.json`, JSON.stringify(allPools));
})();
