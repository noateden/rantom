import { ProtocolConfig } from '../../types/configs';

export const NativeConfigs: ProtocolConfig = {
  protocol: 'native',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'native',
      address: '0x3d130bf4686b3d4b6eb91a8e26ac629c5bea6082',
    },
    {
      chain: 'arbitrum',
      protocol: 'native',
      address: '0x3d130bf4686b3d4b6eb91a8e26ac629c5bea6082',
    },
    {
      chain: 'bnbchain',
      protocol: 'native',
      address: '0x3d130bf4686b3d4b6eb91a8e26ac629c5bea6082',
    },
    {
      chain: 'avalanche',
      protocol: 'native',
      address: '0x3d130bf4686b3d4b6eb91a8e26ac629c5bea6082',
    },
  ],
};
