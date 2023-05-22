import { BungeeConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { BungeeAdapter } from '../../../modules/adapters/bungee/bungee';
import { TestLog } from '../../types';

export const BungeeActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xe7cbfcbc0299f18190c08eafccc639dcbd8a4190bcc550c1b32d74bfa2b9421d',
    sender: normalizeAddress('0x8d7bbfa0506ea95c73d864310818acc3e5fa05d9'),
    address: normalizeAddress('0x3a23f943181408eac424116af7b7790c94cb97a5'),
    log: {
      address: '0x3a23f943181408eac424116af7b7790c94cb97a5',
      topics: ['0x74594da9e31ee4068e17809037db37db496702bf7d8d63afe6f97949277d1609'],
      data: '0x00000000000000000000000000000000000000000000000002c053531ab8a000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000089837ed841e30438f54fb6b0097c30a5c4f64b47545c3df655bcd6e44bb8991e37000000000000000000000000e6e3f947ccd0add1effde3bf3d210e5d711beace0000000000000000000000008d7bbfa0506ea95c73d864310818acc3e5fa05d900000000000000000000000000000000000000000000000000000000000000c4',
      blockNumber: '0x1083a8d',
      transactionHash: '0xe7cbfcbc0299f18190c08eafccc639dcbd8a4190bcc550c1b32d74bfa2b9421d',
      transactionIndex: '0xb9',
      blockHash: '0x021441f1fcbb4c49711fbbde9ac01e977e489ca01e4c76bc4e468d0ca3098ef0',
      logIndex: '0x152',
      removed: false,
    },
    adapter: new BungeeAdapter(BungeeConfigs, null),
    action: 'bridge',
  },
];
