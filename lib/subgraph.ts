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

export async function getBlockNumberAtTimestamp(endpoint: string, timestamp: number): Promise<number> {
  try {
    const response = await axios.post(
      endpoint,
      {
        query: `
        {
          blocks(first: 1, where: {timestamp_lte: ${timestamp}}, orderBy: timestamp, orderDirection: desc) {
            number
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

    return response.data.data.blocks.length > 0 ? Number(response.data.data.blocks[0].number) : 0;
  } catch (e: any) {
    logger.onError({
      service: 'subgraph',
      message: 'failed to query block from subgraph',
      props: {
        endpoint,
        timestamp,
      },
      error: e,
    });
  }

  return 0;
}
