import { GearboxConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { GearboxAdapter } from '../../../modules/adapters/gearbox/gearbox';
import { TestLog } from '../../types';

export const GearboxActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xb41be6a956bfbbf570f8dfd77d20b6952b965d51c671dcf1ea396e0e93a3d809',
    sender: normalizeAddress('0x112630ba98300a8fb0af4eddb42449c03fc65a58'),
    address: normalizeAddress('0x24946bcbbd028d5abb62ad9b635eb1b1a67af668'),
    log: {
      address: '0x24946bcbbd028d5abb62ad9b635eb1b1a67af668',
      topics: [
        '0xd2491a9b4fe81a7cd4511e8b7b7743951b061dad5bed7da8a7795b080ee08c7e',
        '0x000000000000000000000000112630ba98300a8fb0af4eddb42449c03fc65a58',
        '0x000000000000000000000000112630ba98300a8fb0af4eddb42449c03fc65a58',
      ],
      data: '0x000000000000000000000000000000000000000000000001cbde4ea1c71806b00000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0x104130f',
      transactionHash: '0xb41be6a956bfbbf570f8dfd77d20b6952b965d51c671dcf1ea396e0e93a3d809',
      transactionIndex: '0xe0',
      blockHash: '0x184007d8d5f6ad54ce5b7fcc40b9d1a71d142cb09a27758d99c3c076b50bfcf7',
      logIndex: '0x166',
      removed: false,
    },
    adapter: new GearboxAdapter(GearboxConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x96632835075420f3d654c5370e3f4351e80f6627d512269440ce17c0f1b5aea9',
    sender: normalizeAddress('0x3e13fd392d3feb075b58f309d84c20698a54c10b'),
    address: normalizeAddress('0x24946bcbbd028d5abb62ad9b635eb1b1a67af668'),
    log: {
      address: '0x24946bcbbd028d5abb62ad9b635eb1b1a67af668',
      topics: [
        '0xd8ae9b9ba89e637bcb66a69ac91e8f688018e81d6f92c57e02226425c8efbdf6',
        '0x0000000000000000000000003e13fd392d3feb075b58f309d84c20698a54c10b',
        '0x0000000000000000000000003e13fd392d3feb075b58f309d84c20698a54c10b',
      ],
      data: '0x000000000000000000000000000000000000000000002263850328b8db2bdf18',
      blockNumber: '0x1041106',
      transactionHash: '0x96632835075420f3d654c5370e3f4351e80f6627d512269440ce17c0f1b5aea9',
      transactionIndex: '0x5c',
      blockHash: '0xd761b52bfd596fc99536d337bf77ed9010e546a3bca2317dc906279e0cbc2ebd',
      logIndex: '0xa5',
      removed: false,
    },
    adapter: new GearboxAdapter(GearboxConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0xdbd695812571efb51a43c943cc4d28c94d379f36a3246a4ad9e3473099433fe6',
    sender: normalizeAddress('0x9d6949cfb82266da146daf32c52994e2224a8b38'),
    address: normalizeAddress('0x24946bcbbd028d5abb62ad9b635eb1b1a67af668'),
    log: {
      address: '0x24946bcbbd028d5abb62ad9b635eb1b1a67af668',
      topics: [
        '0x312a5e5e1079f5dda4e95dbbd0b908b291fd5b992ef22073643ab691572c5b52',
        '0x000000000000000000000000672461bfc20dd783444a830ad4c38b345ab6e2f7',
        '0x0000000000000000000000005736dfcb6d8252e3b170ae1886aa2c9a1e3994f1',
      ],
      data: '0x000000000000000000000000000000000000000000002bd0fbbc10fb43635c78',
      blockNumber: '0x1037188',
      transactionHash: '0xdbd695812571efb51a43c943cc4d28c94d379f36a3246a4ad9e3473099433fe6',
      transactionIndex: '0x7b',
      blockHash: '0x1bb562b0c943afd0a35c1fc9ad9a4d37741fa39ae1b603b4356b88cb97c558d6',
      logIndex: '0xe2',
      removed: false,
    },
    adapter: new GearboxAdapter(GearboxConfigs, null),
    action: 'borrow',
  },
  {
    chain: 'ethereum',
    hash: '0x7df2c1632af992aaa2d4209580e323adf16584c1937aa88fed6e575702e104e3',
    sender: normalizeAddress('0xc3be098f9594e57a3e71f485a53d990fe3961fe5'),
    address: normalizeAddress('0x24946bcbbd028d5abb62ad9b635eb1b1a67af668'),
    log: {
      address: '0x24946bcbbd028d5abb62ad9b635eb1b1a67af668',
      topics: [
        '0x2fe77b1c99aca6b022b8efc6e3e8dd1b48b30748709339b65c50ef3263443e09',
        '0x000000000000000000000000672461bfc20dd783444a830ad4c38b345ab6e2f7',
      ],
      data: '0x00000000000000000000000000000000000000000000a932a372db9097a4eb6e0000000000000000000000000000000000000000000000197d0f141e18da7e210000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0x10404c5',
      transactionHash: '0x7df2c1632af992aaa2d4209580e323adf16584c1937aa88fed6e575702e104e3',
      transactionIndex: '0x6f',
      blockHash: '0x14f726e22da5e95d09c17a50825f3bc43169c242baedd27f586929dca5d7a3c7',
      logIndex: '0x119',
      removed: false,
    },
    adapter: new GearboxAdapter(GearboxConfigs, null),
    action: 'repay',
  },
  {
    chain: 'ethereum',
    hash: '0xc628bebb9c87d4c80da65d7eb700cdd5bb8c3a70004715161a301e10e8cf27ca',
    sender: normalizeAddress('0x93aa01eab7f9d6c8511a4a873fea19073334c004'),
    address: normalizeAddress('0xa7df60785e556d65292a2c9a077bb3a8fbf048bc'),
    log: {
      address: '0xa7df60785e556d65292a2c9a077bb3a8fbf048bc',
      topics: [
        '0xfa8256f7c08bb01a03ea96f8b3a904a4450311c9725d1c52cdbe21ed3dc42dcc',
        '0x00000000000000000000000093aa01eab7f9d6c8511a4a873fea19073334c004',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
      data: '0x00000000000000000000000000000000000000000000009d0b28943347e97da7',
      blockNumber: '0x10411c9',
      transactionHash: '0xc628bebb9c87d4c80da65d7eb700cdd5bb8c3a70004715161a301e10e8cf27ca',
      transactionIndex: '0x6d',
      blockHash: '0x8a279a1f8e0d09a5d158d946e261a09ee9981a88357070c1b090025e4604b93d',
      logIndex: '0xc8',
      removed: false,
    },
    adapter: new GearboxAdapter(GearboxConfigs, null),
    action: 'collect',
  },
];
