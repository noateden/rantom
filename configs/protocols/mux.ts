import { ProtocolConfig, Token } from '../../types/configs';
import MuxAssets from '../data/MuxAssets.json';

export interface MuxAssetConfig {
  chain: string;
  protocol: string;
  assetId: number;
  token: Token;
}

export interface MuxConfig extends ProtocolConfig {
  assets: Array<MuxAssetConfig>;
}

export const MuxConfigs: MuxConfig = {
  protocol: 'mux',
  contracts: [
    {
      chain: 'arbitrum',
      protocol: 'mux',
      address: '0x3e0199792ce69dc29a0a36146bfa68bd7c8d6633', // Liquidity Pool
    },
    {
      chain: 'bnbchain',
      protocol: 'mux',
      address: '0x855e99f768fad76dd0d3eb7c446c0b759c96d520', // Liquidity Pool
    },
    {
      chain: 'optimism',
      protocol: 'mux',
      address: '0xc6bd76fa1e9e789345e003b361e4a0037dfb7260', // Liquidity Pool
    },
  ],
  assets: MuxAssets,
};
