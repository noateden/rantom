import BigNumber from 'bignumber.js';

import envConfig from '../configs/envConfig';
import { normalizeAddress } from '../lib/helper';
import MongodbProvider from '../services/mongo';

(async function () {
  const mongodb = new MongodbProvider();

  await mongodb.connect(envConfig.mongodb.connectionUri, envConfig.mongodb.databaseName);
  const collections = await mongodb.requireCollections();

  // update lending events
  const cursor = await collections.tradingActionsCollection
    .find({ protocol: { $exists: true }, blockNumber: { $lt: 16308190 } })
    .sort({ timestamp: 1 });
  while (await cursor.hasNext()) {
    const operations: Array<any> = [];
    for (let i = 0; i < 2000; i++) {
      const document = await cursor.next();
      if (document) {
        operations.push({
          updateOne: {
            filter: {
              chain: document.chain,
              contract: normalizeAddress(document.contract),
              transactionHash: document.transactionHash,
              logIndex: document.logIndex,
            },
            update: {
              $set: {
                chain: document.chain,
                contract: normalizeAddress(document.address),
                transactionHash: document.transactionHash,
                logIndex: document.logIndex,
                blockNumber: document.blockNumber,
                timestamp: document.timestamp,
                protocol: document.protocol,
                action: document.action,
                addresses: document.caller ? [document.user, document.caller] : [document.user],
                tokens: document.tokens,
                amounts: document.amounts.map((item: any, index: number) => {
                  return new BigNumber(item)
                    .dividedBy(new BigNumber(10).pow(document.tokens[index].decimals))
                    .toString(10);
                }),
                addition: document.addition,
              },
            },
            upsert: true,
          },
        });
      } else {
        break;
      }
    }

    if (operations.length > 0) {
      await collections.logsCollection.bulkWrite(operations);
      console.info(`block ${operations[operations.length - 1].updateOne.update['$set'].blockNumber}`);
    }
  }

  process.exit(0);
})();
