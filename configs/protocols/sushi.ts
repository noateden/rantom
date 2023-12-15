import { ContractConfig, ProtocolConfig } from '../../types/configs';

const SushiContracts: { [key: string]: ContractConfig } = {
  factory: {
    chain: 'ethereum',
    protocol: 'sushi',
    address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
  },
  factoryArbitrum: {
    chain: 'arbitrum',
    protocol: 'sushi',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
  },
  factoryPolygon: {
    chain: 'polygon',
    protocol: 'sushi',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
  },
  factoryBnbchain: {
    chain: 'bnbchain',
    protocol: 'sushi',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
  },
  factoryAvalanche: {
    chain: 'avalanche',
    protocol: 'sushi',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
  },
  factoryFantom: {
    chain: 'fantom',
    protocol: 'sushi',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
  },
  factoryCelo: {
    chain: 'celo',
    protocol: 'sushi',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
  },
};

export const SushiConfigs: ProtocolConfig = {
  protocol: 'sushi',
  contracts: [
    SushiContracts.factory,
    SushiContracts.factoryArbitrum,
    SushiContracts.factoryPolygon,
    SushiContracts.factoryBnbchain,
    SushiContracts.factoryAvalanche,
    SushiContracts.factoryFantom,
    SushiContracts.factoryCelo,

    {
      chain: 'ethereum',
      protocol: 'sushi',
      address: '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd', // masterchef
    },
    {
      chain: 'ethereum',
      protocol: 'sushi',
      address: '0xef0881ec094552b2e128cf945ef17a6752b4ec5d', // masterchef v2
    },
    {
      chain: 'arbitrum',
      protocol: 'sushi',
      address: '0xf4d73326c13a4fc5fd7a064217e12780e9bd62c3', // minichef
    },
    {
      chain: 'polygon',
      protocol: 'sushi',
      address: '0x0769fd68dfb93167989c6f7254cd0d766fb2841f', // minichef
    },
  ],
};

const Sushiv3Contracts: { [key: string]: ContractConfig } = {
  factory: {
    chain: 'ethereum',
    protocol: 'sushiv3',
    address: '0xbaceb8ec6b9355dfc0269c18bac9d6e2bdc29c4f',
  },
  factoryArbitrum: {
    chain: 'arbitrum',
    protocol: 'sushiv3',
    address: '0x1af415a1eba07a4986a52b6f2e7de7003d82231e',
  },
  factoryBase: {
    chain: 'base',
    protocol: 'sushiv3',
    address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
  },
  factoryPolygon: {
    chain: 'polygon',
    protocol: 'sushiv3',
    address: '0x917933899c6a5f8e37f31e19f92cdbff7e8ff0e2',
  },
  factoryOptimism: {
    chain: 'optimism',
    protocol: 'sushiv3',
    address: '0x9c6522117e2ed1fe5bdb72bb0ed5e3f2bde7dbe0',
  },
  factoryBnbchain: {
    chain: 'bnbchain',
    protocol: 'sushiv3',
    address: '0x126555dd55a39328f69400d6ae4f782bd4c34abb',
  },
  factoryAvalanche: {
    chain: 'avalanche',
    protocol: 'sushiv3',
    address: '0x3e603c14af37ebdad31709c4f848fc6ad5bec715',
  },
  factoryFantom: {
    chain: 'fantom',
    protocol: 'sushiv3',
    address: '0x7770978eed668a3ba661d51a773d3a992fc9ddcb',
  },
};

export const Sushiv3Configs: ProtocolConfig = {
  protocol: 'sushiv3',
  contracts: [
    Sushiv3Contracts.factory,
    Sushiv3Contracts.factoryArbitrum,
    Sushiv3Contracts.factoryBase,
    Sushiv3Contracts.factoryPolygon,
    Sushiv3Contracts.factoryOptimism,
    Sushiv3Contracts.factoryBnbchain,
    Sushiv3Contracts.factoryAvalanche,
    Sushiv3Contracts.factoryFantom,
  ],
};
