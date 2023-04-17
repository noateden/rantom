import { createDataHash } from '../../lib/crypto';
import { getTimestamp, sleep } from '../../lib/helper';
import logger from '../../lib/logger';
import { GlobalProviders, ISmartApiProvider } from '../../types/namespaces';
import { SmartApiQueryLogOptions } from '../../types/options';

export class SmartApiProvider implements ISmartApiProvider {
  public readonly name: string = 'smartapi';
  public readonly providers: GlobalProviders;

  constructor(providers: GlobalProviders) {
    this.providers = providers;
  }

  public async queryLogs(options: SmartApiQueryLogOptions): Promise<Array<any>> {
    const { query, limit, order, skip } = options;

    const cachingKey = `query-${createDataHash(
      JSON.stringify({
        query,
        order,
        limit,
        skip,
      })
    )}`;

    const collections = await this.providers.mongodb.requireCollections();
    const cachingLogs = await collections.cachingCollection.find({ name: cachingKey }).limit(1).toArray();
    if (cachingLogs.length > 0) {
      const caching = cachingLogs[0];
      const currentTime = getTimestamp();
      if (caching.timestamp && currentTime - caching.timestamp <= 300) {
        logger.onDebug({
          service: this.name,
          message: 'query hit caching',
          props: {
            query: cachingKey,
          },
        });
        return caching.events;
      }
    }

    const logs: Array<any> = [];
    const events: Array<any> = await collections.logsCollection
      .find(query)
      .limit(limit)
      .skip(skip)
      .sort({ timestamp: order === 1 ? 1 : -1 })
      .toArray();
    for (let event of events) {
      delete event._id;
      logs.push(event);
    }

    // save cache
    await collections.cachingCollection.updateOne(
      {
        name: cachingKey,
      },
      {
        $set: {
          timestamp: getTimestamp(),
          events: logs,
        },
      },
      { upsert: true }
    );

    return logs;
  }

  public async run(): Promise<void> {
    while (true) {
      await this.queryLogs({
        query: {},
        order: -1,
        limit: 1000,
        skip: 0,
      });

      logger.onInfo({
        service: this.name,
        message: 'update caching api data',
        props: {},
      });

      await sleep(2 * 60);
    }
  }
}
