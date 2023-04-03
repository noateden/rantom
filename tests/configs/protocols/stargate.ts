import { StargateConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { StargateAdapter } from '../../../modules/adapters/stargate/stargate';
import { TestLog } from '../../types';

export const StargateActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xc1dc45a107a122632137ab763d4f682d674edfbcb8403e7b47c1e6fc34d2f079',
    sender: normalizeAddress('0xbbf25d34ae9828e0be935a57f0d7872018e8c34c'),
    address: normalizeAddress('0x101816545f6bd2b1076434b54383a1e633390a2e'),
    log: {
      address: '0x101816545f6bd2b1076434b54383a1e633390a2e',
      topics: ['0x34660fc8af304464529f48a778e03d03e4d34bcd5f9b6f0cfbf3cd238c642f7f'],
      data: '0x000000000000000000000000000000000000000000000000000000000000006f000000000000000000000000000000000000000000000000000000000000000d000000000000000000000000150f94b44927f078737562f0fcf3c95c01cc2376000000000000000000000000000000000000000000000000004702fae7c5400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008bb2c9700000000000000000000000000000000000000000000000000000000a5e44f350000000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0x102f09e',
      transactionHash: '0xc1dc45a107a122632137ab763d4f682d674edfbcb8403e7b47c1e6fc34d2f079',
      transactionIndex: '0x92',
      blockHash: '0x7ef3092b3d35471fbaf93d29a8c2e2d35b703a514a744651095a59aa3228535f',
      logIndex: '0x126',
      removed: false,
    },
    adapter: new StargateAdapter(StargateConfigs, null),
    action: 'bridge',
  },
  {
    chain: 'ethereum',
    hash: '0x2a06753aca0b0b2e2585d3723718d57f72ba95868929127124b433b8a690b7f4',
    sender: normalizeAddress('0xcad6fe3961d6f314ebca5380f56b2cd9780ad159'),
    address: normalizeAddress('0x101816545f6bd2b1076434b54383a1e633390a2e'),
    log: {
      address: '0x101816545f6bd2b1076434b54383a1e633390a2e',
      topics: ['0xb4c03061fb5b7fed76389d5af8f2e0ddb09f8c70d1333abbb62582835e10accb'],
      data: '0x000000000000000000000000cad6fe3961d6f314ebca5380f56b2cd9780ad1590000000000000000000000000000000000000000000000000000b5e25406c4790000000000000000000000000000000000000000000000000000b5e620f480000000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0x102eed7',
      transactionHash: '0x2a06753aca0b0b2e2585d3723718d57f72ba95868929127124b433b8a690b7f4',
      transactionIndex: '0x6c',
      blockHash: '0xa05edf43b234a399d312470e00cd03f0b8cf79e2e4dd5ac1b1e2bfffa02c7448',
      logIndex: '0xab',
      removed: false,
    },
    adapter: new StargateAdapter(StargateConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x3256b0e8476d06b1a8ebc2aea20be1e95b50bc8604a7f1186b058b886d263999',
    sender: normalizeAddress('0x23df87ead1b7219f59a8f9172e5537ce7fdc0d84'),
    address: normalizeAddress('0x101816545f6bd2b1076434b54383a1e633390a2e'),
    log: {
      address: '0x101816545f6bd2b1076434b54383a1e633390a2e',
      topics: ['0x49995e5dd6158cf69ad3e9777c46755a1a826a446c6416992167462dad033b2a'],
      data: '0x00000000000000000000000023df87ead1b7219f59a8f9172e5537ce7fdc0d840000000000000000000000000000000000000000000000000429ba2457a737e90000000000000000000000000000000000000000000000000429d069189dffff',
      blockNumber: '0x102ece2',
      transactionHash: '0x3256b0e8476d06b1a8ebc2aea20be1e95b50bc8604a7f1186b058b886d263999',
      transactionIndex: '0x52',
      blockHash: '0x10d002943f1d51e7eaf3cf3cc0a4835f18c9efeca07ee9c41922ce36dd0a7f2f',
      logIndex: '0x67',
      removed: false,
    },
    adapter: new StargateAdapter(StargateConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0x8d4e72895b345c921fe73793bd8f8c23f28a357c47c1878718c3322d8c18b330',
    sender: normalizeAddress('0xe93685f3bba03016f02bd1828badd6195988d950'),
    address: normalizeAddress('0x101816545f6bd2b1076434b54383a1e633390a2e'),
    log: {
      address: '0x101816545f6bd2b1076434b54383a1e633390a2e',
      topics: ['0xfb2b592367452f1c437675bed47f5e1e6c25188c17d7ba01a12eb030bc41ccef'],
      data: '0x000000000000000000000000c84dfa084244b32744f1d8c2571498bd40f486aa00000000000000000000000000000000000000000000000001628312b613fb5d00000000000000000000000000000000000000000000000000003691d6afc00000000000000000000000000000000000000000000000000000008bd3d0c644a3',
      blockNumber: '0x102f0a0',
      transactionHash: '0x8d4e72895b345c921fe73793bd8f8c23f28a357c47c1878718c3322d8c18b330',
      transactionIndex: '0x8',
      blockHash: '0xcbc46ff8b4b8c7e56392da759e21978100442bbc23a8d7a53573160f623dafc9',
      logIndex: '0x1a',
      removed: false,
    },
    adapter: new StargateAdapter(StargateConfigs, null),
    action: 'withdraw',
  },
];
