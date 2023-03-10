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
  {
    chain: 'ethereum',
    protocol: 'busd',
    abi: Erc20Abi,
    address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    birthday: 15291127,
    token: Tokens.ethereum.BUSD,
    events: ['Transfer'],
  },
  {
    chain: 'ethereum',
    protocol: 'tusd',
    abi: Erc20Abi,
    address: '0x0000000000085d4780b73119b644ae5ecd22b376',
    birthday: 15291127,
    token: Tokens.ethereum.TUSD,
    events: ['Transfer'],
  },
];
