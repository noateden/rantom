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
  {
    chain: 'ethereum',
    hash: '0xdd23cbe8ef08d409267d3dbdc03eb79c07eae953e47b82ed5f9bc44cc7461ab3',
    sender: normalizeAddress('0x7d729e4194dc9944753e5d0c36845653f6c5ea13'),
    address: normalizeAddress('0x4572f2554421bd64bef1c22c8a81840e8d496bea'),
    log: {
      address: '0x4572f2554421bd64bef1c22c8a81840e8d496bea',
      topics: [
        '0xd5fe17cd50e0d3d39b905ea598bbabccf2f8cda62a3b2fc64e09de00247a4724',
        '0x0000000000000000000000000000000000000000000000000000018815924231',
        '0x000000000000000000000000d4b69e8d62c880e9dd55d419d5e07435c3538342',
        '0x0000000000000000000000007d729e4194dc9944753e5d0c36845653f6c5ea13',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000645fa5bf00000000000000000000000000000000000000000000000000000062f3f95a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000002e5276153cd3fb38000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d38bb40815d2b0c2d2c866e0c72c5728ffc76dd9000000000000000000000000ff98f0052bda391f8fad266685609ffb192bef25000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0x1073dd2',
      transactionHash: '0xdd23cbe8ef08d409267d3dbdc03eb79c07eae953e47b82ed5f9bc44cc7461ab3',
      transactionIndex: '0x4',
      blockHash: '0x78d2c847da3ee4992c35a0c2165002f715ccdf26f78694353612d607ace94e41',
      logIndex: '0x16',
      removed: false,
    },
    adapter: new AirswapAdapter(AirswapConfigs, null),
    action: 'trade',
  },
];
