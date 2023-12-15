// get static data of stargate finance
import fs from 'fs';

import StargateLibs from '../modules/adapters/stargate/libs';
import { LiquidityPoolConstant } from '../types/domains';
import updateToken from './helpers/updateToken';

const StargatePools = [
  'ethereum:0x101816545f6bd2b1076434b54383a1e633390a2e', // Pool ETH
  'ethereum:0xdf0770df86a8034b3efef0a1bb3c889b8332ff56', // Pool USDC
  'ethereum:0x38ea452219524bb87e18de1c24d3bb59510bd783', // Pool USDT
  'ethereum:0x692953e758c3669290cb1677180c64183cee374e', // Pool USDD
  'ethereum:0x0faf1d2d3ced330824de3b8200fc8dc6e397850d', // Pool DAI
  'ethereum:0xfa0f307783ac21c39e939acff795e27b650f6e68', // Pool FRAX
  'ethereum:0x590d4f8a68583639f215f675f3a259ed84790580', // Pool sUSD
  'ethereum:0xe8f55368c82d38bbbbdb5533e7f56afc2e978cc2', // Pool LUSD
  'ethereum:0x9cef9a0b1be0d289ac9f4a98ff317c33eaa84eb8', // Pool MAI
  'ethereum:0xd8772edbf88bba2667ed011542343b0eddacda47', // Pool METIS
  'ethereum:0x430ebff5e3e80a6c58e7e6ada1d90f5c28aa116d', // Pool METIS USDT

  'arbitrum:0x915a55e36a01285a14f05de6e81ed9ce89772f8e', // Pool ETH
  'arbitrum:0x892785f33cdee22a30aef750f285e18c18040c3e', // Pool USDC
  'arbitrum:0xb6cfcf89a7b22988bfc96632ac2a9d6dab60d641', // Pool USDT
  'arbitrum:0xaa4bf442f024820b2c28cd0fd72b82c63e66f56c', // Pool FRAX
  'arbitrum:0xf39b7be294cb36de8c510e267b82bb588705d977', // Pool MAI
  'arbitrum:0x600e576f9d853c95d58029093a16ee49646f3ca5', // Pool LUSD

  'base:0x28fc411f9e1c480ad312b3d9c60c22b965015c6b', // Pool ETH
  'base:0x4c80e24119cfb836cdf0a6b53dc23f04f7e652ca', // Pool USDC

  'bnbchain:0x9aA83081AA06AF7208Dcc7A4cB72C94d057D2cda',
  'bnbchain:0x98a5737749490856b401DB5Dc27F522fC314A4e1',
  'bnbchain:0x4e145a589e4c03cBe3d28520e4BF3089834289Df',
  'bnbchain:0x7BfD7f2498C4796f10b6C611D9db393D3052510C',
  'bnbchain:0xD4CEc732b3B135eC52a3c0bc8Ce4b8cFb9dacE46',
  'bnbchain:0x68C6c27fB0e02285829e69240BE16f32C5f8bEFe',

  'polygon:0x1205f31718499dBf1fCa446663B532Ef87481fe1',
  'polygon:0x29e38769f23701A2e4A8Ef0492e19dA4604Be62c',
  'polygon:0x1c272232Df0bb6225dA87f4dEcD9d37c32f63Eea',
  'polygon:0x8736f92646B2542B3e5F3c63590cA7Fe313e283B',

  'optimism:0xd22363e3762cA7339569F3d33EADe20127D5F98C',
  'optimism:0xDecC0c09c3B5f6e92EF4184125D5648a66E35298',
  'optimism:0x165137624F1f692e69659f944BF69DE02874ee27',
  'optimism:0x368605D9C6243A80903b9e326f1Cddde088B8924',
  'optimism:0x2F8bC9081c7FCFeC25b9f41a50d97EaA592058ae',
  'optimism:0x3533F5e279bDBf550272a199a223dA798D9eff78',
  'optimism:0x5421FA1A48f9FF81e4580557E86C7C0D24C18036',

  'avalanche:0x1205f31718499dBf1fCa446663B532Ef87481fe1',
  'avalanche:0x29e38769f23701A2e4A8Ef0492e19dA4604Be62c',
  'avalanche:0x1c272232Df0bb6225dA87f4dEcD9d37c32f63Eea',
  'avalanche:0x8736f92646B2542B3e5F3c63590cA7Fe313e283B',
  'avalanche:0xEAe5c2F6B25933deB62f754f239111413A0A25ef',

  'fantom:0xc647ce76ec30033aa319d472ae9f4462068f2ad7',

  'linea:0xAad094F6A75A14417d39f04E690fC216f080A41a', // ETH
];

const StargatePoolFilePath = './configs/data/StargateLiquidityPools.json';

(async function () {
  let pools: Array<LiquidityPoolConstant> = [];

  if (fs.existsSync(StargatePoolFilePath)) {
    pools = JSON.parse(fs.readFileSync(StargatePoolFilePath).toString());
  }

  for (const config of StargatePools) {
    const [chain, address] = config.split(':');

    if (pools.filter((item) => item.chain === chain && item.address === address).length === 0) {
      const liquidityPool = await StargateLibs.getLiquidityPoolInfo({
        protocol: 'stargate',
        services: null,
        chain: chain,
        address: address,
      });
      if (liquidityPool) {
        for (const token of liquidityPool.tokens) {
          updateToken(token);
        }

        pools.push(liquidityPool);
        console.log(`Got stargate liquidity pool ${chain} ${address} ${liquidityPool.tokens[0].symbol}`);

        fs.writeFileSync(StargatePoolFilePath, JSON.stringify(pools));
      }
    }
  }
})();
