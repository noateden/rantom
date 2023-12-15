import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';
import Gmxv2Markets from '../data/Gmxv2Markets.json';

export const GmxConfigs: ProtocolConfig = {
  protocol: 'gmx',
  contracts: [
    {
      chain: 'arbitrum',
      protocol: 'gmx',
      address: '0x489ee077994b6658eafa855c308275ead8097c4a', // Vault
    },
    {
      chain: 'avalanche',
      protocol: 'gmx',
      address: '0x9ab2de34a33fb459b538c43f251eb825645e8595', // Vault
    },
  ],
};

export interface Gmxv2MarketConfig extends ContractConfig {
  indexToken: Token;
  longToken: Token;
  shortToken: Token;
}

export interface Gmxv2Config extends ProtocolConfig {
  markets: Array<Gmxv2MarketConfig>;
}

export const Gmxv2Configs: Gmxv2Config = {
  protocol: 'gmxv2',
  contracts: [
    {
      chain: 'arbitrum',
      protocol: 'gmxv2',
      address: '0xdb17b211c34240b014ab6d61d4a31fa0c0e20c26', // Event Emitter
    },
  ],
  markets: Gmxv2Markets,
};
