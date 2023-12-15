import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';

export interface SiloMarket extends ContractConfig {
  depository: string;
  assets: Array<Token>;
}

export interface SiloConfig extends ProtocolConfig {
  markets: Array<SiloMarket>;
}

export const SiloConfigs: SiloConfig = {
  protocol: 'silo',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'silo',
      address: '0xd998c35b7900b344bbbe6555cc11576942cf309d',
    },
  ],
  markets: [],
};
