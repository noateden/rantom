import { ProtocolConfig } from '../../types/configs';

const protocol = 'airswap';

export const AirswapConfigs: ProtocolConfig = {
  protocol: 'airswap',
  contracts: [
    // v2
    {
      chain: 'ethereum',
      protocol,
      address: '0x4572f2554421bd64bef1c22c8a81840e8d496bea',
    },

    // v3
    {
      chain: 'ethereum',
      protocol,
      address: '0x522d6f36c95a1b6509a14272c17747bbb582f2a6',
    },
    {
      chain: 'bnbchain',
      protocol,
      address: '0x132f13c3896eab218762b9e46f55c9c478905849',
    },
    {
      chain: 'polygon',
      protocol,
      address: '0x6713c23261c8a9b7d84dd6114e78d9a7b9863c1a',
    },

    // v4
    {
      chain: 'ethereum',
      protocol,
      address: '0xd82fa167727a4dc6d6f55830a2c47abbb4b3a0f8',
    },
    {
      chain: 'bnbchain',
      protocol,
      address: '0xd82fa167727a4dc6d6f55830a2c47abbb4b3a0f8',
    },
    {
      chain: 'polygon',
      protocol,
      address: '0xd82fa167727a4dc6d6f55830a2c47abbb4b3a0f8',
    },
  ],
};
