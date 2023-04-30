// get all agilitylsd.com staking pools
import fs from 'fs';
import Web3 from 'web3';

import AgilityStakingPoolFactoryAbi from '../configs/abi/agility/StakingPoolFactory.json';
import EnvConfig from '../configs/envConfig';
import { AgilityHelper, AgilityStakingPoolInfo } from '../modules/adapters/agility/helper';

const FactoryAddress = '0xE4a51EC59233BA1f62b71F84554622a532B584ed';

interface AgilityStakingPoolInfoWithBirthday extends AgilityStakingPoolInfo {
  birthday: number;
}

(async function () {
  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);

  const allPools: Array<AgilityStakingPoolInfoWithBirthday> = [];

  const factoryContract = new web3.eth.Contract(AgilityStakingPoolFactoryAbi as any, FactoryAddress);

  const range = 2000;
  const latestBlock = await web3.eth.getBlockNumber();

  let startBlock = 17015686;
  while (startBlock <= latestBlock) {
    const toBlock = startBlock + range > latestBlock ? latestBlock : startBlock + range;

    const logs = await factoryContract.getPastEvents('StakingPoolDeployed', { fromBlock: startBlock, toBlock });
    for (const log of logs) {
      const poolInfo = await AgilityHelper.getStakingPoolInfo('ethereum', log.returnValues.poolAddress);
      if (poolInfo) {
        allPools.push({
          ...poolInfo,
          birthday: log.blockNumber,
        });

        console.info(
          `Got pool info pool:${poolInfo.address} token:${poolInfo.stakingToken.symbol}-${poolInfo.rewardToken.symbol}`
        );
      }
    }

    console.info(`Latest block ${toBlock}`);

    startBlock = toBlock + 1;
  }

  fs.writeFileSync(`./configs/data/AgilityStakingPools.json`, JSON.stringify(allPools));
})();
