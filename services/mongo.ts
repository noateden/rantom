import { Collection, MongoClient } from 'mongodb';

import envConfig from '../configs/envConfig';
import { sleep } from '../lib/helper';
import logger from '../lib/logger';
import { MongoCollections } from '../types/domains';
import { IMongodbProvider } from '../types/namespaces';

class MongodbProvider implements IMongodbProvider {
  public readonly name: string = 'mongodb';

  private _connected: boolean = false;
  private _client: MongoClient | null = null;
  private _db: any = null;

  constructor() {}

  public async connect(url: string, name: string): Promise<void> {
    if (!this._connected) {
      this._client = new MongoClient(url);

      while (!this._connected) {
        try {
          await this._client?.connect();
          this._db = this._client?.db(name);
          this._connected = true;
          logger.onInfo({
            service: this.name,
            message: 'database connected',
            props: {
              name: name,
            },
          });
        } catch (e: any) {
          logger.onError({
            service: this.name,
            message: 'failed to connect database',
            props: {
              name: name,
            },
            error: e,
          });
          await sleep(5);
        }
      }

      if (!this._connected) {
        this.onError(Error('failed to connect to database'));
      }
    }
  }

  public async getCollection(name: string): Promise<Collection> {
    let collection: Collection | null = null;
    if (this._connected) {
      collection = this._db ? this._db.collection(name) : null;
    } else {
      this.onError(Error('failed to get collection'));
    }

    if (!collection) {
      this.onError(Error('failed to get collection'));
      process.exit(1);
    }

    return collection;
  }

  public onError(error: Error): void {
    console.error(error);
    process.exit(1);
  }

  public async requireCollections(): Promise<MongoCollections> {
    const statesCollection = await this.getCollection(envConfig.mongodb.collections.states);
    const cachingCollection = await this.getCollection(envConfig.mongodb.collections.caching);
    const lendingActionsCollection = await this.getCollection(envConfig.mongodb.collections.lendingActions);
    const marketplaceActionsCollection = await this.getCollection(envConfig.mongodb.collections.marketplaceActions);
    const stakingActionsCollection = await this.getCollection(envConfig.mongodb.collections.stakingActions);
    const tradingActionsCollection = await this.getCollection(envConfig.mongodb.collections.tradingActions);
    const serviceActionsCollection = await this.getCollection(envConfig.mongodb.collections.serviceActions);
    const erc20SupplyActionsCollection = await this.getCollection(envConfig.mongodb.collections.erc20SupplyActions);
    const factoryPoolsCollection = await this.getCollection(envConfig.mongodb.collections.factoryPools);

    statesCollection.createIndex({ name: 1 }, { background: true });
    cachingCollection.createIndex({ name: 1 }, { background: true });

    lendingActionsCollection.createIndex(
      { chain: 1, contract: 1, transactionHash: 1, logIndex: 1 },
      { background: true }
    );
    lendingActionsCollection.createIndex({ protocol: 1, action: 1, timestamp: 1 }, { background: true });
    lendingActionsCollection.createIndex({ protocol: 1, action: 1, 'token.symbol': 1 }, { background: true });

    marketplaceActionsCollection.createIndex(
      { chain: 1, contract: 1, transactionHash: 1, logIndex: 1 },
      { background: true }
    );
    marketplaceActionsCollection.createIndex({ protocol: 1, action: 1, timestamp: 1 }, { background: true });
    marketplaceActionsCollection.createIndex(
      { protocol: 1, action: 1, 'nonFungibleToken.address': 1 },
      { background: true }
    );

    stakingActionsCollection.createIndex(
      { chain: 1, contract: 1, transactionHash: 1, logIndex: 1 },
      { background: true }
    );
    stakingActionsCollection.createIndex({ protocol: 1, action: 1, timestamp: 1 }, { background: true });
    stakingActionsCollection.createIndex({ protocol: 1, action: 1, 'token.symbol': 1 }, { background: true });

    tradingActionsCollection.createIndex(
      { chain: 1, contract: 1, transactionHash: 1, logIndex: 1 },
      { background: true }
    );
    tradingActionsCollection.createIndex({ protocol: 1, action: 1, timestamp: 1 }, { background: true });

    serviceActionsCollection.createIndex(
      { chain: 1, contract: 1, transactionHash: 1, logIndex: 1 },
      { background: true }
    );
    serviceActionsCollection.createIndex({ protocol: 1, action: 1, timestamp: 1 }, { background: true });

    erc20SupplyActionsCollection.createIndex(
      { chain: 1, contract: 1, transactionHash: 1, logIndex: 1 },
      { background: true }
    );
    erc20SupplyActionsCollection.createIndex({ chain: 1, symbol: 1, address: 1 }, { background: true });

    factoryPoolsCollection.createIndex({ chain: 1, protocol: 1, address: 1 }, { background: true });

    return {
      statesCollection,
      cachingCollection,
      lendingActionsCollection,
      marketplaceActionsCollection,
      stakingActionsCollection,
      tradingActionsCollection,
      serviceActionsCollection,
      erc20SupplyActionsCollection,
      factoryPoolsCollection,
    };
  }
}

export default MongodbProvider;
