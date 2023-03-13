import { ChainlinkConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { ChainlinkAdapter } from '../../../modules/adapters/chainlink/chainlink';
import { TestLog } from '../../types';

export const ChainlinkActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x593f3b5875afa5bdd743af304c6fbfba481bbb2fed240f15a14bc2c58414d353',
    sender: normalizeAddress('0x632f869a26ab4da58e2da476ee74800f2bae060a'),
    address: normalizeAddress('0x37bc7498f4ff12c19678ee8fe19d713b87f6a9e6'),
    log: {
      address: '0x37bc7498f4ff12c19678ee8fe19d713b87f6a9e6',
      topics: [
        '0xf6a97944f31ea060dfde0566e4167c1a1082551e64b60ecb14d599a9d023d451',
        '0x000000000000000000000000000000000000000000000000000000000000a5c2',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000025597aa5c0000000000000000000000000632f869a26ab4da58e2da476ee74800f2bae060a00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000004a00000000000000000000000d02ee3e7b93bbe024d583e46d7fe54450000bc6706000000000000000000000000000000000000000000000000000000000000001f0000000000000000000000000000000000000000000000000000002529600ab000000000000000000000000000000000000000000000000000000025480e4f9600000000000000000000000000000000000000000000000000000025480e4f9600000000000000000000000000000000000000000000000000000025480e4f9600000000000000000000000000000000000000000000000000000025480e4f9600000000000000000000000000000000000000000000000000000025480e4f9600000000000000000000000000000000000000000000000000000025480e4f96000000000000000000000000000000000000000000000000000000254a279e7c00000000000000000000000000000000000000000000000000000025576497000000000000000000000000000000000000000000000000000000002557649700000000000000000000000000000000000000000000000000000000255764970000000000000000000000000000000000000000000000000000000025576497000000000000000000000000000000000000000000000000000000002557fd2d800000000000000000000000000000000000000000000000000000002557fd2d8000000000000000000000000000000000000000000000000000000025589ac92800000000000000000000000000000000000000000000000000000025597aa5c00000000000000000000000000000000000000000000000000000002559abeef00000000000000000000000000000000000000000000000000000002559d2c9ba000000000000000000000000000000000000000000000000000000255a2a1fa0000000000000000000000000000000000000000000000000000000255ab373e0000000000000000000000000000000000000000000000000000000255ab373e0000000000000000000000000000000000000000000000000000000255ab373e0000000000000000000000000000000000000000000000000000000255b61a967000000000000000000000000000000000000000000000000000000255b905aa8000000000000000000000000000000000000000000000000000000255b9fcfb0000000000000000000000000000000000000000000000000000000255c33de08000000000000000000000000000000000000000000000000000000255c33de08000000000000000000000000000000000000000000000000000000255c33fd48000000000000000000000000000000000000000000000000000000255c33fd48000000000000000000000000000000000000000000000000000000255eb59b30000000000000000000000000000000000000000000000000000000255f7086c0000000000000000000000000000000000000000000000000000000000000001f14191e021317181c080b05161a1d120d070915100e0c031b010a0411060f0000',
      blockNumber: '0x1009ab8',
      transactionHash: '0x593f3b5875afa5bdd743af304c6fbfba481bbb2fed240f15a14bc2c58414d353',
      transactionIndex: '0x3d',
      blockHash: '0x07a6c6e215bd5c43b45d5b10d3261e8d322391d23da79fa010b39bcbe2766ae0',
      logIndex: '0x15f',
      removed: false,
    },
    adapter: new ChainlinkAdapter(ChainlinkConfigs, null),
    action: 'update',
  },
];
