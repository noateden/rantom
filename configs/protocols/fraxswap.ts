import { ContractConfig, ProtocolConfig } from '../../types/configs';

const FraxswapContracts: { [key: string]: ContractConfig } = {
  factory: {
    chain: 'ethereum',
    protocol: 'fraxswap',
    address: '0x43ec799eadd63848443e2347c49f5f52e8fe0f6f',
    birthblock: 15373819,
  },
};

export const FraxswapConfigs: ProtocolConfig = {
  protocol: 'fraxswap',
  contracts: [FraxswapContracts.factory],
};
