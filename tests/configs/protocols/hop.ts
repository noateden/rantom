import { HopConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { HopAdapter } from '../../../modules/adapters/hop/hop';
import { TestLog } from '../../types';

export const HopActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xb904591eeabbef1575eb3fe64f1681ae1bb60643017241139c96517c9d26e1ac',
    sender: normalizeAddress('0xe1f0da1b238db9cb3e51bca447f1210c7134277d'),
    address: normalizeAddress('0x3666f603cc164936c1b87e207f36beba4ac5f18a'),
    log: {
      address: '0x3666f603cc164936c1b87e207f36beba4ac5f18a',
      topics: [
        '0x0a0607688c86ec1775abcdbab7b33a3a35a6c9cde677c9be880150c231cc6b0b',
        '0x000000000000000000000000000000000000000000000000000000000000000a',
        '0x000000000000000000000000e1f0da1b238db9cb3e51bca447f1210c7134277d',
        '0x000000000000000000000000a6a688f107851131f0e1dce493ebbebfaf99203e',
      ],
      data: '0x000000000000000000000000000000000000000000000000000000012f727ec0000000000000000000000000000000000000000000000000000000012daad0bc0000000000000000000000000000000000000000000000000000000063fd73b20000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0xfe6d8a',
      transactionHash: '0xb904591eeabbef1575eb3fe64f1681ae1bb60643017241139c96517c9d26e1ac',
      transactionIndex: '0x5e',
      blockHash: '0xed21bad006761e5ea29c73ea64b1a3c8535feeec7d08142b8d4939a96a958768',
      logIndex: '0xba',
      removed: false,
    },
    adapter: new HopAdapter(HopConfigs, null),
    action: 'bridge',
  },
];
