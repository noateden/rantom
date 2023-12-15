import { EventMapping } from '../../../types/configs';

export const MakerEventSignatures = {
  GemJoin: '0xef693bed00000000000000000000000000000000000000000000000000000000',
  GemExit: '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
  DaiFlashloan: '0x0d7d75e01ab95780d3cd1c8ec0dd6c2ce19e3a20427eec8bf53283b6fb8e95f0',
  AuthGemJoin: '0x16c03c2fe01ac285473b0d10ba5c5de59ede582fcac27a866b5827415fe44b03',
  AuthGemExit: '0x22d324652c93739755cf4581508b60875ebdd78c20c0cff5cf8e23452b299631',
};

export const MakerAbiMappings: { [key: string]: EventMapping } = {
  [MakerEventSignatures.GemJoin]: {
    abi: [],
  },
  [MakerEventSignatures.GemExit]: {
    abi: [],
  },
  [MakerEventSignatures.DaiFlashloan]: {
    abi: [
      {
        indexed: true,
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
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
  },
  [MakerEventSignatures.AuthGemJoin]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'urn',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'msgSender',
        type: 'address',
      },
    ],
  },
  [MakerEventSignatures.AuthGemExit]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'usr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
    ],
  },
};
