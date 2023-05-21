import { expect } from 'chai';
import { describe } from 'mocha';
import Web3 from 'web3';

import EnvConfig from '../configs/envConfig';
import { normalizeAddress } from '../lib/helper';
import { ActionTestLogs } from './configs/actionTests';

describe('parse transaction actions', async function () {
  ActionTestLogs.map((item) =>
    it(`should parse actions correctly ${(item.adapter.config.protocol + ':' + item.action).padEnd(30)} ${item.chain}:${
      item.hash
    }`, async function () {
      let input = undefined;

      if (item.adapter.name === 'adapter.metamask') {
        const web3 = new Web3(EnvConfig.blockchains[item.chain].nodeRpc);
        const transaction = await web3.eth.getTransaction(item.hash);
        input = transaction.input;
      }
      const action = await item.adapter.tryParsingActions({
        chain: item.chain,
        sender: normalizeAddress(item.sender),
        address: normalizeAddress(item.address),
        topics: item.log.topics,
        data: item.log.data,
        hash: item.hash,
        input,
      });

      expect(action).to.not.equal(null);

      if (action) {
        expect(action.action).equal(item.action);
      }
    })
  );
});
