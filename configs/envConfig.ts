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
      states: `${MongodbPrefix}.states`,
      caching: `${MongodbPrefix}.caching`,
      apiLogs: `${MongodbPrefix}.apiLogs`,

      // v2 api
      logs: `${MongodbPrefix}.logs`,

      // system reports
      reports: `${MongodbPrefix}.reports`,

      // protocol metrics
      metrics: `${MongodbPrefix}.metrics`,
    },
  },
  sentry: {
    dns: String(process.env.RANTOM_SENTRY_DNS),
  },
  blockchains: {
    ethereum: {
      name: 'ethereum',
      nodeRpc: String(process.env.RANTOM_ETHEREUM_NODE),
    },
    arbitrum: {
      name: 'arbitrum',
      nodeRpc: String(process.env.RANTOM_ARBITRUM_NODE),
    },
    base: {
      name: 'base',
      nodeRpc: String(process.env.RANTOM_BASE_NODE),
    },
  },
  security: {
    systemApiKey: String(process.env.RANTOM_SYSTEM_API_KEY),
  },
  ipfs: {
    uploadGateway: String(process.env.RANTOM_IPFS_UPLOAD_GATEWAY),
    contentGateway: String(process.env.RANTOM_IPFS_CONTENT_GATEWAY),
  },
};

export default envConfig;
