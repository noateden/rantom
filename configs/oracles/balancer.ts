import { TokenOracle } from '../../types/configs';
import { Tokens } from '../constants';

export const TokenOracleFromBalancer: { [key: string]: TokenOracle } = {
  [Tokens.ethereum.BAL.address]: {
    chain: 'ethereum',
    source: 'balancer',
    token: Tokens.ethereum.BAL,
    config: {
      poolAddress: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014',
      baseToken: Tokens.ethereum.WETH,
    },
  },
};
