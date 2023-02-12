import dotenv from 'dotenv';

import { EnvConfig } from '../types/configs';
import { MongodbPrefix } from './constants';

// global env and configurations
dotenv.config();

const envConfig: EnvConfig = {
  mongodb: {
    databaseName: String(process.env.RANTOM_MONGODB_NAME),
    connectionUri: String(process.env.RANTOM_MONGODB_URI),
    collections: {
      transactions: `${MongodbPrefix}.transactions`,
    },
  },
  sentry: {
    dns: String(process.env.RANTOM_SENTRY_DNS),
  },
  blockchains: {
    ethereum: {
      name: 'ethereum',
      nodeRpc: String(process.env.RANTOM_ETHEREUM_NODES),
    },
  },
  ipfs: {
    uploadGateway: String(process.env.RANTOM_IPFS_UPLOAD_GATEWAY),
    contentGateway: String(process.env.RANTOM_IPFS_CONTENT_GATEWAY),
  },
};

export default envConfig;
