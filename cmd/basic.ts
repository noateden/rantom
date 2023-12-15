import envConfig from '../configs/envConfig';
import BlockchainService from '../services/blockchains/blockchain';
import DatabaseService from '../services/database/database';
import Datastore from '../services/datastore/datastore';
import { ContextServices } from '../types/namespaces';

export class BasicCommand {
  public readonly name: string = 'command';
  public readonly describe: string = 'Basic command';

  constructor() {}

  public async getServices(): Promise<ContextServices> {
    const database = new DatabaseService();
    const blockchain = new BlockchainService(database);
    const datastore = new Datastore();

    return {
      database: database,
      blockchain: blockchain,
      datastore: datastore,
    };
  }

  public async preHook(services: ContextServices): Promise<void> {
    await services.database.connect(envConfig.mongodb.connectionUri, envConfig.mongodb.databaseName);
    await services.datastore.loadData();
  }

  public async execute(argv: any) {}
  public setOptions(yargs: any) {}
}
