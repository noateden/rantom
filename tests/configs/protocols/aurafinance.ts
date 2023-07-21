import { AurafinanceConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { AurafinanceAdapter } from '../../../modules/adapters/aurafinance/aurafinance';
import { TestLog } from '../../types';

export const AurafinanceActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x323ae6d45e3589a050cbc23e6082df6f58c7b995bfd95cbdf744ec8f01786b07',
    sender: normalizeAddress('0x410df33144305ca1a94704dfffbd8d255cf50e5e'),
    address: normalizeAddress('0xa57b8d98dae62b26ec3bcc4a365338157060b234'),
    log: {
      address: '0xa57b8d98dae62b26ec3bcc4a365338157060b234',
      topics: [
        '0x73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca',
        '0x000000000000000000000000410df33144305ca1a94704dfffbd8d255cf50e5e',
        '0x0000000000000000000000000000000000000000000000000000000000000015',
      ],
      data: '0x0000000000000000000000000000000000000000000000004d3cce1fac91e8bc',
      blockNumber: '0xfe5812',
      transactionHash: '0x323ae6d45e3589a050cbc23e6082df6f58c7b995bfd95cbdf744ec8f01786b07',
      transactionIndex: '0x8f',
      blockHash: '0xfba30fa39b8fa310e2384b50f504137ac6edd87edf2e752bac0695992b9bddfa',
      logIndex: '0x11f',
      removed: false,
    },
    adapter: new AurafinanceAdapter(AurafinanceConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x1e76b7231833793bc99e4f10acba909fb602d6ceab22b9a68a04600c6fdcc1b5',
    sender: normalizeAddress('0x8a83716acd66d9e1fb18c9b79540b72e04f80ac0'),
    address: normalizeAddress('0xa57b8d98dae62b26ec3bcc4a365338157060b234'),
    log: {
      address: '0xa57b8d98dae62b26ec3bcc4a365338157060b234',
      topics: [
        '0x92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc6',
        '0x0000000000000000000000008a83716acd66d9e1fb18c9b79540b72e04f80ac0',
        '0x000000000000000000000000000000000000000000000000000000000000001d',
      ],
      data: '0x0000000000000000000000000000000000000000000000056bc75e2d63100000',
      blockNumber: '0xfe58b3',
      transactionHash: '0x1e76b7231833793bc99e4f10acba909fb602d6ceab22b9a68a04600c6fdcc1b5',
      transactionIndex: '0xb',
      blockHash: '0x61b75e8771ce49b3c90585ccea619d9dbcc8aa466e72af119bfa37455deb6b6d',
      logIndex: '0x400',
      removed: false,
    },
    adapter: new AurafinanceAdapter(AurafinanceConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0x0b6f29be180b4e17018f8972b8f9aebb754590b6048835ce7f9e1760ae74786e',
    sender: normalizeAddress('0xb7b1cc940cc88640089028d4910de22e39e6d117'),
    address: normalizeAddress('0x3fa73f1e5d8a792c80f426fc8f84fbf7ce9bbcac'),
    log: {
      address: '0x3fa73f1e5d8a792c80f426fc8f84fbf7ce9bbcac',
      topics: [
        '0x1449c6dd7851abc30abf37f57715f492010519147cc2652fbc38202c18a6ee90',
        '0x0000000000000000000000007b90e043aac79adea0dbb0690e3c832757207a3b',
      ],
      data: '0x0000000000000000000000000000000000000000000000089e4bdfbce85f8aec0000000000000000000000000000000000000000000000089e4bdfbce85f8aec',
      blockNumber: '0x10eb68b',
      transactionHash: '0x0b6f29be180b4e17018f8972b8f9aebb754590b6048835ce7f9e1760ae74786e',
      transactionIndex: '0x92',
      blockHash: '0xdefb68be007812dec8656eeeb1d5f7afc9657e7fc833041c98ba89b2558e20bb',
      logIndex: '0x158',
      removed: false,
    },
    adapter: new AurafinanceAdapter(AurafinanceConfigs, null),
    action: 'lock',
  },
  {
    chain: 'ethereum',
    hash: '0xfa60a7450c4117e3d7bedea5e9ada1c60a8bcd0bea82fe28a89c590e62138116',
    sender: normalizeAddress('0x20eadfcaf91bd98674ff8fc341d148e1731576a4'),
    address: normalizeAddress('0x3fa73f1e5d8a792c80f426fc8f84fbf7ce9bbcac'),
    log: {
      address: '0x3fa73f1e5d8a792c80f426fc8f84fbf7ce9bbcac',
      topics: [
        '0x2fd83d5e9f5d240bed47a97a24cf354e4047e25edc2da27b01fd95e5e8a0c9a5',
        '0x00000000000000000000000020eadfcaf91bd98674ff8fc341d148e1731576a4',
      ],
      data: '0x00000000000000000000000000000000000000000000016906b015806783c2ba0000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0x10eb61d',
      transactionHash: '0xfa60a7450c4117e3d7bedea5e9ada1c60a8bcd0bea82fe28a89c590e62138116',
      transactionIndex: '0x68',
      blockHash: '0x6500c265c07a54afa733b42dab8fbfbec57891930397d48394bb26638936a993',
      logIndex: '0x12c',
      removed: false,
    },
    adapter: new AurafinanceAdapter(AurafinanceConfigs, null),
    action: 'unlock',
  },
];
