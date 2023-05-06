import { YearnConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { YearnAdapter } from '../../../modules/adapters/yearn/yearn';
import { TestLog } from '../../types';

export const YearnActionTestLogs: Array<TestLog> = [
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
  {
    chain: 'ethereum',
    hash: '0xcf6eb347fffb192a7a12c5a8c6fd0b2286f7988b4797c0ddd86b56c04f39561e',
    sender: normalizeAddress('0xe7e171bc5962139e6e95f012bd8d62b74492f144'),
    address: normalizeAddress('0x90c1f9220d90d3966fbee24045edd73e1d588ad5'),
    log: {
      address: '0x90c1f9220d90d3966fbee24045edd73e1d588ad5',
      topics: [
        '0x01affbd18fb24fa23763acc978a6bb9b9cd159b1cc733a15f3ea571d691cabc1',
        '0x000000000000000000000000e7e171bc5962139e6e95f012bd8d62b74492f144',
        '0x000000000000000000000000e7e171bc5962139e6e95f012bd8d62b74492f144',
      ],
      data: '0x0000000000000000000000000000000000000000000000002b04050212ba0c0000000000000000000000000000000000000000000000000000000000645c300000000000000000000000000000000000000000000000000000000000645210d7',
      blockNumber: '0x10620b0',
      transactionHash: '0xcf6eb347fffb192a7a12c5a8c6fd0b2286f7988b4797c0ddd86b56c04f39561e',
      transactionIndex: '0x7f',
      blockHash: '0x4938b12c195300e9f0f89921394f7c5dbcae35a2a7b27dcedb7e1b4a01593f8f',
      logIndex: '0x141',
      removed: false,
    },
    adapter: new YearnAdapter(YearnConfigs, null),
    action: 'lock',
  },
  {
    chain: 'ethereum',
    hash: '0x516a249d1d5a150e9e330c5210ccb0c5be26959dc268dd6fb928bc72d9657221',
    sender: normalizeAddress('0xc059f4c46d8a35fc62d1b156c4bc41187e91ea11'),
    address: normalizeAddress('0x90c1f9220d90d3966fbee24045edd73e1d588ad5'),
    log: {
      address: '0x90c1f9220d90d3966fbee24045edd73e1d588ad5',
      topics: [
        '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568',
        '0x000000000000000000000000c059f4c46d8a35fc62d1b156c4bc41187e91ea11',
      ],
      data: '0x0000000000000000000000000000000000000000000000000e2619f85420900000000000000000000000000000000000000000000000000000000000644f04d7',
      blockNumber: '0x105e07e',
      transactionHash: '0x516a249d1d5a150e9e330c5210ccb0c5be26959dc268dd6fb928bc72d9657221',
      transactionIndex: '0x4c',
      blockHash: '0x6d5d50b291d3f522bc42f2cb344cbbbc5f027048b66817c09a80f2b84e033678',
      logIndex: '0xf4',
      removed: false,
    },
    adapter: new YearnAdapter(YearnConfigs, null),
    action: 'unlock',
  },
];
