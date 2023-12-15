import dotenv from 'dotenv';

import { EnvConfig } from '../types/configs';
import { ChainCelo, ChainLinea, ChainPolygonZkEVM, ChainZksyncEra } from './constants/chains';
import { NativeTokens } from './constants/nativeTokens';
import { BlockSubGraphEndpoints } from './constants/subgraphEndpoints';

// global env and configurations
dotenv.config();

const MongodbPrefix = 'rantom';

const envConfig: EnvConfig = {
  mongodb: {
    databaseName: String(process.env.RANTOM_MONGODB_NAME),
    connectionUri: String(process.env.RANTOM_MONGODB_URI),
    collections: {
      states: `${MongodbPrefix}.states`,
      caching: `${MongodbPrefix}.caching`,
      tokens: `${MongodbPrefix}.core.tokens`,
      nonFungibleTokens: `${MongodbPrefix}.core.nonFungibleTokens`,
      actions: `${MongodbPrefix}.core.actions`,
      transactions: `${MongodbPrefix}.core.transactions`,
    },
  },
  sentry: {
    dns: String(process.env.RANTOM_SENTRY_DNS),
  },
  policies: {
    enableParserCaching: String(process.env.RANTOM_ENABLE_PARSER_CACHING) !== 'disabled',
  },
  blockchains: {
    ethereum: {
      name: 'ethereum',
      family: 'evm',
      chainId: 1,
      nativeToken: NativeTokens.ethereum,
      nodeRpc: String(process.env.RANTOM_ETHEREUM_NODE),
      blockSubgraph: BlockSubGraphEndpoints.ethereum,
    },
    arbitrum: {
      name: 'arbitrum',
      family: 'evm',
      chainId: 42161,
      nativeToken: NativeTokens.arbitrum,
      nodeRpc: String(process.env.RANTOM_ARBITRUM_NODE),
      blockSubgraph: BlockSubGraphEndpoints.arbitrum,
    },
    base: {
      name: 'base',
      family: 'evm',
      chainId: 8453,
      nativeToken: NativeTokens.base,
      nodeRpc: String(process.env.RANTOM_BASE_NODE),
      blockSubgraph: BlockSubGraphEndpoints.base,
    },
    optimism: {
      name: 'optimism',
      family: 'evm',
      chainId: 10,
      nativeToken: NativeTokens.optimism,
      nodeRpc: String(process.env.RANTOM_OPTIMISM_NODE),
      blockSubgraph: BlockSubGraphEndpoints.optimism,
    },
    polygon: {
      name: 'polygon',
      family: 'evm',
      chainId: 137,
      nativeToken: NativeTokens.polygon,
      nodeRpc: String(process.env.RANTOM_POLYGON_NODE),
      blockSubgraph: BlockSubGraphEndpoints.polygon,
    },
    bnbchain: {
      name: 'bnbchain',
      family: 'evm',
      chainId: 56,
      nativeToken: NativeTokens.bnbchain,
      nodeRpc: String(process.env.RANTOM_BNBCHAIN_NODE),
      blockSubgraph: BlockSubGraphEndpoints.bnbchain,
    },
    avalanche: {
      name: 'avalanche',
      family: 'evm',
      chainId: 43114,
      nativeToken: NativeTokens.avalanche,
      nodeRpc: String(process.env.RANTOM_AVALANCHE_NODE),
      blockSubgraph: BlockSubGraphEndpoints.avalanche,
    },
    fantom: {
      name: 'fantom',
      family: 'evm',
      chainId: 250,
      nativeToken: NativeTokens.fantom,
      nodeRpc: String(process.env.RANTOM_FANTOM_NODE),
      blockSubgraph: BlockSubGraphEndpoints.fantom,
    },
    linea: {
      name: ChainLinea,
      family: 'evm',
      chainId: 59144,
      nativeToken: NativeTokens.ethereum,
      nodeRpc: String(process.env.RANTOM_LINEA_NODE),
      blockSubgraph: BlockSubGraphEndpoints.linea,
    },
    zksyncera: {
      name: ChainZksyncEra,
      family: 'evm',
      chainId: 324,
      nativeToken: NativeTokens.ethereum,
      nodeRpc: String(process.env.RANTOM_ZKSYNCERA_NODE),
      blockSubgraph: BlockSubGraphEndpoints.zksyncera,
    },
    polygonzkevm: {
      name: ChainPolygonZkEVM,
      family: 'evm',
      chainId: 1101,
      nativeToken: NativeTokens.ethereum,
      nodeRpc: String(process.env.RANTOM_POLYGONZKEVM_NODE),
      blockSubgraph: BlockSubGraphEndpoints.polygonzkevm,
    },
    celo: {
      name: ChainCelo,
      family: 'evm',
      chainId: 42220,
      nativeToken: NativeTokens.celo,
      nodeRpc: String(process.env.RANTOM_CELO_NODE),
      blockSubgraph: BlockSubGraphEndpoints.celo,
    },
  },
};

export default envConfig;
