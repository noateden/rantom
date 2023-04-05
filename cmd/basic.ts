import envConfig from '../configs/envConfig';
import { OracleProvider } from '../modules/oracles/oracle';
import { CachingProvider } from '../services/caching';
import MongodbProvider from '../services/mongo';
import SentryProvider from '../services/sentry';
import { Web3HelperProvider } from '../services/web3';
import { GlobalProviders } from '../types/namespaces';

export class BasicCommand {
  public readonly name: string = 'command';
  public readonly describe: string = 'Basic command';

  constructor() {}

  public async getProviders(): Promise<GlobalProviders> {
    const mongodb = new MongodbProvider();

    const providers: GlobalProviders = {
      mongodb: mongodb,
      sentry: new SentryProvider(process.env.RANTOM_SENTRY_DNS as string),
      caching: new CachingProvider(mongodb),
      web3Helper: new Web3HelperProvider(mongodb),
      oracle: new OracleProvider(mongodb),
    };

    await providers.mongodb.connect(envConfig.mongodb.connectionUri, envConfig.mongodb.databaseName);

    return providers;
  }

  public async execute(argv: any) {}
  public setOptions(yargs: any) {}
}
