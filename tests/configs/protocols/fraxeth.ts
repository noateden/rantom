import { FraxethConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { FraxethAdapter } from '../../../modules/adapters/fraxeth/fraxeth';
import { TestLog } from '../../types';

export const FraxethActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xc83894ab7b8cd36cf6f609dae1c9c4386b84d42e675b152ca724fcf0117dad73',
    sender: normalizeAddress('0x5f55059a1bd5598053a2127d5f642ecd3a68eb3c'),
    address: normalizeAddress('0xbafa44efe7901e04e39dad13167d089c559c1138'),
    log: {
      address: '0xbafa44efe7901e04e39dad13167d089c559c1138',
      topics: [
        '0x29b3e86ecfd94a32218997c40b051e650e4fd8c97fc7a4d266be3f7c61c5205b',
        '0x0000000000000000000000005f55059a1bd5598053a2127d5f642ecd3a68eb3c',
        '0x000000000000000000000000bafa44efe7901e04e39dad13167d089c559c1138',
      ],
      data: '0x000000000000000000000000000000000000000000000001158e460913d000000000000000000000000000000000000000000000000000001bc16d674ec80000',
      blockNumber: '0x10480d6',
      transactionHash: '0xc83894ab7b8cd36cf6f609dae1c9c4386b84d42e675b152ca724fcf0117dad73',
      transactionIndex: '0x7a',
      blockHash: '0x43b94e0e397771367928565f7221ec0f6220edda8140d96c962cc587e24ff46b',
      logIndex: '0x101',
      removed: false,
    },
    adapter: new FraxethAdapter(FraxethConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x586e291de6bc6c67e87410a2c1e34a3af9cd67d6d669d7bbde336e97220ae145',
    sender: normalizeAddress('0xb4415d57a7fae42d2f7074e3f9cbe161cba1bb7f'),
    address: normalizeAddress('0xac3e018457b222d93114458476f3e3416abbe38f'),
    log: {
      address: '0xac3e018457b222d93114458476f3e3416abbe38f',
      topics: [
        '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
        '0x000000000000000000000000b4415d57a7fae42d2f7074e3f9cbe161cba1bb7f',
        '0x000000000000000000000000b4415d57a7fae42d2f7074e3f9cbe161cba1bb7f',
      ],
      data: '0x000000000000000000000000000000000000000000000000bea36917f3777000000000000000000000000000000000000000000000000000b8479b29226745d0',
      blockNumber: '0x104819a',
      transactionHash: '0x586e291de6bc6c67e87410a2c1e34a3af9cd67d6d669d7bbde336e97220ae145',
      transactionIndex: '0x52',
      blockHash: '0x95681cfc61a5abc696a38648ebee8796f9c7e2c776213bb067039aab6c079920',
      logIndex: '0x9c',
      removed: false,
    },
    adapter: new FraxethAdapter(FraxethConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x914ffa3c07435299e6a697435470900db0fbdf381f18529866c7f8d070e0488e',
    sender: normalizeAddress('0xa10c651a39b7e4867317e53c33f992817b1aa298'),
    address: normalizeAddress('0xac3e018457b222d93114458476f3e3416abbe38f'),
    log: {
      address: '0xac3e018457b222d93114458476f3e3416abbe38f',
      topics: [
        '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db',
        '0x000000000000000000000000a10c651a39b7e4867317e53c33f992817b1aa298',
        '0x000000000000000000000000a10c651a39b7e4867317e53c33f992817b1aa298',
        '0x000000000000000000000000a10c651a39b7e4867317e53c33f992817b1aa298',
      ],
      data: '0x00000000000000000000000000000000000000000000000029a400a6b612e63c000000000000000000000000000000000000000000000000284091cb74f0f598',
      blockNumber: '0x1047f13',
      transactionHash: '0x914ffa3c07435299e6a697435470900db0fbdf381f18529866c7f8d070e0488e',
      transactionIndex: '0x50',
      blockHash: '0xbfe44f1e467469611958d77d35ffca9daf3fc37c70233757b20a5a9c0b4c8feb',
      logIndex: '0xd0',
      removed: false,
    },
    adapter: new FraxethAdapter(FraxethConfigs, null),
    action: 'withdraw',
  },
];
