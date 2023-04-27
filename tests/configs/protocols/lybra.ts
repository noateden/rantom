import { LybraConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { LybraAdapter } from '../../../modules/adapters/lybra/lybra';
import { TestLog } from '../../types';

export const LybraActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x4eaa201471c4fae4f6995eea75e0fc938121d07d8a6fc61cb0ce30963b8f0ff3',
    sender: normalizeAddress('0xf6c9ad1a792e594ec462fe061364581d85e4d8bc'),
    address: normalizeAddress('0x97de57ec338ab5d51557da3434828c5dbfada371'),
    log: {
      address: '0x97de57ec338ab5d51557da3434828c5dbfada371',
      topics: [
        '0x819557bb6c528588eb5c050cf4dd54b96956b6f93a5232c6b429d19e95fe8e89',
        '0x000000000000000000000000f6c9ad1a792e594ec462fe061364581d85e4d8bc',
      ],
      data: '0x000000000000000000000000f6c9ad1a792e594ec462fe061364581d85e4d8bc0000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000000000644aa433',
      blockNumber: '0x105842d',
      transactionHash: '0x4eaa201471c4fae4f6995eea75e0fc938121d07d8a6fc61cb0ce30963b8f0ff3',
      transactionIndex: '0x6d',
      blockHash: '0xbbec91bc42d54320c6b63e59f17bbb6a34cfaae7a7f52aad559957fa9861e47c',
      logIndex: '0xff',
      removed: false,
    },
    adapter: new LybraAdapter(LybraConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x9bce543608dc00b55786b7b027b065e032067e5fb6364c2d874b0cf18d84f15a',
    sender: normalizeAddress('0xef764bac8a438e7e498c2e5fccf0f174c3e3f8db'),
    address: normalizeAddress('0x97de57ec338ab5d51557da3434828c5dbfada371'),
    log: {
      address: '0x97de57ec338ab5d51557da3434828c5dbfada371',
      topics: [
        '0x7af7d9e5b71152303ff7a5221e1a22febc3cf6407ea2a05f870d770097177db0',
        '0x000000000000000000000000ef764bac8a438e7e498c2e5fccf0f174c3e3f8db',
      ],
      data: '0x000000000000000000000000ef764bac8a438e7e498c2e5fccf0f174c3e3f8db0000000000000000000000000000000000000000000000025a38225ec7a2800000000000000000000000000000000000000000000000000000000000644a6917',
      blockNumber: '0x1057f4c',
      transactionHash: '0x9bce543608dc00b55786b7b027b065e032067e5fb6364c2d874b0cf18d84f15a',
      transactionIndex: '0x43',
      blockHash: '0x63cee406b131cdc4454d7a7667b1d821cd427491d7b9cf55142526086d12df68',
      logIndex: '0x7b',
      removed: false,
    },
    adapter: new LybraAdapter(LybraConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0x4eaa201471c4fae4f6995eea75e0fc938121d07d8a6fc61cb0ce30963b8f0ff3',
    sender: normalizeAddress('0xf6c9ad1a792e594ec462fe061364581d85e4d8bc'),
    address: normalizeAddress('0x97de57ec338ab5d51557da3434828c5dbfada371'),
    log: {
      address: '0x97de57ec338ab5d51557da3434828c5dbfada371',
      topics: [
        '0x2f00e3cdd69a77be7ed215ec7b2a36784dd158f921fca79ac29deffa353fe6ee',
        '0x000000000000000000000000f6c9ad1a792e594ec462fe061364581d85e4d8bc',
      ],
      data: '0x000000000000000000000000f6c9ad1a792e594ec462fe061364581d85e4d8bc00000000000000000000000000000000000000000000152d02c7e14af680000000000000000000000000000000000000000000000000000000000000644aa433',
      blockNumber: '0x105842d',
      transactionHash: '0x4eaa201471c4fae4f6995eea75e0fc938121d07d8a6fc61cb0ce30963b8f0ff3',
      transactionIndex: '0x6d',
      blockHash: '0xbbec91bc42d54320c6b63e59f17bbb6a34cfaae7a7f52aad559957fa9861e47c',
      logIndex: '0xfe',
      removed: false,
    },
    adapter: new LybraAdapter(LybraConfigs, null),
    action: 'borrow',
  },
  {
    chain: 'ethereum',
    hash: '0x3e9e8073792cfba64fe7e327abfbb008d085f3e317df4421b3ad9bb73bcd7613',
    sender: normalizeAddress('0xef764bac8a438e7e498c2e5fccf0f174c3e3f8db'),
    address: normalizeAddress('0x97de57ec338ab5d51557da3434828c5dbfada371'),
    log: {
      address: '0x97de57ec338ab5d51557da3434828c5dbfada371',
      topics: [
        '0x5d624aa9c148153ab3446c1b154f660ee7701e549fe9b62dab7171b1c80e6fa2',
        '0x000000000000000000000000ef764bac8a438e7e498c2e5fccf0f174c3e3f8db',
      ],
      data: '0x000000000000000000000000ef764bac8a438e7e498c2e5fccf0f174c3e3f8db000000000000000000000000000000000000000000007f0e10af47c1c700000000000000000000000000000000000000000000000000000000000000644a69fb',
      blockNumber: '0x1057f5f',
      transactionHash: '0x3e9e8073792cfba64fe7e327abfbb008d085f3e317df4421b3ad9bb73bcd7613',
      transactionIndex: '0x6b',
      blockHash: '0xbfedded6be9bf80a491f3211c70d2ca8c7706e4789b7d9c0047b9e5a793ac883',
      logIndex: '0x102',
      removed: false,
    },
    adapter: new LybraAdapter(LybraConfigs, null),
    action: 'repay',
  },
];
