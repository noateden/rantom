import { ParaswapConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { ParaswapAdapter } from '../../../modules/adapters/paraswap/paraswap';
import { TestLog } from '../../types';

export const ParaswapActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xedd7375331b89cb9376f2776bdddbb0795ce42884c553a81842c0226d43b62c9',
    sender: normalizeAddress('0x0edefa91e99da1eddd1372c1743a63b1595fc413'),
    address: normalizeAddress('0xdef171fe48cf0115b1d80b88dc8eab59176fee57'),
    log: {
      address: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
      topics: [
        '0x974dd0442e0b8c00fdbaae504edea1412d63bc110294a98b3c61ddcd0e703aa8',
        '0x0000000000000000000000000edefa91e99da1eddd1372c1743a63b1595fc413',
        '0x0000000000000000000000004e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
        '0x000000000000000000000000cafe001067cdef266afb7eb5a286dcfd277f3de5',
      ],
      data: '0xeda9dcb5a6cd49b68d10a41c3b07861100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000040000000000000000000000000000edefa91e99da1eddd1372c1743a63b1595fc41300000000000000000000000000000000000000000000000fe4b103a940d939ab0000000000000000000000000000000000000000000008f58845e4568db073770000000000000000000000000000000000000000000008f58845e4568db07377',
      blockNumber: '0xe460ea',
      transactionHash: '0xedd7375331b89cb9376f2776bdddbb0795ce42884c553a81842c0226d43b62c9',
      transactionIndex: '0x4b',
      blockHash: '0x15a99f36c87da00e7712d38ae9a4af4563120ef990ad630914b8c0ab680e0ad9',
      logIndex: '0xdb',
      removed: false,
    },
    adapter: new ParaswapAdapter(ParaswapConfigs, null),
    action: 'trade',
  },
];
