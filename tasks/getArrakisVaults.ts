// get all arrakis.finance vaults
import fs from 'fs';
import Web3 from 'web3';

import ArrakisFactoryV1Abi from '../configs/abi/arrakis/ArrakisFactoryV1.json';
import ArrakisFactoryV2Abi from '../configs/abi/arrakis/ArrakisFactoryV2.json';
import EnvConfig from '../configs/envConfig';
import { ArrakisHelper, ArrakisVaultInfo } from '../modules/adapters/arrakis/helper';

const FactoryV1Address = '0xea1aff9dbffd1580f6b81a3ad3589e66652db7d9';
const FactoryV2Address = '0xecb8ffcb2369ef188a082a662f496126f66c8288';

interface ArrakisVaultInfoWithBirthday extends ArrakisVaultInfo {
  birthday: number;
}

(async function () {
  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);

  const allVaults: Array<ArrakisVaultInfoWithBirthday> = [];

  const factoryV1Contract = new web3.eth.Contract(ArrakisFactoryV1Abi as any, FactoryV1Address);
  const factoryV2Contract = new web3.eth.Contract(ArrakisFactoryV2Abi as any, FactoryV2Address);

  const range = 2000;
  const latestBlock = await web3.eth.getBlockNumber();

  let startBlock = 14570738;
  while (startBlock <= latestBlock) {
    const toBlock = startBlock + range > latestBlock ? latestBlock : startBlock + range;

    const logs = await factoryV1Contract.getPastEvents('PoolCreated', { fromBlock: startBlock, toBlock });
    for (const log of logs) {
      const vaultInfo = await ArrakisHelper.getVaultInfo('ethereum', 1, log.returnValues.pool);
      if (vaultInfo) {
        allVaults.push({
          ...vaultInfo,
          birthday: log.blockNumber,
        });

        console.info(
          `Got vault info vault:${vaultInfo.address} token:${vaultInfo.token0.symbol}-${vaultInfo.token1.symbol}`
        );
      }
    }

    console.info(`Latest block ${toBlock}`);

    startBlock = toBlock + 1;
  }

  startBlock = 16534507;
  while (startBlock <= latestBlock) {
    const toBlock = startBlock + range > latestBlock ? latestBlock : startBlock + range;

    const logs = await factoryV2Contract.getPastEvents('VaultCreated', { fromBlock: startBlock, toBlock });
    for (const log of logs) {
      const vaultInfo = await ArrakisHelper.getVaultInfo('ethereum', 2, log.returnValues.vault);
      if (vaultInfo) {
        allVaults.push({
          ...vaultInfo,
          birthday: log.blockNumber,
        });

        console.info(
          `Got vault info vault:${vaultInfo.address} token:${vaultInfo.token0.symbol}-${vaultInfo.token1.symbol}`
        );
      }
    }

    console.info(`Latest block ${toBlock}`);

    startBlock = toBlock + 1;
  }

  fs.writeFileSync(`./configs/data/ArrakisVaults.json`, JSON.stringify(allVaults));
})();
