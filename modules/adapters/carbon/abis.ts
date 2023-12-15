import { EventMapping } from '../../../types/configs';

export const CarbonEventSignatures = {
  TokensTraded: '0x95f3b01351225fea0e69a46f68b164c9dea10284f12cd4a907ce66510ab7af6a',
  StrategyCreated: '0xff24554f8ccfe540435cfc8854831f8dcf1cf2068708cfaf46e8b52a4ccc4c8d',
  StrategyDeleted: '0x4d5b6e0627ea711d8e9312b6ba56f50e0b51d41816fd6fd38643495ac81d38b6',
};

export const CarbonAbiMappings: { [key: string]: EventMapping } = {
  [CarbonEventSignatures.TokensTraded]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'trader',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'Token',
        name: 'sourceToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'Token',
        name: 'targetToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sourceAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'tradingFeeAmount',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'byTargetAmount',
        type: 'bool',
      },
    ],
  },
  [CarbonEventSignatures.StrategyCreated]: {
    abi: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'Token',
        name: 'token0',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'Token',
        name: 'token1',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint128',
            name: 'y',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'z',
            type: 'uint128',
          },
          {
            internalType: 'uint64',
            name: 'A',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'B',
            type: 'uint64',
          },
        ],
        indexed: false,
        internalType: 'struct Order',
        name: 'order0',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint128',
            name: 'y',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'z',
            type: 'uint128',
          },
          {
            internalType: 'uint64',
            name: 'A',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'B',
            type: 'uint64',
          },
        ],
        indexed: false,
        internalType: 'struct Order',
        name: 'order1',
        type: 'tuple',
      },
    ],
  },
  [CarbonEventSignatures.StrategyDeleted]: {
    abi: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'Token',
        name: 'token0',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'Token',
        name: 'token1',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint128',
            name: 'y',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'z',
            type: 'uint128',
          },
          {
            internalType: 'uint64',
            name: 'A',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'B',
            type: 'uint64',
          },
        ],
        indexed: false,
        internalType: 'struct Order',
        name: 'order0',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint128',
            name: 'y',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'z',
            type: 'uint128',
          },
          {
            internalType: 'uint64',
            name: 'A',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'B',
            type: 'uint64',
          },
        ],
        indexed: false,
        internalType: 'struct Order',
        name: 'order1',
        type: 'tuple',
      },
    ],
  },
};
