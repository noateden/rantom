import { ProtocolConfig } from '../../types/configs';
import { ChainPolygonZkEVM, ChainZksyncEra } from '../constants/chains';

export const CelerbridgeConfigs: ProtocolConfig = {
  protocol: 'celerbridge',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'celerbridge',
      address: '0x5427fefa711eff984124bfbb1ab6fbf5e3da1820', // Bridge
    },
    {
      chain: 'arbitrum',
      protocol: 'celerbridge',
      address: '0x1619de6b6b20ed217a58d00f37b9d47c7663feca', // Bridge
    },
    {
      chain: 'optimism',
      protocol: 'celerbridge',
      address: '0x9d39fc627a6d9d9f8c831c16995b209548cc3401', // Bridge
    },
    {
      chain: 'polygon',
      protocol: 'celerbridge',
      address: '0x88dcdc47d2f83a99cf0000fdf667a468bb958a78', // Bridge
    },
    {
      chain: 'bnbchain',
      protocol: 'celerbridge',
      address: '0xdd90e5e87a2081dcf0391920868ebc2ffb81a1af', // Bridge
    },
    {
      chain: 'avalanche',
      protocol: 'celerbridge',
      address: '0xef3c714c9425a8f3697a9c969dc1af30ba82e5d4', // Bridge
    },
    {
      chain: 'fantom',
      protocol: 'celerbridge',
      address: '0x374b8a9f3ec5eb2d97eca84ea27aca45aa1c57ef', // Bridge
    },
    {
      chain: 'linea',
      protocol: 'celerbridge',
      address: '0x9b36f165bab9ebe611d491180418d8de4b8f3a1f', // Bridge
    },
    {
      chain: ChainPolygonZkEVM,
      protocol: 'celerbridge',
      address: '0xd46f8e428a06789b5884df54e029e738277388d1', // Bridge
    },
    {
      chain: ChainZksyncEra,
      protocol: 'celerbridge',
      address: '0x54069e96c4247b37c2fbd9559ca99f08cd1cd66c', // Bridge
    },
  ],
};
