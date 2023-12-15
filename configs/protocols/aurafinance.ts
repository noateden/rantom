import { ContractConfig, ProtocolConfig } from '../../types/configs';

const AuraBooster: ContractConfig = {
  chain: 'ethereum',
  protocol: 'aurafinance',
  address: '0xa57b8d98dae62b26ec3bcc4a365338157060b234',
};

const AuraBoosterArbitrum: ContractConfig = {
  chain: 'arbitrum',
  protocol: 'aurafinance',
  address: '0x98ef32edd24e2c92525e59afc4475c1242a30184',
};

const AuraBoosterPolygon: ContractConfig = {
  chain: 'polygon',
  protocol: 'aurafinance',
  address: '0x98ef32edd24e2c92525e59afc4475c1242a30184',
};

const AuraBoosterBase: ContractConfig = {
  chain: 'base',
  protocol: 'aurafinance',
  address: '0x98ef32edd24e2c92525e59afc4475c1242a30184',
};

const AuraBoosterOptimism: ContractConfig = {
  chain: 'optimism',
  protocol: 'aurafinance',
  address: '0x98ef32edd24e2c92525e59afc4475c1242a30184',
};

export const AurafinanceConfigs: ProtocolConfig = {
  protocol: 'aurafinance',
  contracts: [
    AuraBooster,
    AuraBoosterArbitrum,
    AuraBoosterPolygon,
    AuraBoosterBase,
    AuraBoosterOptimism,
    {
      chain: 'ethereum',
      protocol: 'aurafinance',
      address: '0x00a7ba8ae7bca0b10a32ea1f8e2a1da980c6cad2', // auraBAL staking
    },
    {
      chain: 'ethereum',
      protocol: 'aurafinance',
      address: '0x5e5ea2048475854a5702f5b8468a51ba1296efcc', // auraBAL staking 2
    },
    {
      chain: 'ethereum',
      protocol: 'aurafinance',
      address: '0x3fa73f1e5d8a792c80f426fc8f84fbf7ce9bbcac', // AURA locker
    },
  ],
};
