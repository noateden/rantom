import { LooksrareConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { LooksrareAdapter } from '../../../modules/adapters/looksrare/looksrare';
import { TestLog } from '../../types';

export const LooksrareActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x24ec51cd97e9bfa81f3d0d5aabec6c5384de4cd9228cd0d0555220cc2946b26c',
    sender: normalizeAddress('0xb9ef41ca4647127e32c1e1d8fc0aa3341510e0e3'),
    address: normalizeAddress('0x59728544b08ab483533076417fbbb2fd0b17ce3a'),
    log: {
      address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
      topics: [
        '0x95fb6205e23ff6bda16a2d1dba56b9ad7c783f67c96fa149785052f47696f2be',
        '0x000000000000000000000000b9ef41ca4647127e32c1e1d8fc0aa3341510e0e3',
        '0x000000000000000000000000188b264aa1456b869c3a92eeed32117ebb835f47',
        '0x000000000000000000000000579af6fd30bf83a5ac0d636bc619f98dbdeb930c',
      ],
      data: '0x77c64c53b6394fdde7e8f74eeda90d5f6ae0cd0ab409df5a1ac0f33c377d96180000000000000000000000000000000000000000000000000000000000000021000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000bd3531da5cf5857e7cfaa92426877b022e612cf800000000000000000000000000000000000000000000000000000000000015ba00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000004ae98c66718f0000',
      blockNumber: '0xfb3b6e',
      transactionHash: '0x24ec51cd97e9bfa81f3d0d5aabec6c5384de4cd9228cd0d0555220cc2946b26c',
      transactionIndex: '0x67',
      blockHash: '0xcc03d2c4f311baa94dee08475c74e9bc89f413644077d02e6d53ec10cef035c3',
      logIndex: '0x147',
      removed: false,
    },
    adapter: new LooksrareAdapter(LooksrareConfigs, null),
    action: 'buy',
  },
  {
    chain: 'ethereum',
    hash: '0xcd27d8edbafaf7f5999bc15e10a83beada9b47d498cc10a3ef530063689a5299',
    sender: normalizeAddress('0x9a8084819c6673e087b1529e3d8a2eced8794394'),
    address: normalizeAddress('0x59728544b08ab483533076417fbbb2fd0b17ce3a'),
    log: {
      address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
      topics: [
        '0x27c4f0403323142b599832f26acd21c74a9e5b809f2215726e244a4ac588cd7d',
        '0x00000000000000000000000060e4d786628fea6478f785a6d7e704777c86a7c6',
        '0x00000000000000000000000000000000000000000000000000000000000063fa',
        '0x000000000000000000000000a858ddc0445d8131dac4d1de01f834ffcba52ef1',
      ],
      data: '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000116e3c9f130c7ff',
      blockNumber: '0xfec622',
      transactionHash: '0xcd27d8edbafaf7f5999bc15e10a83beada9b47d498cc10a3ef530063689a5299',
      transactionIndex: '0x44',
      blockHash: '0x272a45562b11486ad0206dcd4540284e9267dea20346b2737460b831a0249a40',
      logIndex: '0xb2',
      removed: false,
    },
    adapter: new LooksrareAdapter(LooksrareConfigs, null),
    action: 'collect',
  },
];
