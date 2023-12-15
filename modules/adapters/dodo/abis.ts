import { EventMapping } from '../../../types/configs';

export const DodoexEventSignatures = {
  OrderHistory: '0x92ceb067a9883c85aba061e46b9edf505a0d6e81927c4b966ebed543a5221787',
};

export const DodoexAbiMappings: { [key: string]: EventMapping } = {
  [DodoexEventSignatures.OrderHistory]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'fromToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'toToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fromAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'returnAmount',
        type: 'uint256',
      },
    ],
  },
};

export const DodoEventSignatures = {
  // stable swap
  DODOSwap: '0xc2c0245e056d5fb095f04cd6373bc770802ebd1e6c918eb78fdef843cdb37b0f',
  DODOFlashLoan: '0x0b82e93068db15abd9fbb2682c65462ea8a0a10582dce93a5664818e296f54eb',

  // v1 swap
  SellBaseToken: '0xd8648b6ac54162763c86fd54bf2005af8ecd2f9cb273a5775921fd7f91e17b2d',
  BuyBaseToken: '0xe93ad76094f247c0dafc1c61adc2187de1ac2738f7a3b49cb20b2263420251a3',
  Deposit: '0x18081cde2fa64894914e1080b98cca17bb6d1acf633e57f6e26ebdb945ad830b',
  Withdraw: '0xe89c586bd81ee35a18f7eac22a732b56e589a2821497cce12a0208828540a36d',
};

export const DodoAbiMappings: { [key: string]: EventMapping } = {
  [DodoEventSignatures.DODOSwap]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'fromToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'toToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fromAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'toAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'trader',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
    ],
  },
  [DodoEventSignatures.DODOFlashLoan]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'assetTo',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteAmount',
        type: 'uint256',
      },
    ],
  },

  // v1
  [DodoEventSignatures.Deposit]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'payer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isBaseToken',
        type: 'bool',
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
        name: 'lpTokenAmount',
        type: 'uint256',
      },
    ],
  },
  [DodoEventSignatures.Withdraw]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'payer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isBaseToken',
        type: 'bool',
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
        name: 'lpTokenAmount',
        type: 'uint256',
      },
    ],
  },
  [DodoEventSignatures.SellBaseToken]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'payBase',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'receiveQuote',
        type: 'uint256',
      },
    ],
  },
  [DodoEventSignatures.BuyBaseToken]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'receiveBase',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'payQuote',
        type: 'uint256',
      },
    ],
  },
};
