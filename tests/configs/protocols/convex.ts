import { ConvexConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { ConvexAdapter } from '../../../modules/adapters/convex/convex';
import { TestLog } from '../../types';

export const ConvexActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xfa655d94abe291231fc1936627399c759524089982ca5a9c1fecb3cce5f6b2d9',
    sender: normalizeAddress('0x996051216c33fd54c4602675810ff5b52b3cf8ff'),
    address: normalizeAddress('0xf403c135812408bfbe8713b5a23a04b3d48aae31'),
    log: {
      address: '0xf403c135812408bfbe8713b5a23a04b3d48aae31',
      topics: [
        '0x73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca',
        '0x000000000000000000000000996051216c33fd54c4602675810ff5b52b3cf8ff',
        '0x000000000000000000000000000000000000000000000000000000000000007c',
      ],
      data: '0x00000000000000000000000000000000000000000000003bb18178bd69366f91',
      blockNumber: '0x1016109',
      transactionHash: '0xfa655d94abe291231fc1936627399c759524089982ca5a9c1fecb3cce5f6b2d9',
      transactionIndex: '0x6c',
      blockHash: '0xd2ce6f9e3db6fbf53c5a40e8b604b3e4b23844973a04bc4db94485445f94d232',
      logIndex: '0xcb',
      removed: false,
    },
    adapter: new ConvexAdapter(ConvexConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x0d887a98163954da7eabdf6ddb1a92595a4257b441c33ab14f186e2ca19a85f2',
    sender: normalizeAddress('0x996051216c33fd54c4602675810ff5b52b3cf8ff'),
    address: normalizeAddress('0xf403c135812408bfbe8713b5a23a04b3d48aae31'),
    log: {
      address: '',
      topics: [
        '0x92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc6',
        '0x000000000000000000000000996051216c33fd54c4602675810ff5b52b3cf8ff',
        '0x000000000000000000000000000000000000000000000000000000000000001f',
      ],
      data: '0x000000000000000000000000000000000000000000002cd989b89cb46ed980fa',
      blockNumber: '0x1016113',
      transactionHash: '0x0d887a98163954da7eabdf6ddb1a92595a4257b441c33ab14f186e2ca19a85f2',
      transactionIndex: '0x68',
      blockHash: '0x0bebbedb41cc6b6af43eacba42f9d7d71bfd5667f477a855af01e501473431d9',
      logIndex: '0xe3',
      removed: false,
    },
    adapter: new ConvexAdapter(ConvexConfigs, null),
    action: 'withdraw',
  },
];
