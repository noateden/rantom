import CrvusdMarkets from '../../configs/data/CrvusdMarkets.json';
import { normalizeAddress } from '../../lib/utils';
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

export interface CurveSwapPoolConfig extends ContractConfig {
  version: string;
}

const SwapPools: Array<string> = [
  // chain:version:address
  'arbitrum:CurveTricryptoOptimizedWETH:0x845c8bc94610807fcbab5dd2bc7ac9dabaff3c55',
  'arbitrum:CurveTwocryptoOptimized:0x86ea1191a219989d2da3a85c949a12a92f8ed3db',
  'arbitrum:StableSwap2EMAOracle:0x1e2ebe2fffa7c9fa83486188f7c19f9acd1bb990',
  'arbitrum:CurveTwocryptoOptimized:0x1fb84fa6d252762e8367ea607a6586e09dcebe3d',
];

export interface CurveProtocolConfig extends ProtocolConfig {
  contracts: Array<CurveSwapPoolConfig>;
}

export const CurveConfigs: CurveProtocolConfig = {
  protocol: 'curve',
  contracts: [
    // CurveStableswapFactoryNG
    {
      chain: 'arbitrum',
      protocol: 'curve',
      version: 'CurveStableswapFactoryNG',
      address: '0x9af14d26075f142eb3f292d5065eb3faa646167b',
    },
    ...SwapPools.map((item) => {
      const [chain, version, address] = item.split(':');
      return {
        chain: chain,
        protocol: 'curve',
        version: version,
        address: normalizeAddress(address),
      };
    }),
  ],
};
