import { ArrakisConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { ArrakisAdapter } from '../../../modules/adapters/arrakis/arrakis';
import { TestLog } from '../../types';

export const ArrakisActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xced0955ee875b62375a02409895cb241851868b60fbd6f31843aaa89dd8d58ba',
    sender: normalizeAddress('0xe73a07ca4d384ce4b70e8eb877b122f7bf50b6e5'),
    address: normalizeAddress('0xdf367477c5e596af88e8797c3cde8e28854cb79c'),
    log: {
      address: '0xdf367477c5e596af88e8797c3cde8e28854cb79c',
      topics: ['0x55801cfe493000b734571da1694b21e7f66b11e8ce9fdaa0524ecb59105e73e7'],
      data: '0x000000000000000000000000e73a07ca4d384ce4b70e8eb877b122f7bf50b6e500000000000000000000000000000000000000000000000000000005fac8e944000000000000000000000000000000000000000000000000000000000074085a00000000000000000000000000000000000000000000000000000002b148a93c0000000000000000000000000000000000000000000000000000000604b8f9d0',
      blockNumber: '0x1023b57',
      transactionHash: '0xced0955ee875b62375a02409895cb241851868b60fbd6f31843aaa89dd8d58ba',
      transactionIndex: '0x3e',
      blockHash: '0x0311a49e9664109fa6544488e2518d8134e99f117b7573f3e78dac48bae11543',
      logIndex: '0x6d',
      removed: false,
    },
    adapter: new ArrakisAdapter(ArrakisConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x6910622fb2eaaf8031fac3c39d62a0887cc1b8820e5570281208962884e3a287',
    sender: normalizeAddress('0xe545a26dd6acbc146b80981bfc969d5d47959c0b'),
    address: normalizeAddress('0xdf367477c5e596af88e8797c3cde8e28854cb79c'),
    log: {
      address: '0xdf367477c5e596af88e8797c3cde8e28854cb79c',
      topics: ['0x7239dff1718b550db7f36cbf69c665cfeb56d0e96b4fb76a5cba712961b65509'],
      data: '0x000000000000000000000000e545a26dd6acbc146b80981bfc969d5d47959c0b00000000000000000000000000000000000000000000000000000400746fe00000000000000000000000000000000000000000000000000000000000162c2c240000000000000000000000000000000000000000000000000000028bb6df07bd000000000000000000000000000000000000000000000000000004064a5f8aba',
      blockNumber: '0x1049496',
      transactionHash: '0x6910622fb2eaaf8031fac3c39d62a0887cc1b8820e5570281208962884e3a287',
      transactionIndex: '0x12',
      blockHash: '0x2cf98f593df9e01518a4a595951555be5ac32d8de0818f77b601df63cf3c7c83',
      logIndex: '0x70',
      removed: false,
    },
    adapter: new ArrakisAdapter(ArrakisConfigs, null),
    action: 'withdraw',
  },
];
