import { BeanstalkConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { BeanstalkAdapter } from '../../../modules/adapters/beanstalk/beanstalk';
import { TestLog } from '../../types';

export const BeanstalkActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xc2d2422abc2daa4d10683579f863785de6dab59c521d26dc687dd344c7941c5f',
    sender: normalizeAddress('0x8191a2e4721ca4f2f4533c3c12b628f141ff2c19'),
    address: normalizeAddress('0xc1e088fc1323b20bcbee9bd1b9fc9546db5624c5'),
    log: {
      address: '0xc1e088fc1323b20bcbee9bd1b9fc9546db5624c5',
      topics: [
        '0xdbe49eaf5c2a8a7f65920c200ca5d47395540b884f6a1886fdb2611624f9981b',
        '0x0000000000000000000000008191a2e4721ca4f2f4533c3c12b628f141ff2c19',
        '0x0000000000000000000000001bea0050e63e05fbb5d8ba2f10cf5800b6224449',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000000017ac0000000000000000000000000000000000000000000000000000000000332ed900000000000000000000000000000000000000000000000000000000000b6487',
      blockNumber: '0xfe758e',
      transactionHash: '0xc2d2422abc2daa4d10683579f863785de6dab59c521d26dc687dd344c7941c5f',
      transactionIndex: '0x74',
      blockHash: '0xa9c6b0f40f662d6ed85181b8dd5be5badd20548315e03ed526baf50d1e187571',
      logIndex: '0xf5',
      removed: false,
    },
    adapter: new BeanstalkAdapter(BeanstalkConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x260eaee803502eea1946faf06c34fb795aa1bd06c326bf673191c3301e12c493',
    sender: normalizeAddress('0xe1e98eae1e00e692d77060237002a519e7e60b60'),
    address: normalizeAddress('0xc1e088fc1323b20bcbee9bd1b9fc9546db5624c5'),
    log: {
      address: '0xc1e088fc1323b20bcbee9bd1b9fc9546db5624c5',
      topics: [
        '0xad946216d2715ed9b769178b59b5bd1b1ee3a1ef3adbe82f17d30617109e96f3',
        '0x000000000000000000000000e1e98eae1e00e692d77060237002a519e7e60b60',
        '0x000000000000000000000000bea0000029ad1c77d3d5d23ba2d8893db9d1efab',
      ],
      data: '0x0000000000000000000000000000000000000000000000000000000000002a5900000000000000000000000000000000000000000000000000000001a13b8600',
      blockNumber: '0xfe716d',
      transactionHash: '0x260eaee803502eea1946faf06c34fb795aa1bd06c326bf673191c3301e12c493',
      transactionIndex: '0x40',
      blockHash: '0x4b9dfe882601e2ffd73f1a6d2b58657075d133c6e23be795401eee27a7ac64f6',
      logIndex: '0x53',
      removed: false,
    },
    adapter: new BeanstalkAdapter(BeanstalkConfigs, null),
    action: 'withdraw',
  },
];
