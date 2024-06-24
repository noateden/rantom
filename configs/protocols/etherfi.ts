import { ProtocolConfig } from '../../types/configs';

export const EtherfiConfigs: ProtocolConfig = {
  protocol: 'etherfi',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'etherfi',
      address: '0x308861a430be4cce5502d0a12724771fc6daf216', // Liquidity Pool
    },
    {
      chain: 'ethereum',
      protocol: 'etherfi',
      address: '0x7d5706f6ef3f89b3951e23e557cdfbc3239d4e2c', // Withdraw NFT
    },
  ],
};
