import { CompoundConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { CompoundAdapter } from '../../../modules/adapters/compound/compound';
import { TestLog } from '../../types';

export const CompoundActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x7919c7df88a330fafe747a317ce24de06a39f05c5f7ebf9931986255e033f6f1',
    sender: normalizeAddress('0x571da526384e407a72c5229163e2824be56044fc'),
    address: normalizeAddress('0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5'),
    log: {
      address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
      topics: ['0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f'],
      data: '0x000000000000000000000000571da526384e407a72c5229163e2824be56044fc0000000000000000000000000000000000000000000000007ce66c50e28400000000000000000000000000000000000000000000000000000000000a6f7e684f',
      blockNumber: '0xfdd07a',
      transactionHash: '0x7919c7df88a330fafe747a317ce24de06a39f05c5f7ebf9931986255e033f6f1',
      transactionIndex: '0x60',
      blockHash: '0xa8a873102c60683256c3c458ac6458f7b4927910d0d030c6afe59f0f699c64f5',
      logIndex: '0xe4',
      removed: false,
    },
    adapter: new CompoundAdapter(CompoundConfigs, null),
    action: 'supply',
  },
  {
    chain: 'ethereum',
    hash: '0x1ba43672bf1c7dc03216ea2d6c8750a1ed1c0bb93ab2acec4457049cbba9f02f',
    sender: normalizeAddress('0x75cacaf3204e911cee3fe0a20fdbadd2491316fa'),
    address: normalizeAddress('0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5'),
    log: {
      address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
      topics: ['0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929'],
      data: '0x00000000000000000000000075cacaf3204e911cee3fe0a20fdbadd2491316fa000000000000000000000000000000000000000000000000d02ab486cedc000000000000000000000000000000000000000000000000000000000011647d38fd',
      blockNumber: '0xfdd247',
      transactionHash: '0x1ba43672bf1c7dc03216ea2d6c8750a1ed1c0bb93ab2acec4457049cbba9f02f',
      transactionIndex: '0x53',
      blockHash: '0xec409fb2688fcb35727b5acb1f79575e6500433ebade2e93df202cc6ff61ac3d',
      logIndex: '0x95',
      removed: false,
    },
    adapter: new CompoundAdapter(CompoundConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0xc9eb9cfea06e9b163684f48558a846516a718a1cbaddc8cb3e11b9fc6b2835c0',
    sender: normalizeAddress('0xc612bda4a16c9dd2054e23e0bb5f16b8b073271d'),
    address: normalizeAddress('0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5'),
    log: {
      address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
      topics: ['0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80'],
      data: '0x000000000000000000000000c612bda4a16c9dd2054e23e0bb5f16b8b073271d000000000000000000000000000000000000000000000000d02ab486cedc00000000000000000000000000000000000000000000000000063bf430617aa2fc780000000000000000000000000000000000000000000001c16061bb059d52935d',
      blockNumber: '0xfdd236',
      transactionHash: '0xc9eb9cfea06e9b163684f48558a846516a718a1cbaddc8cb3e11b9fc6b2835c0',
      transactionIndex: '0x97',
      blockHash: '0x977ef6aaf5e8cb6079bd2bfc8d6dff99409c5899147cdb7ec48c62ec45ff018a',
      logIndex: '0x147',
      removed: false,
    },
    adapter: new CompoundAdapter(CompoundConfigs, null),
    action: 'borrow',
  },
  {
    chain: 'ethereum',
    hash: '0x03ce0f5f9cf960c0213f5ac8be38e0ee365e05130663d800865fa0080d38a00a',
    sender: normalizeAddress('0x2882ddaf89baca105e704c01d20f80227f9ad3ed'),
    address: normalizeAddress('0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5'),
    log: {
      address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
      topics: ['0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1'],
      data: '0x000000000000000000000000f859a1ad94bcf445a406b892ef0d3082f41740880000000000000000000000002882ddaf89baca105e704c01d20f80227f9ad3ed0000000000000000000000000000000000000000000000000354a6ba7a180000000000000000000000000000000000000000000000000000347906f5d61f04e80000000000000000000000000000000000000000000001bb22e39dfb371e0eef',
      blockNumber: '0xfdccf4',
      transactionHash: '0x03ce0f5f9cf960c0213f5ac8be38e0ee365e05130663d800865fa0080d38a00a',
      transactionIndex: '0x70',
      blockHash: '0x55495f33acc14f96cb1a40c82f1bc36b543a2cd63c0929840277a87cb65f314f',
      logIndex: '0xf9',
      removed: false,
    },
    adapter: new CompoundAdapter(CompoundConfigs, null),
    action: 'repay',
  },
  {
    chain: 'ethereum',
    hash: '0xa7c2fad4deef7af52809ba41cff7184fa1747e68119b9fd682348b9329b0b3a9',
    sender: normalizeAddress('0xe1c7c2a9fa79421f88b3ba1e392a14622e698d3d'),
    address: normalizeAddress('0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5'),
    log: {
      address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
      topics: ['0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52'],
      data: '0x0000000000000000000000000bb1b054a66bad88380e4452381a1b254a292e01000000000000000000000000c0acef1857acc3763baa108fb70efb4eebc479bb00000000000000000000000000000000000000000000000006f76f1d528718fb0000000000000000000000005d3a536e4d6dbd6114cc1ead35777bab948e3643000000000000000000000000000000000000000000000000000003b086efe12e',
      blockNumber: '0xfc988a',
      transactionHash: '0xa7c2fad4deef7af52809ba41cff7184fa1747e68119b9fd682348b9329b0b3a9',
      transactionIndex: '0x3',
      blockHash: '0xe5a034a23937f76d72d7744298952b22337d0c8583a8e4c4a8d2a5e737a9dbd2',
      logIndex: '0x20',
      removed: false,
    },
    adapter: new CompoundAdapter(CompoundConfigs, null),
    action: 'liquidate',
  },
  {
    chain: 'ethereum',
    hash: '0x2aabe3d95aebf13301f3054df764b87d086670be726eca417dc7d1bb95d7462a',
    sender: normalizeAddress('0x3c9c685cce6100f3e7da51b162fe91afa15005ba'),
    address: normalizeAddress('0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b'),
    log: {
      address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
      topics: [
        '0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a',
        '0x00000000000000000000000039aa39c021dfbae8fac545936693ac917d5e7563',
        '0x0000000000000000000000003c9c685cce6100f3e7da51b162fe91afa15005ba',
      ],
      data: '0x000000000000000000000000000000000000000000000001c2938cff84983688000000000000000000000000000000ac3cd7638ea51643475c2fae64a921f103',
      blockNumber: '0xfdd33e',
      transactionHash: '0x2aabe3d95aebf13301f3054df764b87d086670be726eca417dc7d1bb95d7462a',
      transactionIndex: '0x46',
      blockHash: '0x3f6b33768f6d96b5972f219d5db5ddc225c9b5ad49a04fae910fdb2b954189dd',
      logIndex: '0x7f',
      removed: false,
    },
    adapter: new CompoundAdapter(CompoundConfigs, null),
    action: 'collect',
  },
  {
    chain: 'ethereum',
    hash: '0xbad5690755b54e94dc36dfa757c1ad841e5989eea82b1a295d60df76b219e64e',
    sender: normalizeAddress('0x995a09ed0b24ee13fbfcfbe60cad2fb6281b479f'),
    address: normalizeAddress('0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b'),
    log: {
      address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
      topics: [
        '0x1fc3ecc087d8d2d15e23d0032af5a47059c3892d003d8e139fdcb6bb327c99a6',
        '0x0000000000000000000000004ddc2d193948926d02f9b1fe9e1daa0718270ed5',
        '0x000000000000000000000000995a09ed0b24ee13fbfcfbe60cad2fb6281b479f',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a9ae6cdb47a25fdd3d0a28716942a1',
      blockNumber: '0xfdd31a',
      transactionHash: '0xbad5690755b54e94dc36dfa757c1ad841e5989eea82b1a295d60df76b219e64e',
      transactionIndex: '0x42',
      blockHash: '0x183f35aa55f32baa9146ea290c274a3237f4fd516b2c1ad6cea8ff53d4a9f847',
      logIndex: '0x9b',
      removed: false,
    },
    adapter: new CompoundAdapter(CompoundConfigs, null),
    action: 'collect',
  },
];
