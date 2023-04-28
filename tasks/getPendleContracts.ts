// get all pendle.finance contract configs
import fs from 'fs';

import { PendleHelper } from '../modules/adapters/pendle/helper';

const PendleSyTokens: Array<string> = [
  'ethereum:0xcbc72d92b2dc8187414f6734718563898740c0bc', // stETH
  'ethereum:0xd393d1ddd6b8811a86d925f5e14014282581bc04', // FRAXUSDC CurveLP Convex
  'ethereum:0x35c16314d6ee4753289e5cc15a5c5e1dd4ead345', // LOOKS
  'ethereum:0x47ba20283be4d72d4afb1862994f4203551539c5', // sAPE
  'ethereum:0xdf7083f2a0f8a191ab5eeafebe92ed21cd3dd915', // rETH-WETH BalancerLP Aura
  'ethereum:0x8267fdabd1b8C8645138f2dE5B0fe24988DC9820', // wstETH-WETH BalancerLP Aura
  'ethereum:0x3025680925349c9C01c0F01cf300EC963832ec64', // Stargate-USDT
  'ethereum:0xeb83006b0aADdD15AD8AFbebE2f4e0937f210673', // sfrxETH
];

const PendleMarkets: Array<string> = [
  'ethereum:0x9eC4c502D989F04FfA9312C9D6E3F872EC91A0F9', // PT-stETH-29JUN23/SY-stETH Market
  'ethereum:0x54E28e62Ea9E8D755DC6e74674eAbE2aBfdB004E', // PT-stETH-30MAR23/SY-stETH Market
  'ethereum:0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2', // PT-stETH-24DEC24/SY-stETH Market
  'ethereum:0xC374f7eC85F8C7DE3207a10bB1978bA104bdA3B2', // PT-stETH-25DEC25/SY-stETH Market
  'ethereum:0x7b246B8dBC2a640BF2D8221890cEe8327fC23917', // PT-FRAXUSDC CurveLP Convex-30MAR23/SY
  'ethereum:0x44474D98d1484C26E8d296a43a721998731Cf775', // PT-LOOKS Staking-30MAR23/SY-LOOKS Staking Market
  'ethereum:0x9A76925dD91A7561b58D8353f0bcE4DF1e517aBb', // PT-sAPE-29JUN23/SY-sAPE Market
  'ethereum:0x5546d0f27BEd4075eA03a22c58F7016E24c94EA7', // PT-rETH-WETH BalancerLP Aura-27DEC23/SY-rETH
  'ethereum:0xFcbAe4635CA89866F83Add208eCcEec742678746', // PT-wstETH-WETH BalancerLP Aura-27JUN24/SY
  'ethereum:0x30e0dC9a1D33EAc83211a1113de238b3Ce826950', // PT-Stargate-USDT-27JUN24/SY
  'ethereum:0xfb8f489df4e04609F4f4e54F586f960818B70041', // PT-sfrxETH-26DEC24/SY
];

(async function () {
  const allContracts: any = {
    syTokens: [],
    markets: [],
  };

  for (const syToken of PendleSyTokens) {
    const [chain, address] = syToken.split(':');
    const syTokenInfo = await PendleHelper.getSyTokenInfo(chain, address);
    if (syTokenInfo) {
      allContracts.syTokens.push(syTokenInfo);

      console.info(
        `Get SY Token info address:${syTokenInfo.address} tokensIn:${syTokenInfo.tokensIn
          .map((item) => item.symbol)
          .toString()} tokensOut:${syTokenInfo.tokensOut.map((item) => item.symbol).toString()}`
      );
    }
  }

  for (const market of PendleMarkets) {
    const [chain, address] = market.split(':');
    const marketInfo = await PendleHelper.getMarketInfo(chain, address);
    if (marketInfo) {
      allContracts.markets.push(marketInfo);

      console.info(
        `Get market info address:${marketInfo.address} sy:${marketInfo.syToken.symbol} pt:${marketInfo.ptToken.symbol} yt:${marketInfo.ytToken.symbol}`
      );
    }
  }

  fs.writeFileSync(`./configs/data/PendleContracts.json`, JSON.stringify(allContracts));
})();
