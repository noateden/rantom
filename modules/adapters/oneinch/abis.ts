import { EventMapping } from '../../../types/configs';

export const OneinchFunctionSignatures = {
  Swap: '0x12aa3caf',
};

export const OneinchAbiMappings: { [key: string]: EventMapping } = {
  [OneinchFunctionSignatures.Swap]: {
    abi: [
      {
        internalType: 'contract IAggregationExecutor',
        name: 'executor',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'contract IERC20',
            name: 'srcToken',
            type: 'address',
          },
          {
            internalType: 'contract IERC20',
            name: 'dstToken',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'srcReceiver',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'dstReceiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minReturnAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
        ],
        internalType: 'struct GenericRouter.SwapDescription',
        name: 'desc',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'permit',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
  },
};
