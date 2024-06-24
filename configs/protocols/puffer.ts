import { ProtocolConfig } from '../../types/configs';

export const PufferConfigs: ProtocolConfig = {
  protocol: 'puffer',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'puffer',
      address: '0xd9a442856c234a39a81a089c06451ebaa4306a72', // ethereum deposit
    },
  ],
};
