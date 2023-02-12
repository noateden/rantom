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
    const transactionsCollection = await this.getCollection(envConfig.mongodb.collections.transactions);

    // background index setup
    transactionsCollection.createIndex({ chain: 1, hash: 1 }, { background: true });

    return {
      transactionsCollection,
    };
  }
}

export default MongodbProvider;
