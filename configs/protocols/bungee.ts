import { ProtocolConfig } from '../../types/configs';
import { ChainPolygonZkEVM, ChainZksyncEra } from '../constants/chains';

export const BungeeConfigs: ProtocolConfig = {
  protocol: 'bungee',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'bungee',
      address: '0x3a23f943181408eac424116af7b7790c94cb97a5',
    },
    {
      chain: 'arbitrum',
      protocol: 'bungee',
      address: '0x3a23f943181408eac424116af7b7790c94cb97a5',
    },
    {
      chain: 'base',
      protocol: 'bungee',
      address: '0x3a23f943181408eac424116af7b7790c94cb97a5',
    },
    {
      chain: 'optimism',
      protocol: 'bungee',
      address: '0x3a23f943181408eac424116af7b7790c94cb97a5',
    },
    {
      chain: 'polygon',
      protocol: 'bungee',
      address: '0x3a23f943181408eac424116af7b7790c94cb97a5',
    },
    {
      chain: 'bnbchain',
      protocol: 'bungee',
      address: '0x3a23f943181408eac424116af7b7790c94cb97a5',
    },
    {
      chain: 'linea',
      protocol: 'bungee',
      address: '0x3a23f943181408eac424116af7b7790c94cb97a5',
    },
    {
      chain: ChainPolygonZkEVM,
      protocol: 'bungee',
      address: '0x3a23f943181408eac424116af7b7790c94cb97a5',
    },
    {
      chain: ChainZksyncEra,
      protocol: 'bungee',
      address: '0xadde7028e7ec226777e5dea5d53f6457c21ec7d6',
    },
  ],
};
