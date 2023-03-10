import { BancorConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { BancorAdapter } from '../../../modules/adapters/bancor/bancor';
import { TestLog } from '../../types';

export const BancorActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xf3e1369434b46f9a9cc3b56653f22be77431b32c4545516c53dff0571d77b06e',
    sender: normalizeAddress('0xd7e1236c08731c3632519dcd1a581bfe6876a3b2'),
    address: normalizeAddress('0xeef417e1d5cc832e619ae18d2f140de2999dd4fb'),
    log: {
      address: '0xeef417e1d5cc832e619ae18d2f140de2999dd4fb',
      blockHash: '0x5a9574f6cc4a52841512fa7a16c76f5be3e605a18d462e589e75009aa0733bc4',
      blockNumber: '0xfe0f19',
      data: '0x0000000000000000000000000000000000000000000000011b3a5b1e67a7657500000000000000000000000000000000000000000000007c4ea606c6c4d43cae00000000000000000000000000000000000000000000007d0cc6b6c3f59b64110000000000000000000000000000000000000000000000009fe9adb3d01acb8f000000000000000000000000000000000000000000000000a0de43d019ad29ab00000000000000000000000024902aa0cf0000a08c0ea0b003b0c0bf600000e0',
      logIndex: '0x15f',
      removed: false,
      topics: [
        '0x5c02c2bb2d1d082317eb23916ca27b3e7c294398b60061a2ad54f1c3c018c318',
        '0x423a08cfba0bc2d001fbf1a12705babab494f04c9f952e00b30a4f609714ccf7',
        '0x000000000000000000000000d33526068d116ce69f19a9ee46f0bd304f21a51f',
        '0x000000000000000000000000967da4048cd07ab37855c090aaf366e4ce1b9f48',
      ],
      transactionHash: '0xf3e1369434b46f9a9cc3b56653f22be77431b32c4545516c53dff0571d77b06e',
      transactionIndex: '0xfc',
    },
    adapter: new BancorAdapter(BancorConfigs, null),
    action: 'swap',
  },
  {
    chain: 'ethereum',
    hash: '0x915a7195a95d69ded4e879a45a6b7eb0cac43ab3301f759a053580f28baeaa68',
    sender: normalizeAddress('0xd7f51404946686de11eca86c9f7c210123ddc76b'),
    address: normalizeAddress('0xd982e001491d414c857f2a1aaa4b43ccf9f642b4'),
    log: {
      address: '0xd982e001491d414c857f2a1aaa4b43ccf9f642b4',
      blockHash: '0x041e43852235e901c1e385303274968c3a8976960448b9b4276449cea94c67b3',
      blockNumber: '0xfdc165',
      data: '0x000000000000000000000000000000000000000000000000000fdae940cbe800000000000000000000000000000000000000000000000000000fb44326cff58c',
      logIndex: '0xb4',
      removed: false,
      topics: [
        '0xecb7e4cd1580472adaeba712b36acf94439b2e1760af55fedb61960ca4422af3',
        '0x93e42abe97eb2b243b225de465b965d501398383cfabe0c650c7b26b3e48f393',
        '0x000000000000000000000000d7f51404946686de11eca86c9f7c210123ddc76b',
        '0x0000000000000000000000000bc529c00c6401aef6d220be8c6ea1667f6ad93e',
      ],
      transactionHash: '0x915a7195a95d69ded4e879a45a6b7eb0cac43ab3301f759a053580f28baeaa68',
      transactionIndex: '0x4b',
    },
    adapter: new BancorAdapter(BancorConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0xb4a4a56a6a9a0487fffe3825a807c16d6eb7fd2edb5b4d3d4860142f77728bb8',
    sender: normalizeAddress('0x3d293bdf6f5ea8f020a5a34308a4f48002d64e78'),
    address: normalizeAddress('0xd982e001491d414c857f2a1aaa4b43ccf9f642b4'),
    log: {
      address: '0xd982e001491d414c857f2a1aaa4b43ccf9f642b4',
      blockHash: '0x0708b76afcd536d5dab2aefa5358d402226bbe6d60f5c2383c1737cba783563f',
      blockNumber: '0xfe0cf3',
      data: '0x00000000000000000000000000000000000000000000000a197ebcd7fccf6d1700000000000000000000000000000000000000000000003f8fcb25b5ed9d8ab4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      logIndex: '0xa3',
      removed: false,
      topics: [
        '0xeab8ac9e9478a4b3c37a794ecef629b8a8bbcd96f9eaeac8ed26054d144da52d',
        '0x6c1f50ee11e7f97bc2b06bb4436706d75b2a5518ec53137f33bbefb2ac84f88a',
        '0x0000000000000000000000003d293bdf6f5ea8f020a5a34308a4f48002d64e78',
        '0x0000000000000000000000007d1afa7b718fb893db30a3abc0cfc608aacfebb0',
      ],
      transactionHash: '0xb4a4a56a6a9a0487fffe3825a807c16d6eb7fd2edb5b4d3d4860142f77728bb8',
      transactionIndex: '0x3d',
    },
    adapter: new BancorAdapter(BancorConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0x839e5e716dd6f6b54e795976857fe571181b06bd7a1281c7da9b1920ff9a342f',
    sender: normalizeAddress('0x9a28138cd1568a094fbb14758b529900b859bb70'),
    address: normalizeAddress('0xeef417e1d5cc832e619ae18d2f140de2999dd4fb'),
    log: {
      address: '0xeef417e1d5cc832e619ae18d2f140de2999dd4fb',
      blockHash: '0x968c3fad142da53cc3c8320e64de9065968ad11bd36b53a4700f6e4281f849c1',
      blockNumber: '0xfdf14f',
      data: '0x000000000000000000000000000000000000000000000000d799844a905d7ff40000000000000000000000000000000000000000000000000000000000000000',
      logIndex: '0x85',
      removed: false,
      topics: [
        '0x0da3485ef1bb570df7bb888887eae5aa01d81b83cd8ccc80c0ea0922a677ecef',
        '0x000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        '0x000000000000000000000000c75a65361af17203dfadfcdca3eb6b476c72c164',
      ],
      transactionHash: '0x839e5e716dd6f6b54e795976857fe571181b06bd7a1281c7da9b1920ff9a342f',
      transactionIndex: '0x16',
    },
    adapter: new BancorAdapter(BancorConfigs, null),
    action: 'flashloan',
  },
];
