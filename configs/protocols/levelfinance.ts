import { ProtocolConfig } from '../../types/configs';

export const LevelfinanceConfigs: ProtocolConfig = {
  protocol: 'levelfinance',
  contracts: [
    {
      chain: 'arbitrum',
      protocol: 'levelfinance',
      address: '0x32b7bf19cb8b95c27e644183837813d4b595dcc6', // Liquidity Pool
    },
    {
      chain: 'bnbchain',
      protocol: 'levelfinance',
      address: '0xa5abfb56a78d2bd4689b25b8a77fd49bb0675874', // Liquidity Pool
    },
  ],
};
