import { expect } from 'chai';
import { describe } from 'mocha';

import { normalizeAddress } from '../lib/helper';
import { ActionTestLogs } from './configs/actionTests';

// const ActionTestLogs: Array<any> = [];

describe('parse transaction actions', async function () {
  ActionTestLogs.map((item) =>
    it(`should parse actions correctly ${(item.adapter.config.protocol + ':' + item.action).padEnd(30)} ${item.chain}:${
      item.hash
    }`, async function () {
      const action = await item.adapter.tryParsingActions({
        chain: item.chain,
        sender: normalizeAddress(item.sender),
        address: normalizeAddress(item.address),
        topics: item.log.topics,
        data: item.log.data,
        hash: item.hash,
      });

      expect(action).to.not.equal(null);

      if (action) {
        expect(action.action).equal(item.action);
      }
    })
  );
});
