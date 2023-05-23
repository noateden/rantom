import envConfig from '../configs/envConfig';
import { Aavev2Configs } from '../configs/protocols';
import { Aavev2Adapter } from '../modules/adapters/aave/aavev2';
import { OracleProvider } from '../modules/oracles/oracle';
import { CachingProvider } from '../services/caching';
import MongodbProvider from '../services/mongo';
import SentryProvider from '../services/sentry';
import { Web3HelperProvider } from '../services/web3';
import { GlobalProviders, IAdapter } from '../types/namespaces';

(async function () {
  const mongodb = new MongodbProvider();

  const providers: GlobalProviders = {
    mongodb: mongodb,
    sentry: new SentryProvider(process.env.RANTOM_SENTRY_DNS as string),
    caching: new CachingProvider(mongodb),
    web3Helper: new Web3HelperProvider(mongodb),
    oracle: new OracleProvider(mongodb),
  };

  await providers.mongodb.connect(envConfig.mongodb.connectionUri, envConfig.mongodb.databaseName);

  const adapter: IAdapter = new Aavev2Adapter(Aavev2Configs, providers);

  const stats = await adapter.getDailyStats();

  console.log(stats);

  process.exit(0);
})();
