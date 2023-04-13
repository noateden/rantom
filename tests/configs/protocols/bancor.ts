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
      topics: [
        '0x5c02c2bb2d1d082317eb23916ca27b3e7c294398b60061a2ad54f1c3c018c318',
        '0x423a08cfba0bc2d001fbf1a12705babab494f04c9f952e00b30a4f609714ccf7',
        '0x000000000000000000000000d33526068d116ce69f19a9ee46f0bd304f21a51f',
        '0x000000000000000000000000967da4048cd07ab37855c090aaf366e4ce1b9f48',
      ],
      data: '0x0000000000000000000000000000000000000000000000011b3a5b1e67a7657500000000000000000000000000000000000000000000007c4ea606c6c4d43cae00000000000000000000000000000000000000000000007d0cc6b6c3f59b64110000000000000000000000000000000000000000000000009fe9adb3d01acb8f000000000000000000000000000000000000000000000000a0de43d019ad29ab00000000000000000000000024902aa0cf0000a08c0ea0b003b0c0bf600000e0',
      blockNumber: '0xfe0f19',
      transactionHash: '0xf3e1369434b46f9a9cc3b56653f22be77431b32c4545516c53dff0571d77b06e',
      transactionIndex: '0xfc',
      blockHash: '0x5a9574f6cc4a52841512fa7a16c76f5be3e605a18d462e589e75009aa0733bc4',
      logIndex: '0x15f',
      removed: false,
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
  {
    chain: 'ethereum',
    hash: '0x35455154bd63c90859757038de7fdcbaaa07ad852a097fbe3ba6563151874cbb',
    sender: normalizeAddress('0x2ee36e41387f87b7e6f678a86d1e575b23b996f5'),
    address: normalizeAddress('0x2f9ec37d6ccfff1cab21733bdadede11c823ccb0'),
    log: {
      address: '0x2f9ec37d6ccfff1cab21733bdadede11c823ccb0',
      topics: [
        '0x7154b38b5dd31bb3122436a96d4e09aba5b323ae1fd580025fab55074334c095',
        '0x000000000000000000000000b1cd6e4153b2a390cf00a6556b0fc1458c4a5533',
        '0x0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c',
        '0x000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      ],
      data: '0x00000000000000000000000000000000000000000000002d6d2927d37a0b95d1000000000000000000000000000000000000000000000000038fc013760d7b460000000000000000000000000000000000a84d1a9b0063a910315c7ffa9cd248',
      blockNumber: '0x1031e53',
      transactionHash: '0x35455154bd63c90859757038de7fdcbaaa07ad852a097fbe3ba6563151874cbb',
      transactionIndex: '0x12',
      blockHash: '0xc1d99da09c0fb6c9ae8bcee36347eb9de01b4b58b313d301bce21b19958fed3b',
      logIndex: '0x33',
      removed: false,
    },
    adapter: new BancorAdapter(BancorConfigs, null),
    action: 'swap',
  },
  {
    chain: 'ethereum',
    hash: '0x30271b4268ad2fd722770b28f67884e9cf1091c547b33c0198852559a2ad90b4',
    sender: normalizeAddress('0x4b6803936657f458da936fa78cc60fcd630cfced'),
    address: normalizeAddress('0x02651e355d26f3506c1e644ba393fdd9ac95eaca'),
    log: {
      address: '0x02651e355d26f3506c1e644ba393fdd9ac95eaca',
      blockHash: '0xc1a6ea7845dd2521238dc0b3e066d3f9526f580f17c3f3a9342c46fede69201b',
      blockNumber: '0x103c0b9',
      data: '0x0000000000000000000000000000000000000000000000019b611c5ca8b486b80000000000000000000000000000000000000000000000019755be13c5cf4e190000000000000000000000000000000000000000000000019755be13c5cf4e19',
      logIndex: '0x7f',
      removed: false,
      topics: [
        '0x98ac1ba20f9c40c6579f93634a34a46bd425744a5ef297e4c739ba0ce1d7f6b5',
        '0x3f8c9bb63e09e4c5531bbf40deac3e57b317a9d5dcf1a67bd84ae27528cc9631',
        '0x0000000000000000000000004b6803936657f458da936fa78cc60fcd630cfced',
      ],
      transactionHash: '0x30271b4268ad2fd722770b28f67884e9cf1091c547b33c0198852559a2ad90b4',
      transactionIndex: '0x58',
    },
    adapter: new BancorAdapter(BancorConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x2d6d3a4d09f6a716c1996ff533421a8c390362cd9f048802b90fae4560fd5352',
    sender: normalizeAddress('0x6a2d6632d7855c26b29348d43811cab42b8c129f'),
    address: normalizeAddress('0x02651e355d26f3506c1e644ba393fdd9ac95eaca'),
    log: {
      address: '0x02651e355d26f3506c1e644ba393fdd9ac95eaca',
      blockHash: '0x97ed79940a23b52cede3a4021cb803384f20b83bb6c7038dd45ae6c9455ed5e9',
      blockNumber: '0x103ea45',
      data: '0x000000000000000000000000000000000000000000000136ba76a99c1904cb90000000000000000000000000000000000000000000000133ac07a4f3f423b675000000000000000000000000000000000000000000000133ac07a4f3f423b6750000000000000000000000000000000000000000000000000000000000000000',
      logIndex: '0xaa',
      removed: false,
      topics: [
        '0x2d3e6c9d7b23425696e79d70b11c80ff35e7e65291f79a03f9aef35570686351',
        '0xbdfed25ed15e600fbda836c5d899985db93798ad5bec0ca40eac50eb94308934',
        '0x0000000000000000000000006a2d6632d7855c26b29348d43811cab42b8c129f',
      ],
      transactionHash: '0x2d6d3a4d09f6a716c1996ff533421a8c390362cd9f048802b90fae4560fd5352',
      transactionIndex: '0x72',
    },
    adapter: new BancorAdapter(BancorConfigs, null),
    action: 'withdraw',
  },
];
