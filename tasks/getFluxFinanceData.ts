// get all fluxfinance.com markets
import fs from 'fs';

import CompoundErc20Abi from '../configs/abi/compound/cErc20.json';
import { CompoundMarket } from '../configs/protocols/compound';
import { normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const Markets: Array<string> = [
  'ethereum:0x465a5a630482f3abd6d3b84b39b29b07214d19e5', // fUSDC
  'ethereum:0xe2ba8693ce7474900a045757fe0efca900f6530b', // fDAI
  'ethereum:0x81994b9607e06ab3d5cf3afff9a67374f05f27d7', // fUSDT
  'ethereum:0x1c9a2d6b33b4826757273d47ebee0e2dddcd978b', // fFRAX
  'ethereum:0x1dd7950c266fb1be96180a8fdb0591f70200e018', // fOUSG
];

(async function () {
  const blockchain = new BlockchainService(null);

  const protocol = 'fluxfinance';
  const allMarkets: Array<CompoundMarket> = [];

  for (const config of Markets) {
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

  fs.writeFileSync(`./configs/data/FluxFinanceMarkets.json`, JSON.stringify(allMarkets));
})();
