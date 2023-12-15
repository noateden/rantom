import { EventMapping } from '../../../types/configs';

export const OpenOceanEventSignatures = {
  Swapped: '0x76af224a143865a50b41496e1a73622698692c565c1214bc862f18e22d829c5e',
};

export const OpenoceanAbiMappings: { [key: string]: EventMapping } = {
  [OpenOceanEventSignatures.Swapped]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'srcToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'dstToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'dstReceiver',
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
        name: 'spentAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'returnAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minReturnAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'guaranteedAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
    ],
  },
};
