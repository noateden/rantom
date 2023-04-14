// get all fraxlend pairs
import fs from 'fs';

import { FraxlendHelper, FraxlendPairInfo } from '../modules/adapters/fraxlend/helper';

const Pairs: Array<string> = [
  '0x794F6B13FBd7EB7ef10d1ED205c9a416910207Ff', // WETH
  '0x32467a5fc2d72D21E8DCe990906547A2b012f382', // WBTC
  '0x78bB3aEC3d855431bd9289fD98dA13F9ebB7ef15', // sfrxETH
  '0x3a25B9aB8c07FfEFEe614531C75905E810d8A239', // APE
  '0xDbe88DBAc39263c47629ebbA02b3eF4cf0752A72', // FXS
  '0x74F82Bd9D0390A4180DaaEc92D64cf0708751759', // FPI
  '0xa1D100a5bf6BFd2736837c97248853D989a9ED84', // CVX
  '0x3835a58CA93Cdb5f912519ad366826aC9a752510', // CRV
  '0x66bf36dBa79d4606039f04b32946A260BCd3FF52', // gOHM
  '0x82Ec28636B77661a95f021090F6bE0C8d379DD5D', // MKR
];

(async function () {
  const allPairs: Array<FraxlendPairInfo> = [];
  for (const address of Pairs) {
    const pairInfo = await FraxlendHelper.getLendPairInfo('ethereum', address);
    if (pairInfo) {
      allPairs.push(pairInfo);

      console.info(
        `Get pair info pair:${pairInfo.address} asset:${pairInfo.asset.symbol} collateral:${pairInfo.collateral.symbol}`
      );
    }
  }

  fs.writeFileSync(`./configs/data/FraxlendPairs.json`, JSON.stringify(allPairs));
})();
