import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';
import { AddressZero } from '../constants/addresses';

export interface LidoStakingPool extends ContractConfig {
  stakingToken: Token;
}

export interface LidoConfig extends ProtocolConfig {
  contracts: Array<LidoStakingPool | ContractConfig>;
}

export const LidoConfigs: LidoConfig = {
  protocol: 'lido',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'lido',
      address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', // stETH
      stakingToken: {
        chain: 'ethereum',
        symbol: 'ETH',
        decimals: 18,
        address: AddressZero,
      },
    },
    {
      chain: 'ethereum',
      protocol: 'lido',
      address: '0x9ee91f9f426fa633d227f7a9b000e28b9dfd8599', // stMATIC
      stakingToken: {
        chain: 'ethereum',
        symbol: 'MATIC',
        decimals: 18,
        address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
      },
    },
    {
      chain: 'ethereum',
      protocol: 'lido',
      address: '0x889edc2edab5f40e902b864ad4d7ade8e412f9b1', // stETH withdrawal queue
      stakingToken: {
        chain: 'ethereum',
        symbol: 'ETH',
        decimals: 18,
        address: AddressZero,
      },
    },
  ],
};
