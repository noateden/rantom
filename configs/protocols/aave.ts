import { ProtocolConfig } from '../../types/configs';

export const Aavev1Configs: ProtocolConfig = {
  protocol: 'aavev1',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'aavev1',
      address: '0x398ec7346dcd622edc5ae82352f02be94c62d119',
    },
  ],
};

export const Aavev2Configs: ProtocolConfig = {
  protocol: 'aavev2',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'aavev2',
      address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
    },
    {
      chain: 'polygon',
      protocol: 'aavev2',
      address: '0x8dff5e27ea6b7ac08ebfdf9eb090f32ee9a30fcf',
    },
    {
      chain: 'avalanche',
      protocol: 'aavev2',
      address: '0x4f01aed16d97e3ab5ab2b501154dc9bb0f1a5a2c',
    },
  ],
};

export const Aavev3Configs: ProtocolConfig = {
  protocol: 'aavev3',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'aavev3',
      address: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
    },
    {
      chain: 'arbitrum',
      protocol: 'aavev3',
      address: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
    },
    {
      chain: 'base',
      protocol: 'aavev3',
      address: '0xa238dd80c259a72e81d7e4664a9801593f98d1c5',
    },
    {
      chain: 'optimism',
      protocol: 'aavev3',
      address: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
    },
    {
      chain: 'polygon',
      protocol: 'aavev3',
      address: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
    },
    {
      chain: 'avalanche',
      protocol: 'aavev3',
      address: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
    },
    {
      chain: 'fantom',
      protocol: 'aavev3',
      address: '0x794a61358d6845594f94dc1db02a252b5b4814ad',
    },
  ],
};
