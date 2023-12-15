import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';
import MorphoMarkets from '../data/MorphoMarkets.json';

export interface MorphoMarketConfig extends ContractConfig {
  market: string;
  token: Token;
}

export interface MorphoContractConfig extends ContractConfig {
  version: 1 | 2;
  markets: Array<MorphoMarketConfig>;
}

export interface MorphoConfig extends ProtocolConfig {
  contracts: Array<MorphoContractConfig>;
}

const Protocol = 'morpho';

const MorphoAave: MorphoContractConfig = {
  chain: 'ethereum',
  protocol: Protocol,
  version: 1,
  address: '0x777777c9898d384f785ee44acfe945efdff5f3e0',
  markets: MorphoMarkets.filter((item) => item.address === '0x777777c9898d384f785ee44acfe945efdff5f3e0'),
};

const MorphoCompound: MorphoContractConfig = {
  chain: 'ethereum',
  protocol: Protocol,
  version: 1,
  address: '0x8888882f8f843896699869179fb6e4f7e3b58888',
  markets: MorphoMarkets.filter((item) => item.address === '0x8888882f8f843896699869179fb6e4f7e3b58888'),
};

const MorphoAavev3: MorphoContractConfig = {
  chain: 'ethereum',
  protocol: Protocol,
  version: 2,
  address: '0x33333aea097c193e66081e930c33020272b33333',
  markets: [],
};

export const MorphoConfigs: MorphoConfig = {
  protocol: Protocol,
  contracts: [MorphoAave, MorphoCompound, MorphoAavev3],
};
