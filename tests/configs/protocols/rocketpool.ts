import { RocketpoolConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { RocketpoolAdapter } from '../../../modules/adapters/rocketpool/rocketpool';
import { TestLog } from '../../types';

export const RocketpoolActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x0ddd7e5ec4bd3da66842fef2e268ba967385d7dce64c76a342dadcfd6a1b3a31',
    sender: normalizeAddress('0xba19d7c0621ffbdcdef0139c6d0d3bb2ffcd08d4'),
    address: normalizeAddress('0xae78736cd615f374d3085123a210448e74fc6393'),
    log: {
      address: '0xae78736cd615f374d3085123a210448e74fc6393',
      blockHash: '0xc6bf9079fef7d96d979df9ed6424c1acfb778c4aeaadabf6589b9f2d042f2a7a',
      blockNumber: '0xfdd3bc',
      data: '0x000000000000000000000000000000000000000000000000d1a1604e405628a0000000000000000000000000000000000000000000000000ddeeff45500c00000000000000000000000000000000000000000000000000000000000063ecef97',
      logIndex: '0xe',
      removed: false,
      topics: [
        '0x6155cfd0fd028b0ca77e8495a60cbe563e8bce8611f0aad6fedbdaafc05d44a2',
        '0x0000000000000000000000007001beab783ddd9b68ab073578bdc3a65f7fdd6d',
      ],
      transactionHash: '0x0ddd7e5ec4bd3da66842fef2e268ba967385d7dce64c76a342dadcfd6a1b3a31',
      transactionIndex: '0x1',
    },
    adapter: new RocketpoolAdapter(RocketpoolConfigs, null),
    action: 'stake',
  },
  {
    chain: 'ethereum',
    hash: '0xda7cc4a66382f9a713dc2c8a05d7d3242bf1e3436795ca02e5c3d07606c4b7f9',
    sender: normalizeAddress('0x32118e0e825e0292a5baffbec7d874e3eb749e0c'),
    address: normalizeAddress('0xae78736cd615f374d3085123a210448e74fc6393'),
    log: {
      address: '0xae78736cd615f374d3085123a210448e74fc6393',
      blockHash: '0x59d3027ee3d693da2afd940e6f76f76098996fb579ab52f4e0838a0b79ba6ed2',
      blockNumber: '0xfdd456',
      data: '0x000000000000000000000000000000000000000000000000018f93167eedb90c00000000000000000000000000000000000000000000000001a711fb574f443e0000000000000000000000000000000000000000000000000000000063ecf6db',
      logIndex: '0x65',
      removed: false,
      topics: [
        '0x19783b34589160c168487dc7f9c51ae0bcefe67a47d6708fba90f6ce0366d3d1',
        '0x00000000000000000000000080ca99d65a8855cb20e44a5e9b6c6abf71e3739d',
      ],
      transactionHash: '0xda7cc4a66382f9a713dc2c8a05d7d3242bf1e3436795ca02e5c3d07606c4b7f9',
      transactionIndex: '0x1d',
    },
    adapter: new RocketpoolAdapter(RocketpoolConfigs, null),
    action: 'unstake',
  },
];
