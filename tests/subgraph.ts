import { expect } from 'chai';
import { describe } from 'mocha';

import { BlockSubgraphs } from '../configs/constants';
import { BlockTimestamp, getBlockTimestamps } from '../lib/subgraph';

describe('subgraph', async function () {
  it('should get ethereum block from subgraph correctly', async function () {
    const result: { [key: number]: BlockTimestamp } | null = await getBlockTimestamps({
      endpoint: BlockSubgraphs.ethereum,
      fromBlock: 18326322,
      numberOfBlocks: 10,
    });

    expect(result).not.eq(null);

    if (result) {
      for (let i = 18326322; i < 18326322 + 10; i++) {
        expect(result[i].blockNumber).eq(i);
        expect(result[i].timestamp).gt(0);
      }
    }
  });

  it('should get arbitrum block from subgraph correctly', async function () {
    const result: { [key: number]: BlockTimestamp } | null = await getBlockTimestamps({
      endpoint: BlockSubgraphs.arbitrum,
      fromBlock: 139624247,
      numberOfBlocks: 10,
    });

    expect(result).not.eq(null);

    if (result) {
      for (let i = 139624247; i < 139624247 + 10; i++) {
        expect(result[i].blockNumber).eq(i);
        expect(result[i].timestamp).gt(0);
      }
    }
  });

  it('should get base block from subgraph correctly', async function () {
    const result: { [key: number]: BlockTimestamp } | null = await getBlockTimestamps({
      endpoint: BlockSubgraphs.base,
      fromBlock: 5113785,
      numberOfBlocks: 10,
    });

    expect(result).not.eq(null);

    if (result) {
      for (let i = 5113785; i < 5113785 + 10; i++) {
        expect(result[i].blockNumber).eq(i);
        expect(result[i].timestamp).gt(0);
      }
    }
  });

  it('should get optimism block from subgraph correctly', async function () {
    const result: { [key: number]: BlockTimestamp } | null = await getBlockTimestamps({
      endpoint: BlockSubgraphs.optimism,
      fromBlock: 110709700,
      numberOfBlocks: 10,
    });

    expect(result).not.eq(null);

    if (result) {
      for (let i = 110709700; i < 110709700 + 10; i++) {
        expect(result[i].blockNumber).eq(i);
        expect(result[i].timestamp).gt(0);
      }
    }
  });
});
