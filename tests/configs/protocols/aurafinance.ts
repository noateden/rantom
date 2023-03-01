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
    hash: '0x6d78bed40d6e3dc191a551a61159edfa42300c34145b270c86afd9e0a151d067',
    sender: normalizeAddress('0x04a8a22e5ef364c5237df13317c4f083f32c2cc4'),
    address: normalizeAddress('0xde6226bda2f6c516486936d9b19ec4b0d88bf025'),
    log: {
      address: '0xde6226bda2f6c516486936d9b19ec4b0d88bf025',
      topics: [
        '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486',
        '0x00000000000000000000000004a8a22e5ef364c5237df13317c4f083f32c2cc4',
      ],
      data: '0x0000000000000000000000000000000000000000000000034de1775bab003533',
      blockNumber: '0xfe5f08',
      transactionHash: '0x6d78bed40d6e3dc191a551a61159edfa42300c34145b270c86afd9e0a151d067',
      transactionIndex: '0x87',
      blockHash: '0x4ec19de940bc9302a5c252c853bf228f2d73614335f81e598d85a01a301521c0',
      logIndex: '0x150',
      removed: false,
    },
    adapter: new AurafinanceAdapter(AurafinanceConfigs, null),
    action: 'collect',
  },
];
