import CrvusdMarkets from '../../configs/data/CrvusdMarkets.json';
import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';

export interface CrvusdMarket extends ContractConfig {
  debtToken: Token;
  collateralToken: Token;
}

export interface CrvusdConfig extends ProtocolConfig {
  contracts: Array<CrvusdMarket | ContractConfig>;
}

export const CrvusdConfigs: CrvusdConfig = {
  protocol: 'crvusd',
  contracts: CrvusdMarkets,
};
