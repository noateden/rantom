import envConfig from '../configs/envConfig';
import MongodbProvider from '../services/mongo';
import SentryProvider from '../services/sentry';
import { Web3HelperProvider } from '../services/web3';
import { GlobalProviders } from '../types/namespaces';

export class BasicCommand {
  public readonly name: string = 'command';
  public readonly describe: string = 'Basic command';

  constructor() {}

  public async getProviders(): Promise<GlobalProviders> {
    const providers: GlobalProviders = {
      mongodb: new MongodbProvider(),
      sentry: new SentryProvider(process.env.RANTOM_SENTRY_DNS as string),
      web3Helper: new Web3HelperProvider(),
    };

    await providers.mongodb.connect(envConfig.mongodb.connectionUri, envConfig.mongodb.databaseName);

    return providers;
  }

  public async execute(argv: any) {}
  public setOptions(yargs: any) {}
}
