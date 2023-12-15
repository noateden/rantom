import { ProtocolConfig } from '../../types/configs';

const protocol = 'oneinch';

export const OneinchConfigs: ProtocolConfig = {
  protocol: protocol,
  contracts: [
    {
      chain: 'ethereum',
      protocol,
      address: '0x1111111254eeb25477b68fb85ed929f73a960582', // router v5
    },
    {
      chain: 'arbitrum',
      protocol,
      address: '0x1111111254eeb25477b68fb85ed929f73a960582', // router v5
    },
    {
      chain: 'optimism',
      protocol,
      address: '0x1111111254eeb25477b68fb85ed929f73a960582', // router v5
    },
    {
      chain: 'polygon',
      protocol,
      address: '0x1111111254eeb25477b68fb85ed929f73a960582', // router v5
    },
    {
      chain: 'base',
      protocol,
      address: '0x1111111254eeb25477b68fb85ed929f73a960582', // router v5
    },
    {
      chain: 'bnbchain',
      protocol,
      address: '0x1111111254eeb25477b68fb85ed929f73a960582', // router v5
    },
    {
      chain: 'avalanche',
      protocol,
      address: '0x1111111254eeb25477b68fb85ed929f73a960582', // router v5
    },
    {
      chain: 'fantom',
      protocol,
      address: '0x1111111254eeb25477b68fb85ed929f73a960582', // router v5
    },
  ],
};
