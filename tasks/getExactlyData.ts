// get all exact.ly markets
import fs from 'fs';

import ExactlyMarketAbi from '../configs/abi/exactly/Market.json';
import { ExactlyMarket } from '../configs/protocols/exactly';
import { normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const Markets: Array<string> = [
  'ethereum:0x163538E22F4d38c1eb21B79939f3d2ee274198Ff', // DAI
  'ethereum:0x660e2fC185a9fFE722aF253329CEaAD4C9F6F928', // USDC
  'ethereum:0x8644c0FDED361D1920e068bA4B09996e26729435', // WBTC
  'ethereum:0xc4d4500326981eacD020e20A81b1c479c161c7EF', // WETH
  'ethereum:0x3843c41DA1d7909C86faD51c47B9A97Cf62a29e1', // wstETH
  'optimism:0x22ab31Cd55130435b5efBf9224b6a9d5EC36533F', // wstETH
  'optimism:0xa430A427bd00210506589906a71B54d6C256CEdb', // OP
  'optimism:0x81C9A7B55A4df39A9B7B5F781ec0e53539694873', // USDC
  'optimism:0xc4d4500326981eacD020e20A81b1c479c161c7EF', // WETH
];

(async function () {
  const allMarkets: Array<ExactlyMarket> = [];

  const protocol = 'exactly';
  const blockchain = new BlockchainService(null);

  for (const config of Markets) {
    const [chain, address] = config.split(':');

    const assetAddress = await blockchain.singlecall({
      chain: chain,
      target: address,
      abi: ExactlyMarketAbi,
      method: 'asset',
      params: [],
    });
    if (assetAddress) {
      const asset = await blockchain.getTokenInfo({
        chain,
        address: assetAddress,
      });
      if (asset) {
        updateToken(asset);
        allMarkets.push({
          chain: chain,
          address: normalizeAddress(address),
          protocol,
          asset,
        });
        console.info(`Got market info chain:${chain} address:${address} token:${asset.symbol}`);
      }
    }
  }

  fs.writeFileSync(`./configs/data/ExactlyMarkets.json`, JSON.stringify(allMarkets));
})();
