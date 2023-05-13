import { TokenOracle } from '../../types/configs';
import { TokenOracleFromBalancer } from './balancer';
import { TokenOracleFromChainlink } from './chainlink';
import { TokenOracleFromCurve } from './curve';
import { TokenOracleFromUniswapv2 } from './uniswapv2';
import { TokenOracleFromUniswapv3 } from './uniswapv3';

export const TokenOracles: { [key: string]: TokenOracle } = {
  ...TokenOracleFromChainlink,
  ...TokenOracleFromUniswapv2,
  ...TokenOracleFromUniswapv3,
  ...TokenOracleFromCurve,
  ...TokenOracleFromBalancer,
};
