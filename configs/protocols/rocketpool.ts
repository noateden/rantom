import { ProtocolConfig } from '../../types/configs';

export const RocketpoolConfigs: ProtocolConfig = {
  protocol: 'rocketpool',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'rocketpool',
      address: '0xae78736cd615f374d3085123a210448e74fc6393', // rETH
    },
  ],
};
