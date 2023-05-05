import { YearnConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { YearnAdapter } from '../../../modules/adapters/yearn/yearn';
import { TestLog } from '../../types';

export const YearnActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xec46577a958e1ccebc8089bf1e38e37c7e242321538e4f4b923863b7d1c673c1',
    sender: normalizeAddress('0x11c9ac11ce9913e26faa7a9ee5b07c92b0c8c372'),
    address: normalizeAddress('0xf614d3864ef53510909a94c618a5ec1ff75103bf'),
    log: {
      address: '0xf614d3864ef53510909a94c618a5ec1ff75103bf',
      topics: [
        '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15',
        '0x00000000000000000000000011c9ac11ce9913e26faa7a9ee5b07c92b0c8c372',
      ],
      data: '0x0000000000000000000000000000000000000000000000006eafabea77c06d3b0000000000000000000000000000000000000000000000006eafabea77c06d3b',
      blockNumber: '0x100bb39',
      transactionHash: '0xec46577a958e1ccebc8089bf1e38e37c7e242321538e4f4b923863b7d1c673c1',
      transactionIndex: '0xa2',
      blockHash: '0x77df62ba6c18fc0d792137bed4097dd656dbad47d1424a928c57f09972e521be',
      logIndex: '0x102',
      removed: false,
    },
    adapter: new YearnAdapter(YearnConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x81d5ae520852675d7acb947ea0c35b0fc7c012600625f8d08b15230ef74f7918',
    sender: normalizeAddress('0x4837b18bd0cf3356779bbe6f2f641786755979f0'),
    address: normalizeAddress('0xf614d3864ef53510909a94c618a5ec1ff75103bf'),
    log: {
      address: '0xf614d3864ef53510909a94c618a5ec1ff75103bf',
      topics: [
        '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568',
        '0x0000000000000000000000004837b18bd0cf3356779bbe6f2f641786755979f0',
      ],
      data: '0x000000000000000000000000000000000000000000000000066ea7902cbfa6a5000000000000000000000000000000000000000000000000066ea7902cbfa6a5',
      blockNumber: '0x1007741',
      transactionHash: '0x81d5ae520852675d7acb947ea0c35b0fc7c012600625f8d08b15230ef74f7918',
      transactionIndex: '0x62',
      blockHash: '0xfd29b7b069d6079acde3d83719ed01c28065d6a21718257889325e13819cbc5c',
      logIndex: '0xd1',
      removed: false,
    },
    adapter: new YearnAdapter(YearnConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0x45196d7a4744344cfd90796cb13fd9b13189b1bb39d2fe19f1753e3e48851e4c',
    sender: normalizeAddress('0x4201a38615ec7d1f57df6143e7a7ed82dd7a8ee4'),
    address: normalizeAddress('0xa258c4606ca8206d8aa700ce2143d7db854d168c'),
    log: {
      address: '0xa258c4606ca8206d8aa700ce2143d7db854d168c',
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '0x0000000000000000000000004201a38615ec7d1f57df6143e7a7ed82dd7a8ee4',
      ],
      data: '0x000000000000000000000000000000000000000000000000431469e4ba1e1209',
      blockNumber: '0x1066594',
      transactionHash: '0x45196d7a4744344cfd90796cb13fd9b13189b1bb39d2fe19f1753e3e48851e4c',
      transactionIndex: '0x47',
      blockHash: '0xa24bd0dd5eb22f786a3d7cf6e369ee8c279d1dd7ffcabcc86a9f61ae402bcde8',
      logIndex: '0x8f',
      removed: false,
    },
    adapter: new YearnAdapter(YearnConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0xf4edb419876d8aa412b72860177180c08605dbea1fde2d34b0278947c2f5cddf',
    sender: normalizeAddress('0x31516ca621cada3dfaec38ed85c831e46ece93e8'),
    address: normalizeAddress('0xa258c4606ca8206d8aa700ce2143d7db854d168c'),
    log: {
      address: '0xa258c4606ca8206d8aa700ce2143d7db854d168c',
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x00000000000000000000000031516ca621cada3dfaec38ed85c831e46ece93e8',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
      data: '0x0000000000000000000000000000000000000000000000004563918244f40000',
      blockNumber: '0x106610e',
      transactionHash: '0xf4edb419876d8aa412b72860177180c08605dbea1fde2d34b0278947c2f5cddf',
      transactionIndex: '0xa2',
      blockHash: '0xc8a6277b165263e993041407b05a9732b4e1f1be2a76dc35913ecd9b8425270b',
      logIndex: '0x14f',
      removed: false,
    },
    adapter: new YearnAdapter(YearnConfigs, null),
    action: 'withdraw',
  },
];
