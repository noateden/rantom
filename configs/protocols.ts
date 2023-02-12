import { ProtocolConfig } from '../types/configs';

export const Uniswapv2Configs: ProtocolConfig = {
  protocol: 'uniswapv2',
  contracts: {
    ethereum: [
      '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f', // v2 Factory
    ],
  },
};

export const Uniswapv3Configs: ProtocolConfig = {
  protocol: 'uniswapv3',
  contracts: {
    ethereum: [
      '0x1f98431c8ad98523631ae4a59f267346ea31f984', // v3 Factory
      '0xc36442b4a4522e871399cd717abdd847ab11fe88', // v3 NonfungiblePositionManager
    ],
  },
};

export const LidoConfigs: ProtocolConfig = {
  protocol: 'lido',
  contracts: {
    ethereum: [
      '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', // stETH
    ],
  },
};

export const SushiConfigs: ProtocolConfig = {
  protocol: 'sushi',
  contracts: {
    ethereum: [
      '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac', // uni v2 Factory
    ],
  },
};

export const PancakeswapConfigs: ProtocolConfig = {
  protocol: 'pancakeswap',
  contracts: {
    ethereum: [
      '0x1097053fd2ea711dad45caccc45eff7548fcb362', // uni v2 Factory
    ],
  },
};

export const BalancerConfigs: ProtocolConfig = {
  protocol: 'balancer',
  contracts: {
    ethereum: [
      '0xba12222222228d8ba445958a75a0704d566bf2c8', // vault
    ],
  },
};
