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
    events: [],
    topics: [
      '0x649bbc62d0e31342afea4e5cd82d4049e7e1ee912fc0889aa790803be39038c5', // DepositEvent
    ],
  },
];
