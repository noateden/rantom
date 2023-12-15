import { EventMapping } from '../../../types/configs';

export const GmxEventSignatures = {
  BuyUSDG: '0xab4c77c74cd32c85f35416cf03e7ce9e2d4387f7b7f2c1f4bf53daaecf8ea72d',
  SellUSDG: '0xd732b7828fa6cee72c285eac756fc66a7477e3dc22e22e7c432f1c265d40b483',
  Swap: '0x0874b2d545cb271cdbda4e093020c452328b24af12382ed62c4d00f5c26709db',
  IncreasePosition: '0x2fe68525253654c21998f35787a8d0f361905ef647c854092430ab65f2f15022',
  DecreasePosition: '0x93d75d64d1f84fc6f430a64fc578bdd4c1e090e90ea2d51773e626d19de56d30',
  LiquidatePosition: '0x2e1f85a64a2f22cf2f0c42584e7c919ed4abe8d53675cff0f62bf1e95a1c676f',
};

export const GmxAbiMappings: { [key: string]: EventMapping } = {
  [GmxEventSignatures.BuyUSDG]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
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
        name: 'tokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'usdgAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeBasisPoints',
        type: 'uint256',
      },
    ],
  },
  [GmxEventSignatures.SellUSDG]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
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
        name: 'usdgAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeBasisPoints',
        type: 'uint256',
      },
    ],
  },
  [GmxEventSignatures.Swap]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenIn',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenOut',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountOutAfterFees',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeBasisPoints',
        type: 'uint256',
      },
    ],
  },
  [GmxEventSignatures.IncreasePosition]: {
    abi: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'key',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collateralToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'indexToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collateralDelta',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sizeDelta',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isLong',
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
        name: 'fee',
        type: 'uint256',
      },
    ],
  },
  [GmxEventSignatures.DecreasePosition]: {
    abi: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'key',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collateralToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'indexToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collateralDelta',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sizeDelta',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isLong',
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
        name: 'fee',
        type: 'uint256',
      },
    ],
  },
  [GmxEventSignatures.LiquidatePosition]: {
    abi: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'key',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collateralToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'indexToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isLong',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collateral',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reserveAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'realisedPnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'markPrice',
        type: 'uint256',
      },
    ],
  },
};

export const Gmxv2EventSignatures = {
  Event1: '0x137a44067c8961cd7e1d876f4754a5a3a75989b4552f1843fc69c3b372def160',
};

export const Gmxv2AbiMappings: { [key: string]: EventMapping } = {
  [Gmxv2EventSignatures.Event1]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'msgSender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'eventName',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'eventNameHash',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'topic1',
        type: 'bytes32',
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'address',
                    name: 'value',
                    type: 'address',
                  },
                ],
                internalType: 'struct EventUtils.AddressKeyValue[]',
                name: 'items',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'address[]',
                    name: 'value',
                    type: 'address[]',
                  },
                ],
                internalType: 'struct EventUtils.AddressArrayKeyValue[]',
                name: 'arrayItems',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct EventUtils.AddressItems',
            name: 'addressItems',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct EventUtils.UintKeyValue[]',
                name: 'items',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'value',
                    type: 'uint256[]',
                  },
                ],
                internalType: 'struct EventUtils.UintArrayKeyValue[]',
                name: 'arrayItems',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct EventUtils.UintItems',
            name: 'uintItems',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'int256',
                    name: 'value',
                    type: 'int256',
                  },
                ],
                internalType: 'struct EventUtils.IntKeyValue[]',
                name: 'items',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'int256[]',
                    name: 'value',
                    type: 'int256[]',
                  },
                ],
                internalType: 'struct EventUtils.IntArrayKeyValue[]',
                name: 'arrayItems',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct EventUtils.IntItems',
            name: 'intItems',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'bool',
                    name: 'value',
                    type: 'bool',
                  },
                ],
                internalType: 'struct EventUtils.BoolKeyValue[]',
                name: 'items',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'bool[]',
                    name: 'value',
                    type: 'bool[]',
                  },
                ],
                internalType: 'struct EventUtils.BoolArrayKeyValue[]',
                name: 'arrayItems',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct EventUtils.BoolItems',
            name: 'boolItems',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'bytes32',
                    name: 'value',
                    type: 'bytes32',
                  },
                ],
                internalType: 'struct EventUtils.Bytes32KeyValue[]',
                name: 'items',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'bytes32[]',
                    name: 'value',
                    type: 'bytes32[]',
                  },
                ],
                internalType: 'struct EventUtils.Bytes32ArrayKeyValue[]',
                name: 'arrayItems',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct EventUtils.Bytes32Items',
            name: 'bytes32Items',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'bytes',
                    name: 'value',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct EventUtils.BytesKeyValue[]',
                name: 'items',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'bytes[]',
                    name: 'value',
                    type: 'bytes[]',
                  },
                ],
                internalType: 'struct EventUtils.BytesArrayKeyValue[]',
                name: 'arrayItems',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct EventUtils.BytesItems',
            name: 'bytesItems',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'string',
                    name: 'value',
                    type: 'string',
                  },
                ],
                internalType: 'struct EventUtils.StringKeyValue[]',
                name: 'items',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'key',
                    type: 'string',
                  },
                  {
                    internalType: 'string[]',
                    name: 'value',
                    type: 'string[]',
                  },
                ],
                internalType: 'struct EventUtils.StringArrayKeyValue[]',
                name: 'arrayItems',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct EventUtils.StringItems',
            name: 'stringItems',
            type: 'tuple',
          },
        ],
        indexed: false,
        internalType: 'struct EventUtils.EventLogData',
        name: 'eventData',
        type: 'tuple',
      },
    ],
  },
};
