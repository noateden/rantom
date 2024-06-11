import BlockchainService from '../services/blockchains/blockchain';
import Datastore from '../services/datastore/datastore';
import { ContextServices } from '../types/namespaces';

export class BasicCommand {
  public readonly name: string = 'command';
  public readonly describe: string = 'Basic command';

  constructor() {}

  public async getServices(): Promise<ContextServices> {
    const blockchain = new BlockchainService();
    const datastore = new Datastore();

    return {
      blockchain: blockchain,
      datastore: datastore,
    };
  }

  public async execute(argv: any) {}
  public setOptions(yargs: any) {}
}
