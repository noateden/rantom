import { ProtocolConfig } from '../../types/configs';

const protocol = 'reflexer';

export const ReflexerConfigs: ProtocolConfig = {
  protocol,
  contracts: [
    {
      chain: 'ethereum',
      protocol,
      address: '0x2d3cd7b81c93f188f3cb8ad87c8acc73d6226e3a', // ETH Join
    },
    {
      chain: 'ethereum',
      protocol,
      address: '0x0a5653cca4db1b6e265f47caf6969e64f1cfdc45', // Coin Join
    },
  ],
};
