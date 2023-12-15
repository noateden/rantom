import { EventMapping } from '../../../types/configs';

export const LevelfinanceEventSignatures = {
  IncreasePosition: '0x8f1a004341b7c2e1e0799b80c6b849e04431c20757ba9b8c9064d5132405465d',
  DecreasePosition: '0x8b8cf2b995650a0e5239d131bc9ace3606d59971f1c0370675babdbc1fc48e5f',
  LiquidatePosition: '0x136cbd19b29e7d7cbbb67178581f238ef5029382a513cd55f0096e974441a6fb',
  LiquidityAdded: '0x43c967b388d3a4ccad3f7ab80167852e322e5a3fde9893f530252281b2ae8b70',
  LiquidityRemoved: '0xd765e08eef31c0983ecca03ecd166297ac485ecd5dd69e291c848f0a020333c1',
  Swap: '0xb24b74123b08b3e5d2af6b47e948b1c8eed24d9f717f27a4b2fc3aa82699696e',
  SwapBnb: '0xd6d34547c69c5ee3d2667625c188acf1006abb93e0ee7cf03925c67cf7760413',
};

export const LevelfinanceAbiMappings: { [key: string]: EventMapping } = {
  [LevelfinanceEventSignatures.IncreasePosition]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'key',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collateralToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'indexToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collateralValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sizeChanged',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum DataTypes.Side',
        name: 'side',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'indexPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeValue',
        type: 'uint256',
      },
    ],
  },
  [LevelfinanceEventSignatures.DecreasePosition]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'key',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collateralToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'indexToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collateralChanged',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sizeChanged',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum DataTypes.Side',
        name: 'side',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'indexPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'pnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeValue',
        type: 'uint256',
      },
    ],
  },
  [LevelfinanceEventSignatures.LiquidatePosition]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'key',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collateralToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'indexToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum DataTypes.Side',
        name: 'side',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collateralValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reserveAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'indexPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'pnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeValue',
        type: 'uint256',
      },
    ],
  },
  [LevelfinanceEventSignatures.LiquidityAdded]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tranche',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
  },
  [LevelfinanceEventSignatures.LiquidityRemoved]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tranche',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpAmount',
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
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
  },
  [LevelfinanceEventSignatures.Swap]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenIn',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenOut',
        type: 'address',
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
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'priceIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'priceOut',
        type: 'uint256',
      },
    ],
  },
  [LevelfinanceEventSignatures.SwapBnb]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenIn',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenOut',
        type: 'address',
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
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
  },
};
