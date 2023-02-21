import { MultichainConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { MultichainAdapter } from '../../../modules/adapters/multichain/multichain';
import { TestLog } from '../../types';

export const MultichainActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x2adb0cf7d4e153c5ac68bbef704a1d50be023ab83e75cace353eb1fb5ce5f463',
    sender: normalizeAddress('0x0686971a2f2f2e749bb2ff0800301ee3e4299c2b'),
    address: normalizeAddress('0xe95fd76cf16008c12ff3b3a937cb16cd9cc20284'),
    log: {
      address: '0xe95fd76cf16008c12ff3b3a937cb16cd9cc20284',
      topics: [
        '0x97116cf6cd4f6412bb47914d6db18da9e16ab2142f543b86e207c24fbd16b23a',
        '0x000000000000000000000000b01371072fdcb9b4433b855e16a682b461f94ab3',
        '0x0000000000000000000000000686971a2f2f2e749bb2ff0800301ee3e4299c2b',
        '0x0000000000000000000000000686971a2f2f2e749bb2ff0800301ee3e4299c2b',
      ],
      data: '0x00000000000000000000000000000000000000000000043c33c1937564800000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000fa',
      blockNumber: '0xfe69ce',
      transactionHash: '0x2adb0cf7d4e153c5ac68bbef704a1d50be023ab83e75cace353eb1fb5ce5f463',
      transactionIndex: '0x5d',
      blockHash: '0xdcc48d76e12e13f4f65594ff87c7663ecf50dfd219ee5ffd92a9da9f91ce43e9',
      logIndex: '0xfa',
      removed: false,
    },
    adapter: new MultichainAdapter(MultichainConfigs, null),
    action: 'bridge',
  },
  {
    chain: 'ethereum',
    hash: '0x6ca7f14a96eb79e862c1951c288ce9038eae72f7facae71d7141df454ff3a5ce',
    sender: normalizeAddress('0xf39fee2fdfe7db022591f4a82e3537fa0b55fb9c'),
    address: normalizeAddress('0xe95fd76cf16008c12ff3b3a937cb16cd9cc20284'),
    log: {
      address: '0xe95fd76cf16008c12ff3b3a937cb16cd9cc20284',
      topics: [
        '0xaac9ce45fe3adf5143598c4f18a369591a20a3384aedaf1b525d29127e1fcd55',
        '0x581e476bbf597dacfb70784ff9951941fcc3a9c11bd255c75325461902641978',
        '0x000000000000000000000000b01371072fdcb9b4433b855e16a682b461f94ab3',
        '0x00000000000000000000000082808e67fa3d455e793ac263cc78e79351454d9d',
      ],
      data: '0x000000000000000000000000000000000000000000000012c8a74a2a10da000000000000000000000000000000000000000000000000000000000000000000fa0000000000000000000000000000000000000000000000000000000000000001',
      blockNumber: '0xfe6cb3',
      transactionHash: '0x6ca7f14a96eb79e862c1951c288ce9038eae72f7facae71d7141df454ff3a5ce',
      transactionIndex: '0x62',
      blockHash: '0x7116cf79e382e3a5b2a00071879ff5d4c43a5176b342a4a5c0d82c0e7dfd9f62',
      logIndex: '0x136',
      removed: false,
    },
    adapter: new MultichainAdapter(MultichainConfigs, null),
    action: 'bridge',
  },
];
