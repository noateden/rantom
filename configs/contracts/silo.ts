import { Contract } from '../../types/configs';
import SiloPools from '../data/SiloPools.json';

export const SiloContracts: Array<Contract> = [
  ...SiloPools.map((item) => {
    return {
      chain: item.chain,
      protocol: 'silo',
      abi: {},
      address: item.address,
      birthday: 16308190,
      events: [],
      topics: [
        '0xdd160bb401ec5b5e5ca443d41e8e7182f3fe72d70a04b9c0ba844483d212bcb5', // Deposit
        '0x3b5f15635b488fe265654176726b3222080f3d6500a562f4664233b3ea2f0283', // Withdraw
        '0x312a5e5e1079f5dda4e95dbbd0b908b291fd5b992ef22073643ab691572c5b52', // Borrow
        '0x05f2eeda0e08e4b437f487c8d7d29b14537d15e3488170dc3de5dbdf8dac4684', // Repay
        '0xf3fa0eaee8f258c23b013654df25d1527f98a5c7ccd5e951dd77caca400ef972', // Liquidate
      ],
    };
  }),
];
