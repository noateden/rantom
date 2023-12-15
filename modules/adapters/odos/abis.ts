import { EventMapping } from '../../../types/configs';

export const OdosEventSignatures = {
  Swap: '0x823eaf01002d7353fbcadb2ea3305cc46fa35d799cb0914846d185ac06f8ad05',
  SwapMulti: '0x7d7fb03518253ae01913536628b78d6d82e63e19b943aab5f4948356021259be',
};

export const OdosAbiMappings: { [key: string]: EventMapping } = {
  [OdosEventSignatures.Swap]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'inputAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'inputToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'outputToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'slippage',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'referralCode',
        type: 'uint32',
      },
    ],
  },
  [OdosEventSignatures.SwapMulti]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'amountsIn',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'tokensIn',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'amountsOut',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'tokensOut',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'referralCode',
        type: 'uint32',
      },
    ],
  },
};
