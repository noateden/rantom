// get all market of morpho.xyz
import fs from 'fs';

import cErc20Abi from '../configs/abi/compound/cErc20.json';
import MorphoAaveAbi from '../configs/abi/morpho/MorphoAave.json';
import MorphoCompoundAbi from '../configs/abi/morpho/MorphoCompound.json';
import { AddressZero } from '../configs/constants/addresses';
import { NativeTokens } from '../configs/constants/nativeTokens';
import { MorphoMarketConfig } from '../configs/protocols/morpho';
import { compareAddress, normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const MorphoAave = '0x777777c9898d384f785ee44acfe945efdff5f3e0';
const MorphoCompound = '0x8888882f8f843896699869179fB6E4f7e3B58888';

(async function () {
  const chain = 'ethereum';
  const protocol = 'morpho';

  const blockchain = new BlockchainService(null);

  const allMarkets: Array<MorphoMarketConfig> = [];

  const allAaveMarketAddresses = await blockchain.singlecall({
    chain: chain,
    target: MorphoAave,
    abi: MorphoAaveAbi,
    method: 'getMarketsCreated',
    params: [],
  });
  for (const marketAddress of allAaveMarketAddresses) {
    const marketInfo = await blockchain.singlecall({
      chain: chain,
      target: MorphoAave,
      abi: MorphoAaveAbi,
      method: 'market',
      params: [marketAddress],
    });
    const token = await blockchain.getTokenInfo({
      chain,
      address: marketInfo.underlyingToken,
    });
    if (token) {
      updateToken(token);
      allMarkets.push({
        chain: chain,
        protocol: protocol,
        address: normalizeAddress(MorphoAave),
        market: normalizeAddress(marketAddress),
        token: token,
      });

      console.info(`Got market info entry:${MorphoAave} market:${marketAddress} token:${token.symbol}`);
    }
  }

  // cEther market
  allMarkets.push({
    chain: chain,
    protocol: protocol,
    address: normalizeAddress(MorphoCompound),
    market: normalizeAddress('0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5'),
    token: {
      ...NativeTokens.ethereum,
      chain: chain,
      address: AddressZero,
    },
  });

  const allCompoundMarketAddresses = await blockchain.singlecall({
    chain: chain,
    target: MorphoCompound,
    abi: MorphoCompoundAbi,
    method: 'getAllMarkets',
    params: [],
  });
  for (const marketAddress of allCompoundMarketAddresses) {
    // ignore compound cETH market
    if (compareAddress(marketAddress, '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5')) continue;

    const underlyingAddress = await blockchain.singlecall({
      chain: chain,
      target: marketAddress,
      abi: cErc20Abi,
      method: 'underlying',
      params: [],
    });
    const token = await blockchain.getTokenInfo({
      chain,
      address: underlyingAddress,
    });
    if (token) {
      updateToken(token);
      allMarkets.push({
        chain: chain,
        protocol,
        address: normalizeAddress(MorphoCompound),
        market: normalizeAddress(marketAddress),
        token: token,
      });

      console.info(`Got market info entry:${MorphoCompound} market:${marketAddress} token:${token.symbol}`);
    }
  }

  fs.writeFileSync(`./configs/data/MorphoMarkets.json`, JSON.stringify(allMarkets));
})();
