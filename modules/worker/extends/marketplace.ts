import { Collection } from 'mongodb';

import { Contract } from '../../../types/configs';
import { GlobalProviders } from '../../../types/namespaces';
import { ContractWorker } from '../worker';

export class MarketplaceWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.marketplace';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async getCollection(): Promise<Collection | null> {
    return (await this.providers.mongodb.requireCollections()).marketplaceActionsCollection;
  }
}
