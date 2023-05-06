// get all market of morpho.xyz
import fs from 'fs';
import Web3 from 'web3';

import cErc20Abi from '../configs/abi/compound/cErc20.json';
import MorphoAaveAbi from '../configs/abi/morpho/MorphoAave.json';
import MorphoCompountAbi from '../configs/abi/morpho/MorphoCompound.json';
import { Tokens } from '../configs/constants';
import EnvConfig from '../configs/envConfig';
import { compareAddress, normalizeAddress } from '../lib/helper';
import { Web3HelperProvider } from '../services/web3';
import { Token } from '../types/configs';

const MorphoAave = '0x777777c9898d384f785ee44acfe945efdff5f3e0';
const MorphoCompound = '0x8888882f8f843896699869179fB6E4f7e3B58888';

interface MorphoMarketInfo {
  chain: string;
  address: string; // morpho entry address
  market: string;
  token: Token;
}

(async function () {
  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);
  const web3Helper = new Web3HelperProvider(null);

  const allMarkets: Array<MorphoMarketInfo> = [];

  const morphoAave = new web3.eth.Contract(MorphoAaveAbi as any, MorphoAave);
  const allAaveMarketAddresses: Array<string> = await morphoAave.methods.getMarketsCreated().call();
  for (const marketAddress of allAaveMarketAddresses) {
    const marketInfo = await morphoAave.methods.market(marketAddress).call();
    const token = await web3Helper.getErc20Metadata('ethereum', marketInfo.underlyingToken);
    if (token) {
      allMarkets.push({
        chain: 'ethereum',
        address: normalizeAddress(MorphoAave),
        market: normalizeAddress(marketAddress),
        token: token,
      });

      console.info(`Got market info entry:${MorphoAave} market:${marketAddress} token:${token.symbol}`);
    }
  }

  // cEther market
  allMarkets.push({
    chain: 'ethereum',
    address: normalizeAddress(MorphoCompound),
    market: normalizeAddress('0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5'),
    token: Tokens.ethereum.NativeCoin,
  });

  const morphoCompound = new web3.eth.Contract(MorphoCompountAbi as any, MorphoCompound);
  const allCompoundMarketAddresses: Array<string> = await morphoCompound.methods.getAllMarkets().call();
  for (const marketAddress of allCompoundMarketAddresses) {
    // ignore compound cETH market
    if (compareAddress(marketAddress, '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5')) continue;

    const marketContract = new web3.eth.Contract(cErc20Abi as any, marketAddress);
    const underlyingAddress = await marketContract.methods.underlying().call();
    const token = await web3Helper.getErc20Metadata('ethereum', underlyingAddress);
    if (token) {
      allMarkets.push({
        chain: 'ethereum',
        address: normalizeAddress(MorphoCompound),
        market: normalizeAddress(marketAddress),
        token: token,
      });

      console.info(`Got market info entry:${MorphoCompound} market:${marketAddress} token:${token.symbol}`);
    }
  }

  fs.writeFileSync(`./configs/data/MorphoMarkets.json`, JSON.stringify(allMarkets));
})();
