import { GelatoConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { GelatoAdapter } from '../../../modules/adapters/gelato/gelato';
import { TestLog } from '../../types';

export const GelatoActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x345106dcdcd526e2e98a8b3b07e940ef50ef09f13654ce7a67e77051da746183',
    sender: normalizeAddress('0xda81a723e748c782284bbb06ab74e3d0a9dbbc77'),
    address: normalizeAddress('0x3caca7b48d0573d793d3b0279b5f0029180e83b6'),
    log: {
      address: '0x3caca7b48d0573d793d3b0279b5f0029180e83b6',
      topics: [
        '0x66c4011e59db1d425e14edc51069e4f5ec3d042d2a254511a8dbc6e3996c9140',
        '0x000000000000000000000000da81a723e748c782284bbb06ab74e3d0a9dbbc77',
        '0x0000000000000000000000000a7d53ff9c56a3bd6a4a369f14ba3ba523b3013e',
      ],
      data: '0x000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000000551625d4e4c2c9000000000000000000000000000000000000000000000000003de7287d8f08c0000000000000000000000000000000000000000000000000003de7287d8f08c0',
      blockNumber: '0x10e48c3',
      transactionHash: '0x345106dcdcd526e2e98a8b3b07e940ef50ef09f13654ce7a67e77051da746183',
      transactionIndex: '0x6',
      blockHash: '0xbc6d43ba0573e0b7b97cd828753d47f91f652ace905a306ec9d428fce0979063',
      logIndex: '0x31',
      removed: false,
    },
    adapter: new GelatoAdapter(GelatoConfigs, null),
    action: 'executeTask',
  },
];
