// get all curve.fi pools
import fs from 'fs';

import { CurveHelper, CurvePoolInfo, CurvePoolType } from '../modules/adapters/curve/helper';

const CurvePools: Array<string> = [
  'base:4:plainWithoutCoinIndex:0xf6c5f01c7f3148891ad0e19df78743d31e390d1f', // USDC - USDbC - axlUSDC - crvUSD
  'base:2:plain:0x11c1fbd4b3de66bc0565779b35171a6cf3e71f59', // cbETH - ETH
  'base:3:plainWithCoinIndex:0x6e53131f68a034873b6bfa15502af094ef0c5854', // ETH - tBTC - crvUSD
  'base:2:plainWithCoinIndex:0xde37e221442fa15c35dc19fbae11ed106ba52fb2', // CRV - crvUSD
  'base:2:plainWithoutCoinIndex:0xda3de145054ed30ee937865d31b500505c4bdfe7', // USD+ - crvUSD

  'arbitrum:2:plainWithoutCoinIndex:0x7f90122bf0700f9e7e1f688fe926940e8839f353', // USDC-USDT
  'arbitrum:2:meta:0x30df229cefa463e991e29d42db0bae2e122b2ac7', // MIN-2CRV
  'arbitrum:2:meta:0x2ce5fd6f6f4a159987eac99ff5158b7b62189acf', // USX-2CRV
  'arbitrum:2:plain:0x6eb2dc694eb516b16dc9fbc678c60052bbdd7d80', // wstETH-ETH
  'arbitrum:2:plainWithoutCoinIndex:0x1e2ebe2fffa7c9fa83486188f7c19f9acd1bb990', // peUSD-USDC.e
  'arbitrum:2:plainWithoutCoinIndex:0x59bf0545fca0e5ad48e13da269facd2e8c886ba4', // FRAX-VST
  'arbitrum:2:plainWithoutCoinIndex:0xc9b8a3fdecb9d5b218d02555a8baf332e5b740d5', // FRAX-USDC.e
  'arbitrum:2:plainWithoutCoinIndex:0x755d6688ad74661add2fb29212ef9153d40fca46', // FRAX-USDC.e

  'ethereum:3:plain:0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7', // 3Crv: DAI-USDC-USDT
  'ethereum:3:plainWithCoinIndex:0xd51a44d3fae010294c616388b506acda1bfaae46', // 3Crypto: USDT-WETH-WBTC
  'ethereum:3:plainWithCoinIndex:0x7f86bf177dd4f3494b841a37e810a34dd56c829b', // 3Crypto: USDC-WETH-WBTC
  'ethereum:3:plainWithCoinIndex:0xf5f5b97624542d72a9e06f04804bf81baa15e2b4', // 3Crypto: USDT-WETH-WBTC
  'ethereum:2:plain:0xdc24316b9ae028f1497c275eb9192a3ea0f67022', // ETH-stETH
  'ethereum:2:plainWithoutCoinIndex:0xdcef968d416a41cdac0ed8702fac8128a64241a2', // crvFRAX: FRAX-USDC
  'ethereum:2:plainWithoutCoinIndex:0xae34574ac03a15cd58a92dc79de7b1a0800f1ce3', // FRAX-USDP
  'ethereum:2:plainWithoutCoinIndex:0xca978a0528116dda3cba9acd3e68bc6191ca53d0', // crvUSD-USDP
  'ethereum:2:plainWithoutCoinIndex:0x4dece678ceceb27446b35c672dc7d61f30bad69e', // crvUSD-USDC
  'ethereum:2:plainWithoutCoinIndex:0x34d655069f4cac1547e4c8ca284ffff5ad4a8db0', // crvUSD-TUSD
  'ethereum:2:plainWithoutCoinIndex:0x390f3595bca2df7d23783dfd126427cceb997bf4', // crvUSD-USDT
  'ethereum:2:plainWithoutCoinIndex:0x0cd6f267b2086bea681e922e19d40512511be538', // crvUSD-FRAX
  'ethereum:2:plainWithoutCoinIndex:0xbe426b0f37c112dd20d5866769c8034171567b31', // crvUSD-MIM
  'ethereum:2:plainWithoutCoinIndex:0x86152df0a0e321afb3b0b9c4deb813184f365ada', // crvUSD-GHO
  'ethereum:2:plainWithoutCoinIndex:0xfc636d819d1a98433402ec9dec633d864014f28c', // crvUSD-UZD
  'ethereum:2:plainWithoutCoinIndex:0x94cc50e4521bd271c1a997a3a4dc815c2f920b41', // crvUSD-sUSD
  'ethereum:2:plainWithCoinIndex:0x8301ae4fc9c624d1d396cbdaa1ed877821d7c511', // WETH-CRV
  'ethereum:4:old:0xa5407eae9ba41422680e2e00537571bcc53efbfd', // DAI-USDC-USDT-sUSD
  'ethereum:2:meta:0xd632f22692fac7611d2aa1c0d552930d43caed3b', // FRAX-3Crv
  'ethereum:2:meta:0xc9c32cd16bf7efb85ff14e0c8603cc90f6f2ee49', // BEAN-3Crv
  'ethereum:2:meta:0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca', // LUSD-3Crv
  'ethereum:2:meta:0x4f062658eaaf2c1ccf8c8e36d6824cdf41167956', // GUSD-3Crv
  'ethereum:2:meta:0x5a6a4d54456819380173272a5e8e9b9904bdf41b', // MIM-3Crv
  'ethereum:3:bearing:0xdebf20617708857ebe4f679508e7b7863a8a8eee', // aDAI-aUSDC-aUSDT
  'ethereum:2:plainWithoutCoinIndex:0x828b154032950c8ff7cf8085d841723db2696056', // WETH-stETH
  'ethereum:2:plainWithoutCoinIndex:0xa1f8a6807c402e4a15ef4eba36528a3fed24e577', // ETH-frxETH
  'ethereum:2:plainWithoutCoinIndex:0x9d0464996170c6b9e75eed71c68b99ddedf279e8', // CRV-cvxCRV
  'ethereum:2:plainWithCoinIndex:0xb576491f1e6e5e62f1d8f26062ee822b40b0e0d4', // WETH-CVX
  'ethereum:2:meta:0xb30da2376f63de30b42dc055c93fa474f31330a5', // alUSD-crvFRAX
  'ethereum:2:plainWithCoinIndex:0x9409280dc1e6d33ab7a8c6ec03e5763fb61772b5', // WETH-LDO
  'ethereum:2:plainWithoutCoinIndex:0x9848482da3ee3076165ce6497eda906e66bb85c5', // ETH-pETH
  'ethereum:2:meta:0xecd5e75afb02efa118af914515d6521aabd189f1', // TUSD-3Crv
  'ethereum:2:meta:0x43b4fdfd4ff969587185cdb6f0bd875c5fc83f8c', // alUSD-3Crv
  'ethereum:2:plainWithoutCoinIndex:0xc4c319e2d4d66cca4464c0c2b32c9bd23ebe784e', // ETH-alETH
  'ethereum:2:plainWithCoinIndex:0xc26b89a667578ec7b3f11b2f98d6fd15c07c54ba', // WETH-YFI
  'ethereum:2:plainWithCoinIndex:0x5fae7e604fc3e24fd43a72867cebac94c65b404a', // cbETH-ETH
  'ethereum:2:plainWithCoinIndex:0x838af967537350d2c44abb8c010e49e32673ab94', // CNC-ETH
  'ethereum:2:plainWithCoinIndex:0x3211c6cbef1429da3d0d58494938299c92ad5860', // STG-USDC
  'ethereum:2:meta:0xc270b3b858c335b6ba5d5b10e2da8a09976005ad', // USDP-3Crv
  'ethereum:3:plainWithoutCoinIndex:0xb9446c4ef5ebe66268da6700d26f96273de3d571', // 3EURpool: agEUR-EURT-EURS
];

(async function () {
  const allPools: Array<CurvePoolInfo> = [];

  for (const config of CurvePools) {
    const [chain, totalCoins, type, address] = config.split(':');
    const poolInfo = await CurveHelper.getPoolInfo(chain, Number(totalCoins), address, type as CurvePoolType);
    if (poolInfo) {
      allPools.push(poolInfo);

      console.info(
        `Got pool info chain:${poolInfo.chain} type:${poolInfo.type} address:${
          poolInfo.address
        } tokens:${poolInfo.tokens.map((item) => item.symbol).toString()}`
      );
    }
  }

  fs.writeFileSync(`./configs/data/CurvePools.json`, JSON.stringify(allPools));
})();
