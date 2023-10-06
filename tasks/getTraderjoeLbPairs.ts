// this script get top liquidity book pair on Traderjoe
// sorted by volumeUSD
import axios from 'axios';
import fs from 'fs';

import { AddressZero } from '../configs/constants';
import { TraderjoeConfigs } from '../configs/protocols';
import { compareAddress, normalizeAddress } from '../lib/helper';
import { TraderjoeLBPairInfo } from '../modules/adapters/traderjoe/helper';
import { ProtocolConfig } from '../types/configs';

const TopPoolCount = 100;

(async function () {
  const allPairs: Array<TraderjoeLBPairInfo> = [];

  const configs: Array<ProtocolConfig> = [TraderjoeConfigs];

  for (const config of configs) {
    if (config.subgraphs) {
      for (const subgraph of config.subgraphs) {
        console.log(
          `getting top liquidity pools, ${config.protocol} ${subgraph.version} ${subgraph.chain} ${subgraph.endpoint}`
        );

        if (subgraph.version === 'traderjoeLiquidityBook') {
          const response = await axios.post(subgraph.endpoint, {
            query: `
							{
								lbpairs(first: ${TopPoolCount}, orderBy: volumeUSD, orderDirection: desc) {
									id
									factory {
                    id
                  }
                  tokenX {
                    id
                    symbol
                    decimals
                  }
                  tokenY {
                    id
                    symbol
                    decimals
                  }
								}
							}
						`,
          });
          for (const pair of response.data.data.lbpairs) {
            allPairs.push({
              chain: subgraph.chain,
              address: normalizeAddress(pair.id),
              factory: normalizeAddress(pair.factory.id),
              tokenX: {
                chain: subgraph.chain,
                address: normalizeAddress(pair.tokenX.id),
                symbol: pair.tokenX.symbol,
                decimals: Number(pair.tokenX.decimals),
              },
              tokenY: {
                chain: subgraph.chain,
                address: normalizeAddress(pair.tokenY.id),
                symbol: pair.tokenY.symbol,
                decimals: Number(pair.tokenY.decimals),
              },
            });
          }
        }
      }
    }
  }

  let savedPairs: Array<TraderjoeLBPairInfo> = [];

  try {
    savedPairs = JSON.parse(fs.readFileSync('./configs/data/TraderjoeLbPairs.json').toString());
  } catch (e: any) {}

  const exitedPools: { [key: string]: boolean } = {};
  for (const savedPool of savedPairs) {
    exitedPools[savedPool.address] = true;
  }

  for (const pool of allPairs) {
    if (!exitedPools[pool.address]) {
      if (!compareAddress(pool.address, AddressZero)) {
        savedPairs.push(pool);
      } else {
        console.log(`Ignore token:${pool.tokenX.symbol}-${pool.tokenY.symbol}`);
      }
    }
  }

  fs.writeFileSync('./configs/data/TraderjoeLbPairs.json', JSON.stringify(allPairs));
})();
