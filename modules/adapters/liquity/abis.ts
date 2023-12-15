import { EventMapping } from '../../../types/configs';

export const LiquityEventSignatures = {
  // we index TroveUpdated event on borrow operations in case: borrow, repay
  // we index TroveUpdated event on trove manager in case of redeem
  TroveUpdated: '0xc3770d654ed33aeea6bf11ac8ef05d02a6a04ed4686dd2f624d853bbec43cc8b',
  TroveLiquidated: '0xea67486ed7ebe3eea8ab3390efd4a3c8aae48be5bea27df104a8af786c408434',
};

export const LiquityAbiMappings: { [key: string]: EventMapping } = {
  [LiquityEventSignatures.TroveUpdated]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_debt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_coll',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_stake',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum TroveManager.TroveManagerOperation',
        name: '_operation',
        type: 'uint8',
      },
    ],
  },
  [LiquityEventSignatures.TroveLiquidated]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_debt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_coll',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum TroveManager.TroveManagerOperation',
        name: '_operation',
        type: 'uint8',
      },
    ],
  },
};
