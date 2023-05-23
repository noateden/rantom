import { MetricDailyStats } from '../../configs';
import logger from '../../lib/logger';
import { Token } from '../../types/configs';
import { AddressStats, ProtocolDailyStats, ProtocolStats } from '../../types/domains';
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

  public async run(): Promise<void> {
    // collect and save protocols daily stats
    const adapters = getAdapterMapping(this.providers);
    const collections = await this.providers.mongodb.requireCollections();

    logger.onInfo({
      service: this.name,
      message: 'start collecting protocol stats',
      props: {
        protocols: Object.keys(adapters).length,
      },
    });

    // for now, we collect metrics on these protocols
    // const protocols: Array<string> = ['compound', 'compoundv3', 'aavev2', 'aavev3'];
    const protocols: Array<string> = Object.keys(adapters);

    for (const protocol of protocols) {
      const startExeTime = Math.floor(new Date().getTime() / 1000);

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
    }
  }
}
