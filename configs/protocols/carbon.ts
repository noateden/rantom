import { ProtocolConfig } from '../../types/configs';

const protocol = 'carbon';

export const CarbonConfigs: ProtocolConfig = {
  protocol,
  contracts: [
    {
      chain: 'ethereum',
      protocol,
      address: '0xc537e898cd774e2dcba3b14ea6f34c93d5ea45e1', // Controller
    },
  ],
};
