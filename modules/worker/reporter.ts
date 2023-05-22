import { ReportProtocolConfigs } from '../../configs/logs';
import { getTimestamp, sleep } from '../../lib/helper';
import logger from '../../lib/logger';
import { ProtocolConfig } from '../../types/configs';
import { MongoCollections, SystemReport } from '../../types/domains';
import { GlobalProviders, IReportProvider } from '../../types/namespaces';

const SystemReportKey = 'system-report';

export class ReportProvider implements IReportProvider {
  public readonly name: string = 'worker.report';
  public configs: Array<ProtocolConfig> = ReportProtocolConfigs;
  public readonly providers: GlobalProviders;

  constructor(providers: GlobalProviders) {
    this.providers = providers;
  }

  private async getCurrentSystemReport(): Promise<SystemReport> {
    const systemReport: SystemReport = {
      timestamp: getTimestamp(),
      protocols: [],
      reports: [],
    };

    const collections: MongoCollections = await this.providers.mongodb.requireCollections();

    systemReport.protocols = await collections.logsCollection.distinct('protocol');
    for (const protocol of systemReport.protocols) {
      const count = await collections.logsCollection.countDocuments({ protocol: protocol, action: { $exists: true } });
      const latestEvents = await collections.logsCollection
        .find({ protocol: protocol })
        .sort({ timestamp: -1 })
        .limit(1)
        .toArray();
      const oldestEvents = await collections.logsCollection
        .find({ protocol: protocol })
        .sort({ timestamp: 1 })
        .limit(1)
        .toArray();

      systemReport.reports.push({
        protocol: protocol,
        latestEventTimestamp: latestEvents.length > 0 ? latestEvents[0].timestamp : 0,
        oldestEventTimestamp: oldestEvents.length > 0 ? oldestEvents[0].timestamp : 0,
        totalEventAllTime: count,
      });
    }

    return systemReport;
  }

  public async getSystemReport(): Promise<SystemReport | null> {
    const collections: MongoCollections = await this.providers.mongodb.requireCollections();

    const reports = await collections.reportsCollection.find({ name: SystemReportKey }).limit(1).toArray();
    if (reports.length > 0) {
      return {
        timestamp: reports[0].timestamp,
        protocols: reports[0].protocols,
        reports: reports[0].reports,
      };
    } else {
      return await this.getCurrentSystemReport();
    }
  }

  public async run() {
    logger.onInfo({
      service: this.name,
      message: 'start report service',
      props: {},
    });

    const collections: MongoCollections = await this.providers.mongodb.requireCollections();

    while (true) {
      const startExeTime = Math.floor(new Date().getTime() / 1000);
      const systemReports = await this.getCurrentSystemReport();
      await collections.reportsCollection.updateOne(
        {
          name: SystemReportKey,
        },
        {
          $set: {
            name: SystemReportKey,
            ...systemReports,
          },
        },
        {
          upsert: true,
        }
      );

      const endExeTime = Math.floor(new Date().getTime() / 1000);
      const elapsed = endExeTime - startExeTime;
      logger.onInfo({
        service: this.name,
        message: 'updated system reports',
        props: {
          protocols: systemReports.protocols.length,
          timestamp: systemReports.timestamp,
          elapsed: `${elapsed}s`,
        },
      });

      await sleep(300);
    }
  }
}
