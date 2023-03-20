import { Contract } from '../../types/configs';
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
];
