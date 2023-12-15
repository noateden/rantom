import fs from 'fs';

import { TokenList } from '../configs';
import CauldronV4 from '../configs/abi/abracadabra/CauldronV4.json';
import { AbracadabraMarket } from '../configs/protocols/abracadabra';
import { normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';
import updateToken from './helpers/updateToken';

const AbracadabraMarkets: Array<string> = [
  'ethereum:2:0x7b7473a76D6ae86CE19f7352A1E89F6C9dc39020', // ALCX
  'ethereum:2:0xc1879bf24917ebE531FbAA20b0D05Da027B592ce', // AGLD
  'ethereum:2:0x252dCf1B621Cc53bc22C256255d2bE5C8c32EaE4', // SHIB
  'ethereum:2:0xCfc571f3203756319c231d3Bc643Cee807E74636', // SPELL
  'ethereum:2:0x3410297D89dCDAf4072B805EFc1ef701Bb3dd9BF', // sSPELL
  'ethereum:2:0x5ec47EE69BEde0b6C2A2fC0D9d094dF16C192498', // WBTC
  'ethereum:2:0x390Db10e65b5ab920C19149C919D970ad9d18A41', // WETH
  'ethereum:2:0x257101F20cB7243E2c7129773eD5dBBcef8B34E0', // cvx3pool
  'ethereum:2:0x4EAeD76C3A388f4a841E9c765560BBe7B3E4B3A0', // cvxTriCrypto2
  'ethereum:2:0x98a84EfF6e008c5ed0289655CcdCa899bcb6B99F', // xSUSHI
  'ethereum:2:0xf179fe36a36B32a4644587B8cdee7A23af98ed37', // yvCVXETH
  'ethereum:2:0x920D9BD936Da4eAFb5E25c6bDC9f6CB528953F9f', // yvWETH v2
  'ethereum:2:0xEBfDe87310dc22404d918058FAa4D56DC4E93f0A', // yvCRVIB
  'ethereum:3:0x8227965A7f42956549aFaEc319F4E444aa438Df5', // LUSD (V3_2)
  'ethereum:3:0xd31E19A0574dBF09310c3B06f3416661B4Dc7324', // StargateUSDC
  'ethereum:3:0xc6B2b3fE7c3D7a6f823D9106E22e66660709001e', // StargateUSDT
  'ethereum:3:0x7Ce7D9ED62B9A6c5aCe1c6Ec9aeb115FA3064757', // yvDAI
  'ethereum:3:0x53375adD9D2dFE19398eD65BAaEFfe622760A9A6', // yvstETH_Concentrated
  'ethereum:4:0x207763511da879a900973A5E092382117C3c1588', // CRV
  'ethereum:4:0x1062eb452f8c7a94276437ec1f4aaca9b1495b72', // StargateUSDT
  'ethereum:4:0x7259e152103756e1616A77Ae982353c3751A6a90', // yvCrv3Crypto
  'ethereum:4:0x692887E8877C6Dd31593cda44c382DB5b289B684', // magicAPE

  'arbitrum:2:0xc89958b03a55b5de2221acb25b58b89a000215e6', // ETH
  'arbitrum:4:0x726413d7402ff180609d0ebc79506df8633701b1', // magic GLP

  'bnbchain:2:0x692CF15F80415D83E8c0e139cAbcDA67fcc12C90', // BNB
  'bnbchain:2:0xF8049467F3A9D50176f4816b20cDdd9bB8a93319', // CAKE

  'avalanche:2:0x3CFEd0439aB822530b1fFBd19536d897EF30D2a2', // AVAX
  'avalanche:2:0xAcc6821d0F368b02d223158F8aDA4824dA9f28E3', // AVAX/MIM SLP

  'fantom:2:0x8E45Af6743422e488aFAcDad842cE75A09eaEd34',
  'fantom:2:0xd4357d43545F793101b592bACaB89943DC89d11b',
  'fantom:2:0xed745b045f9495B8bfC7b58eeA8E0d0597884e12',
  'fantom:2:0xa3Fc1B4b7f06c2391f7AD7D4795C1cD28A59917e',
  'fantom:2:0x7208d9F9398D7b02C5C22c334c2a7A3A98c0A45d',
  'fantom:2:0x4fdfFa59bf8dda3F4d5b38F260EAb8BFaC6d7bC1',
];

(async function () {
  const blockchain = new BlockchainService(null);

  const allMarkets: Array<AbracadabraMarket> = [];

  for (const config of AbracadabraMarkets) {
    const [chain, version, address] = config.split(':');
    const collateralAddress = await blockchain.singlecall({
      chain: chain,
      target: address,
      abi: CauldronV4,
      method: 'collateral',
      params: [],
    });
    if (collateralAddress) {
      const token = await blockchain.getTokenInfo({
        chain: chain,
        address: collateralAddress.toString(),
      });

      if (token) {
        updateToken(token);

        allMarkets.push({
          protocol: 'abracadabra',
          chain,
          address: normalizeAddress(address),
          version: Number(version) as any,
          debtToken: TokenList[chain].MIM,
          collateralToken: token,
        });
        console.info(`Got market info address:${address} token:${token.symbol}`);
      }
    }
  }

  fs.writeFileSync(`./configs/data/AbracadabraMarkets.json`, JSON.stringify(allMarkets));
})();
