import { EventMapping } from '../../../types/configs';

export const ParaswapEventSignatures = {
  BoughtV3: '0x4cc7e95e48af62690313a0733e93308ac9a73326bc3c29f1788b1191c376d5b6',
  SwappedV3: '0xe00361d207b252a464323eb23d45d42583e391f2031acdd2e9fa36efddd43cb0',
};

export const ParaswapAbiMappings: { [key: string]: EventMapping } = {
  [ParaswapEventSignatures.BoughtV3]: {
    abi: [
      {
        indexed: false,
        internalType: 'bytes16',
        name: 'uuid',
        type: 'bytes16',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feePercent',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'initiator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'srcToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'srcAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'receivedAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expectedAmount',
        type: 'uint256',
      },
    ],
  },
  [ParaswapEventSignatures.SwappedV3]: {
    abi: [
      {
        indexed: false,
        internalType: 'bytes16',
        name: 'uuid',
        type: 'bytes16',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feePercent',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'initiator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'srcToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'srcAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'receivedAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expectedAmount',
        type: 'uint256',
      },
    ],
  },
};
