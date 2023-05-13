import { TokenOracle } from '../../types/configs';
import { Tokens } from '../constants';

export const TokenOracleFromCurve: { [key: string]: TokenOracle } = {
  [Tokens.ethereum.MIM.address]: {
    chain: 'ethereum',
    source: 'curveMeta',
    token: Tokens.ethereum.MIM,
    config: {
      poolAddress: '0x5a6a4d54456819380173272a5e8e9b9904bdf41b',
      baseToken: Tokens.ethereum.DAI,
      indies: [0, 1],
      poolAbi: [
        {
          name: 'get_dy_underlying',
          outputs: [
            {
              type: 'uint256',
              name: '',
            },
          ],
          inputs: [
            {
              type: 'int128',
              name: 'i',
            },
            {
              type: 'int128',
              name: 'j',
            },
            {
              type: 'uint256',
              name: 'dx',
            },
          ],
          stateMutability: 'view',
          type: 'function',
          gas: 2673474,
        },
      ],
    },
  },
  [Tokens.ethereum.FEI.address]: {
    chain: 'ethereum',
    source: 'curveMeta',
    token: Tokens.ethereum.FEI,
    config: {
      poolAddress: '0x06cb22615ba53e60d67bf6c341a0fd5e718e1655',
      baseToken: Tokens.ethereum.DAI,
      indies: [0, 1],
      poolAbi: [
        {
          name: 'get_dy_underlying',
          outputs: [
            {
              type: 'uint256',
              name: '',
            },
          ],
          inputs: [
            {
              type: 'int128',
              name: 'i',
            },
            {
              type: 'int128',
              name: 'j',
            },
            {
              type: 'uint256',
              name: 'dx',
            },
          ],
          stateMutability: 'view',
          type: 'function',
          gas: 2673474,
        },
      ],
    },
  },
  [Tokens.ethereum.sUSD.address]: {
    chain: 'ethereum',
    source: 'curveMeta',
    token: Tokens.ethereum.sUSD,
    config: {
      poolAddress: '0xa5407eae9ba41422680e2e00537571bcc53efbfd',
      baseToken: Tokens.ethereum.DAI,
      indies: [3, 0],
      poolAbi: [
        {
          name: 'get_dy_underlying',
          outputs: [
            {
              type: 'uint256',
              name: '',
            },
          ],
          inputs: [
            {
              type: 'int128',
              name: 'i',
            },
            {
              type: 'int128',
              name: 'j',
            },
            {
              type: 'uint256',
              name: 'dx',
            },
          ],
          stateMutability: 'view',
          type: 'function',
          gas: 2673474,
        },
      ],
    },
  },
  [Tokens.ethereum.TUSD.address]: {
    chain: 'ethereum',
    source: 'curveMeta',
    token: Tokens.ethereum.TUSD,
    config: {
      poolAddress: '0xecd5e75afb02efa118af914515d6521aabd189f1',
      baseToken: Tokens.ethereum.DAI,
      indies: [0, 1],
      poolAbi: [
        {
          name: 'get_dy_underlying',
          outputs: [
            {
              type: 'uint256',
              name: '',
            },
          ],
          inputs: [
            {
              type: 'int128',
              name: 'i',
            },
            {
              type: 'int128',
              name: 'j',
            },
            {
              type: 'uint256',
              name: 'dx',
            },
          ],
          stateMutability: 'view',
          type: 'function',
          gas: 2673474,
        },
      ],
    },
  },
  [Tokens.ethereum.GUSD.address]: {
    chain: 'ethereum',
    source: 'curveMeta',
    token: Tokens.ethereum.GUSD,
    config: {
      poolAddress: '0x4f062658eaaf2c1ccf8c8e36d6824cdf41167956',
      baseToken: Tokens.ethereum.DAI,
      indies: [0, 1],
      poolAbi: [
        {
          name: 'get_dy_underlying',
          outputs: [
            {
              type: 'uint256',
              name: '',
            },
          ],
          inputs: [
            {
              type: 'int128',
              name: 'i',
            },
            {
              type: 'int128',
              name: 'j',
            },
            {
              type: 'uint256',
              name: 'dx',
            },
          ],
          stateMutability: 'view',
          type: 'function',
          gas: 2673474,
        },
      ],
    },
  },
  [Tokens.ethereum.LUSD.address]: {
    chain: 'ethereum',
    source: 'curveMeta',
    token: Tokens.ethereum.LUSD,
    config: {
      poolAddress: '0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca',
      baseToken: Tokens.ethereum.DAI,
      indies: [0, 1],
      poolAbi: [
        {
          name: 'get_dy_underlying',
          outputs: [
            {
              type: 'uint256',
              name: '',
            },
          ],
          inputs: [
            {
              type: 'int128',
              name: 'i',
            },
            {
              type: 'int128',
              name: 'j',
            },
            {
              type: 'uint256',
              name: 'dx',
            },
          ],
          stateMutability: 'view',
          type: 'function',
          gas: 2673474,
        },
      ],
    },
  },
  [Tokens.ethereum.EURS.address]: {
    chain: 'ethereum',
    source: 'curvePol',
    token: Tokens.ethereum.EURS,
    config: {
      poolAddress: '0x98a7f18d4e56cfe84e3d081b40001b3d5bd3eb8b',
      baseToken: Tokens.ethereum.USDC,
      indies: [1, 0],
      poolAbi: [
        {
          stateMutability: 'view',
          type: 'function',
          name: 'get_dy',
          inputs: [
            {
              name: 'i',
              type: 'uint256',
            },
            {
              name: 'j',
              type: 'uint256',
            },
            {
              name: 'dx',
              type: 'uint256',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          gas: 3122,
        },
      ],
    },
  },
  [Tokens.ethereum.sEUR.address]: {
    chain: 'ethereum',
    source: 'curvePol',
    token: Tokens.ethereum.sEUR,
    config: {
      poolAddress: '0x0ce6a5ff5217e38315f87032cf90686c96627caa',
      baseToken: Tokens.ethereum.EURS,
      indies: [1, 0],
      poolAbi: [
        {
          stateMutability: 'view',
          type: 'function',
          name: 'get_dy',
          inputs: [
            {
              name: 'i',
              type: 'int128',
            },
            {
              name: 'j',
              type: 'int128',
            },
            {
              name: 'dx',
              type: 'uint256',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          gas: 3122,
        },
      ],
    },
  },
};
