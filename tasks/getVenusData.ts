// get all venus.io markets
import fs from 'fs';

import CompoundErc20Abi from '../configs/abi/compound/cErc20.json';
import { AddressZero } from '../configs/constants/addresses';
import { CompoundMarket } from '../configs/protocols/compound';
import { normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const IronbankMarkets: Array<string> = [
  'bnbchain:0x26DA28954763B92139ED49283625ceCAf52C6f94', // AAVE
  'bnbchain:0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec', // ADA
  'bnbchain:0x5F0388EBc2B94FA8E123F404b79cCF5f40b29176', // BCH
  'bnbchain:0x972207A639CC1B374B893cc33Fa251b55CEB7c07', // BETH
  'bnbchain:0x882c173bc7ff3b7786ca16dfed3dfffb9ee7847b', // BTCB
  'bnbchain:0x95c78222B3D6e262426483D42CfA53685A67Ab9D', // BUSD
  'bnbchain:0x86aC3974e2BD0d60825230fa6F355fF11409df5c', // CAKE
  'bnbchain:0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1', // DAI
  'bnbchain:0xec3422Ef92B2fb59e84c8B02Ba73F1fE84Ed8D71', // DOGE
  'bnbchain:0x1610bc33319e9398de5f57B33a5b184c806aD217', // DOT
  'bnbchain:0xf508fCD89b8bd15579dc79A6827cB4686A3592c8', // ETH
  'bnbchain:0xf91d58b5aE142DAcC749f58A49FCBac340Cb0343', // FIL
  'bnbchain:0x650b940a1033B8A1b1873f78730FcFC73ec11f1f', // LINK
  'bnbchain:0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B', // LTC
  'bnbchain:0xb91A659E88B51474767CD97EF3196A3e7cEDD2c8', // LUNA
  'bnbchain:0x5c9476FcD6a4F9a3654139721c949c2233bBbBc8', // MATIC
  'bnbchain:0x2fF3d0F6990a40261c66E1ff2017aCBc282EB6d0', // SXP
  'bnbchain:0xC5D3466aA484B040eE977073fcF337f2c00071c1', // TRX
  'bnbchain:0x61eDcFe8Dd6bA3c891CB9bEc2dc7657B3B422E93', // TRX
  'bnbchain:0xBf762cd5991cA1DCdDaC9ae5C638F5B5Dc3Bee6E', // TUSD
  'bnbchain:0x08CEB3F4a7ed3500cA0982bcd0FC7816688084c3', // TUSD
  'bnbchain:0x27FF564707786720C71A2e5c1490A63266683612', // UNI
  'bnbchain:0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8', // USDC
  'bnbchain:0xfD5840Cd36d94D7229439859C0112a4185BC0255', // USDT
  'bnbchain:0x78366446547D062f45b4C0f320cDaa6d710D87bb', // UST
  'bnbchain:0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0', // wBETH
  'bnbchain:0xB248a295732e0225acd3337607cc01068e3b9c10', // XRP
  'bnbchain:0x151B1e2635A717bcDc836ECd6FbB62B674FE3E1D', // XVS

  // isolated pools
  'bnbchain:0xCa2D81AA7C09A1a025De797600A7081146dceEd9', // HAY
  'bnbchain:0xc3a45ad8812189cAb659aD99E64B1376f6aCD035', // USDD
  'bnbchain:0x5e3072305F9caE1c7A82F6Fe9E38811c74922c3B', // USDT
  'bnbchain:0x795DE779Be00Ea46eA97a28BDD38d9ED570BCF0F', // agEUR

  'bnbchain:0x8f657dFD3a1354DEB4545765fE6840cc54AFd379', // BSW
  'bnbchain:0x02c5Fb0F26761093D297165e902e96D08576D344', // ALPACA
  'bnbchain:0x1D8bBDE12B6b34140604E18e9f9c6e14deC16854', // USDT
  'bnbchain:0xA615467caE6B9E0bb98BC04B4411d9296fd1dFa0', // USDD
  'bnbchain:0x19CE11C8817a1828D1d357DFBF62dCf5b0B2A362', // ANKR
  'bnbchain:0x53728FD51060a85ac41974C6C3Eb1DaE42776723', // ankrBNB
  'bnbchain:0x736bf1D21A28b5DC19A1aC8cA71Fc2856C23c03F', // TWT
  'bnbchain:0xFf1112ba7f88a53D4D23ED4e14A117A2aE17C6be', // PLANET

  'bnbchain:0xE5FE5527A5b76C75eedE77FdFA6B80D52444A465', // RACA
  'bnbchain:0xc353B7a1E13dDba393B5E120D4169Da7185aA2cb', // FLOKI
  'bnbchain:0xc353B7a1E13dDba393B5E120D4169Da7185aA2cb', // USDD
  'bnbchain:0x4978591f17670A846137d9d613e333C38dc68A37', // USDT

  'bnbchain:0xBfe25459BA784e70E2D7a718Be99a1f3521cA17f', // ankrBNB
  'bnbchain:0x5E21bF67a6af41c74C1773E4b473ca5ce8fd3791', // BNBx
  'bnbchain:0xcc5D9e502574cda17215E70bC0B4546663785227', // stkBNB
  'bnbchain:0xd3CC9d8f3689B83c91b7B59cAB4946B063EB894A', // SnBNB
  'bnbchain:0xe10E80B7FD3a29fE46E16C30CC8F4dd938B742e2', // WBNB

  'bnbchain:0x49c26e12959345472E2Fd95E5f79F8381058d3Ee', // BTT
  'bnbchain:0x836beb2cB723C498136e1119248436A645845F4E', // TRX
  'bnbchain:0xb114cfA615c828D88021a41bFc524B800E64a9D5', // WIN
  'bnbchain:0xf1da185CCe5BeD1BeBbb3007Ef738Ea4224025F7', // USDD
  'bnbchain:0x281E5378f99A4bc55b295ABc0A3E7eD32Deba059', // USDT
];

(async function () {
  const blockchain = new BlockchainService(null);

  const protocol = 'venus';
  const allMarkets: Array<CompoundMarket> = [
    {
      protocol: 'venus',
      chain: 'bnbchain',
      address: normalizeAddress('0xA07c5b74C9B40447a954e1466938b865b6BBea36'),
      etherPool: true,
      underlying: {
        chain: 'bnbchain',
        symbol: 'BNB',
        decimals: 18,
        address: AddressZero,
      },
    },
  ];

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

  fs.writeFileSync(`./configs/data/VenusMarkets.json`, JSON.stringify(allMarkets));
})();
