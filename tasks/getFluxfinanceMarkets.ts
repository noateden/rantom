// get all flux.finance markets
import fs from 'fs';

import { CompoundHelper, CompoundMarketInfo } from '../modules/adapters/compound/helper';

const CompoundMarkets: Array<string> = [
  '0x465a5a630482f3abd6d3b84b39b29b07214d19e5', // fUSDC
  '0xe2ba8693ce7474900a045757fe0efca900f6530b', // fDAI
  '0x81994b9607e06ab3d5cf3afff9a67374f05f27d7', // fUSDT
  '0x1c9a2d6b33b4826757273d47ebee0e2dddcd978b', // fFRAX
  '0x1dd7950c266fb1be96180a8fdb0591f70200e018', // fOUSG
];

(async function () {
  const allMarkets: Array<CompoundMarketInfo> = [];

  for (const address of CompoundMarkets) {
    const market = await CompoundHelper.getMarketInfo('ethereum', false, address);
    if (market) {
      allMarkets.push(market);
      console.info(`Got market info address:${market.address} token:${market.underlying.symbol}`);
    }
  }
  fs.writeFileSync(`./configs/data/FluxfinanceMarkets.json`, JSON.stringify(allMarkets));
})();
