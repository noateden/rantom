import { ProtocolConfig } from '../../types/configs';

export const StakewiseConfigs: ProtocolConfig = {
  protocol: 'stakewise',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'stakewise',
      address: '0xfe2e637202056d30016725477c5da089ab0a043a', // sETH2
    },
    {
      chain: 'ethereum',
      protocol: 'stakewise',
      address: '0xa3f21010e8b9a3930996c8849df38f9ca3647c20', // rETH2, SWISE claim
    },
  ],
};
