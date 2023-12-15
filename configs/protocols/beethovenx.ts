import { ContractConfig, ProtocolConfig } from '../../types/configs';

const BeethovenxContracts: { [key: string]: ContractConfig } = {
  vault: {
    chain: 'optimism',
    protocol: 'beethovenx',
    address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
  },
  vaultFantom: {
    chain: 'fantom',
    protocol: 'beethovenx',
    address: '0x20dd72ed959b6147912c2e529f0a0c651c33c9ce',
  },
};

export const BeethovenxConfigs: ProtocolConfig = {
  protocol: 'beethovenx',
  contracts: [BeethovenxContracts.vault, BeethovenxContracts.vaultFantom],
};
