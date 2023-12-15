// get all fraxlend pairs
import fs from 'fs';

import { TokenList } from '../configs';
import FraxlendPairAbi from '../configs/abi/fraxlend/FraxlendPair.json';
import { FraxlendPair } from '../configs/protocols/fraxlend';
import { normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const PairConfigs: Array<string> = [
  'ethereum:0x794F6B13FBd7EB7ef10d1ED205c9a416910207Ff', // WETH
  'ethereum:0x32467a5fc2d72D21E8DCe990906547A2b012f382', // WBTC
  'ethereum:0x78bB3aEC3d855431bd9289fD98dA13F9ebB7ef15', // sfrxETH
  'ethereum:0x3a25B9aB8c07FfEFEe614531C75905E810d8A239', // APE
  'ethereum:0xDbe88DBAc39263c47629ebbA02b3eF4cf0752A72', // FXS
  'ethereum:0x74F82Bd9D0390A4180DaaEc92D64cf0708751759', // FPI
  'ethereum:0xa1D100a5bf6BFd2736837c97248853D989a9ED84', // CVX
  'ethereum:0x3835a58CA93Cdb5f912519ad366826aC9a752510', // CRV
  'ethereum:0x66bf36dBa79d4606039f04b32946A260BCd3FF52', // gOHM
  'ethereum:0x82Ec28636B77661a95f021090F6bE0C8d379DD5D', // MKR
  'ethereum:0xc6CadA314389430d396C7b0C70c6281e99ca7fe8', // UNI
  'ethereum:0xc779fEE076EB04b9F8EA424ec19DE27Efd17A68d', // AAVE
];

(async function () {
  const allPairs: Array<FraxlendPair> = [];

  const protocol = 'fraxlend';
  const blockchain = new BlockchainService(null);

  for (const config of PairConfigs) {
    const [chain, address] = config.split(':');

    const collateralAddress = await blockchain.singlecall({
      chain: chain,
      target: address,
      abi: FraxlendPairAbi,
      method: 'collateralContract',
      params: [],
    });
    if (collateralAddress) {
      const collateral = await blockchain.getTokenInfo({
        chain: chain,
        address: collateralAddress,
      });
      if (collateral) {
        updateToken(collateral);
        allPairs.push({
          chain: chain,
          address: normalizeAddress(address),
          protocol: protocol,
          debtToken: TokenList[chain].FRAX,
          collateralToken: collateral,
        });

        console.info(`Get pair info pair:${address} collateral:${collateral.symbol}`);
      }
    }
  }

  fs.writeFileSync(`./configs/data/FraxlendPairs.json`, JSON.stringify(allPairs));
})();
