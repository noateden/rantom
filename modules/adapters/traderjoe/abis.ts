import { EventMapping } from '../../../types/configs';

export const Traderjoev2EventSignatures = {
  LBPairCreated: '0x2c8d104b27c6b7f4492017a6f5cf3803043688934ebcaa6a03540beeaf976aff',

  Swap: '0xad7d6f97abf51ce18e17a38f4d70e975be9c0708474987bb3e26ad21bd93ca70',
  DepositedToBins: '0x87f1f9dcf5e8089a3e00811b6a008d8f30293a3da878cb1fe8c90ca376402f8a',
  WithdrawnFromBins: '0xa32e146844d6144a22e94c586715a1317d58a8aa3581ec33d040113ddcb24350',
  FlashLoan: '0xd126bd9d94daca8e55ffd8283fac05394aec8326c6b1639e1e8a445fbe8bbc7d',
};

export const Traderjoev2AbiMappings: { [key: string]: EventMapping } = {
  [Traderjoev2EventSignatures.LBPairCreated]: {
    abi: [
      { indexed: true, internalType: 'contract IERC20', name: 'tokenX', type: 'address' },
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'tokenY',
        type: 'address',
      },
      { indexed: true, internalType: 'uint256', name: 'binStep', type: 'uint256' },
      {
        indexed: false,
        internalType: 'contract ILBPair',
        name: 'LBPair',
        type: 'address',
      },
      { indexed: false, internalType: 'uint256', name: 'pid', type: 'uint256' },
    ],
  },

  [Traderjoev2EventSignatures.Swap]: {
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
        internalType: 'uint24',
        name: 'id',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'amountsIn',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'amountsOut',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint24',
        name: 'volatilityAccumulator',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'totalFees',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'protocolFees',
        type: 'bytes32',
      },
    ],
  },
  [Traderjoev2EventSignatures.DepositedToBins]: {
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
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bytes32[]',
        name: 'amounts',
        type: 'bytes32[]',
      },
    ],
  },
  [Traderjoev2EventSignatures.WithdrawnFromBins]: {
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
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bytes32[]',
        name: 'amounts',
        type: 'bytes32[]',
      },
    ],
  },
  [Traderjoev2EventSignatures.FlashLoan]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract ILBFlashLoanCallback',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint24',
        name: 'activeId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'amounts',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'totalFees',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'protocolFees',
        type: 'bytes32',
      },
    ],
  },
};
