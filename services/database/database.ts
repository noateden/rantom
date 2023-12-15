import { Collection, MongoClient } from 'mongodb';

import envConfig from '../../configs/envConfig';
import logger from '../../lib/logger';
import { sleep } from '../../lib/utils';
import { DatabaseBulkWriteOptions, DatabaseQueryOptions, DatabaseUpdateOptions, IDatabaseService } from './domains';

export default class DatabaseService implements IDatabaseService {
  public readonly name: string = 'database';

  private _connected: boolean = false;
  private _client: MongoClient | null = null;
  private _db: any = null;

  constructor() {}

  public async connect(url: string, name: string) {
    if (!this._connected) {
      this._client = new MongoClient(url);

      while (!this._connected) {
        try {
          await this._client?.connect();
          this._db = this._client?.db(name);
          this._connected = true;

          await this.setupIndies();

          logger.info('database connected', {
            service: this.name,
            name: name,
          });
        } catch (e: any) {
          logger.error('failed to connect database', {
            service: this.name,
            name: name,
            error: e.message,
          });
          await sleep(5);
        }
      }

      if (!this._connected) {
        this.onError(Error('failed to connect to database'));
      }
    }
  }

  private async getCollection(name: string): Promise<Collection> {
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

  private async setupIndies(): Promise<void> {
    const statesCollection = await this.getCollection(envConfig.mongodb.collections.states);
    const cachingCollection = await this.getCollection(envConfig.mongodb.collections.caching);
    const tokensCollection = await this.getCollection(envConfig.mongodb.collections.tokens);
    const nonFungibleTokensCollection = await this.getCollection(envConfig.mongodb.collections.nonFungibleTokens);
    const actionsCollection = await this.getCollection(envConfig.mongodb.collections.actions);
    const transactionsCollection = await this.getCollection(envConfig.mongodb.collections.transactions);

    statesCollection.createIndex({ name: 1 }, { background: true });
    cachingCollection.createIndex({ name: 1 }, { background: true });

    // for write documents
    tokensCollection.createIndex({ chain: 1, address: 1 }, { background: true });
    nonFungibleTokensCollection.createIndex({ chain: 1, address: 1, tokenId: 1 }, { background: true });

    // for write actions
    actionsCollection.createIndex({ chain: 1, transactionHash: 1, logIndex: 1 }, { background: true });

    // for query by chain
    actionsCollection.createIndex({ chain: 1, timestamp: 1 }, { background: true });
    actionsCollection.createIndex({ chain: 1, action: 1, timestamp: 1 }, { background: true });

    // for query by protocol
    actionsCollection.createIndex({ protocol: 1, timestamp: 1 }, { background: true });
    actionsCollection.createIndex({ protocol: 1, action: 1, timestamp: 1 }, { background: true });
    actionsCollection.createIndex({ chain: 1, protocol: 1, action: 1, timestamp: 1 }, { background: true });

    // for write
    transactionsCollection.createIndex({ chain: 1, hash: 1, blockNumber: 1 }, { background: true });
  }

  public async bulkWrite(options: DatabaseBulkWriteOptions): Promise<void> {
    if (options.operations.length > 0) {
      const collection = await this.getCollection(options.collection);
      await collection.bulkWrite(options.operations);
    }
  }

  public async find(options: DatabaseQueryOptions): Promise<any> {
    const collection = await this.getCollection(options.collection);
    return await collection.findOne({
      ...options.query,
    });
  }

  public async query(options: DatabaseQueryOptions): Promise<Array<any>> {
    const collection = await this.getCollection(options.collection);

    if (options.options) {
      return await collection
        .find({
          ...options.query,
        })
        .limit(options.options.limit)
        .sort(options.options.order)
        .toArray();
    } else {
      return await collection
        .find({
          ...options.query,
        })
        .toArray();
    }
  }

  public async update(options: DatabaseUpdateOptions): Promise<void> {
    const collection = await this.getCollection(options.collection);
    await collection.updateMany(
      {
        ...options.keys,
      },
      {
        $set: {
          ...options.updates,
        },
      },
      {
        upsert: options.upsert,
      }
    );
  }
}
