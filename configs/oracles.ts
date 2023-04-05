import { TokenOracle } from '../types/configs';
import { Tokens } from './constants';

export const TokenOracles: { [key: string]: TokenOracle } = {
  ETH: {
    token: Tokens.ethereum.NativeCoin,
    oracles: [
      {
        type: 'chainlink',
        base: 'USD',
        source: 'chainlink',
        chain: 'ethereum',
        decimals: 8,
        address: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
      },
      {
        type: 'pool2',
        base: 'USD',
        source: 'uniswapv2',
        chain: 'ethereum',
        address: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
        baseToken: Tokens.ethereum.WETH,
        quotaToken: Tokens.ethereum.USDC,
      },
      {
        type: 'pool3',
        base: 'USD',
        source: 'uniswapv3',
        chain: 'ethereum',
        address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        baseToken: Tokens.ethereum.WETH,
        quotaToken: Tokens.ethereum.USDC,
      },
    ],
  },
  BTC: {
    token: {
      chain: 'ethereum',
      symbol: 'BTC',
      decimals: 8,
      address: '0x0000000000000000000000000000000000000000',
    },
    oracles: [
      {
        type: 'chainlink',
        base: 'USD',
        source: 'chainlink',
        chain: 'ethereum',
        decimals: 8,
        address: '0xf4030086522a5beea4988f8ca5b36dbc97bee88c',
      },
    ],
  },
  WBTC: {
    token: Tokens.ethereum.WBTC,
    oracles: [
      {
        type: 'chainlink',
        base: 'BTC',
        source: 'chainlink',
        chain: 'ethereum',
        decimals: 8,
        address: '0xfdfd9c85ad200c506cf9e21f1fd8dd01932fbb23',
      },
    ],
  },
  BNB: {
    token: {
      chain: 'ethereum',
      symbol: 'BNB',
      decimals: 18,
      address: '0x0000000000000000000000000000000000000000',
    },
    oracles: [
      {
        type: 'chainlink',
        base: 'USD',
        source: 'chainlink',
        chain: 'ethereum',
        decimals: 8,
        address: '0x14e613ac84a31f709eadbdf89c6cc390fdc9540a',
      },
    ],
  },
};
