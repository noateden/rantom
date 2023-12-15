import { ProtocolConfig } from '../../types/configs';

export const ApecoinConfigs: ProtocolConfig = {
  protocol: 'apecoin',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'apecoin',
      address: '0x5954ab967bc958940b7eb73ee84797dc8a2afbb9', // APE staking
    },
  ],
};
