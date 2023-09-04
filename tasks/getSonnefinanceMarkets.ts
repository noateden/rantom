// get all sonne.finance markets
import fs from 'fs';

import { CompoundHelper, CompoundMarketInfo } from '../modules/adapters/compound/helper';

const CompoundMarkets: Array<string> = [
  '0x5f5c479fe590cd4442a05ae4a941dd991a633b8e', // soWETH
  '0xb864ba2aab1f53bc3af7ae49a318202dd3fd54c2', // soDAI
  '0x225886c9beb5eee254f79d58bbd80cf9f200d4d0', // soUSDbC
];

(async function () {
  const allMarkets: Array<CompoundMarketInfo> = [];

  for (const address of CompoundMarkets) {
    const market = await CompoundHelper.getMarketInfo('base', false, address);
    if (market) {
      allMarkets.push(market);
      console.info(`Got market info address:${market.address} token:${market.underlying.symbol}`);
    }
  }
  fs.writeFileSync(`./configs/data/SonnefinanceMarkets.json`, JSON.stringify(allMarkets));
})();
