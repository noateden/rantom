import { TokenOracle } from '../../types/configs';
import { Tokens } from '../constants';

export const TokenOracleFromUniswapv2: { [key: string]: TokenOracle } = {
  [Tokens.ethereum.SUSHI.address]: {
    chain: 'ethereum',
    source: 'pool2',
    token: Tokens.ethereum.SUSHI,
    config: {
      poolAddress: '0x795065dcc9f64b5614c407a6efdc400da6221fb0',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.REP.address]: {
    chain: 'ethereum',
    source: 'pool2',
    token: Tokens.ethereum.REP,
    config: {
      poolAddress: '0xec2d2240d02a8cf63c3fa0b7d2c5a3169a319496',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.SAI.address]: {
    chain: 'ethereum',
    source: 'pool2',
    token: Tokens.ethereum.SAI,
    config: {
      poolAddress: '0xa27c56b3969cfb8fbce427337d98e3bd794ec688',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.REN.address]: {
    chain: 'ethereum',
    source: 'pool2',
    token: Tokens.ethereum.REN,
    config: {
      poolAddress: '0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.xSUSHI.address]: {
    chain: 'ethereum',
    source: 'pool2',
    token: Tokens.ethereum.xSUSHI,
    config: {
      poolAddress: '0x36e2fcccc59e5747ff63a03ea2e5c0c2c14911e7',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.RAI.address]: {
    chain: 'ethereum',
    source: 'pool2',
    token: Tokens.ethereum.RAI,
    config: {
      poolAddress: '0x8ae720a71622e824f576b4a8c03031066548a3b1',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.AMPL.address]: {
    chain: 'ethereum',
    source: 'pool2',
    token: Tokens.ethereum.AMPL,
    config: {
      poolAddress: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.stETH.address]: {
    chain: 'ethereum',
    source: 'pool2',
    token: Tokens.ethereum.stETH,
    config: {
      poolAddress: '0x4028daac072e492d34a3afdbef0ba7e35d8b55c4',
      baseToken: Tokens.ethereum.WETH,
    },
  },
  [Tokens.ethereum.UST.address]: {
    chain: 'ethereum',
    source: 'pool2',
    token: Tokens.ethereum.UST,
    config: {
      poolAddress: '0x9a0cc6791a5409ce3547f1f1d00e058c79d0a72c',
      baseToken: Tokens.ethereum.WETH,
    },
  },
};
