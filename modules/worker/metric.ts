import { MetricDailyStats, MetricSnapshotStats } from '../../configs';
import { getStartDayTimestamp, getTimestamp } from '../../lib/helper';
import logger from '../../lib/logger';
import { Token } from '../../types/configs';
import { AddressStats, ProtocolDailyStats, ProtocolSnapshotStats, ProtocolStats } from '../../types/domains';
import { GlobalProviders, IMetricProvider } from '../../types/namespaces';
import { getAdapterMapping } from '../adapters';

export class MetricProvider implements IMetricProvider {
  public readonly name: string = 'worker.metric';
  public providers: GlobalProviders;

  constructor(providers: GlobalProviders) {
    this.providers = providers;
  }

  public async getProtocolStats(protocol: string): Promise<ProtocolStats> {
    const collections = await this.providers.mongodb.requireCollections();
    const documents: Array<any> = await collections.logsCollection
      .aggregate([
        {
          $unwind: '$tokens',
        },
        {
          $group: { _id: { protocol: '$protocol', action: '$action', token: '$tokens' } },
        },
        {
          $match: { '_id.protocol': protocol },
        },
      ])
      .toArray();

    const metrics: ProtocolStats = {
      protocol,
      actions: [],
      tokens: [],
    };

    const actions: { [key: string]: boolean } = {};
    const tokens: { [key: string]: boolean } = {};
    for (const document of documents) {
      if (!actions[document._id.action]) {
        metrics.actions.push(document._id.action);
        actions[document._id.action] = true;
      }

      const tokenKey = `${document._id.token.chain}:${document._id.token.address}`;
      if (!tokens[tokenKey]) {
        metrics.tokens.push(document._id.token as Token);
        tokens[tokenKey] = true;
      }
    }

    return metrics;
  }

  public async getAddressStats(address: string): Promise<AddressStats> {
    const collections = await this.providers.mongodb.requireCollections();
    const documents: Array<any> = await collections.logsCollection
      .aggregate([
        {
          $unwind: '$addresses',
        },
        {
          $unwind: '$tokens',
        },
        {
          $group: { _id: { address: '$addresses', protocol: '$protocol', action: '$action', token: '$tokens' } },
        },
        {
          $match: { '_id.address': address },
        },
      ])
      .toArray();

    const metrics: AddressStats = {
      address: address,
      protocols: [],
      actions: [],
      tokens: [],
    };

    const protocols: { [key: string]: boolean } = {};
    const actions: { [key: string]: boolean } = {};
    const tokens: { [key: string]: boolean } = {};
    for (const document of documents) {
      if (!actions[document._id.action]) {
        metrics.actions.push(document._id.action);
        actions[document._id.action] = true;
      }

      if (!protocols[document._id.protocol]) {
        metrics.protocols.push(document._id.protocol);
        protocols[document._id.protocol] = true;
      }

      const tokenKey = `${document._id.token.chain}:${document._id.token.address}`;
      if (!tokens[tokenKey]) {
        metrics.tokens.push(document._id.token as Token);
        tokens[tokenKey] = true;
      }
    }

    return metrics;
  }

  public async getProtocolDailyStats(protocol: string): Promise<ProtocolDailyStats | null> {
    const collections = await this.providers.mongodb.requireCollections();
    const stats = await collections.metricsCollection.find({ protocol, metric: MetricDailyStats }).toArray();
    if (stats.length > 0) {
      return {
        protocol: protocol,
        timestampFrom: stats[0].timestampFrom,
        timestamp: stats[0].timestamp,
        totalEventCount: stats[0].totalEventCount,
        totalTransactionCount: stats[0].totalTransactionCount,
        volumeUsdByActions: stats[0].volumeUsdByActions,
        eventCountByActions: stats[0].eventCountByActions,
      };
    }

    return null;
  }

  public async getProtocolSnapshotStats(protocol: string): Promise<Array<ProtocolSnapshotStats>> {
    const collections = await this.providers.mongodb.requireCollections();
    const stats = await collections.metricsCollection
      .find({ protocol, metric: MetricSnapshotStats })
      .sort({ timestamp: -1 })
      .toArray();
    const metrics: Array<ProtocolSnapshotStats> = [];
    for (const stat of stats) {
      metrics.push({
        protocol: protocol,
        timestamp: stat.timestamp,
        totalEventCount: stat.totalEventCount,
        totalTransactionCount: stat.totalTransactionCount,
        eventCountByActions: stat.eventCountByActions,
      });
    }

    return metrics;
  }

  public async run(): Promise<void> {
    // collect and save protocols daily stats
    const adapters = getAdapterMapping(this.providers);
    const collections = await this.providers.mongodb.requireCollections();

    // for now, we collect metrics on these protocols
    // const protocols: Array<string> = ['compound', 'compoundv3', 'aavev2', 'aavev3'];
    const protocols: Array<string> = Object.keys(adapters);

    for (const protocol of protocols) {
      logger.onInfo({
        service: this.name,
        message: 'start collecting protocol stats',
        props: {
          protocol: protocol,
        },
      });

      // update daily stats
      let startExeTime = Math.floor(new Date().getTime() / 1000);

      const dailyStats = await adapters[protocol].getDailyStats();
      if (dailyStats) {
        await collections.metricsCollection.updateOne(
          {
            metric: MetricDailyStats,
            protocol: dailyStats.protocol,
          },
          {
            $set: {
              ...dailyStats,
            },
          },
          { upsert: true }
        );

        const endExeTime = Math.floor(new Date().getTime() / 1000);
        const elapsed = endExeTime - startExeTime;
        logger.onInfo({
          service: this.name,
          message: 'updated protocol daily stats',
          props: {
            protocol: dailyStats.protocol,
            timestamp: dailyStats.timestamp,
            eventCount: dailyStats.totalEventCount,
            txnCount: dailyStats.totalTransactionCount,
            elapsed: `${elapsed}s`,
          },
        });
      }

      // update snapshots
      let startTime = 0;
      const snapshots = await collections.metricsCollection
        .find({ protocol, metric: MetricSnapshotStats })
        .sort({ timestamp: -1 })
        .limit(1)
        .toArray();
      if (snapshots.length > 0) {
        startTime = snapshots[0].timestamp;
      } else {
        const logs = await collections.logsCollection.find({ protocol }).sort({ timestamp: 1 }).limit(1).toArray();
        if (logs.length > 0) {
          startTime = logs[0].timestamp;
        }
      }

      if (startTime > 0) {
        startTime = getStartDayTimestamp(startTime);
      } else {
        logger.onWarn({
          service: this.name,
          message: 'cannot find start time to start get snapshots',
          props: {
            protocol,
          },
        });
        continue;
      }

      const currentTime = getTimestamp();

      logger.onInfo({
        service: this.name,
        message: 'start collecting protocol snapshots',
        props: {
          protocol: protocol,
          startTime: startTime,
        },
      });

      while (startTime <= currentTime) {
        startExeTime = Math.floor(new Date().getTime() / 1000);
        const snapshotStats: ProtocolSnapshotStats | null = await adapters[protocol].getSnapshotStats(
          startTime,
          startTime + 24 * 60 * 60 - 1
        );
        if (snapshotStats) {
          snapshotStats.timestamp = startTime;
          await collections.metricsCollection.updateOne(
            {
              protocol: protocol,
              metric: MetricSnapshotStats,
              timestamp: startTime,
            },
            {
              $set: {
                ...snapshotStats,
              },
            },
            { upsert: true }
          );

          const endExeTime = Math.floor(new Date().getTime() / 1000);
          const elapsed = endExeTime - startExeTime;
          logger.onInfo({
            service: this.name,
            message: 'updated protocol snapshot stats',
            props: {
              protocol: snapshotStats.protocol,
              timestamp: snapshotStats.timestamp,
              eventCount: snapshotStats.totalEventCount,
              txnCount: snapshotStats.totalTransactionCount,
              elapsed: `${elapsed}s`,
            },
          });
        }

        startTime += 24 * 60 * 60;
      }
    }
  }
}
