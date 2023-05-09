import { expect } from 'chai';
import { describe } from 'mocha';

import EthereumTokens from '../configs/tokens/ethereum.json';
import { getTimestamp } from '../lib/helper';
import { OracleProvider } from '../modules/oracles/oracle';
import { Token } from '../types/configs';

const tokens: Array<Token> = [
  EthereumTokens.NativeCoin,
  EthereumTokens.WETH,
  EthereumTokens.WBTC,
  EthereumTokens.USDC,
  EthereumTokens.USDT,
  EthereumTokens.DAI,
  EthereumTokens.LUSD,
  EthereumTokens.MATIC,
  EthereumTokens.MANA,
  EthereumTokens.COMP,
  EthereumTokens.AAVE,
];

const oracle = new OracleProvider(null);

describe('oracles', async function () {
  tokens.map((token) =>
    it(`can get token price ${token.address}`, async function () {
      const result = await oracle.getTokenSpotPriceUsd({
        chain: token.chain,
        address: token.address,
        timestamp: getTimestamp(),
      });

      expect(result.sources.length).not.equal(0);
    })
  );
});
