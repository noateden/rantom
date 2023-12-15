import IronbankMarkets from '../data/IronbankMarkets.json';
import { CompoundConfig } from './compound';

export const IronbankConfigs: CompoundConfig = {
  protocol: 'ironbank',
  contracts: [
    ...IronbankMarkets.map((item) => {
      return {
        ...item,
        protocol: 'ironbank',
      };
    }),
  ],
};
