// get all abracadabra.money cauldrons
import fs from 'fs';

import { AbracadabraCauldron, AbracadabraHelper } from '../modules/adapters/abracadabra/helper';

const Cauldrons: Array<string> = [
  'ethereum:v2:0x7b7473a76D6ae86CE19f7352A1E89F6C9dc39020', // ALCX
  'ethereum:v2:0xc1879bf24917ebE531FbAA20b0D05Da027B592ce', // AGLD
  'ethereum:v2:0x252dCf1B621Cc53bc22C256255d2bE5C8c32EaE4', // SHIB
  'ethereum:v2:0xCfc571f3203756319c231d3Bc643Cee807E74636', // SPELL
  'ethereum:v2:0x3410297D89dCDAf4072B805EFc1ef701Bb3dd9BF', // sSPELL
  'ethereum:v2:0x5ec47EE69BEde0b6C2A2fC0D9d094dF16C192498', // WBTC
  'ethereum:v2:0x390Db10e65b5ab920C19149C919D970ad9d18A41', // WETH
  'ethereum:v2:0x257101F20cB7243E2c7129773eD5dBBcef8B34E0', // cvx3pool
  'ethereum:v2:0x4EAeD76C3A388f4a841E9c765560BBe7B3E4B3A0', // cvxTriCrypto2
  'ethereum:v2:0x98a84EfF6e008c5ed0289655CcdCa899bcb6B99F', // xSUSHI
  'ethereum:v2:0xf179fe36a36B32a4644587B8cdee7A23af98ed37', // yvCVXETH
  'ethereum:v2:0x920D9BD936Da4eAFb5E25c6bDC9f6CB528953F9f', // yvWETH v2
  'ethereum:v2:0xEBfDe87310dc22404d918058FAa4D56DC4E93f0A', // yvCRVIB
  'ethereum:v3:0x8227965A7f42956549aFaEc319F4E444aa438Df5', // LUSD (V3_2)
  'ethereum:v3:0xd31E19A0574dBF09310c3B06f3416661B4Dc7324', // StargateUSDC
  'ethereum:v3:0xc6B2b3fE7c3D7a6f823D9106E22e66660709001e', // StargateUSDT
  'ethereum:v3:0x7Ce7D9ED62B9A6c5aCe1c6Ec9aeb115FA3064757', // yvDAI
  'ethereum:v3:0x53375adD9D2dFE19398eD65BAaEFfe622760A9A6', // yvstETH_Concentrated
  'ethereum:v4:0x207763511da879a900973A5E092382117C3c1588', // CRV
  'ethereum:v4:0x1062eb452f8c7a94276437ec1f4aaca9b1495b72', // StargateUSDT
  'ethereum:v4:0x7259e152103756e1616A77Ae982353c3751A6a90', // yvCrv3Crypto
  'ethereum:v4:0x692887E8877C6Dd31593cda44c382DB5b289B684', // magicAPE

  'arbitrum:v2:0xc89958b03a55b5de2221acb25b58b89a000215e6', // ETH
  'arbitrum:v4:0x726413d7402ff180609d0ebc79506df8633701b1', // magic GLP
];

(async function () {
  const allPools: Array<AbracadabraCauldron> = [];
  for (const cauldron of Cauldrons) {
    const [chain, version, address] = cauldron.split(':');

    const cauldronInfo = await AbracadabraHelper.getCauldronInfo(chain, version, address);
    if (cauldronInfo) {
      allPools.push(cauldronInfo);
      console.info(`Got cauldron info chain:${cauldronInfo.address} token:${cauldronInfo.token.symbol}`);
    }
  }

  fs.writeFileSync(`./configs/data/AbracadabraCauldrons.json`, JSON.stringify(allPools));
})();
