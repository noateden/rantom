import { AnkrConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { AnkrAdapter } from '../../../modules/adapters/ankr/ankr';
import { TestLog } from '../../types';

export const AnkrActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x582dfbfa5f91d7a64139dce73647b0c89f695216ee5e6133c6179be4a573300c',
    sender: normalizeAddress('0xa978856717d828c516b62ab1f9f2c7b0084e0880'),
    address: normalizeAddress('0x84db6ee82b7cf3b47e8f19270abde5718b936670'),
    log: {
      address: '0x84db6ee82b7cf3b47e8f19270abde5718b936670',
      topics: [
        '0x995d6cdbf356b73aa4dff24e951558cc155c9bb0397786ec4a142f9470f50007',
        '0x000000000000000000000000a978856717d828c516b62ab1f9f2c7b0084e0880',
      ],
      data: '0x0000000000000000000000000000000000000000000000004c53ecdc18a60000',
      blockNumber: '0x106cbe4',
      transactionHash: '0x582dfbfa5f91d7a64139dce73647b0c89f695216ee5e6133c6179be4a573300c',
      transactionIndex: '0x16',
      blockHash: '0xd59ac3215fd7f247f44ade9978db46bef8a37dbe1a08ad809c576e3e441d7d08',
      logIndex: '0x1a',
      removed: false,
    },
    adapter: new AnkrAdapter(AnkrConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x460c71684ac1f2ddae30ce833d89bbd57a9af1d654802721a90dc9bfe0b00c6d',
    sender: normalizeAddress('0xf825e6b3a67f3c00fc0da9972037687c67f4f46f'),
    address: normalizeAddress('0x84db6ee82b7cf3b47e8f19270abde5718b936670'),
    log: {
      address: '0x84db6ee82b7cf3b47e8f19270abde5718b936670',
      topics: [
        '0xc5130045b6f6c9e2944ccea448ad17c279db68237b8aa856ee12cbfaa25f7715',
        '0x000000000000000000000000f825e6b3a67f3c00fc0da9972037687c67f4f46f',
        '0x000000000000000000000000f825e6b3a67f3c00fc0da9972037687c67f4f46f',
      ],
      data: '0x0000000000000000000000000000000000000000000000004a914bce2b2583350000000000000000000000000000000000000000000000000000000000000001',
      blockNumber: '0x106b253',
      transactionHash: '0x460c71684ac1f2ddae30ce833d89bbd57a9af1d654802721a90dc9bfe0b00c6d',
      transactionIndex: '0x6',
      blockHash: '0x7fbbe10a9483309c6d4b717fcdd273385d7e8f8e686e3a5b6d9567805a80b21b',
      logIndex: '0x2a',
      removed: false,
    },
    adapter: new AnkrAdapter(AnkrConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0x5f13ffdf7dc80dfd20217b268880ad8ac4b6e79cbd498229a6cdab282a103a4e',
    sender: normalizeAddress('0x4069d8a3de3a72eca86ca5e0a4b94619085e7362'),
    address: normalizeAddress('0x84db6ee82b7cf3b47e8f19270abde5718b936670'),
    log: {
      address: '0x84db6ee82b7cf3b47e8f19270abde5718b936670',
      topics: ['0xe69d325558610ba73c441901deb46d7f251108348dc5dc9447e8866774c12edc'],
      data: '0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000008002b65f3ed72dfe591fa9437acc7a9665898f0a0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000001241b6b1acca7529c',
      blockNumber: '0x106c7e1',
      transactionHash: '0x5f13ffdf7dc80dfd20217b268880ad8ac4b6e79cbd498229a6cdab282a103a4e',
      transactionIndex: '0x7a',
      blockHash: '0x1bb2604e68b9da80fc87f28405f5724515f414beca92154f744f1d463a2d8548',
      logIndex: '0xf2',
      removed: false,
    },
    adapter: new AnkrAdapter(AnkrConfigs, null),
    action: 'collect',
  },
];
