import { ApiQueryLogsCachingTime, ApiQueryProtocolStatsCachingTime } from '../../configs';
import { createDataHash } from '../../lib/crypto';
import { getTimestamp, sleep } from '../../lib/helper';
import logger from '../../lib/logger';
import { ProtocolStats } from '../../types/domains';
import { GlobalProviders, IApiWorkerProvider } from '../../types/namespaces';
import { ApiQueryLogOptions, ApiQueryProtocolStatsOptions } from '../../types/options';

export class ApiWorkerProvider implements IApiWorkerProvider {
  public readonly name: string = 'worker.api';
  public readonly providers: GlobalProviders;

  constructor(providers: GlobalProviders) {
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

    const collections = await this.providers.mongodb.requireCollections();
    const cachingLogs = await collections.cachingCollection.find({ name: cachingKey }).limit(1).toArray();
    if (cachingLogs.length > 0) {
      const caching = cachingLogs[0];
      const currentTime = getTimestamp();
      if (caching.timestamp && currentTime - caching.timestamp <= ApiQueryLogsCachingTime) {
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

  public async queryProtocolStats(options: ApiQueryProtocolStatsOptions): Promise<ProtocolStats> {
    const { protocol } = options;

    const protocolStats: ProtocolStats = {
      protocol: protocol,
      actions: [],
      tokens: [],
    };

    const cachingKey = `protocol-stats-${protocol}`;
    const collections = await this.providers.mongodb.requireCollections();
    const cachingLogs = await collections.cachingCollection.find({ name: cachingKey }).limit(1).toArray();
    if (cachingLogs.length > 0) {
      const caching = cachingLogs[0];
      const currentTime = getTimestamp();
      if (caching.timestamp && currentTime - caching.timestamp <= ApiQueryProtocolStatsCachingTime) {
        logger.onDebug({
          service: this.name,
          message: 'query protocol stats hit caching',
          props: {
            protocol: protocol,
          },
        });
        return caching.protocolStats;
      }
    }

    // get unique actions
    const actions: Array<any> = await collections.logsCollection
      .aggregate([
        {
          $group: { _id: { protocol: '$protocol', action: '$action' } },
        },
        {
          $match: { '_id.protocol': protocol },
        },
      ])
      .toArray();
    for (const action of actions) {
      protocolStats.actions.push(action._id.action);
    }

    // get unique tokens
    const tokens: Array<any> = await collections.logsCollection
      .aggregate([
        { $unwind: '$tokens' },
        { $group: { _id: { protocol: '$protocol', token: '$tokens.symbol' } } },
        {
          $match: { '_id.protocol': protocol },
        },
      ])
      .toArray();
    for (const token of tokens) {
      protocolStats.tokens.push(token._id.token);
    }

    protocolStats.actions = protocolStats.actions.sort(function (a: string, b: string) {
      return a > b ? 1 : -1;
    });
    protocolStats.tokens = protocolStats.tokens.sort(function (a: string, b: string) {
      return a > b ? 1 : -1;
    });

    // save cache
    await collections.cachingCollection.updateOne(
      {
        name: cachingKey,
      },
      {
        $set: {
          timestamp: getTimestamp(),
          protocolStats: protocolStats,
        },
      },
      { upsert: true }
    );

    return protocolStats;
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
        message: 'update feed caching data',
        props: {},
      });

      await sleep(2 * 60);
    }
  }
}
