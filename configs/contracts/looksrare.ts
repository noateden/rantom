import { Contract } from '../../types/configs';
import FeeSharingSystemAbi from '../abi/looksrare/FeeSharingSystem.json';
import ExchangeAbi from '../abi/looksrare/LooksrareExchange.json';

export const LooksrareContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'looksrare',
    abi: ExchangeAbi,
    address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
    birthday: 16308190,
    events: ['TakerAsk', 'TakerBid'],
  },
  {
    chain: 'ethereum',
    protocol: 'looksrare',
    abi: FeeSharingSystemAbi,
    address: '0xbcd7254a1d759efa08ec7c3291b2e85c5dcc12ce',
    birthday: 13975053,
    events: ['Deposit', 'Withdraw', 'Harvest'],
  },
];
