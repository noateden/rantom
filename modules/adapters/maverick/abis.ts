import { EventMapping } from '../../../types/configs';

export const MaverickEventSignatures = {
  PoolCreated: '0x9b3fb3a17b4e94eb4d1217257372dcc712218fcd4bc1c28482bd8a6804a7c775',
  Swap: '0x3b841dc9ab51e3104bda4f61b41e4271192d22cd19da5ee6e292dc8e2744f713',
  AddLiquidity: '0x133a027327582be2089f6ca47137e3d337be4ca2cd921e5f0b178c9c2d5b8364',
  RemoveLiquidity: '0x65da280c1e973a1c5884c38d63e2c2b3c2a3158a0761e76545b64035e2489dfe',
};

export const MaverickAbiMappings: { [key: string]: EventMapping } = {
  [MaverickEventSignatures.PoolCreated]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'poolAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tickSpacing',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int32',
        name: 'activeTick',
        type: 'int32',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'lookback',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'protocolFeeRatio',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'tokenA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'tokenB',
        type: 'address',
      },
    ],
  },
  [MaverickEventSignatures.Swap]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'tokenAIn',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'exactOutput',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int32',
        name: 'activeTick',
        type: 'int32',
      },
    ],
  },
  [MaverickEventSignatures.AddLiquidity]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint128',
            name: 'deltaA',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'deltaB',
            type: 'uint128',
          },
          {
            internalType: 'uint256',
            name: 'deltaLpBalance',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'binId',
            type: 'uint128',
          },
          {
            internalType: 'uint8',
            name: 'kind',
            type: 'uint8',
          },
          {
            internalType: 'int32',
            name: 'lowerTick',
            type: 'int32',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct IPool.BinDelta[]',
        name: 'binDeltas',
        type: 'tuple[]',
      },
    ],
  },
  [MaverickEventSignatures.RemoveLiquidity]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint128',
            name: 'deltaA',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'deltaB',
            type: 'uint128',
          },
          {
            internalType: 'uint256',
            name: 'deltaLpBalance',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'binId',
            type: 'uint128',
          },
          {
            internalType: 'uint8',
            name: 'kind',
            type: 'uint8',
          },
          {
            internalType: 'int32',
            name: 'lowerTick',
            type: 'int32',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct IPool.BinDelta[]',
        name: 'binDeltas',
        type: 'tuple[]',
      },
    ],
  },
};
