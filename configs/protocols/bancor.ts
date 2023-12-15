import { ProtocolConfig } from '../../types/configs';

const protocol = 'bancor';

export const BancorConfigs: ProtocolConfig = {
  protocol: protocol,
  contracts: [
    // v3
    {
      chain: 'ethereum',
      protocol,
      address: '0xeef417e1d5cc832e619ae18d2f140de2999dd4fb', // Bancor network v3
    },
    {
      chain: 'ethereum',
      protocol,
      address: '0xd982e001491d414c857f2a1aaa4b43ccf9f642b4', // Pool Collection
    },
    {
      chain: 'ethereum',
      protocol,
      address: '0xde1b3ccfc45e3f5bff7f43516f2cd43364d883e4', // Pool Collection
    },
    {
      chain: 'ethereum',
      protocol,
      address: '0x02651e355d26f3506c1e644ba393fdd9ac95eaca', // BNT Pool v3
    },
  ],
};
