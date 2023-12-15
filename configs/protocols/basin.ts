import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';
import EthereumTokens from '../tokenlists/ethereum.json';

export interface BasinPoolConfig extends ContractConfig {
  tokens: Array<Token>;
}

export interface BasinConfig extends ProtocolConfig {
  contracts: Array<BasinPoolConfig>;
}

const protocol = 'basin';

export const BasinConfigs: BasinConfig = {
  protocol,
  contracts: [
    {
      chain: 'ethereum',
      protocol,
      address: '0xbea0e11282e2bb5893bece110cf199501e872bad', // BEAN-WETH Well
      tokens: [
        {
          chain: 'ethereum',
          symbol: 'BEAN',
          decimals: 6,
          address: '0xbea0000029ad1c77d3d5d23ba2d8893db9d1efab',
        },
        EthereumTokens.WETH,
      ],
    },
  ],
};
