import { EventMapping } from '../../../types/configs';

export const BasinEventSignatures = {
  Swap: '0xb39c9bc43f811e1a7ce159c5f147458fdb80266bf23c17322013316e27e086d0',
  AddLiquidity: '0x91a6d8e872c9887412278189089c9936e99450551cc971309ff282f79bfef56f',
  RemoveLiquidity: '0xf4358595ad4956678c919635516976c76f95de0ce5a56b61ef35931b8c05dc04',
  RemoveLiquidityOneToken: '0x6f08fb00dac40d918cc84a5080754603d4f9a13a2437d87e06fd75ab944c7575',
  Shift: '0x1ee4a8e2e74af07abadd6b0b5f8f8bd96a54656e3bb7d987c5075a0c8b9f0df5',
};

export const BasinAbiMappings: { [key: string]: EventMapping } = {
  [BasinEventSignatures.Swap]: {
    abi: [
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'fromToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'toToken',
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
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
  },
  [BasinEventSignatures.AddLiquidity]: {
    abi: [
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'tokenAmountsIn',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpAmountOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
  },
  [BasinEventSignatures.RemoveLiquidity]: {
    abi: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpAmountIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'tokenAmountsOut',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
  },
  [BasinEventSignatures.RemoveLiquidityOneToken]: {
    abi: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpAmountIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'tokenOut',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenAmountOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
  },
  [BasinEventSignatures.Shift]: {
    abi: [
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'reserves',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'toToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
  },
};
