import { expect } from 'chai';
import { describe } from 'mocha';

import { getAdapters } from '../../modules/adapters';
import BlockchainService from '../../services/blockchains/blockchain';
import DatabaseService from '../../services/database/database';
import Datastore from '../../services/datastore/datastore';
import { IAdapter } from '../../types/namespaces';

const Uniswapv2Tests: Array<any> = [
  {
    adapter: 'uniswapv2',
    chain: 'ethereum',
    log: {
      address: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      topics: [
        '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
        '0x000000000000000000000000ef1c6e67703c7bd7107eed8303fbe6ec2554bf6b',
        '0x000000000000000000000000d5bd3e2b8984c7e553740913cc7c0fd9bb08bae2',
      ],
      data: '0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008b889f2b1192ba6',
      blockNumber: '0xfdd1e1',
      transactionHash: '0xa6ec71c145dae26aea69b0ba4a863b984ddfcd3f9c15b3bca559f096234e7daf',
      transactionIndex: '0xbc',
      blockHash: '0x968a3116eec86303e343e1aa52bf89178367254cba3c50041a09ad8729fb7536',
      logIndex: '0xbe',
      removed: false,
    },
    result: {
      action: 'swap',
    },
  },
  {
    adapter: 'uniswapv2',
    chain: 'ethereum',
    log: {
      address: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      topics: [
        '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
        '0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000000249f000000000000000000000000000000000000000000000000000005ad4479e7602',
      blockNumber: '0xfdad4c',
      transactionHash: '0xdc0c85e9fab5d91eb96d4d8cfebee101560deecb72246589e32e84cf40a77101',
      transactionIndex: '0xd9',
      blockHash: '0x78fd03722e6e025da17ceba84c334066614495b90e562887945e138c6014812e',
      logIndex: '0xe0',
      removed: false,
    },
    result: {
      action: 'deposit',
    },
  },
  {
    adapter: 'uniswapv2',
    chain: 'ethereum',
    log: {
      address: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      topics: [
        '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496',
        '0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d',
        '0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000122e10af00000000000000000000000000000000000000000000000002ba91e25902d1f4',
      blockNumber: '0xfdc6a7',
      transactionHash: '0x18bef2d6a8c9946334bbefcb7caaed2e208d5bdc41664d6513b2b39bd49a2c7f',
      transactionIndex: '0x67',
      blockHash: '0xe27c7eb9ba1ed22984b8121cf91c6a5b7d55b90e5c476963bdd20723161ab61d',
      logIndex: '0xdc',
      removed: false,
    },
    result: {
      action: 'withdraw',
    },
  },
];

const database = new DatabaseService();
const blockchain = new BlockchainService(null);
const datastore = new Datastore();

describe('uniswapv2', async function () {
  Uniswapv2Tests.map((testCase: any) =>
    it(`should parse action correctly - ${testCase.log.topics[0]}:${testCase.result.action}`, async function () {
      const adapter: IAdapter = getAdapters({
        database: database,
        datastore: datastore,
        blockchain: blockchain,
      })[testCase.adapter];
      const result = await adapter.parseEventLog({
        chain: testCase.chain,
        log: testCase.log,
        allLogs: [],
      });

      expect(result.length).equal(1);
      expect(result[0].action).equal(testCase.result.action);
    })
  );
});
