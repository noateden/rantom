// get all reserve tokens of aave.com
import fs from 'fs';
import Web3 from 'web3';

import AaveV2PoolAbi from '../configs/abi/aave/LendingPoolV2.json';
import AaveV3PoolAbi from '../configs/abi/aave/LendingPoolV3.json';
import EnvConfig from '../configs/envConfig';
import { normalizeAddress } from '../lib/helper';
import { Web3HelperProvider } from '../services/web3';
import { Token } from '../types/configs';

const LendingPoolV2 = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9';
const LendingPoolV3 = '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2';

const IgnoreReserves: any = {
  '0xd5147bc8e386d91cc5dbe72099dac6c9b99276f5': true, // renFIL
};

(async function () {
  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);
  const web3Helper = new Web3HelperProvider(null);

  const lendingPoolV2 = new web3.eth.Contract(AaveV2PoolAbi as any, LendingPoolV2);
  const lendingPoolV3 = new web3.eth.Contract(AaveV3PoolAbi as any, LendingPoolV3);

  const [reservesV2, reservesV3] = await Promise.all([
    lendingPoolV2.methods.getReservesList().call(),
    lendingPoolV3.methods.getReservesList().call(),
  ]);

  const allReserves: Array<Token> = [];
  const reserveFound: { [key: string]: boolean } = {};
  for (const reserve of (reservesV2 as Array<string>).concat(reservesV3)) {
    if (IgnoreReserves[normalizeAddress(reserve)]) continue;

    if (!reserveFound[reserve]) {
      const token: Token | null = await web3Helper.getErc20Metadata('ethereum', reserve);
      if (token) {
        allReserves.push(token);
        reserveFound[reserve] = true;

        console.info(`Got reserve info token:${token.symbol}:${token.address}`);
      }
    }
  }

  fs.writeFileSync(`./configs/data/AaveReserves.json`, JSON.stringify(allReserves));
})();
