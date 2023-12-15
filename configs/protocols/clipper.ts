import { ProtocolConfig } from '../../types/configs';

export const ClipperConfigs: ProtocolConfig = {
  protocol: 'clipper',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'clipper',
      address: '0x655edce464cc797526600a462a8154650eee4b77',
    },
    {
      chain: 'arbitrum',
      protocol: 'clipper',
      address: '0xe7b0ce0526fbe3969035a145c9e9691d4d9d216c',
    },
    {
      chain: 'polygon',
      protocol: 'clipper',
      address: '0x6bfce69d1df30fd2b2c8e478edec9daa643ae3b8',
    },
    {
      chain: 'optimism',
      protocol: 'clipper',
      address: '0x5130f6ce257b8f9bf7fac0a0b519bd588120ed40',
    },
  ],
};
