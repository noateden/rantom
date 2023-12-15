import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';
import CompoundMarkets from '../data/CompoundMarkets.json';
import Compoundv3Markets from '../data/CompoundMarketsV3.json';

export interface CompoundMarket extends ContractConfig {
  etherPool: boolean;
  underlying: Token;
}

export interface CompoundConfig extends ProtocolConfig {
  contracts: Array<ContractConfig | CompoundMarket>;
}

export const CompoundConfigs: CompoundConfig = {
  protocol: 'compound',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'compound',
      address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b', // Comptroller
    },
    ...CompoundMarkets.map((item) => {
      return {
        ...item,
        protocol: 'compound',
      };
    }),
  ],
};

export interface Compoundv3Market extends ContractConfig {
  baseToken: Token;
  collaterals: Array<Token>;
}

export interface Compoundv3Config extends ProtocolConfig {
  contracts: Array<ContractConfig | Compoundv3Market>;
}

export const Compoundv3Configs: Compoundv3Config = {
  protocol: 'compoundv3',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'compoundv3',
      address: '0x1b0e765f6224c21223aea2af16c1c46e38885a40', // Comet rewards
    },
    ...Compoundv3Markets.map((item) => {
      return {
        ...item,
        protocol: 'compoundv3',
      };
    }),
  ],
};
