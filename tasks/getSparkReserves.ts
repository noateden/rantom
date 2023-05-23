// get all reserve tokens of aave.com
import fs from 'fs';
import Web3 from 'web3';

import AaveV3PoolAbi from '../configs/abi/aave/LendingPoolV3.json';
import EnvConfig from '../configs/envConfig';
import { Web3HelperProvider } from '../services/web3';
import { Token } from '../types/configs';

const SparkProtocolLendingPool = '0xC13e21B648A5Ee794902342038FF3aDAB66BE987';

(async function () {
  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);
  const web3Helper = new Web3HelperProvider(null);

  const lendingPool = new web3.eth.Contract(AaveV3PoolAbi as any, SparkProtocolLendingPool);

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

  fs.writeFileSync(`./configs/data/SparkReserves.json`, JSON.stringify(allReserves));
})();
