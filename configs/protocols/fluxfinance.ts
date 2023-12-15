import FluxFinanceMarkets from '../data/FluxFinanceMarkets.json';
import { CompoundConfig } from './compound';

export const FluxfinanceConfigs: CompoundConfig = {
  protocol: 'fluxfinance',
  contracts: [
    ...FluxFinanceMarkets.map((item) => {
      return {
        ...item,
        protocol: 'fluxfinance',
      };
    }),
  ],
};
