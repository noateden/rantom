import { KyberswapAggregatorConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { KyberswapAggregatorAdapter } from '../../../modules/adapters/kyberswap/kyberswap';
import { TestLog } from '../../types';

export const KyberswapActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x65268fe9c582536841b4a01d0674ed49414e62120fda8b681ef4724b00739eff',
    sender: normalizeAddress('0xd4cf19f76addb489d079d0f60f41d6e91e7c79e1'),
    address: normalizeAddress('0x6131b5fae19ea4f9d964eac0408e4408b66337b5'),
    log: {
      address: '0x6131b5fae19ea4f9d964eac0408e4408b66337b5',
      topics: ['0xd6d4f5681c246c9f42c203e287975af1601f8df8035a9251f79aab5c8f09e2f8'],
      data: '0x000000000000000000000000d4cf19f76addb489d079d0f60f41d6e91e7c79e1000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000a589d8868607b8d79ee4288ce192796051263b64000000000000000000000000d4cf19f76addb489d079d0f60f41d6e91e7c79e10000000000000000000000000000000000000000000000000588d27cb06d00000000000000000000000000000000000000000000f139ecf463925b5326b46d9e',
      blockNumber: '0x1057642',
      transactionHash: '0x65268fe9c582536841b4a01d0674ed49414e62120fda8b681ef4724b00739eff',
      transactionIndex: '0x30',
      blockHash: '0x8c140e76b5ac0dcf4b5b17aedb6ec8c5e9a2c23b23dda18f6d507e58c386b779',
      logIndex: '0x44',
      removed: false,
    },
    adapter: new KyberswapAggregatorAdapter(KyberswapAggregatorConfigs, null),
    action: 'trade',
  },
];
