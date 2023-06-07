import { CrvusdConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { CrvusdAdapter } from '../../../modules/adapters/crvusd/crvusd';
import { TestLog } from '../../types';

export const CrvusdActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x596445afb3f8075c6f39622d1f13dbf4ed2897fc3b9036a5ade106c1edbfd456',
    sender: normalizeAddress('0x5bb967a3b3e2eb96487d23f3bf281c38f91abc8a'),
    address: normalizeAddress('0x8472a9a7632b173c8cf3a86d3afec50c35548e76'),
    log: {
      address: '0x8472a9a7632b173c8cf3a86d3afec50c35548e76',
      topics: [
        '0xe1979fe4c35e0cef342fef5668e2c8e7a7e9f5d5d1ca8fee0ac6c427fa4153af',
        '0x0000000000000000000000005bb967a3b3e2eb96487d23f3bf281c38f91abc8a',
      ],
      data: '0x0000000000000000000000000000000000000000000000000d2f9814110fae70000000000000000000000000000000000000000000000057137e35ac24981a3b',
      blockNumber: '0x109dfd7',
      transactionHash: '0x596445afb3f8075c6f39622d1f13dbf4ed2897fc3b9036a5ade106c1edbfd456',
      transactionIndex: '0x36',
      blockHash: '0xb6c89b392835519568731df22acd1a353ab88331a65e245e947511c3b324dc57',
      logIndex: '0x44',
      removed: false,
    },
    adapter: new CrvusdAdapter(CrvusdConfigs, null),
    action: 'borrow',
  },
  {
    chain: 'ethereum',
    hash: '0x682eaca964d479766d0fc04982fb343a71a2012b2ad45e9ef97118cdc96a9b1e',
    sender: normalizeAddress('0x050f60248ded87b7bcbbaadf4db9d69d7664c2a0'),
    address: normalizeAddress('0x8472a9a7632b173c8cf3a86d3afec50c35548e76'),
    log: {
      address: '0x8472a9a7632b173c8cf3a86d3afec50c35548e76',
      topics: [
        '0x77c6871227e5d2dec8dadd5354f78453203e22e669cd0ec4c19d9a8c5edb31d0',
        '0x000000000000000000000000050f60248ded87b7bcbbaadf4db9d69d7664c2a0',
      ],
      data: '0x0000000000000000000000000000000000000000000000000c5e5a4be5acff7600000000000000000000000000000000000000000000002ac371c43329368deb',
      blockNumber: '0x109e663',
      transactionHash: '0x682eaca964d479766d0fc04982fb343a71a2012b2ad45e9ef97118cdc96a9b1e',
      transactionIndex: '0x14',
      blockHash: '0x47a6d1675061bfb354e782ca6ecf20ab9d6d8523407b3c0bafa02fc67381de22',
      logIndex: '0x6f',
      removed: false,
    },
    adapter: new CrvusdAdapter(CrvusdConfigs, null),
    action: 'repay',
  },
  {
    chain: 'ethereum',
    hash: '0x569ea8a6766ddcb3f478a1af9039955f10d27608a449fd198f81666585b6dad2',
    sender: normalizeAddress('0x7563839e02004d3f419ff78df4256e9c5dd713ed'),
    address: normalizeAddress('0x8472a9a7632b173c8cf3a86d3afec50c35548e76'),
    log: {
      address: '0x8472a9a7632b173c8cf3a86d3afec50c35548e76',
      topics: [
        '0xe25410a4059619c9594dc6f022fe231b02aaea733f689e7ab0cd21b3d4d0eb54',
        '0x0000000000000000000000007563839e02004d3f419ff78df4256e9c5dd713ed',
      ],
      data: '0x0000000000000000000000000000000000000000000000001bc16d674ec80000',
      blockNumber: '0x109c016',
      transactionHash: '0x569ea8a6766ddcb3f478a1af9039955f10d27608a449fd198f81666585b6dad2',
      transactionIndex: '0x88',
      blockHash: '0x6b6e61328a639bf63ddaf27cd6fc02e49315962c9d327e00cbc6243a17e51aa0',
      logIndex: '0x3d',
      removed: false,
    },
    adapter: new CrvusdAdapter(CrvusdConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0x0338a8c6883d8256b13ee6d588b3e87c4e283e31a8a1c91fb21321446188b76a',
    sender: normalizeAddress('0xb221963cad5856c657647d7126a6fe6a47cac773'),
    address: normalizeAddress('0x8472a9a7632b173c8cf3a86d3afec50c35548e76'),
    log: {
      address: '0x8472a9a7632b173c8cf3a86d3afec50c35548e76',
      topics: [
        '0x642dd4d37ddd32036b9797cec464c0045dd2118c549066ae6b0f88e32240c2d0',
        '0x000000000000000000000000b221963cad5856c657647d7126a6fe6a47cac773',
        '0x000000000000000000000000b221963cad5856c657647d7126a6fe6a47cac773',
      ],
      data: '0x0000000000000000000000000000000000000000000000015b5785705fb1f2070000000000000000000000000000000000000000000009d308400f4f7bc4aa8800000000000000000000000000000000000000000000125af99841877682f8f9',
      blockNumber: '0x109301b',
      transactionHash: '0x0338a8c6883d8256b13ee6d588b3e87c4e283e31a8a1c91fb21321446188b76a',
      transactionIndex: '0x5b',
      blockHash: '0x366834163297a2dac66b46e4719d0496f3d63986472737a378bda27a6c966373',
      logIndex: '0xa8',
      removed: false,
    },
    adapter: new CrvusdAdapter(CrvusdConfigs, null),
    action: 'liquidate',
  },
];
