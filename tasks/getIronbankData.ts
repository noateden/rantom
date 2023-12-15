// get all ib.xyz markets
import fs from 'fs';

import CompoundErc20Abi from '../configs/abi/compound/cErc20.json';
import { CompoundMarket } from '../configs/protocols/compound';
import { normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const IronbankMarkets: Array<string> = [
  'ethereum:0x41c84c0e2ee0b740cf0d31f63f3b6f627dc6b393', // WETH
  'ethereum:0x8e595470ed749b85c6f7669de83eae304c2ec68f', // DAI
  'ethereum:0xe7bff2da8a2f619c2586fb83938fa56ce803aa16', // LINK
  'ethereum:0xfa3472f7319477c9bfecdd66e4b948569e7621b9', // YFI
  'ethereum:0x12a9cc33a980daa74e00cc2d1a0e74c57a93d12c', // SNX
  'ethereum:0x8fc8bfd80d6a9f17fb98a373023d72531792b431', // WBTC
  'ethereum:0x48759f220ed983db51fa7a8c0d2aab8f3ce4166a', // USDT
  'ethereum:0x76eb2fe28b36b3ee97f3adae0c69606eedb2a37c', // USDC
  'ethereum:0xa7c4054afd3dbbbf5bfe80f41862b89ea05c9806', // sUSD
  'ethereum:0xa8caea564811af0e92b1e044f3edd18fa9a73e4f', // EURS
  'ethereum:0xca55f9c4e77f7b8524178583b0f7c798de17fd54', // sEUR
  'ethereum:0x7736ffb07104c0c400bb0cc9a7c228452a732992', // DPI
  'ethereum:0xfeeb92386a055e2ef7c2b598c872a4047a7db59f', // UNI
  'ethereum:0x226f3738238932ba0db2319a8117d9555446102f', // SUSHI
  'ethereum:0xb8c5af54bbdcc61453144cf472a9276ae36109f9', // CRV
  'ethereum:0x30190a3b52b5ab1daf70d46d72536f5171f22340', // AAVE
  'ethereum:0x9e8e207083ffd5bdc3d99a1f32d1e6250869c1a9', // MIM
  'ethereum:0xe0b57feed45e7d908f2d0dacd26f113cf26715bf', // CVX

  'optimism:0x17533a1bDe957979E3977EbbFBC31E6deeb25C7d', // WETH
  'optimism:0x1d073cf59Ae0C169cbc58B6fdD518822ae89173a', // USDC
  'optimism:0x874C01c2d1767EFA01Fa54b2Ac16be96fAd5a742', // USDT
  'optimism:0x049E04bEE77cFfB055f733A138a2F204D3750283', // DAI
  'optimism:0xcdb9b4db65C913aB000b40204248C8A53185D14D', // WBTC
  'optimism:0x4645e0952678E9566FB529D9313f5730E4e1C412', // OP
  'optimism:0xE724FfA5D30782499086682C8362CB3673bF69ae', // SNX
  'optimism:0x04F0fd3CD03B17a3E5921c0170ca6dD3952841cA', // sUSD

  'avalanche:0xb3c68d69E95B095ab4b33B4cB67dBc0fbF3Edf56',
  'avalanche:0x02C9133627a14214879175a7A222d0a7f7404eFb',
  'avalanche:0xbf1430d9eC170b7E97223C7F321782471C587b29',
  'avalanche:0x18931772Adb90e7f214B6CbC78DdD6E0F090D4B1',
  'avalanche:0x085682716f61a72bf8C573FBaF88CCA68c60E99B',
  'avalanche:0xEc5Aa19566Aa442C8C50f3C6734b6Bb23fF21CD7',
  'avalanche:0xe28965073C49a02923882B8329D3E8C1D805E832',
  'avalanche:0x3Af7c11d112C1C730E5ceE339Ca5B48F9309aCbC',
  'avalanche:0xCEb1cE674f38398432d20bc8f90345E91Ef46fd3',
  'avalanche:0x338EEE1F7B89CE6272f302bDC4b952C13b221f1d',
  'avalanche:0xB09b75916C5F4097C8b5812E63e216FEF97661Fc',

  'fantom:0xd528697008aC67A21818751A5e3c58C8daE54696',
  'fantom:0xcc3E89fBc10e155F1164f8c9Cf0703aCDe53f6Fd',
  'fantom:0x20CA53E2395FA571798623F1cFBD11Fe2C114c24',
  'fantom:0x04c762a5dF2Fa02FE868F25359E0C259fB811CfE',
  'fantom:0x328A7b4d538A2b3942653a9983fdA3C12c571141',
  'fantom:0x0980f2F0D2af35eF2c4521b2342D59db575303F7',
  'fantom:0xB1FD648D8CA4bE22445963554b85AbbFC210BC83',
  'fantom:0x79EA17bEE0a8dcb900737E8CAa247c8358A5dfa1',
  'fantom:0x4eCEDdF62277eD78623f9A94995c680f8fd6C00e',
  'fantom:0x1cc6Cf8455f7783980B1ee06ecD4ED9acd94e1c7',
  'fantom:0x70faC71debfD67394D1278D98A29dea79DC6E57A',
  'fantom:0x46F298D5bB6389ccb6C1366bB0C8a30892CA2f7C',
  'fantom:0x2919Ec3e7B35fB0C8597A5f806fb1f59c540EAb4',
  'fantom:0x28192abdB1D6079767aB3730051c7f9Ded06FE46',
  'fantom:0xf13252C1044Aa83b910C77322e67387E187F64cA',
];

(async function () {
  const blockchain = new BlockchainService(null);

  const protocol = 'ironbank';
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

  fs.writeFileSync(`./configs/data/IronbankMarkets.json`, JSON.stringify(allMarkets));
})();
