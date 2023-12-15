import { EventMapping } from '../../../types/configs';

export const GearboxEventSignatures = {
  AddLiquidity: '0xd2491a9b4fe81a7cd4511e8b7b7743951b061dad5bed7da8a7795b080ee08c7e',
  RemoveLiquidity: '0xd8ae9b9ba89e637bcb66a69ac91e8f688018e81d6f92c57e02226425c8efbdf6',
  Borrow: '0x312a5e5e1079f5dda4e95dbbd0b908b291fd5b992ef22073643ab691572c5b52',
  Repay: '0x2fe77b1c99aca6b022b8efc6e3e8dd1b48b30748709339b65c50ef3263443e09',

  // GEAR claimed
  Claimed: '0xfa8256f7c08bb01a03ea96f8b3a904a4450311c9725d1c52cdbe21ed3dc42dcc',
};

export const GearboxAbiMappings: { [key: string]: EventMapping } = {
  [GearboxEventSignatures.AddLiquidity]: {
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
        name: 'onBehalfOf',
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
        name: 'referralCode',
        type: 'uint256',
      },
    ],
  },
  [GearboxEventSignatures.RemoveLiquidity]: {
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
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },
  [GearboxEventSignatures.Borrow]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'creditManager',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'creditAccount',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },
  [GearboxEventSignatures.Repay]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'creditManager',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'borrowedAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'profit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'loss',
        type: 'uint256',
      },
    ],
  },
  [GearboxEventSignatures.Claimed]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'bool',
        name: 'historic',
        type: 'bool',
      },
    ],
  },
};
