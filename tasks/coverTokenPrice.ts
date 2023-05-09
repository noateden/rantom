import axios from 'axios';

import { OracleProvider } from '../modules/oracles/oracle';

(async function () {
  const oracle = new OracleProvider(null);
  const response = await axios.get('https://gateway.ipfs.io/ipns/tokens.uniswap.org');
  for (const token of response.data.tokens) {
    const result = await oracle.getTokenSpotPriceUsd({
      chain: 'ethereum',
      address: token.address,
      timestamp: 0,
    });

    console.log(`${result.token} count:${result.sources.length}`);
  }
})();
