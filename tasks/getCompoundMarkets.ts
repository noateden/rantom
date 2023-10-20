// get all compound.finance markets
import fs from 'fs';

import { CompoundHelper, CompoundMarketInfo } from '../modules/adapters/compound/helper';

const CompoundMarkets: Array<string> = [
  '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c', // AAVE
  '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e', // BAT
  '0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4', // COMP
  '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643', // DAI
  '0x7713dd9ca933848f6819f38b8352d9a15ea73f67', // FEI
  '0xface851a4921ce59e912d19329929ce6da6eb0c7', // LINK
  '0x95b4ef2869ebd94beb4eee400a99824bf5dc325b', // MKR
  '0x158079ee67fce2f58472a96584a73c7ab9ac95c1', // REP
  '0xf5dce57282a584d2746faf1593d3121fcac444dc', // SAI
  '0x4b0181102a0112a2ef11abee5563bb4a3176c9d7', // SUSHI
  '0x12392f67bdf24fae0af363c24ac620a2f67dad86', // TUSD
  '0x35a18000230da775cac24873d00ff85bccded550', // UNI
  '0x39aa39c021dfbae8fac545936693ac917d5e7563', // USDC
  '0x041171993284df560249b57358f931d9eb7b925d', // USDP
  '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9', // USDT
  '0xc11b1268c1a384e55c48c2391d8d480264a3a7f4', // WBTC
  '0xccf4429db6322d5c611ee964527d42e5d685dd6a', // WBTC 2
  '0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946', // YFI
  '0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407', // ZRX
];

const CompoundMarketsV3 = [
  'ethereum:0xc3d688b66703497daa19211eedff47f25384cdc3', // v3 USDC
  'ethereum:0xa17581a9e3356d9a858b789d68b4d866e593ae94', // v3 WETH
  'arbitrum:0xa5edbdd9646f8dff606d7448e414884c7d905dca', // v3 USDC
  'base:0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf', // v3 USDbC
  'base:0x46e6b214b524310239732d51387075e0e70970bf', // v3 WETH
  'polygon:0xf25212e676d1f7f89cd72ffee66158f541246445', // v3 USDC
];

(async function () {
  const allMarkets: Array<CompoundMarketInfo> = [];

  const cETH = '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5';
  const etherMarket = await CompoundHelper.getMarketInfo('ethereum', true, cETH);
  if (etherMarket) {
    allMarkets.push(etherMarket);
  }

  for (const address of CompoundMarkets) {
    const market = await CompoundHelper.getMarketInfo('ethereum', false, address);
    if (market) {
      allMarkets.push(market);
      console.info(`Got market info address:${market.address} token:${market.underlying.symbol}`);
    }
  }
  fs.writeFileSync(`./configs/data/CompoundMarkets.json`, JSON.stringify(allMarkets));

  const v3Markets = [];
  for (const config of CompoundMarketsV3) {
    const [chain, address] = config.split(':');
    const market = await CompoundHelper.getMarketInfoV3(chain, address);
    if (market) {
      v3Markets.push(market);
      console.info(`Got market v3 info chain:${chain} address:${market.address} token:${market.baseToken.symbol}`);
    }
  }
  fs.writeFileSync(`./configs/data/CompoundMarketsV3.json`, JSON.stringify(v3Markets));
})();
