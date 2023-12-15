import { ProtocolConfig } from '../../types/configs';

const protocol = 'cowswap';

export const CowswapConfigs: ProtocolConfig = {
  protocol,
  contracts: [
    {
      chain: 'ethereum',
      protocol,
      address: '0x9008d19f58aabd9ed0d60971565aa8510560ab41', // GPv2Settlement
    },
  ],
};
