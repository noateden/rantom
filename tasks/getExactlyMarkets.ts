// get all exact.ly markets
import fs from 'fs';

import { ExactlyHelper, ExactlyMarketInfo } from '../modules/adapters/exactly/helper';

const Markets: Array<string> = [
  '0x163538E22F4d38c1eb21B79939f3d2ee274198Ff', // DAI
  '0x660e2fC185a9fFE722aF253329CEaAD4C9F6F928', // USDC
  '0x8644c0FDED361D1920e068bA4B09996e26729435', // WBTC
  '0xc4d4500326981eacD020e20A81b1c479c161c7EF', // WETH
  '0x3843c41DA1d7909C86faD51c47B9A97Cf62a29e1', // wstETH
];

(async function () {
  const allMarkets: Array<ExactlyMarketInfo> = [];
  for (const address of Markets) {
    const marketInfo = await ExactlyHelper.getMarketInfo('ethereum', address);
    if (marketInfo) {
      allMarkets.push(marketInfo);
      console.info(`Got market info address:${marketInfo.address} token:${marketInfo.asset.symbol}`);
    }
  }

  fs.writeFileSync(`./configs/data/ExactlyMarkets.json`, JSON.stringify(allMarkets));
})();
