import { normalizeAddress } from '../../lib/utils';
import { ProtocolConfig, Token } from '../../types/configs';
import OptimismTokens from '../tokenlists/optimism.json';

export const SynthetixIndexTokens: { [key: string]: Token } = {
  ADA: {
    chain: 'optimism',
    address: 'mocking-synthetix-index-token-ada',
    symbol: 'ADA',
    decimals: 18,
  },
  ALGO: {
    chain: 'optimism',
    address: 'mocking-synthetix-index-token-algo',
    symbol: 'ALGO',
    decimals: 18,
  },
  APE: {
    chain: 'optimism',
    address: 'mocking-synthetix-index-token-ape',
    symbol: 'APE',
    decimals: 18,
  },
  APT: {
    chain: 'optimism',
    address: 'mocking-synthetix-index-token-apt',
    symbol: 'APT',
    decimals: 18,
  },
};

export interface SynthetixPerpsMarket {
  // perpetual market contract
  address: string;

  // index token
  token: Token;
}

const SynthetixContracts: Array<SynthetixPerpsMarket> = [
  {
    address: normalizeAddress('0xd5fAaa459e5B3c118fD85Fc0fD67f56310b1618D'),
    token: OptimismTokens['1INCH'],
  },
  {
    address: normalizeAddress('0x5374761526175B59f1E583246E20639909E189cE'),
    token: OptimismTokens.AAVE,
  },
  {
    address: normalizeAddress('0xF9DD29D2Fd9B38Cd90E390C797F1B7E0523f43A9'),
    token: SynthetixIndexTokens.ADA,
  },
  {
    address: normalizeAddress('0x96f2842007021a4C5f06Bcc72961701D66Ff8465'),
    token: SynthetixIndexTokens.ALGO,
  },
  {
    address: normalizeAddress('0x5B6BeB79E959Aac2659bEE60fE0D0885468BF886'),
    token: SynthetixIndexTokens.APE,
  },
  {
    address: normalizeAddress('0x9615B6BfFf240c44D3E33d0cd9A11f563a2e8D8B'),
    token: SynthetixIndexTokens.APT,
  },
];

export const SynthetixConfigs: ProtocolConfig = {
  protocol: 'synthetix',
  contracts: SynthetixContracts.map((item) => {
    return {
      chain: 'optimism',
      protocol: 'synthetix',
      address: item.address,
    };
  }),
};
