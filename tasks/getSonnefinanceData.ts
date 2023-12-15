// get all sonne.finance markets
import fs from 'fs';

import CompoundErc20Abi from '../configs/abi/compound/cErc20.json';
import { CompoundMarket } from '../configs/protocols/compound';
import { normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const IronbankMarkets: Array<string> = [
  'base:0x5F5c479fe590cD4442A05aE4a941dd991A633B8E', // WETH
  'base:0xb864BA2aab1f53BC3af7AE49a318202dD3fd54C2', // DAI
  'base:0x225886C9beb5eeE254F79d58bbD80cf9F200D4d0', // USDbC
  'base:0xfd68F92B45b633bbe0f475294C1A86aecD62985A', // USDC

  'optimism:0xf7B5965f5C117Eb1B5450187c9DcFccc3C317e8E', // WETH
  'optimism:0x5569b83de187375d43FBd747598bfe64fC8f6436', // DAI
  'optimism:0xEC8FEa79026FfEd168cCf5C627c7f486D77b765F', // USDC
  'optimism:0x5Ff29E4470799b982408130EFAaBdeeAE7f66a10', // USDT
  'optimism:0x8cD6b19A07d754bF36AdEEE79EDF4F2134a8F571', // OP
  'optimism:0xd14451E0Fa44B18f08aeB1E4a4d092B823CaCa68', // sUSD
  'optimism:0xD7dAabd899D1fAbbC3A9ac162568939CEc0393Cc', // SNX
  'optimism:0x33865E09A572d4F1CC4d75Afc9ABcc5D3d4d867D', // WBTC
  'optimism:0xAFdf91f120DEC93c65fd63DBD5ec372e5dcA5f82', // LUSD
  'optimism:0x26AaB17f27CD1c8d06a0Ad8E4a1Af8B1032171d5', // wstETH
  'optimism:0xE7De932d50EfC9ea0a7a409Fc015B4f71443528e', // MAI
];

(async function () {
  const blockchain = new BlockchainService(null);

  const protocol = 'sonnefinance';
  const allMarkets: Array<CompoundMarket> = [];

  for (const config of IronbankMarkets) {
    const [chain, address] = config.split(':');
    const underlying = await blockchain.singlecall({
      chain: chain,
      target: address,
      abi: CompoundErc20Abi,
      method: 'underlying',
      params: [],
    });
    if (underlying) {
      const token = await blockchain.getTokenInfo({
        chain: chain,
        address: underlying.toString(),
      });

      if (token) {
        updateToken(token);

        allMarkets.push({
          protocol: protocol,
          chain,
          address: normalizeAddress(address),
          etherPool: false,
          underlying: token,
        });
        console.info(`Got market info address:${address} token:${token.symbol}`);
      }
    }
  }

  fs.writeFileSync(`./configs/data/SonnefinanceMarkets.json`, JSON.stringify(allMarkets));
})();
