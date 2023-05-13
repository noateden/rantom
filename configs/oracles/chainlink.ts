import { TokenOracle } from '../../types/configs';
import { Tokens } from '../constants';

export const TokenOracleFromChainlink: { [key: string]: TokenOracle } = {
  [Tokens.ethereum.NativeCoin.address]: {
    chain: 'ethereum',
    source: 'chainlink',
    token: Tokens.ethereum.NativeCoin,
    config: {
      priceFeed: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
      priceFeedDecimals: 8,
    },
  },
  [Tokens.ethereum.WETH.address]: {
    chain: 'ethereum',
    source: 'chainlink',
    token: Tokens.ethereum.WETH,
    config: {
      priceFeed: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
      priceFeedDecimals: 8,
    },
  },
  [Tokens.ethereum.DAI.address]: {
    chain: 'ethereum',
    source: 'chainlink',
    token: Tokens.ethereum.DAI,
    config: {
      priceFeed: '0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9',
      priceFeedDecimals: 8,
    },
  },
  [Tokens.ethereum.USDC.address]: {
    chain: 'ethereum',
    source: 'chainlink',
    token: Tokens.ethereum.USDC,
    config: {
      priceFeed: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
      priceFeedDecimals: 8,
    },
  },
  [Tokens.ethereum.USDT.address]: {
    chain: 'ethereum',
    source: 'chainlink',
    token: Tokens.ethereum.USDT,
    config: {
      priceFeed: '0x3e7d1eab13ad0104d2750b8863b489d65364e32d',
      priceFeedDecimals: 8,
    },
  },
};
