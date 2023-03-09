import { Contract } from '../../types/configs';
import SushiMasterchefAbi from '../abi/sushi/masterchef.json';

export const SushiContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'sushi',
    abi: SushiMasterchefAbi,
    address: '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd',
    birthday: 10736242,
    events: ['Deposit', 'Withdraw', 'EmergencyWithdraw'],
  },
];
