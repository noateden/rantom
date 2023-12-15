import fs from 'fs';

import CrvusdControllerAbi from '../configs/abi/curve/crvusdController.json';
import { CrvusdMarket } from '../configs/protocols/curve';
import { normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const CrvusdMarkets: Array<string> = [
  'ethereum:0x8472a9a7632b173c8cf3a86d3afec50c35548e76', // sfrxETH
  'ethereum:0xec0820efafc41d8943ee8de495fc9ba8495b15cf', // sfrxETH v2
  'ethereum:0x100daa78fc509db39ef7d04de0c1abd299f4c6ce', // wstETH
  'ethereum:0x4e59541306910ad6dc1dac0ac9dfb29bd9f15c67', // WBTC
  'ethereum:0xa920de414ea4ab66b97da1bfe9e6eca7d4219635', // ETH
  'ethereum:0x1c91da0223c763d2e0173243eadaa0a2ea47e704', // tBTC
];

(async function () {
  const blockchain = new BlockchainService(null);

  const crvusdMarkets: Array<CrvusdMarket> = [];

  for (const config of CrvusdMarkets) {
    const [chain, address] = config.split(':');
    const collateralAddress = await blockchain.singlecall({
      chain: chain,
      target: address,
      abi: CrvusdControllerAbi,
      method: 'collateral_token',
      params: [],
    });
    if (collateralAddress) {
      const token = await blockchain.getTokenInfo({
        chain: chain,
        address: collateralAddress.toString(),
      });

      if (token) {
        updateToken(token);
        crvusdMarkets.push({
          protocol: 'crvusd',
          chain,
          address: normalizeAddress(address),
          debtToken: {
            chain: 'ethereum',
            symbol: 'crvUSD',
            decimals: 18,
            address: '0xf939e0a03fb07f59a73314e73794be0e57ac1b4e',
          },
          collateralToken: token,
        });
        console.info(`Got market info address:${address} token:${token.symbol}`);
      }
    }
  }

  fs.writeFileSync(`./configs/data/CrvusdMarkets.json`, JSON.stringify(crvusdMarkets));
})();
