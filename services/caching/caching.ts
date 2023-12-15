import EnvConfig from '../../configs/envConfig';
import { IDatabaseService } from '../database/domains';
import { ICachingService } from './domains';

// caching level: memory and database
// first query from memory hash tables
// second query from database caching collection
// finally, return null as not found
export class CachingService implements ICachingService {
  public readonly name: string = 'caching';

  private readonly _memories: { [key: string]: any } = {};

  protected readonly _database: IDatabaseService | null;

  constructor(database: IDatabaseService | null) {
    this._database = database;
  }

  public async getCachingData(name: string): Promise<any> {
    // get data from memory
    if (this._memories[name]) {
      return this._memories[name];
    }

    if (this._database) {
      const data = await this._database.find({
        collection: EnvConfig.mongodb.collections.caching,
        query: {
          name: name,
        },
      });
      if (data) {
        // next time we get data from memory
        this._memories[name] = data;

        return data;
      }
    }

    return null;
  }

  public async setCachingData(name: string, data: any): Promise<void> {
    this._memories[name] = data;

    if (this._database) {
      await this._database.update({
        collection: EnvConfig.mongodb.collections.caching,
        keys: {
          name: name,
        },
        updates: {
          name: name,
          ...data,
        },
        upsert: true,
      });
    }
  }
}
