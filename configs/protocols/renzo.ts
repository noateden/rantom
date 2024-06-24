import { ProtocolConfig } from '../../types/configs';

export const RenzoConfigs: ProtocolConfig = {
  protocol: 'renzo',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'renzo',
      address: '0x74a09653a083691711cf8215a6ab074bb4e99ef5', // ethereum deposit
    },
    {
      chain: 'ethereum',
      protocol: 'renzo',
      address: '0x5efc9d10e42fb517456f4ac41eb5e2ebe42c8918', // ethereum withdraw
    },
    {
      chain: 'arbitrum',
      protocol: 'renzo',
      address: '0xf25484650484de3d554fb0b7125e7696efa4ab99',
    },
    {
      chain: 'bnbchain',
      protocol: 'renzo',
      address: '0xf25484650484de3d554fb0b7125e7696efa4ab99',
    },
    {
      chain: 'base',
      protocol: 'renzo',
      address: '0xf25484650484de3d554fb0b7125e7696efa4ab99',
    },
  ],
};
