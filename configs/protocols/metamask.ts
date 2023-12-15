import { ProtocolConfig } from '../../types/configs';

const protocol = 'metamask';

export const MetamaskConfigs: ProtocolConfig = {
  protocol: protocol,
  contracts: [
    {
      chain: 'ethereum',
      protocol,
      address: '0x881d40237659c251811cec9c364ef91dc08d300c', // Swap Router
    },
    {
      chain: 'arbitrum',
      protocol,
      address: '0x9dda6ef3d919c9bc8885d5560999a3640431e8e6', // Swap Router
    },
    {
      chain: 'polygon',
      protocol,
      address: '0x1a1ec25dc08e98e5e93f1104b5e5cdd298707d31', // Swap Router
    },
  ],
};
