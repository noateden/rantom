import { ContractConfig, ProtocolConfig } from '../../types/configs';

const MaverickContracts: { [key: string]: ContractConfig } = {
  factory: {
    chain: 'ethereum',
    protocol: 'maverick',
    address: '0xeb6625d65a0553c9dbc64449e56abfe519bd9c9b',
    birthblock: 17210221,
  },
  factoryBase: {
    chain: 'base',
    protocol: 'maverick',
    address: '0xb2855783a346735e4aae0c1eb894def861fa9b45',
    birthblock: 1489615,
  },
  factoryBnbchain: {
    chain: 'bnbchain',
    protocol: 'maverick',
    address: '0x76311728ff86054ad4ac52d2e9ca005bc702f589',
    birthblock: 29241050,
  },
  factoryZksyncera: {
    chain: 'bnbchain',
    protocol: 'maverick',
    address: '0x2c1a605f843a2e18b7d7772f0ce23c236accf7f5',
    birthblock: 29241050,
  },
};

export const MaverickConfigs: ProtocolConfig = {
  protocol: 'maverick',
  contracts: [
    MaverickContracts.factory,
    MaverickContracts.factoryBase,
    MaverickContracts.factoryBnbchain,
    MaverickContracts.factoryZksyncera,
  ],
};
