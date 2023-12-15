import VenusMarkets from '../data/VenusMarkets.json';
import { CompoundConfig } from './compound';

export const VenusConfigs: CompoundConfig = {
  protocol: 'venus',
  contracts: [
    ...VenusMarkets.map((item) => {
      return {
        ...item,
        protocol: 'venus',
      };
    }),
  ],
};
