import { EventMapping } from '../../../types/configs';

export const BungeeEventSignatures = {
  SocketBridge: '0x74594da9e31ee4068e17809037db37db496702bf7d8d63afe6f97949277d1609',
};

export const BungeeAbiMappings: { [key: string]: EventMapping } = {
  [BungeeEventSignatures.SocketBridge]: {
    abi: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
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
        name: 'toChainId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'bridgeName',
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
        internalType: 'bytes32',
        name: 'metadata',
        type: 'bytes32',
      },
    ],
  },
};
