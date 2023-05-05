// get all yearn.finance vault data from factory
import axios from 'axios';
import fs from 'fs';
import Web3 from 'web3';

import YearnFactoryAbi from '../configs/abi/yearn/YearnFactory.json';
import EnvConfig from '../configs/envConfig';
import { compareAddress } from '../lib/helper';
import { YearnHelper, YearnVaultToken } from '../modules/adapters/yearn/helper';

// Legacy vaults do not emit Deposit/Withdraw event on users action
// So we detect deposit/withdraw by collect Transfer and calculate shares amount
const LegacyVaults: Array<string> = [
  'ethereum:12588794:0xa258c4606ca8206d8aa700ce2143d7db854d168c',
  'ethereum:11883016:0xa9fE4601811213c340e850ea305481afF02f5b28',
  'ethereum:11992803:0xE14d13d8B3b85aF791b2AADD661cDBd5E6097Db1',
  'ethereum:15624989:0x27b5739e22ad9033bcbf192059122d163b60349d',
  'ethereum:15624988:0xc97232527B62eFb0D8ed38CF3EA103A6CcA4037e',
  'ethereum:13195497:0x1b905331F7dE2748F4D6a0678e1521E20347643F',
  'ethereum:14891068:0x341bb10D8f5947f3066502DC8125d9b8949FD3D6',
  'ethereum:13195534:0x59518884EeBFb03e90a18ADBAAAB770d4666471e',
  'ethereum:13635328:0xBCBB5b54Fa51e7b7Dc920340043B203447842A6b',
  'ethereum:15649144:0xc5F3D11580c41cD07104e9AF154Fc6428bb93c73',
  'ethereum:14165196:0x790a60024bC3aea28385b60480f15a0771f26D09',
  'ethereum:12484685:0xBfedbcbe27171C418CDabC2477042554b1904857',
  'ethereum:13470881:0x718AbE90777F5B778B52D553a5aBaa148DD0dc5D',
  'ethereum:13541215:0x378cb52b00F9D0921cb46dFc099CFf73b42419dC',
  'ethereum:12293207:0x8cc94ccd0f3841a468184aCA3Cc478D2148E1757',
  'ethereum:12115501:0x625b7DF2fa8aBe21B0A976736CDa4775523aeD1E',
  'ethereum:12272748:0xF29AE508698bDeF169B89834F76704C3B205aedf',
  'ethereum:13513457:0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE',
  'ethereum:12293061:0x132d8D2C76Db3812403431fAcB00F3453Fc42125',
  'ethereum:12796965:0xdA816459F1AB5631232FE5e97a05BBBb94970c95',
  'ethereum:12885875:0xd9788f3931Ede4D5018184E198699dC6d66C1915',
  'ethereum:12283876:0x6Ede7F19df5df6EF23bD5B9CeDb651580Bdf56Ca',
  'ethereum:12293189:0x30FCf7c6cDfC46eC237783D94Fc78553E79d4E9C',
  'ethereum:12298129:0x2a38B9B0201Ca39B17B460eD2f11e4929559071E',
  'ethereum:12245239:0xD6Ea40597Be05c201845c0bFd2e96A60bACde267',
  'ethereum:12298216:0x39CAF13a104FF567f71fd2A4c68C026FDB6E740B',
  'ethereum:14980240:0x3B27F92C0e212C671EA351827EDF93DB27cc0c65',
  'ethereum:12245110:0xb4D1Be44BfF40ad6e506edf43156577a3f8672eC',
  'ethereum:13030322:0xdb25cA703181E7484a155DD612b06f57E12Be5F0',
  'ethereum:12185982:0xA696a63cc78DfFa1a63E9E50587C197387FF6C7E',
  'ethereum:12542636:0x671a912c10bba0cfa74cfc2d6fba9ba1ed9530b2',
  'ethereum:12866983:0x6d765CbE5bC922694afE112C140b8878b9FB0390',
  'ethereum:15116693:0xA9412Ffd7E0866755ae0dda3318470A61F62abe8',
  'ethereum:13845182:0xd88dBBA3f9c4391Ee46f5FF548f289054db6E51C',
  'ethereum:16501974:0xC1f3C276Bf73396C020E8354bcA581846171649d',
  'ethereum:12570773:0x873fB544277FD7b977B196a826459a69E27eA4ea',
  'ethereum:13635343:0xF59D66c1d593Fb10e2f8c2a6fD2C958792434B9c',
  'ethereum:12298088:0x25212Df29073FfFA7A67399AcEfC2dd75a831A1A',
  'ethereum:12298233:0xC4dAf3b5e2A9e93861c3FBDd25f1e943B8D87417',
  'ethereum:13845201:0x2D5D4869381C4Fce34789BC1D38aCCe747E295AE',
  'ethereum:13635343:0x801Ab06154Bf539dea4385a39f5fa8534fB53073',
  'ethereum:12339355:0xFBEB78a723b8087fD2ea7Ef1afEc93d35E8Bed42',
  'ethereum:13194414:0x4560b99C904aAD03027B5178CCa81584744AC01f',
  'ethereum:14401423:0x5c0A86A32c129538D62C106Eb8115a8b02358d57',
  'ethereum:12909669:0xFD0877d9095789cAF24c98F7CCe092fa8E120775',
];

const YearnFactory = '0x21b1FC8A52f179757bf555346130bF27c0C2A17A';

interface YearnVaultTokenWithBirthDay extends YearnVaultToken {
  birthday: number;
}

(async function () {
  const apiDataVaults: Array<any> = (await axios.get('https://api.yearn.finance/v1/chains/1/vaults/all')).data;

  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);
  const factoryContract = new web3.eth.Contract(YearnFactoryAbi as any, YearnFactory);
  const allVaultAddresses = await factoryContract.methods.allDeployedVaults().call();

  const vaults: Array<YearnVaultTokenWithBirthDay> = [];
  for (const vaultAddress of allVaultAddresses) {
    const vaultInfo = await YearnHelper.getYearnVaultToken('ethereum', vaultAddress);
    if (vaultInfo) {
      let found = false;
      for (const apiVault of apiDataVaults) {
        if (compareAddress(apiVault.address, vaultInfo.address)) {
          vaults.push({
            ...vaultInfo,
            birthday: Number(apiVault.inception),
          });
          found = true;
        }
      }

      if (!found) {
        vaults.push({
          ...vaultInfo,
          birthday: 16308190,
        });
      }

      console.info(
        `Got vault token chain:${vaultInfo.chain} vault:${vaultInfo.address} token:${vaultInfo.token.symbol}`
      );
    }
  }

  for (const config of LegacyVaults) {
    const [chain, birthday, address] = config.split(':');
    const vaultInfo = await YearnHelper.getYearnVaultToken(chain, address);
    if (vaultInfo) {
      vaults.push({
        ...vaultInfo,
        birthday: Number(birthday),
      });

      console.info(
        `Got vault token chain:${vaultInfo.chain} vault:${vaultInfo.address} token:${vaultInfo.token.symbol}`
      );
    }
  }

  fs.writeFileSync(`./configs/data/YearnVaults.json`, JSON.stringify(vaults));
})();
