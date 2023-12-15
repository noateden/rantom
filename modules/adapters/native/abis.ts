import { EventMapping } from '../../../types/configs';

export const NativeEventSignatures = {
  Swap: '0xe3a54b69726c85299f4e794bac96150af56af801be76cafd11947a1103b6308a',
};

export const NativeAbiMappings: { [key: string]: EventMapping } = {
  [NativeEventSignatures.Swap]: {
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
        internalType: 'int256',
        name: 'amountIn',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'amountOut',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes16',
        name: 'quoteId',
        type: 'bytes16',
      },
    ],
  },
};
