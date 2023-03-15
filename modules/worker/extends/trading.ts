import { Collection } from 'mongodb';

import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { ContractWorker } from '../worker';

export class TradingWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.trading';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return null;
  }

  public async getCollection(): Promise<Collection | null> {
    return (await this.providers.mongodb.requireCollections()).tradingActionsCollection;
  }
}
