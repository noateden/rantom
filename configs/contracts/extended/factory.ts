import { FactoryContract } from '../../../types/configs';
import UniswapV2FactoryAbi from '../../abi/uniswap/UniswapV2Factory.json';
import UniswapV3FactoryAbi from '../../abi/uniswap/UniswapV3Factory.json';

export const FactoryContracts: Array<FactoryContract> = [
  {
    chain: 'ethereum',
    protocol: 'uniswapv2',
    abi: UniswapV2FactoryAbi,
    type: 'univ2',
    address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    birthday: 10000835,
    events: ['PairCreated'],
  },
  {
    chain: 'ethereum',
    protocol: 'uniswapv3',
    abi: UniswapV3FactoryAbi,
    type: 'univ3',
    address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    birthday: 12369621,
    events: ['PoolCreated'],
  },
];
