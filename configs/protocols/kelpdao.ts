import { ProtocolConfig } from '../../types/configs';

export const KelpdaoConfigs: ProtocolConfig = {
  protocol: 'kelpdao',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'kelpdao',
      address: '0x036676389e48133b63a802f8635ad39e752d375d', // LRT deposit
    },
    {
      chain: 'arbitrum',
      protocol: 'kelpdao',
      address: '0x376a7564af88242d6b8598a5cfdd2e9759711b61', // deposit pool
    },
    {
      chain: 'base',
      protocol: 'kelpdao',
      address: '0x291088312150482826b3a37d5a69a4c54daa9118', // deposit pool
    },
    {
      chain: 'optimism',
      protocol: 'kelpdao',
      address: '0xaaa687e218f9b53183a6aa9639fbd9d6e69ecb73', // deposit pool
    },
  ],
};
