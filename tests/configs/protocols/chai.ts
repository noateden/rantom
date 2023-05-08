import { ChaiConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { ChaiAdapter } from '../../../modules/adapters/chai/chai';
import { TestLog } from '../../types';

export const ChaiActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x43e5bee82cadb31a06e73c003022312f41848b420b9716a7759abae97f0cacd1',
    sender: normalizeAddress('0x31b43508ae97f6cf5309e1a54966ebe15c28768c'),
    address: normalizeAddress('0x06af07097c9eeb7fd685c692751d5c66db49c215'),
    log: {
      address: '0x06af07097c9eeb7fd685c692751d5c66db49c215',
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '0x000000000000000000000000b1bd5762faf7d6f86f965a3ff324bd81bb746d00',
      ],
      data: '0x000000000000000000000000000000000000000000040bd10144bfc00c6a336f',
      blockNumber: '0x1066b76',
      transactionHash: '0x43e5bee82cadb31a06e73c003022312f41848b420b9716a7759abae97f0cacd1',
      transactionIndex: '0x39',
      blockHash: '0x8a4174d1daf1157c1b82f6f4ceb90e984c56c44cb09b7b85ef6ea624401929ec',
      logIndex: '0x9a',
      removed: false,
    },
    adapter: new ChaiAdapter(ChaiConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0xfab5e43baf2d5fd812dfdb804d3f414a441fc84bed57716f42aeb3bc9acdb35a',
    sender: normalizeAddress('0xf0d919bf7cd8a631fb8261efd4e8ff7631e27825'),
    address: normalizeAddress('0x06af07097c9eeb7fd685c692751d5c66db49c215'),
    log: {
      address: '0x06af07097c9eeb7fd685c692751d5c66db49c215',
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x000000000000000000000000f0d919bf7cd8a631fb8261efd4e8ff7631e27825',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
      data: '0x0000000000000000000000000000000000000000000000008ac7230489e80000',
      blockNumber: '0x1042e59',
      transactionHash: '0xfab5e43baf2d5fd812dfdb804d3f414a441fc84bed57716f42aeb3bc9acdb35a',
      transactionIndex: '0x27',
      blockHash: '0x9de75a196836bc63ffbb57962c326b30b9df38bd9fc7366156df1029efad53e2',
      logIndex: '0x43',
      removed: false,
    },
    adapter: new ChaiAdapter(ChaiConfigs, null),
    action: 'withdraw',
  },
];
