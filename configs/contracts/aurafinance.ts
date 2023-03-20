import { Contract } from '../../types/configs';
import AuraFinanceBoosterAbi from '../abi/aurafinance/Booster.json';

export const AurafinanceContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'aurafinance',
    abi: AuraFinanceBoosterAbi,
    address: '0xa57b8d98dae62b26ec3bcc4a365338157060b234',
    birthday: 16308190,
    events: ['Deposited', 'Withdrawn'],
  },
];
