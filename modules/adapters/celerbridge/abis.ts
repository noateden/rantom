import { EventMapping } from '../../../types/configs';

export const CelerbridgeMappings: { [key: string]: EventMapping } = {
  // Send(bytes32,address,address,address,uint256,uint64,uint64,uint32)
  '0x89d8051e597ab4178a863a5190407b98abfeff406aa8db90c59af76612e58f01': {
    abi: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'transferId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
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
        internalType: 'uint64',
        name: 'dstChainId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'nonce',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'maxSlippage',
        type: 'uint32',
      },
    ],
  },

  // Relay(bytes32,address,address,address,uint256,uint64,bytes32)
  '0x79fa08de5149d912dce8e5e8da7a7c17ccdf23dd5d3bfe196802e6eb86347c7c': {
    abi: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'transferId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
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
        internalType: 'uint64',
        name: 'srcChainId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'srcTransferId',
        type: 'bytes32',
      },
    ],
  },
};
