// get all ib.xyz markets
import fs from 'fs';

import { CompoundHelper, CompoundMarketInfo } from '../modules/adapters/compound/helper';

const CompoundMarkets: Array<string> = [
  '0x41c84c0e2ee0b740cf0d31f63f3b6f627dc6b393', // WETH
  '0x8e595470ed749b85c6f7669de83eae304c2ec68f', // DAI
  '0xe7bff2da8a2f619c2586fb83938fa56ce803aa16', // LINK
  '0xfa3472f7319477c9bfecdd66e4b948569e7621b9', // YFI
  '0x12a9cc33a980daa74e00cc2d1a0e74c57a93d12c', // SNX
  '0x8fc8bfd80d6a9f17fb98a373023d72531792b431', // WBTC
  '0x48759f220ed983db51fa7a8c0d2aab8f3ce4166a', // USDT
  '0x76eb2fe28b36b3ee97f3adae0c69606eedb2a37c', // USDC
  '0xa7c4054afd3dbbbf5bfe80f41862b89ea05c9806', // sUSD
  '0xa8caea564811af0e92b1e044f3edd18fa9a73e4f', // EURS
  '0xca55f9c4e77f7b8524178583b0f7c798de17fd54', // sEUR
  '0x7736ffb07104c0c400bb0cc9a7c228452a732992', // DPI
  '0xfeeb92386a055e2ef7c2b598c872a4047a7db59f', // UNI
  '0x226f3738238932ba0db2319a8117d9555446102f', // SUSHI
  '0xb8c5af54bbdcc61453144cf472a9276ae36109f9', // CRV
  '0x30190a3b52b5ab1daf70d46d72536f5171f22340', // AAVE
  '0x9e8e207083ffd5bdc3d99a1f32d1e6250869c1a9', // MIM
  '0xe0b57feed45e7d908f2d0dacd26f113cf26715bf', // CVX
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
  fs.writeFileSync(`./configs/data/IronbankMarkets.json`, JSON.stringify(allMarkets));
})();
