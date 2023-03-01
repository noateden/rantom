import { OptimismConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { OptimismAdapter } from '../../../modules/adapters/optimism/optimism';
import { TestLog } from '../../types';

export const OptimismActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x1402a1735fe9519df345ea8dffe53fea35b8c1c2fd266e57b8f66e0e60e6af50',
    sender: normalizeAddress('0x6887246668a3b87f54deb3b94ba47a6f63f32985'),
    address: normalizeAddress('0x5e4e65926ba27467555eb562121fac00d24e9dd2'),
    log: {
      address: '0x5e4e65926ba27467555eb562121fac00d24e9dd2',
      topics: ['0x602f1aeac0ca2e7a13e281a9ef0ad7838542712ce16780fa2ecffd351f05f899'],
      data: '0x0000000000000000000000000000000000000000000000000000000000048c780000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000481d3b6',
      blockNumber: '0xfe63eb',
      transactionHash: '0x1402a1735fe9519df345ea8dffe53fea35b8c1c2fd266e57b8f66e0e60e6af50',
      transactionIndex: '0x88',
      blockHash: '0x3708447174e5b29997f530f7f2d9648c9b9937e6f303edc9f6f2b223d603d8ac',
      logIndex: '0x12c',
      removed: false,
    },
    adapter: new OptimismAdapter(OptimismConfigs, null),
    action: 'update',
  },
];
