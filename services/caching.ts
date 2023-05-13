import { normalizeAddress } from '../lib/helper';
import { ICachingProvider, IMongodbProvider } from '../types/namespaces';

export class CachingProvider implements ICachingProvider {
  public readonly name: string = 'caching';

  private readonly _memories: { [key: string]: any } = {};
  protected readonly _mongodb: IMongodbProvider | null;

  constructor(mongodb: IMongodbProvider | null) {
    this._mongodb = mongodb;
  }

  public async getCachingData(name: string): Promise<any> {
    // get data from memory
    if (this._memories[name]) {
      return this._memories[name];
    }

    if (this._mongodb) {
      const collections = await this._mongodb.requireCollections();
      const documents = await collections.cachingCollection.find({ name }).limit(1).toArray();
      if (documents.length > 0) {
        const data = documents[0] as any;
        delete data._id;

        // next time we get data from memory
        this._memories[name] = data;

        return data;
      }
    }

    return null;
  }

  public async setCachingData(name: string, data: any): Promise<void> {
    this._memories[name] = data;

    if (this._mongodb) {
      const collections = await this._mongodb.requireCollections();
      await collections.cachingCollection.updateOne(
        {
          name: name,
        },
        {
          $set: {
            name,
            ...data,
          },
        },
        {
          upsert: true,
        }
      );
    }
  }
}

export class CachingHelper {
  public static getBlockTimeCacheName(chain: string, blockNumber: number): string {
    return `blocktime-${chain}-${blockNumber}`;
  }

  public static getErc20CacheName(chain: string, tokenAddress: string): string {
    return `erc20-${chain}-${normalizeAddress(tokenAddress)}`;
  }

  public static getNftCacheName(chain: string, tokenAddress: string): string {
    return `nft-${chain}-${normalizeAddress(tokenAddress)}`;
  }

  public static getNftDataCacheName(chain: string, tokenAddress: string, tokenId: string): string {
    return `nft-${chain}-${normalizeAddress(tokenAddress)}-${tokenId}`;
  }

  public static getUniswapPoolFactoryName(chain: string, poolAddress: string): string {
    return `uni-factory-${chain}-${normalizeAddress(poolAddress)}`;
  }

  public static getOracleTokenName(chain: string, tokenAddress: string, blockNumber: number): string {
    return `oracle-${chain}-${normalizeAddress(tokenAddress)}-${blockNumber}`;
  }
}
