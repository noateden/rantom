import { MetamaskConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { MetamaskAdapter } from '../../../modules/adapters/metamask/metamask';
import { TestLog } from '../../types';

export const MetamaskActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x39eb3cbe75fececd5ef1436cde63fc1673f9b77dbb77aff9949bf6b240ff4661',
    sender: normalizeAddress('0xeea0fbfa6684a9294f267321cfb2b25ca85f7a73'),
    address: normalizeAddress('0x881d40237659c251811cec9c364ef91dc08d300c'),
    log: {
      address: '0x881d40237659c251811cec9c364ef91dc08d300c',
      topics: [
        '0xbeee1e6e7fe307ddcf84b0a16137a4430ad5e2480fc4f4a8e250ab56ccd7630d',
        '0xf35f348d53012d52a5d39f9390d246956ac932d5778d2bb49e359dba4fa0896d',
        '0x000000000000000000000000eea0fbfa6684a9294f267321cfb2b25ca85f7a73',
      ],
      data: '0x',
      blockNumber: '0x1081608',
      transactionHash: '0x39eb3cbe75fececd5ef1436cde63fc1673f9b77dbb77aff9949bf6b240ff4661',
      transactionIndex: '0x48',
      blockHash: '0x0a8d0d3ae286ef688aa92334815d521437d7558666c0b909fd5e7f0697d0e532',
      logIndex: '0x4b',
      removed: false,
    },
    adapter: new MetamaskAdapter(MetamaskConfigs, null),
    action: 'trade',
  },
  {
    chain: 'ethereum',
    hash: '0x8a9f065fd56c21142089524affa056b830a0d96436bbad6962c06c737b575ade',
    sender: normalizeAddress('0x35345d8632eeaf40f2d9c2abe477c50dd22b542b'),
    address: normalizeAddress('0x881d40237659c251811cec9c364ef91dc08d300c'),
    log: {
      address: '0x881d40237659c251811cec9c364ef91dc08d300c',
      topics: [
        '0xbeee1e6e7fe307ddcf84b0a16137a4430ad5e2480fc4f4a8e250ab56ccd7630d',
        '0x0f15df26153967931fbcb8c0d3b573946eced4ef196e2d07ec13f437ff36584e',
        '0x00000000000000000000000035345d8632eeaf40f2d9c2abe477c50dd22b542b',
      ],
      data: '0x',
      blockNumber: '0x1081547',
      transactionHash: '0x8a9f065fd56c21142089524affa056b830a0d96436bbad6962c06c737b575ade',
      transactionIndex: '0xcb',
      blockHash: '0xb710d5694fc47f16585046d1ddf95307debcab67da1e5ad3694893c45a762e8c',
      logIndex: '0x152',
      removed: false,
    },
    adapter: new MetamaskAdapter(MetamaskConfigs, null),
    action: 'trade',
  },
];
