import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';
import Markets from '../data/AbracadabraMarkets.json';

export interface AbracadabraMarket extends ContractConfig {
  version: 2 | 3 | 4;
  debtToken: Token;
  collateralToken: Token;
}

export interface AbracadabraConfig extends ProtocolConfig {
  contracts: Array<AbracadabraMarket | ContractConfig>;
}

export const AbracadabraConfigs: AbracadabraConfig = {
  protocol: 'abracadabra',
  contracts: [
    ...Markets,
    {
      chain: 'ethereum',
      protocol: 'abracadabra',
      address: '0x26fa3fffb6efe8c1e69103acb4044c26b9a106a9', // sSPELL
    },
    {
      chain: 'ethereum',
      protocol: 'abracadabra',
      address: '0xbd2fbaf2dc95bd78cf1cd3c5235b33d1165e6797', // mSPELL
    },
  ],
};
