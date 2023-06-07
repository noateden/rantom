// get all reserve tokens of sturdy.finance
import fs from 'fs';
import Web3 from 'web3';

import AaveV2PoolAbi from '../configs/abi/aave/LendingPoolV2.json';
import EnvConfig from '../configs/envConfig';
import { Web3HelperProvider } from '../services/web3';
import { Token } from '../types/configs';

const LendingPool = '0xA422CA380bd70EeF876292839222159E41AAEe17';

(async function () {
  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);
  const web3Helper = new Web3HelperProvider(null);

  const lendingPool = new web3.eth.Contract(AaveV2PoolAbi as any, LendingPool);

  const reserves = await lendingPool.methods.getReservesList().call();

  const allReserves: Array<Token> = [];
  const reserveFound: { [key: string]: boolean } = {};
  for (const reserve of reserves) {
    if (!reserveFound[reserve]) {
      const token: Token | null = await web3Helper.getErc20Metadata('ethereum', reserve);
      if (token) {
        allReserves.push(token);
        reserveFound[reserve] = true;

        console.info(`Got reserve info token:${token.symbol}:${token.address}`);
      }
    }
  }

  fs.writeFileSync(`./configs/data/SturdyReserves.json`, JSON.stringify(allReserves));
})();
