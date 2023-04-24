import { LidoConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { LidoAdapter } from '../../../modules/adapters/lido/lido';
import { TestLog } from '../../types';

export const LidoActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x9db49a13181e9e175c151012c23d44abd90780e3c6b9f75e63294040b6b71c8c',
    sender: normalizeAddress('0x9dae4be9c669206a710484539bbf7daccce2ff53'),
    address: normalizeAddress('0xae7ab96520de3a18e5e111b5eaab095312d7fe84'),
    log: {
      address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
      topics: [
        '0x96a25c8ce0baabc1fdefd93e9ed25d8e092a3332f3aa9a41722b5697231d1d1a',
        '0x0000000000000000000000009dae4be9c669206a710484539bbf7daccce2ff53',
      ],
      data: '0x000000000000000000000000000000000000000000000000008a93e1abff54220000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0xfdd286',
      transactionHash: '0x9db49a13181e9e175c151012c23d44abd90780e3c6b9f75e63294040b6b71c8c',
      transactionIndex: '0x74',
      blockHash: '0xe6e61a7695905473c4164da9f39b15c66e666b90653f944ee3ed1f9dc551e182',
      logIndex: '0xdf',
      removed: false,
    },
    adapter: new LidoAdapter(LidoConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x38f8bc5bbcb80155d7de1d4100700299763974816aeefcaea112785c82b5450f',
    sender: normalizeAddress('0xff7d4ce4f407478f4b2d31361d8bf9e6821a2f7e'),
    address: normalizeAddress('0x9ee91f9f426fa633d227f7a9b000e28b9dfd8599'),
    log: {
      address: '0x9ee91f9f426fa633d227f7a9b000e28b9dfd8599',
      topics: [
        '0x98d2bc018caf34c71a8f920d9d93d4ed62e9789506b74087b48570c17b28ed99',
        '0x000000000000000000000000ff7d4ce4f407478f4b2d31361d8bf9e6821a2f7e',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
      data: '0x00000000000000000000000000000000000000000001a784379d99db42000000',
      blockNumber: '0x1052d2d',
      transactionHash: '0x38f8bc5bbcb80155d7de1d4100700299763974816aeefcaea112785c82b5450f',
      transactionIndex: '0x7c',
      blockHash: '0xcb54c78d85564b031c266481ab1d22f2748abcff01f357b9576d4d85d2bf3bf7',
      logIndex: '0x1b3',
      removed: false,
    },
    adapter: new LidoAdapter(LidoConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x0008617e1abe57a74e0e1bb3073fe3dfe4cafdc5e150074216bd003ed5a2af31',
    sender: normalizeAddress('0x76f083d4c84011d5a07eb53f5b3124d565853190'),
    address: normalizeAddress('0x9ee91f9f426fa633d227f7a9b000e28b9dfd8599'),
    log: {
      address: '0x9ee91f9f426fa633d227f7a9b000e28b9dfd8599',
      topics: [
        '0xaca94a3466fab333b79851ab29b0715612740e4ae0d891ef8e9bd2a1bf5e24dd',
        '0x00000000000000000000000076f083d4c84011d5a07eb53f5b3124d565853190',
        '0x00000000000000000000000000000000000000000000000000000000000004b3',
        '0x00000000000000000000000000000000000000000000000564c712410d9c19ed',
      ],
      data: '0x0000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0x1052a9b',
      transactionHash: '0x0008617e1abe57a74e0e1bb3073fe3dfe4cafdc5e150074216bd003ed5a2af31',
      transactionIndex: '0x29',
      blockHash: '0x3ce1b082a4e3c992a71b8c12090989ad683cf59acbd8e9d094543191597d4c4c',
      logIndex: '0x53',
      removed: false,
    },
    adapter: new LidoAdapter(LidoConfigs, null),
    action: 'withdraw',
  },
];
