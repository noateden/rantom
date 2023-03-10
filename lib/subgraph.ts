import axios from 'axios';

import { sleep } from './helper';
import logger from './logger';

export interface GetBlockTimestampOptions {
  endpoint: string;
  fromBlock: number;
  numberOfBlocks: number; // default 2000
}

export interface BlockTimestamp {
  blockNumber: number;
  timestamp: number;
}

export async function getBlockTimestamps(
  options: GetBlockTimestampOptions
): Promise<{ [key: number]: BlockTimestamp } | null> {
  const blockTimestamps: { [key: number]: BlockTimestamp } = {};

  let startBlock = options.fromBlock;
  const endBlock = options.fromBlock + options.numberOfBlocks;

  const queryLimit = 1000;
  while (startBlock <= endBlock) {
    try {
      const response = await axios.post(
        options.endpoint,
        {
          query: `
        {
          blocks(first: ${queryLimit}, where: {number_gte: ${startBlock}}, orderBy: number, orderDirection: asc) {
            number
            timestamp
          }
        }
      `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.errors) {
        throw Error(`query subgraph error: ${response.data.errors.toString()}`);
      }

      for (const block of response.data.data.blocks) {
        blockTimestamps[Number(block.number)] = {
          blockNumber: Number(block.number),
          timestamp: Number(Number(block.timestamp)),
        };
      }

      startBlock += queryLimit;
    } catch (e: any) {
      logger.onError({
        service: 'subgraph',
        message: 'failed to query block timestamp from subgraph',
        props: {
          ...options,
        },
        error: e,
      });

      await sleep(5);
    }
  }

  return blockTimestamps;
}
