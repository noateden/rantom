import { TokenOracleBase, TokenOracleSource } from '../types/configs';
import UniswapV2FactoryAbi from './abi/uniswap/UniswapV2Factory.json';
import UniswapV3FactoryAbi from './abi/uniswap/UniswapV3Factory.json';
import { Tokens } from './constants';

export const TokenOracleBases: { [key: string]: TokenOracleBase } = {
  [Tokens.ethereum.NativeCoin.address]: {
    token: Tokens.ethereum.NativeCoin,
    priceFeed: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
    priceFeedDecimals: 8,
  },
  [Tokens.ethereum.WETH.address]: {
    token: Tokens.ethereum.WETH,
    priceFeed: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
    priceFeedDecimals: 8,
  },
  [Tokens.ethereum.DAI.address]: {
    token: Tokens.ethereum.DAI,
    priceFeed: '0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9',
    priceFeedDecimals: 8,
  },
  [Tokens.ethereum.USDC.address]: {
    token: Tokens.ethereum.USDC,
    priceFeed: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
    priceFeedDecimals: 8,
  },
  [Tokens.ethereum.USDT.address]: {
    token: Tokens.ethereum.USDT,
    priceFeed: '0x3e7d1eab13ad0104d2750b8863b489d65364e32d',
    priceFeedDecimals: 8,
  },
};

export const TokenOracleSources: Array<TokenOracleSource> = [
  {
    chain: 'ethereum',
    source: 'uniswapv3',
    type: 'pool3',
    factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    factoryAbi: UniswapV3FactoryAbi,
  },
  {
    chain: 'ethereum',
    source: 'uniswapv2',
    type: 'pool2',
    factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    factoryAbi: UniswapV2FactoryAbi,
  },
  {
    chain: 'ethereum',
    source: 'sushi',
    type: 'pool2',
    factory: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
    factoryAbi: UniswapV2FactoryAbi,
  },
];
