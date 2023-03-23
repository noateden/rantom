import axios from 'axios';
import fs from 'fs';

import { normalizeAddress } from '../lib/helper';

const EulerSubgraph = 'https://api.thegraph.com/subgraphs/name/euler-xyz/euler-mainnet';

(async function () {
  const response = await axios.post(
    EulerSubgraph,
    {
      query: `
        {
					assets(first: 1000) {
						eTokenAddress
						dTokenAddress
						symbol
					}
				}
      `,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const tokens: any = {};
  if (response && response.data) {
    for (const asset of response.data.data.assets) {
      tokens[`erc20-ethereum-${normalizeAddress(asset.eTokenAddress)}`] = {
        chain: 'ethereum',
        address: normalizeAddress(asset.eTokenAddress),
        symbol: `e${asset.symbol}`,
        decimals: 18,
      };
      tokens[`erc20-ethereum-${normalizeAddress(asset.dTokenAddress)}`] = {
        chain: 'ethereum',
        address: normalizeAddress(asset.dTokenAddress),
        symbol: `d${asset.symbol}`,
        decimals: 18,
      };
    }
  }

  fs.writeFileSync('./configs/data/EulerEAndDTokens.json', JSON.stringify(tokens));
})();
