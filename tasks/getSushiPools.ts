import fs from 'fs';

import { SushiHelper } from '../modules/adapters/sushi/helper';

const SushiMasterchef = '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd';
const SushiMasterchefV2 = '0xef0881ec094552b2e128cf945ef17a6752b4ec5d';
const SushiMinichefArbitrum = '0xf4d73326c13a4fc5fd7a064217e12780e9bd62c3';

(async function () {
  let allPools = await SushiHelper.getAllPool('arbitrum', SushiMinichefArbitrum, 'minichef');
  allPools = allPools.concat(await SushiHelper.getAllPool('ethereum', SushiMasterchefV2, 'masterchefV2'));
  allPools = allPools.concat(await SushiHelper.getAllPool('ethereum', SushiMasterchef, 'masterchef'));
  fs.writeFileSync(`./configs/data/SushiPools.json`, JSON.stringify(allPools));
})();
