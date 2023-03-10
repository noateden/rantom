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
];
