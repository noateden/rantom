import { ProtocolConfig } from '../../types/configs';

export const LayerZeroChainIdMaps: { [key: number]: number } = {
  101: 1, // ethereum
  102: 56, // bnbchain
  106: 43114, // avalanche
  109: 137, // polygon
  110: 42161, // arbitrum
  111: 10, // optimism
  112: 250, // fantom
  151: 1088, // metis
  184: 8453, // base
  183: 59144, // linea
  177: 2222, // kava
};

export const StargateConfigs: ProtocolConfig = {
  protocol: 'stargate',
  contracts: [],
};
