import { Contract } from '../../types/configs';
import SushiMasterchefAbi from '../abi/sushi/masterchef.json';
import SushiMasterchefAbiV2 from '../abi/sushi/masterchefV2.json';

export const SushiContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'sushi',
    abi: SushiMasterchefAbi,
    address: '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd',
    birthday: 16308190,
    events: ['Deposit', 'Withdraw', 'EmergencyWithdraw'],
  },
  {
    chain: 'ethereum',
    protocol: 'sushi',
    abi: SushiMasterchefAbiV2,
    address: '0xef0881ec094552b2e128cf945ef17a6752b4ec5d',
    birthday: 16308190,
    events: ['Deposit', 'Withdraw', 'EmergencyWithdraw'],
  },
];
