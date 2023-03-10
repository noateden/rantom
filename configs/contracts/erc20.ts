import { Contract, Token } from '../../types/configs';
import Erc20Abi from '../abi/ERC20.json';
import { Tokens } from '../constants';

export interface Erc20Contract extends Contract {
  token: Token;
}

export const Erc20Contracts: Array<Erc20Contract> = [
  {
    chain: 'ethereum',
    protocol: 'tether',
    abi: Erc20Abi,
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    birthday: 15291127,
    token: Tokens.ethereum.USDT,
    events: ['Transfer'],
  },
  {
    chain: 'ethereum',
    protocol: 'circle',
    abi: Erc20Abi,
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    birthday: 15291127,
    token: Tokens.ethereum.USDC,
    events: ['Transfer'],
  },
  {
    chain: 'ethereum',
    protocol: 'makerdao',
    abi: Erc20Abi,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    birthday: 15291127,
    token: Tokens.ethereum.DAI,
    events: ['Transfer'],
  },
];
