import { ProtocolConfig } from '../../types/configs';

export const AnkrConfigs: ProtocolConfig = {
  protocol: 'ankr',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'ankr',
      address: '0x84db6ee82b7cf3b47e8f19270abde5718b936670', // ankrETH staking
    },
    {
      chain: 'bnbchain',
      protocol: 'ankr',
      address: '0x9e347af362059bf2e55839002c699f7a5bafe86e', // ankrBNB staking
    },
  ],
};
