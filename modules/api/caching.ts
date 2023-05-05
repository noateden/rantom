import { ApiQueryLogsCachingTime } from '../../configs';
import { createDataHash } from '../../lib/crypto';
import { getTimestamp } from '../../lib/helper';
import logger from '../../lib/logger';
import { CachingProvider } from '../../services/caching';
import { GlobalProviders, IApiCachingProvider } from '../../types/namespaces';
import { ApiQueryLogOptions } from '../../types/options';

export class ApiCachingProvider extends CachingProvider implements IApiCachingProvider {
  public readonly name: string = 'api.caching';
  public readonly providers: GlobalProviders;

  constructor(providers: GlobalProviders) {
    super(providers.mongodb);

    this.providers = providers;
  }

  public async queryLogs(options: ApiQueryLogOptions): Promise<Array<any>> {
    const { query, limit, order, skip } = options;

    const cachingKey = `query-${createDataHash(
      JSON.stringify({
        query,
        order,
        limit,
        skip,
      })
    )}`;

    const cacheData = await this.getCachingData(cachingKey);
    if (cacheData) {
      const currentTime = getTimestamp();
      if (cacheData.timestamp && currentTime - cacheData.timestamp <= ApiQueryLogsCachingTime) {
        logger.onDebug({
          service: this.name,
          message: 'query hit caching',
          props: {
            cachingKey,
            ...query,
            order,
            limit,
            skip,
          },
        });
        return cacheData.events;
      }
    }

    const collections = await this.providers.mongodb.requireCollections();
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

    await this.setCachingData(cachingKey, { timestamp: getTimestamp(), events: logs });

    return logs;
  }
}
