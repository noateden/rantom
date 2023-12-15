import { ContractConfig, ProtocolConfig } from '../../types/configs';

const ShibaswapContracts: { [key: string]: ContractConfig } = {
  factory: {
    chain: 'ethereum',
    protocol: 'shibaswap',
    address: '0x115934131916c8b277dd010ee02de363c09d037c',
    birthblock: 12771526,
  },
};

export const ShibaswapConfigs: ProtocolConfig = {
  protocol: 'shibaswap',
  contracts: [ShibaswapContracts.factory],
};
