import { Contract } from '../../types/configs';
import LidoStETHAbi from '../abi/lido/stETH.json';

export const LidoContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'lido',
    abi: LidoStETHAbi,
    address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    birthday: 11473216,
    events: ['Submitted'],
  },
];
