import { Collection } from 'mongodb';

import { Contract } from '../../../types/configs';
import { GlobalProviders } from '../../../types/namespaces';
import { ContractWorker } from '../worker';

export class LendingWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.lending';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async getCollection(): Promise<Collection | null> {
    return (await this.providers.mongodb.requireCollections()).lendingActionsCollection;
  }
}
