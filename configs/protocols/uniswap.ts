import { ContractConfig, ProtocolConfig } from '../../types/configs';

const Uniswapv2Contracts: { [key: string]: ContractConfig } = {
  factory: {
    chain: 'ethereum',
    protocol: 'uniswapv2',
    address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    birthblock: 10000835,
  },
};

export const Uniswapv2Configs: ProtocolConfig = {
  protocol: 'uniswapv2',
  contracts: [Uniswapv2Contracts.factory],
};

const Uniswapv3Contracts: { [key: string]: ContractConfig } = {
  factory: {
    chain: 'ethereum',
    protocol: 'uniswapv3',
    address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
  },
  factoryArbitrum: {
    chain: 'arbitrum',
    protocol: 'uniswapv3',
    address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
  },
  factoryBase: {
    chain: 'base',
    protocol: 'uniswapv3',
    address: '0x33128a8fc17869897dce68ed026d694621f6fdfd',
  },
  factoryOptimism: {
    chain: 'optimism',
    protocol: 'uniswapv3',
    address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
  },
  factoryPolygon: {
    chain: 'polygon',
    protocol: 'uniswapv3',
    address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
  },
  factoryBnbchain: {
    chain: 'bnbchain',
    protocol: 'uniswapv3',
    address: '0xdb1d10011ad0ff90774d0c6bb92e5c5c8b4461f7',
  },
  factoryAvalanche: {
    chain: 'avalanche',
    protocol: 'uniswapv3',
    address: '0x740b1c1de25031c31ff4fc9a62f554a55cdc1bad',
  },
  factoryCelo: {
    chain: 'celo',
    protocol: 'uniswapv3',
    address: '0xafe208a311b21f13ef87e33a90049fc17a7acdec',
  },
};

export const Uniswapv3Configs: ProtocolConfig = {
  protocol: 'uniswapv3',
  contracts: [
    Uniswapv3Contracts.factory,
    Uniswapv3Contracts.factoryArbitrum,
    Uniswapv3Contracts.factoryBase,
    Uniswapv3Contracts.factoryOptimism,
    Uniswapv3Contracts.factoryPolygon,
    Uniswapv3Contracts.factoryBnbchain,
    Uniswapv3Contracts.factoryAvalanche,
    Uniswapv3Contracts.factoryCelo,
  ],
};
