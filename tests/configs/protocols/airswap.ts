import { AirswapConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { AirswapAdapter } from '../../../modules/adapters/airswap/airswap';
import { TestLog } from '../../types';

export const AirswapActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x39eb3cbe75fececd5ef1436cde63fc1673f9b77dbb77aff9949bf6b240ff4661',
    sender: normalizeAddress('0xeea0fbfa6684a9294f267321cfb2b25ca85f7a73'),
    address: normalizeAddress('0x522d6f36c95a1b6509a14272c17747bbb582f2a6'),
    log: {
      address: '0x522d6f36c95a1b6509a14272c17747bbb582f2a6',
      topics: [
        '0x06dfeb25e76d44e08965b639a9d9307df8e1c3dbe2a6364194895e9c3992f033',
        '0x000000000000000000000000000000000000000000000000000000006469e87c',
        '0x000000000000000000000000111bb8c3542f2b92fb41b8d913c01d3788431111',
        '0x00000000000000000000000074de5d4fcbf63e00296fd95d33236b9794016631',
      ],
      data: '0x000000000000000000000000000000000000000000000000000000006469e893000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000e1f416fa43a9ff80000000000000000000000000000000000000000000000000000000000000007000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000000000000000000000000000000000006e44c280',
      blockNumber: '0x1081547',
      transactionHash: '0x8a9f065fd56c21142089524affa056b830a0d96436bbad6962c06c737b575ade',
      transactionIndex: '0xcb',
      blockHash: '0xb710d5694fc47f16585046d1ddf95307debcab67da1e5ad3694893c45a762e8c',
      logIndex: '0x14e',
      removed: false,
    },
    adapter: new AirswapAdapter(AirswapConfigs, null),
    action: 'trade',
  },
];
