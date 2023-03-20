// get all yearn.finance vault data from factory
import fs from 'fs';
import Web3 from 'web3';

import YearnFactoryAbi from '../configs/abi/yearn/YearnFactory.json';
import EnvConfig from '../configs/envConfig';
import { YearnHelper, YearnVaultToken } from '../modules/adapters/yearn/helper';

const YearnFactory = '0x21b1FC8A52f179757bf555346130bF27c0C2A17A';

(async function () {
  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);
  const factoryContract = new web3.eth.Contract(YearnFactoryAbi as any, YearnFactory);
  const allVaultAddresses = await factoryContract.methods.allDeployedVaults().call();

  const vaults: Array<YearnVaultToken> = [];
  for (const vaultAddress of allVaultAddresses) {
    const vaultInfo = await YearnHelper.getYearnVaultToken('ethereum', vaultAddress);
    if (vaultInfo) {
      vaults.push(vaultInfo);

      console.info(
        `Got vault token chain:${vaultInfo.chain} vault:${vaultInfo.address} token:${vaultInfo.token.symbol}`
      );
    }
  }

  fs.writeFileSync(`./configs/data/YearnVaults.json`, JSON.stringify(vaults));
})();
