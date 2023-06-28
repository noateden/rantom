import { Contract } from '../../types/configs';
import Pools from '../data/MaverickPools.json';

export const MaverickContracts: Array<Contract> = [
  ...Pools.map((item) => {
    return {
      chain: item.chain,
      protocol: 'maverick',
      abi: {},
      address: item.address,
      birthday: 17210232,
      events: [],
      topics: [
        '0x3b841dc9ab51e3104bda4f61b41e4271192d22cd19da5ee6e292dc8e2744f713', // Swap
        '0x133a027327582be2089f6ca47137e3d337be4ca2cd921e5f0b178c9c2d5b8364', // AddLiquidity
        '0x65da280c1e973a1c5884c38d63e2c2b3c2a3158a0761e76545b64035e2489dfe', // RemoveLiquidity
      ],
    };
  }),
];
