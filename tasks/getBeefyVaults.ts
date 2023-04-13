// get all beefy.finance vaults
import fs from 'fs';

import { BeefyHelper, BeefyVaultInfo } from '../modules/adapters/beefy/helper';

const Vaults: Array<string> = [
  '0xf49c523f08b4e7c8e51a44088ea2a5e6b5f397d9', // Beefy reward vault
  '0x4dd0cf20237deb5f2be76340838b9e2d7c70e852', // Stargate ETH vault
  '0x61cf8d861ff3c939147c2aa1f694f9592bf51983', // Stargate USDT vault
  '0x66f5263d51174bab17ac2bda31e51f5bcf05a69a', // Stargate USDC vault
  '0x378416346914a8b530d26b621bda7ae291ce264a', // pETH/ETH vault
  '0xa7739fd3d12ac7f16d8329af3ee407e19de10d8d', // stETH/ETH vault
  '0x8affc4591de6eaec6836c243b00b80f4339f99f5', // wstETH/rETH/sfrxETH v2 vault
  '0x047c41817954b51309a2bd6f60e47bc115c23f1f', // WBTC-ETH vault
  '0xe0d5f9da3613c047003b77caa31270abe3eda6b0', // wstETH/ETH balancer vault
  '0x15780e0e9618c26da679740c43bec76830ff187b', // multiBTC/sBTC/WBTC curve convex vault
  '0xe17d6212eaa54d98187026a770dee96f7c264fec', // rETH-ETH balancer vault
  '0xd5bad7c89028b3f7094e40dcce83d4e6b3fd9aa4', // MIM/DAI/USDT/USDC vault
  '0xcaa51337d91d61e0575f3892cfc6b243a335c0f4', // frxETH-ETH vault
  '0x6853691ca8da03da16194e468068be5a80f103b0', // sBTC/WBTC curve convex vault
  '0x4de81ad42e9651755716177fae9911c54f5b055b', // rETH-ETH curve convex vault
  '0xcc19786f91bb1f3f3fd9a2ea9fd9a54f7743039e', // cvxFXS vault
  '0xe50e2fe90745a8510491f89113959a1ef01ad400', // curve tri crypto vault
  '0xde9aec2f40c7bc783974122ef84c7f1f237f46dd', // USDC-USDT sLP vault
  '0x7f3f33b42b9734e61cb44424d130b5f6e09c9db3', // USDD/DAI/USDT/USDC vault
  '0xffa54b4bfe0225c9b6a830ae1433516736e9a97a', // sETH-ETH vault
  '0x245186caa063b13d0025891c0d513acf552fb38e', // CRV-ETH vault
  '0x8785e892e6c7f1bce907680ce35b580eea7fb24c', // USDC-ETH vault
  '0xd9800eef1756f156e025859ee0dbe6e5f6a6428b', // WBTC-USDC vault
  '0x383f9b2d080c58301d821e9f0ec5a35a17070be6', // DOLA-USDC vault
  '0x4115150523599d1f6c6fa27f5a4c27d578fd8ce5', // cvxCRV vault
  '0x445be44783b9b04b27d23b87ed69985abab1bef3', // VERSE-ETH vault
  '0x3fe43d4ba0a5bacc800c7e7e782466a27ab108bf', // DOLA/FRAX/USDC vault
  '0x3f80f7ae80f54ddb31b1211e7d03cf24fcbb8334', // DAI-ETH vault
  '0xb9911ab699fd781efda446e7fd995d375b437c8b', // SOLID-ETH vault
  '0x6e8aa36716669c575ab308c0f48965a681db03b4', // MATIC-ETH vault
  '0x941e1deac6c58391b266ab849cb7368d6a60910e', // BLUR-ETH vault
  '0xd6f5bef9b63bf648eea43b80b480be653138d116', // CNC-ETH vault
  '0xb9548238d875fb4e12727b2750d8a0bdbc7171c7', // CVX-ETH vault
  '0x60a1cf0d617eeadbb48e488d9ca3e74f50ab4b71', // cbETH-ETH vault
  '0x6660fd0a97af41c6a7b29450d3532feddbe0478a', // BIFI-ETH vault
];

(async function () {
  const allVaults: Array<BeefyVaultInfo> = [];
  for (const vault of Vaults) {
    const vaultInfo = await BeefyHelper.getVaultInfo('ethereum', vault);
    if (vaultInfo) {
      allVaults.push(vaultInfo);
      console.info(`Got vault info address:${vault} token:${vaultInfo.token.symbol}`);
    }
  }

  fs.writeFileSync(`./configs/data/BeefyVaults.json`, JSON.stringify(allVaults));
})();
