import { createDataHash } from '../../lib/crypto';
import { getTimestamp } from '../../lib/helper';
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
      if (caching.timestamp && caching.timestamp - currentTime <= 300) {
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

  public async run(): Promise<void> {}
}
