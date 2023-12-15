import SonnefinanceMarkets from '../data/SonnefinanceMarkets.json';
import { CompoundConfig } from './compound';

export const SonnefinanceConfigs: CompoundConfig = {
  protocol: 'sonnefinance',
  contracts: [
    ...SonnefinanceMarkets.map((item) => {
      return {
        ...item,
        protocol: 'sonnefinance',
      };
    }),
  ],
};
