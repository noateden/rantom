import { DodoConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { DodoAdapter } from '../../../modules/adapters/dodo/dodo';
import { TestLog } from '../../types';

export const DodoActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x11233f8ad27b0fbeea44d2d02ba54f69861763ebcd0bda2fe3e538d95aa47d19',
    sender: normalizeAddress('0x49918f3b90320bef1f20d874944f1d1ae549403d'),
    address: normalizeAddress('0xa2398842f37465f89540430bdc00219fa9e4d28a'),
    log: {
      address: '0xa2398842f37465f89540430bdc00219fa9e4d28a',
      topics: ['0x92ceb067a9883c85aba061e46b9edf505a0d6e81927c4b966ebed543a5221787'],
      data: '0x000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000049918f3b90320bef1f20d874944f1d1ae549403d00000000000000000000000000000000000000000000000000005af3107a400000000000000000000000000000000000000000000000000000000000000377ed',
      blockNumber: '0x1058b56',
      transactionHash: '0x11233f8ad27b0fbeea44d2d02ba54f69861763ebcd0bda2fe3e538d95aa47d19',
      transactionIndex: '0xb',
      blockHash: '0x217aa764f62a6695296e277bd032bd154be9cb6e7e5ae22d692a55d9758fa52e',
      logIndex: '0xca',
      removed: false,
    },
    adapter: new DodoAdapter(DodoConfigs, null),
    action: 'trade',
  },
];
