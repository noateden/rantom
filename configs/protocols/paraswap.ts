import { ProtocolConfig } from '../../types/configs';
import { ChainPolygonZkEVM } from '../constants/chains';

export const ParaswapConfigs: ProtocolConfig = {
  protocol: 'paraswap',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'paraswap',
      address: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
    },
    {
      chain: 'arbitrum',
      protocol: 'paraswap',
      address: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
    },
    {
      chain: 'base',
      protocol: 'paraswap',
      address: '0x59c7c832e96d2568bea6db468c1aadcbbda08a52',
    },
    {
      chain: 'optimism',
      protocol: 'paraswap',
      address: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
    },
    {
      chain: 'polygon',
      protocol: 'paraswap',
      address: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
    },
    {
      chain: 'bnbchain',
      protocol: 'paraswap',
      address: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
    },
    {
      chain: 'avalanche',
      protocol: 'paraswap',
      address: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
    },
    {
      chain: 'fantom',
      protocol: 'paraswap',
      address: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
    },
    {
      chain: ChainPolygonZkEVM,
      protocol: 'paraswap',
      address: '0xb83b554730d29ce4cb55bb42206c3e2c03e4a40a',
    },
  ],
};
