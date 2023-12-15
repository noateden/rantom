// get data for mux.network
import fs from 'fs';

import MuxLiquidityPoolAbi from '../configs/abi/mux/LiquidityPoolHop1.json';
import { MuxAssetConfig } from '../configs/protocols/mux';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const LiquidityPools = [
  'arbitrum:0x3e0199792Ce69DC29A0a36146bFa68bd7C8D6633',
  'bnbchain:0x855e99f768fad76dd0d3eb7c446c0b759c96d520',
  'optimism:0xc6bd76fa1e9e789345e003b361e4a0037dfb7260',
];

(async function () {
  const protocol = 'mux';
  const blockchain = new BlockchainService(null);
  const assets: Array<MuxAssetConfig> = [];

  for (const config of LiquidityPools) {
    const [chain, address] = config.split(':');
    const allAssets = await blockchain.singlecall({
      chain,
      abi: MuxLiquidityPoolAbi,
      target: address,
      method: 'getAllAssetInfo',
      params: [],
    });

    for (let i = 0; i < allAssets.length; i++) {
      const token = await blockchain.getTokenInfo({
        chain,
        address: allAssets[i][1],
      });
      if (token) {
        updateToken(token);
        assets.push({
          chain,
          protocol,
          assetId: i,
          token,
        });
      }
    }
  }

  fs.writeFileSync(`./configs/data/MuxAssets.json`, JSON.stringify(assets));
})();
