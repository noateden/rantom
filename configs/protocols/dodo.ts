import { ProtocolConfig } from '../../types/configs';

// Dex aggregator
export const DodoexConfigs: ProtocolConfig = {
  protocol: 'dodoex',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'dodoex',
      address: '0xa2398842f37465f89540430bdc00219fa9e4d28a', // Router proxy v2
    },
    {
      chain: 'ethereum',
      protocol: 'dodoex',
      address: '0xa356867fdcea8e71aeaf87805808803806231fdc', // V2Proxy02
    },
    {
      chain: 'ethereum',
      protocol: 'dodoex',
      address: '0x50f9bde1c76bba997a5d6e7fefff695ec8536194', // DODOFeeRouteProxy
    },
    {
      chain: 'ethereum',
      protocol: 'dodoex',
      address: '0x21b9f852534fb9ddc3a0a7b24f067b50d8ac9a99', // FeeRouteProxy(for widget)
    },
    {
      chain: 'arbitrum',
      protocol: 'dodoex',
      address: '0x3b6067d4caa8a14c63fdbe6318f27a0bbc9f9237', // Router proxy
    },
    {
      chain: 'arbitrum',
      protocol: 'dodoex',
      address: '0x88cbf433471a0cd8240d2a12354362988b4593e5', // Router proxy 02
    },
    {
      chain: 'arbitrum',
      protocol: 'dodoex',
      address: '0xe05dd51e4eb5636f4f0e8e7fbe82ea31a2ecef16', // Router fee route
    },
    {
      chain: 'arbitrum',
      protocol: 'dodoex',
      address: '0xc4a1a152812de96b2b1861e433f42290cdd7f113', // Router fee route for widget
    },
    {
      chain: 'bnbchain',
      protocol: 'dodoex',
      address: '0x8f8dd7db1bda5ed3da8c9daf3bfa471c12d58486', // V2Proxy02
    },
    {
      chain: 'bnbchain',
      protocol: 'dodoex',
      address: '0x6b3d817814eabc984d51896b1015c0b89e9737ca', // RouteProxy
    },
    {
      chain: 'bnbchain',
      protocol: 'dodoex',
      address: '0x0656fd85364d03b103ceeda192fb2d3906a6ac15', // FeeRouteProxy
    },
    {
      chain: 'polygon',
      protocol: 'dodoex',
      address: '0xa222e6a71d1a1dd5f279805fbe38d5329c1d0e70', // V2Proxy02
    },
    {
      chain: 'polygon',
      protocol: 'dodoex',
      address: '0x2fa4334cfd7c56a0e7ca02bd81455205fcbdc5e9', // RouteProxy
    },
    {
      chain: 'polygon',
      protocol: 'dodoex',
      address: '0x39e3e49c99834c9573c9fc7ff5a4b226cd7b0e63', // FeeRouteProxy
    },
    {
      chain: 'polygon',
      protocol: 'dodoex',
      address: '0xa103206e7f19d1c1c0e31efc4dfc7b299630f100', // Router fee route for widget
    },
    {
      chain: 'optimism',
      protocol: 'dodoex',
      address: '0xfd9d2827ad469b72b69329daa325ba7afbdb3c98', // V2Proxy02
    },
    {
      chain: 'optimism',
      protocol: 'dodoex',
      address: '0x7950dc01542efe1c03aea610472e3b565b53f64a', // RouteProxy
    },
    {
      chain: 'optimism',
      protocol: 'dodoex',
      address: '0x716fcc67dca500a91b4a28c9255262c398d8f971', // FeeRouteProxy
    },
  ],
};

export const DodoConfigs: ProtocolConfig = {
  protocol: 'dodo',
  contracts: [],
};
