import { ProtocolConfig } from '../../types/configs';
import { ChainPolygonZkEVM, ChainZksyncEra } from '../constants/chains';

export const OpenoceanConfigs: ProtocolConfig = {
  protocol: 'openocean',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'openocean',
      address: '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
    },
    {
      chain: 'bnbchain',
      protocol: 'openocean',
      address: '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
    },
    {
      chain: 'polygon',
      protocol: 'openocean',
      address: '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
    },
    {
      chain: 'arbitrum',
      protocol: 'openocean',
      address: '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
    },
    {
      chain: 'optimism',
      protocol: 'openocean',
      address: '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
    },
    {
      chain: 'base',
      protocol: 'openocean',
      address: '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
    },
    {
      chain: 'avalanche',
      protocol: 'openocean',
      address: '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
    },
    {
      chain: 'fantom',
      protocol: 'openocean',
      address: '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
    },
    {
      chain: 'linea',
      protocol: 'openocean',
      address: '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
    },
    {
      chain: 'celo',
      protocol: 'openocean',
      address: '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
    },
    {
      chain: ChainPolygonZkEVM,
      protocol: 'openocean',
      address: '0x6dd434082eab5cd134b33719ec1ff05fe985b97b',
    },
    {
      chain: ChainZksyncEra,
      protocol: 'openocean',
      address: '0x36a1acbbcafca2468b85011ddd16e7cb4d673230',
    },
  ],
};
