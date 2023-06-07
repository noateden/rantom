import { SparkConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Aavev3Adapter } from '../../../modules/adapters/aave/aavev3';
import { TestLog } from '../../types';

export const SparkActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x468b4f93ff234f888ad4ad87bdbac8283e103ae613f200ae6f0d57eef9db418d',
    sender: normalizeAddress('0x788e066697f1a792b35e8f95747c11e4e2a85616'),
    address: normalizeAddress('0xc13e21b648a5ee794902342038ff3adab66be987'),
    log: {
      address: '0xc13e21b648a5ee794902342038ff3adab66be987',
      topics: [
        '0x2b627736bca15cd5381dcf80b0bf11fd197d01a037c52b927a881a10fb73ba61',
        '0x0000000000000000000000007f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
        '0x000000000000000000000000788e066697f1a792b35e8f95747c11e4e2a85616',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
      data: '0x000000000000000000000000788e066697f1a792b35e8f95747c11e4e2a8561600000000000000000000000000000000000000000000000067a849c8375ac102',
      blockNumber: '0x1081675',
      transactionHash: '0x468b4f93ff234f888ad4ad87bdbac8283e103ae613f200ae6f0d57eef9db418d',
      transactionIndex: '0x7c',
      blockHash: '0x88a75f2bd59b5166613239cf0787417effc6bcf92b18b9ef67cb1184750a9b30',
      logIndex: '0xf0',
      removed: false,
    },
    adapter: new Aavev3Adapter(SparkConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x5c84a9af828dfa5661573bd61e796d0817efe20ef9c84f26bd123f4f316a6ef9',
    sender: normalizeAddress('0x52a8305f29f85bec5fa6ee78b87ddd2218d8e12e'),
    address: normalizeAddress('0xc13e21b648a5ee794902342038ff3adab66be987'),
    log: {
      address: '0xc13e21b648a5ee794902342038ff3adab66be987',
      topics: [
        '0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7',
        '0x0000000000000000000000007f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
        '0x00000000000000000000000052a8305f29f85bec5fa6ee78b87ddd2218d8e12e',
        '0x00000000000000000000000052a8305f29f85bec5fa6ee78b87ddd2218d8e12e',
      ],
      data: '0x000000000000000000000000000000000000000000000000271f8adab4c66df9',
      blockNumber: '0x107def8',
      transactionHash: '0x5c84a9af828dfa5661573bd61e796d0817efe20ef9c84f26bd123f4f316a6ef9',
      transactionIndex: '0x98',
      blockHash: '0x58651771a6472a2b57aefbf10725f5b23dd7d7192832f02e619282c1ce1273c2',
      logIndex: '0xe8',
      removed: false,
    },
    adapter: new Aavev3Adapter(SparkConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0xfeaeb27ad3670b5a9cffbd0dc95ff484881fa6b1e18ac96cacc6b203148147a6',
    sender: normalizeAddress('0xd7efae6e8e0556ebb5e77a499a34fce6a4d8c722'),
    address: normalizeAddress('0xc13e21b648a5ee794902342038ff3adab66be987'),
    log: {
      address: '0xc13e21b648a5ee794902342038ff3adab66be987',
      topics: [
        '0xb3d084820fb1a9decffb176436bd02558d15fac9b0ddfed8c465bc7359d7dce0',
        '0x0000000000000000000000007f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
        '0x000000000000000000000000d7efae6e8e0556ebb5e77a499a34fce6a4d8c722',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
      data: '0x000000000000000000000000d7efae6e8e0556ebb5e77a499a34fce6a4d8c72200000000000000000000000000000000000000000000000004db73254763000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000223a547d823ee247c20a3',
      blockNumber: '0x107e0e7',
      transactionHash: '0xfeaeb27ad3670b5a9cffbd0dc95ff484881fa6b1e18ac96cacc6b203148147a6',
      transactionIndex: '0x72',
      blockHash: '0xdcef4438c79fa3127d619c96c77e28ad243b4b15bfa84707694301aa6f67b9cb',
      logIndex: '0x13c',
      removed: false,
    },
    adapter: new Aavev3Adapter(SparkConfigs, null),
    action: 'borrow',
  },
  {
    chain: 'ethereum',
    hash: '0xb2d9737b9f5e70b64ad5fdc5cd7c9edf50d6e267b170a2f097bacccb9d0c2bc9',
    sender: normalizeAddress('0x53ab1cc07738f15105ae56d8cd61ea36af9a91a0'),
    address: normalizeAddress('0xc13e21b648a5ee794902342038ff3adab66be987'),
    log: {
      address: '0xc13e21b648a5ee794902342038ff3adab66be987',
      topics: [
        '0xa534c8dbe71f871f9f3530e97a74601fea17b426cae02e1c5aee42c96c784051',
        '0x0000000000000000000000006b175474e89094c44da98b954eedeac495271d0f',
        '0x00000000000000000000000053ab1cc07738f15105ae56d8cd61ea36af9a91a0',
        '0x00000000000000000000000053ab1cc07738f15105ae56d8cd61ea36af9a91a0',
      ],
      data: '0x000000000000000000000000000000000000000000000111a2bfc0413ee6c2cb0000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0x107a8b5',
      transactionHash: '0xb2d9737b9f5e70b64ad5fdc5cd7c9edf50d6e267b170a2f097bacccb9d0c2bc9',
      transactionIndex: '0x5f',
      blockHash: '0x060f30312377d246a3b4088e9a578d7a0c55756b774a9ca51995bf3c7974e6af',
      logIndex: '0x9f',
      removed: false,
    },
    adapter: new Aavev3Adapter(SparkConfigs, null),
    action: 'repay',
  },
  {
    chain: 'ethereum',
    hash: '0xf0467b2d75a3d7ba8465fdea6194353027398d287513af5558b949ec16283bed',
    sender: normalizeAddress('0xc0ffeebabe5d496b2dde509f9fa189c25cf29671'),
    address: normalizeAddress('0xc13e21b648a5ee794902342038ff3adab66be987'),
    log: {
      address: '0xc13e21b648a5ee794902342038ff3adab66be987',
      topics: [
        '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286',
        '0x00000000000000000000000083f20f44975d03b1b09e64809b757c47f942beea',
        '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0x00000000000000000000000052a8305f29f85bec5fa6ee78b87ddd2218d8e12e',
      ],
      data: '0x0000000000000000000000000000000000000000000000002080bbffde1379290000000000000000000000000000000000000000000000f064cef4cd9adee81c000000000000000000000000f9a001d5b2c7c5e45693b41fcf931b94e680cac40000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0x108454b',
      transactionHash: '0xf0467b2d75a3d7ba8465fdea6194353027398d287513af5558b949ec16283bed',
      transactionIndex: '0x5',
      blockHash: '0xf893699f96e029d924c8f5c7b224a5993f5ebb2b9b093bbbe837bef8292c634e',
      logIndex: '0x2b',
      removed: false,
    },
    adapter: new Aavev3Adapter(SparkConfigs, null),
    action: 'liquidate',
  },
];