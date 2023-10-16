import { EventMapping } from '../../../types/configs';

export const GainsMappings: { [key: string]: EventMapping } = {
  // MarketExecuted
  '0x2739a12dffae5d66bd9e126a286078ed771840f2288f0afa5709ce38c3330997': {
    abi: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'trader',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pairIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialPosToken',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'positionSizeDai',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'openPrice',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'buy',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'leverage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sl',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct StorageInterfaceV5.Trade',
        name: 't',
        type: 'tuple',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'open',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'priceImpactP',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'positionSizeDai',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'percentProfit',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'daiSentToTrader',
        type: 'uint256',
      },
    ],
  },
};
