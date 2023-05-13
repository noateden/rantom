import { TokenOracle } from '../../types/configs';
import { Tokens } from '../constants';

export const TokenOracleFromUniswapv3: { [key: string]: TokenOracle } = {
  [Tokens.ethereum['1INCH'].address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum['1INCH'],
    config: {
      poolAddress: '0xe931b03260b2854e77e8da8378a1bc017b13cb97',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.AAVE.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.AAVE,
    config: {
      poolAddress: '0x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.APE.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.APE,
    config: {
      poolAddress: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.BAT.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.BAT,
    config: {
      poolAddress: '0xae614a7a56cb79c04df2aeba6f5dab80a39ca78e',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.BUSD.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.BUSD,
    config: {
      poolAddress: '0xd5ad5ec825cac700d7deafe3102dc2b6da6d195d',
      baseToken: Tokens.ethereum.USDT,
    },
  },
  [Tokens.ethereum.COMP.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.COMP,
    config: {
      poolAddress: '0xea4ba4ce14fdd287f380b55419b1c5b6c3f22ab6',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.CRV.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.CRV,
    config: {
      poolAddress: '0x919fa96e88d67499339577fa202345436bcdaf79',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.CVX.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.CVX,
    config: {
      poolAddress: '0x2e4784446a0a06df3d1a040b03e1680ee266c35a',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.DPI.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.DPI,
    config: {
      poolAddress: '0x9359c87b38dd25192c5f2b07b351ac91c90e6ca7',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.ENJ.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.ENJ,
    config: {
      poolAddress: '0xe16be1798f860bc1eb0feb64cd67ca00ae9b6e58',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.ENS.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.ENS,
    config: {
      poolAddress: '0x92560c178ce069cc014138ed3c2f5221ba71f58a',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.FRAX.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.FRAX,
    config: {
      poolAddress: '0xc63b0708e2f7e69cb8a1df0e1389a98c35a76d52',
      baseToken: Tokens.ethereum.USDC,
    },
  },
  [Tokens.ethereum.LINK.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.LINK,
    config: {
      poolAddress: '0xa6cc3c2531fdaa6ae1a3ca84c2855806728693e8',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.MKR.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.MKR,
    config: {
      poolAddress: '0xe8c6c9227491c0a8156a0106a0204d881bb7e531',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.UNI.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.UNI,
    config: {
      poolAddress: '0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.USDP.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.USDP,
    config: {
      poolAddress: '0x5720eb958685deeeb5aa0b34f677861ce3a8c7f5',
      baseToken: Tokens.ethereum.USDC,
    },
  },
  [Tokens.ethereum.WBTC.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.WBTC,
    config: {
      poolAddress: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.YFI.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.YFI,
    config: {
      poolAddress: '0x2e8daf55f212be91d3fa882cceab193a08fddeb2',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.ZRX.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.ZRX,
    config: {
      poolAddress: '0x14424eeecbff345b38187d0b8b749e56faa68539',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.SNX.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.SNX,
    config: {
      poolAddress: '0x020c349a0541d76c16f501abc6b2e9c98adae892',
      baseToken: Tokens.ethereum.USDC,
    },
  },
  [Tokens.ethereum.cbETH.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.cbETH,
    config: {
      poolAddress: '0x840deeef2f115cf50da625f7368c24af6fe74410',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.wstETH.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.wstETH,
    config: {
      poolAddress: '0xd340b57aacdd10f96fc1cf10e15921936f41e29c',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.KNC.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.KNC,
    config: {
      poolAddress: '0x76838fd2f22bdc1d3e96069971e65653173edb2a',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.MANA.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.MANA,
    config: {
      poolAddress: '0x8661ae7918c0115af9e3691662f605e9c550ddc9',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.rETH.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.rETH,
    config: {
      poolAddress: '0xa4e0faa58465a2d369aa21b3e42d43374c6f9613',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.LDO.address]: {
    chain: 'ethereum',
    source: 'pool3',
    token: Tokens.ethereum.LDO,
    config: {
      poolAddress: '0xa3f558aebaecaf0e11ca4b2199cc5ed341edfd74',
      baseToken: Tokens.ethereum.WETH,
    },
  },
};
