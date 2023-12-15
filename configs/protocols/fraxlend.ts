import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';
import FraxlendPairs from '../data/FraxlendPairs.json';

export interface FraxlendPair extends ContractConfig {
  debtToken: Token;
  collateralToken: Token;
}

export interface FraxlendConfig extends ProtocolConfig {
  contracts: Array<FraxlendPair | ContractConfig>;
}

export const FraxlendConfigs: FraxlendConfig = {
  protocol: 'fraxlend',
  contracts: FraxlendPairs,
};
