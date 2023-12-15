import { ProtocolConfig } from '../../types/configs';

export const SwellConfigs: ProtocolConfig = {
  protocol: 'swell',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'swell',
      address: '0xf951e335afb289353dc249e82926178eac7ded78', // swETH
    },
    {
      chain: 'ethereum',
      protocol: 'swell',
      address: '0xb3d9cf8e163bbc840195a97e81f8a34e295b8f39', // Deposit manager
    },
  ],
};
