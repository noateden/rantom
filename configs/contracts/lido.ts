import { Contract } from '../../types/configs';
import BeaconDepositAbi from '../abi/BeaconDeposit.json';
import LidoStETHAbi from '../abi/lido/stETH.json';
import { BeaconDepositContract } from '../constants';

export const LidoContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'lido',
    abi: LidoStETHAbi,
    address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    birthday: 11473216,
    events: ['Submitted'],
  },

  // this contract used to detect Beacon deposits by Lido via Lido Deposit Security Module
  {
    chain: 'ethereum',
    protocol: 'lido',
    abi: BeaconDepositAbi,
    address: BeaconDepositContract,
    birthday: 14987778, // first deposit was made
    events: ['DepositEvent'],
  },
];
