import { EventMapping } from '../../../types/configs';

export const ReflexerEventSignatures = {
  Join: '0x0e64978d073561c3dfd4d4e3e4dce066cde2ab246a44f990fabb0a21a4a3bd95',
  Exit: '0xbc2a67d422c268da6fe45f3e7d194e1d98906d221f1cfad62a5c80f2cd209f4c',
};

export const ReflexerAbiMappings: { [key: string]: EventMapping } = {
  [ReflexerEventSignatures.Join]: {
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
        name: 'usr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256',
      },
    ],
  },
  [ReflexerEventSignatures.Exit]: {
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
        name: 'usr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256',
      },
    ],
  },
};
