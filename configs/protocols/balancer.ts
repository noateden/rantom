import { ContractConfig, ProtocolConfig } from '../../types/configs';
import { StakingPoolConstant } from '../../types/domains';
import { ChainPolygonZkEVM } from '../constants/chains';

const BalancerContracts: { [key: string]: ContractConfig } = {
  vault: {
    chain: 'ethereum',
    protocol: 'balancer',
    address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
  },
  veBAL: {
    chain: 'ethereum',
    protocol: 'balancer',
    address: '0xc128a9954e6c874ea3d62ce62b468ba073093f25',
  },
  vaultArbitrum: {
    chain: 'arbitrum',
    protocol: 'balancer',
    address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
  },
  vaultBase: {
    chain: 'base',
    protocol: 'balancer',
    address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
  },
  vaultPolygon: {
    chain: 'polygon',
    protocol: 'balancer',
    address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
  },
  vaultAvalanche: {
    chain: 'avalanche',
    protocol: 'balancer',
    address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
  },
  vaultPolygonzkevm: {
    chain: ChainPolygonZkEVM,
    protocol: 'balancer',
    address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
  },
};

export const BalancerVeBalStaking: StakingPoolConstant = {
  chain: 'ethereum',
  protocol: 'balancer',
  version: 'basic',
  poolId: 0, // don't care
  address: BalancerContracts.veBAL.address,
  token: {
    chain: 'ethereum',
    symbol: 'B-80BAL-20WETH',
    decimals: 18,
    address: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
  },
};

export const BalancerConfigs: ProtocolConfig = {
  protocol: 'balancer',
  contracts: [
    BalancerContracts.vault,
    BalancerContracts.veBAL,
    BalancerContracts.vaultArbitrum,
    BalancerContracts.vaultBase,
    BalancerContracts.vaultPolygon,
    BalancerContracts.vaultAvalanche,
    BalancerContracts.vaultPolygonzkevm,
  ],
};
