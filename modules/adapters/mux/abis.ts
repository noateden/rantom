import { EventMapping } from '../../../types/configs';

export const MuxEventSignatures = {
  OpenPosition: '0xdb27855d3e94a6c985e1e59c77870a73484ef3c40d29fbfe14bb3e686da86efb',
  ClosePosition: '0x645156066afee3ede009256908a9e96538cc1ad681c46b10114f6ce98ebd0600',
  Liquidate: '0xd63e21d9ddaf46f8d28d121f06e7ed33fcc0300af1f8c794e69056dbf37e2d6a',
  AddLiquidity: '0x4b834bda1e32273014eaae217dcc631b391d25d7d056066e2f008aecd86083e8',
  RemoveLiquidity: '0xd20afc5b5a4edaae7399b3eb4737f26d8688e6a86e1b525ffbe063574583b1aa',
};

export const MuxAbiMappings: { [key: string]: EventMapping } = {
  [MuxEventSignatures.OpenPosition]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'trader',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'assetId',
        type: 'uint8',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'subAccountId',
            type: 'bytes32',
          },
          {
            internalType: 'uint8',
            name: 'collateralId',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'isLong',
            type: 'bool',
          },
          {
            internalType: 'uint96',
            name: 'amount',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'assetPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'collateralPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'newEntryPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'feeUsd',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'remainPosition',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'remainCollateral',
            type: 'uint96',
          },
        ],
        indexed: false,
        internalType: 'struct Events.OpenPositionArgs',
        name: 'args',
        type: 'tuple',
      },
    ],
  },
  [MuxEventSignatures.ClosePosition]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'trader',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'assetId',
        type: 'uint8',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'subAccountId',
            type: 'bytes32',
          },
          {
            internalType: 'uint8',
            name: 'collateralId',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'profitAssetId',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'isLong',
            type: 'bool',
          },
          {
            internalType: 'uint96',
            name: 'amount',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'assetPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'collateralPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'profitAssetPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'feeUsd',
            type: 'uint96',
          },
          {
            internalType: 'bool',
            name: 'hasProfit',
            type: 'bool',
          },
          {
            internalType: 'uint96',
            name: 'pnlUsd',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'remainPosition',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'remainCollateral',
            type: 'uint96',
          },
        ],
        indexed: false,
        internalType: 'struct Events.ClosePositionArgs',
        name: 'args',
        type: 'tuple',
      },
    ],
  },
  [MuxEventSignatures.Liquidate]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'trader',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'assetId',
        type: 'uint8',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'subAccountId',
            type: 'bytes32',
          },
          {
            internalType: 'uint8',
            name: 'collateralId',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'profitAssetId',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'isLong',
            type: 'bool',
          },
          {
            internalType: 'uint96',
            name: 'amount',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'assetPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'collateralPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'profitAssetPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'feeUsd',
            type: 'uint96',
          },
          {
            internalType: 'bool',
            name: 'hasProfit',
            type: 'bool',
          },
          {
            internalType: 'uint96',
            name: 'pnlUsd',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'remainCollateral',
            type: 'uint96',
          },
        ],
        indexed: false,
        internalType: 'struct Events.LiquidateArgs',
        name: 'args',
        type: 'tuple',
      },
    ],
  },
  [MuxEventSignatures.AddLiquidity]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'trader',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'tokenId',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'tokenPrice',
        type: 'uint96',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'mlpPrice',
        type: 'uint96',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'mlpAmount',
        type: 'uint96',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'fee',
        type: 'uint96',
      },
    ],
  },
  [MuxEventSignatures.RemoveLiquidity]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'trader',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'tokenId',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'tokenPrice',
        type: 'uint96',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'mlpPrice',
        type: 'uint96',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'mlpAmount',
        type: 'uint96',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'fee',
        type: 'uint96',
      },
    ],
  },
};
