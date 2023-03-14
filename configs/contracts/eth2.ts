import { Contract } from '../../types/configs';
import BeaconDepositAbi from '../abi/BeaconDeposit.json';
import { BeaconDepositContract } from '../constants';

export const Eth2Contracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'eth2',
    abi: BeaconDepositAbi,
    address: BeaconDepositContract,
    birthday: 14987778, // first deposit was made
    events: ['DepositEvent'],
  },
];
