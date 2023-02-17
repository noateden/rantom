import { LoopringConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { LoopringAdapter } from '../../../modules/adapters/loopring/loopring';
import { TestLog } from '../../types';

export const LoopringActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x249d706d226a08b554ca7b4dbf7e2653cf09137259bc869ae7200914080591e4',
    sender: normalizeAddress('0xd79ece526ecf0333bf5c0b9c6a487f46b983064e'),
    address: normalizeAddress('0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4'),
    log: {
      address: '0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4',
      blockHash: '0xe52f44ecf6754ed9c4aab6962dc5f28bd3056ccf3dde77652fa1883614b183cb',
      blockNumber: '0xfe0d1a',
      data: '0x000000000000000000000000d79ece526ecf0333bf5c0b9c6a487f46b983064e000000000000000000000000d79ece526ecf0333bf5c0b9c6a487f46b983064e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000228660f96822012',
      logIndex: '0x2f',
      removed: false,
      topics: ['0x73ff7b101bcdc22f199e8e1dd9893170a683d6897be4f1086ca05705abb886ae'],
      transactionHash: '0x249d706d226a08b554ca7b4dbf7e2653cf09137259bc869ae7200914080591e4',
      transactionIndex: '0x2f',
    },
    adapter: new LoopringAdapter(LoopringConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0xa04b5c5f10ad43d83386a0c1a14017ae0a794bb81cc4ca357789c47d00f9de43',
    sender: normalizeAddress('0x7961076f6130092c1c90bd0d2c6f7f54055fa6c7'),
    address: normalizeAddress('0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4'),
    log: {
      address: '0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4',
      blockHash: '0x78e526df48763e2ea89d6093d509f7d589721eee4b7cf9074657cc4a355e333a',
      blockNumber: '0xfe0e09',
      data: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000002d3180c2de7bdafcfba4455c2983e23beda9fceb000000000000000000000000090cecbc1e2790bc7799b2f8470348e7aafe5f1b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001711d5f853259000',
      logIndex: '0x17d',
      removed: false,
      topics: ['0x0d22d7344fc6871a839149fd89f9fd88a6c29cf797a67114772a9d4df5f8c96b'],
      transactionHash: '0xa04b5c5f10ad43d83386a0c1a14017ae0a794bb81cc4ca357789c47d00f9de43',
      transactionIndex: '0xba',
    },
    adapter: new LoopringAdapter(LoopringConfigs, null),
    action: 'withdraw',
  },
];
