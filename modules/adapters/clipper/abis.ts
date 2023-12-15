import { EventMapping } from '../../../types/configs';

export const ClipperEventSignatures = {
  Swapped: '0x4be05c8d54f5e056ab2cfa033e9f582057001268c3e28561bb999d35d2c8f2c8',
};

export const ClipperAbiMappings: { [key: string]: EventMapping } = {
  [ClipperEventSignatures.Swapped]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'inAsset',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'outAsset',
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
        internalType: 'uint256',
        name: 'inAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'outAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'auxiliaryData',
        type: 'bytes',
      },
    ],
  },
};
