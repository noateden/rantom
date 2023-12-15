import { EventMapping } from '../../../types/configs';

export const ZeroxEventSignatures = {
  Trade: '0x0f6672f78a59ba8e5e5b5d38df3ebc67f3c792e2c9259b8d97d7f00dd78ba1b3',
  OtcOrderFilled: '0xac75f773e3a92f1a02b12134d65e1f47f8a14eabe4eaf1e24624918e6a8b269f',
  LimitOrderFilled: '0xab614d2b738543c0ea21f56347cf696a3a0c42a7cbec3212a5ca22a4dcff2124',
  RfqOrderFilled: '0x829fa99d94dc4636925b38632e625736a614c154d55006b7ab6bea979c210c32',
};

export const ZeroxAbiMappings: { [key: string]: EventMapping } = {
  [ZeroxEventSignatures.Trade]: {
    abi: [
      { indexed: true, internalType: 'address', name: 'taker', type: 'address' },
      { indexed: false, internalType: 'address', name: 'inputToken', type: 'address' },
      { indexed: false, internalType: 'address', name: 'outputToken', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'inputTokenAmount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'outputTokenAmount', type: 'uint256' },
    ],
  },
  [ZeroxEventSignatures.OtcOrderFilled]: {
    abi: [
      { indexed: false, internalType: 'bytes32', name: 'orderHash', type: 'bytes32' },
      { indexed: false, internalType: 'address', name: 'maker', type: 'address' },
      { indexed: false, internalType: 'address', name: 'taker', type: 'address' },
      { indexed: false, internalType: 'address', name: 'makerToken', type: 'address' },
      { indexed: false, internalType: 'address', name: 'takerToken', type: 'address' },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'makerTokenFilledAmount',
        type: 'uint128',
      },
      { indexed: false, internalType: 'uint128', name: 'takerTokenFilledAmount', type: 'uint128' },
    ],
  },
  [ZeroxEventSignatures.LimitOrderFilled]: {
    abi: [
      { indexed: false, internalType: 'bytes32', name: 'orderHash', type: 'bytes32' },
      { indexed: false, internalType: 'address', name: 'maker', type: 'address' },
      { indexed: false, internalType: 'address', name: 'taker', type: 'address' },
      { indexed: false, internalType: 'address', name: 'feeRecipient', type: 'address' },
      { indexed: false, internalType: 'address', name: 'makerToken', type: 'address' },
      { indexed: false, internalType: 'address', name: 'takerToken', type: 'address' },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'takerTokenFilledAmount',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'makerTokenFilledAmount',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'takerTokenFeeFilledAmount',
        type: 'uint128',
      },
      { indexed: false, internalType: 'uint256', name: 'protocolFeePaid', type: 'uint256' },
      { indexed: false, internalType: 'bytes32', name: 'pool', type: 'bytes32' },
    ],
  },
  [ZeroxEventSignatures.RfqOrderFilled]: {
    abi: [
      { indexed: false, internalType: 'bytes32', name: 'orderHash', type: 'bytes32' },
      { indexed: false, internalType: 'address', name: 'maker', type: 'address' },
      { indexed: false, internalType: 'address', name: 'taker', type: 'address' },
      { indexed: false, internalType: 'address', name: 'makerToken', type: 'address' },
      { indexed: false, internalType: 'address', name: 'takerToken', type: 'address' },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'takerTokenFilledAmount',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'makerTokenFilledAmount',
        type: 'uint128',
      },
      { indexed: false, internalType: 'bytes32', name: 'pool', type: 'bytes32' },
    ],
  },
};
