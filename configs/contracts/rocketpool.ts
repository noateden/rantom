import { Contract } from '../../types/configs';
import rETHAbi from '../abi/rocketpool/rETH.json';

export const RocketpoolContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'rocketpool',
    abi: rETHAbi,
    address: '0xae78736cd615f374d3085123a210448e74fc6393',
    birthday: 13325304,
    events: ['TokensMinted', 'TokensBurned'],
  },
];
