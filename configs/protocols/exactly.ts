import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';
import ExactlyMarkets from '../data/ExactlyMarkets.json';

export interface ExactlyMarket extends ContractConfig {
  asset: Token;
}

export interface ExactlyConfig extends ProtocolConfig {
  contracts: Array<ExactlyMarket | ContractConfig>;
}

export const ExactlyConfigs: ExactlyConfig = {
  protocol: 'exactly',
  contracts: ExactlyMarkets,
};
