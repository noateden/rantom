import { EventMapping } from '../../../types/configs';

export const Gmxv2Mappings: { [key: string]: EventMapping } = {
  '0x137a44067c8961cd7e1d876f4754a5a3a75989b4552f1843fc69c3b372def160': {
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
