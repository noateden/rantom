import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';

export interface GravitaConfig extends ProtocolConfig {
  borrowOperation: ContractConfig;
  vesselManager: ContractConfig;
  debtToken: Token;
}

const GravitaBorrowOperation: ContractConfig = {
  chain: 'ethereum',
  protocol: 'gravita',
  address: '0x2bca0300c2aa65de6f19c2d241b54a445c9990e2',
};
const GravitaVesselManager: ContractConfig = {
  chain: 'ethereum',
  protocol: 'gravita',
  address: '0xdb5dacb1dfbe16326c3656a88017f0cb4ece0977',
};

export const GravitaConfigs: GravitaConfig = {
  protocol: 'gravita',
  contracts: [GravitaBorrowOperation],
  borrowOperation: GravitaBorrowOperation,
  vesselManager: GravitaVesselManager,
  debtToken: {
    chain: 'ethereum',
    symbol: 'GRAI',
    decimals: 18,
    address: '0x15f74458ae0bfdaa1a96ca1aa779d715cc1eefe4',
  },
};
