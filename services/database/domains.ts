export interface MongoQueryOptions {
  limit: number;
  skip: number;
  order: any;
}

export interface DatabaseQueryOptions {
  collection: string;
  query: any;
  options?: MongoQueryOptions;
}

export interface DatabaseUpdateOptions {
  collection: string;
  keys: any;
  updates: any;
  upsert: boolean;
}

export interface DatabaseBulkWriteOptions {
  collection: string;
  operations: Array<any>;
}

// a database service is a middleware service that handles
// logic requests and query to the database server
export interface IDatabaseService {
  // given name helps logging better
  name: string;

  // do connect to the database server
  connect: (mongoUri: string, databaseName: string) => Promise<void>;

  // query and return a list of matching documents
  query: (options: DatabaseQueryOptions) => Promise<Array<any>>;

  // same as query, but return the first document only
  // return null on not found
  find: (options: DatabaseQueryOptions) => Promise<any>;

  // request to update documents
  update: (options: DatabaseUpdateOptions) => Promise<void>;

  // delete a document
  bulkWrite: (options: DatabaseBulkWriteOptions) => Promise<void>;
}
