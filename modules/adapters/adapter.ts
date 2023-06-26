import Web3 from 'web3';

import EnvConfig from '../../configs/envConfig';
import { getTimestamp, normalizeAddress } from '../../lib/helper';
import { RpcWrapperProvider } from '../../services/rpc';
import SentryProvider from '../../services/sentry';
import { Web3HelperProvider } from '../../services/web3';
import { EventMapping, ProtocolConfig } from '../../types/configs';
import { KnownAction, ProtocolDailyStats, ProtocolSnapshotStats, TransactionAction } from '../../types/domains';
import { GlobalProviders, IAdapter, IRpcWrapperProvider, IWeb3HelperProvider } from '../../types/namespaces';
import { AdapterParseContractInfoOptions, AdapterParseLogOptions } from '../../types/options';

export class Adapter implements IAdapter {
  public readonly name: string = 'adapter';

  public config: ProtocolConfig;
  public providers: GlobalProviders | null;
  public eventMappings: { [key: string]: EventMapping };

  constructor(config: ProtocolConfig, providers: GlobalProviders | null, mappings: { [key: string]: EventMapping }) {
    this.config = config;
    this.providers = providers;
    this.eventMappings = mappings;
  }

  public getWeb3Helper(): IWeb3HelperProvider {
    if (this.providers) {
      return this.providers.web3Helper;
    } else {
      return new Web3HelperProvider(null);
    }
  }

  public getRpcWrapper(): IRpcWrapperProvider {
    if (this.providers) {
      return new RpcWrapperProvider(this.providers.sentry);
    } else {
      return new RpcWrapperProvider(new SentryProvider(EnvConfig.sentry.dns));
    }
  }

  public supportedSignature(signature: string): boolean {
    return !!this.eventMappings[signature];
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    return null;
  }

  public async tryParsingContractInfo(options: AdapterParseContractInfoOptions): Promise<string | null> {
    return null;
  }

  public async getSenderAddress(options: AdapterParseLogOptions): Promise<string> {
    if (options.sender && options.sender !== '') {
      return options.sender;
    } else if (options.hash) {
      const web3 = new Web3(EnvConfig.blockchains[options.chain].nodeRpc);
      const tx = await web3.eth.getTransaction(options.hash);
      return normalizeAddress(tx.from);
    } else {
      return '';
    }
  }

  public async getTargetAddress(options: AdapterParseLogOptions): Promise<string> {
    if (options.to && options.to !== '') {
      return options.to;
    } else if (options.hash) {
      const web3 = new Web3(EnvConfig.blockchains[options.chain].nodeRpc);
      const tx = await web3.eth.getTransaction(options.hash);
      return tx.to ? normalizeAddress(tx.to) : '';
    } else {
      return '';
    }
  }

  public async getDailyStats(): Promise<ProtocolDailyStats | null> {
    if (this.providers) {
      const currentTimestamp = getTimestamp();
      const last24HourTimestamp = currentTimestamp - 24 * 60 * 60;

      const stats: ProtocolDailyStats = {
        protocol: this.config.protocol,

        timestampFrom: last24HourTimestamp,
        timestamp: currentTimestamp,

        totalEventCount: 0,
        totalTransactionCount: 0,

        eventCountByActions: {},

        volumeUsdByActions: {},
      };

      const collections = await this.providers.mongodb.requireCollections();
      const cursor = await collections.logsCollection.find({
        protocol: this.config.protocol,
        timestamp: {
          $lte: currentTimestamp,
          $gte: last24HourTimestamp,
        },
      });

      const transactions: { [key: string]: boolean } = {};
      while (await cursor.hasNext()) {
        const document = await cursor.next();

        if (document) {
          // count event
          stats.totalEventCount += 1;
          const action: KnownAction = document.action;
          if (stats.eventCountByActions[action]) {
            stats.eventCountByActions[action] += 1;
          } else {
            stats.eventCountByActions[action] = 1;
          }

          // count transaction
          if (!transactions[document.transactionHash]) {
            stats.totalTransactionCount += 1;
            transactions[document.transactionHash] = true;
          }

          // we count token volume
          // if (document.tokens.length > 0) {
          //   const token: Token = document.tokens[0];
          //   const tokenPriceResult = await oracle.getTokenSpotPriceUsd({
          //     chain: document.chain,
          //     address: token.address,
          //     timestamp: currentTimestamp,
          //   });
          //
          //   if (tokenPriceResult && tokenPriceResult.spotPriceUsd) {
          //     const amountUsd = new BigNumber(document.amounts[0])
          //       .multipliedBy(tokenPriceResult.spotPriceUsd)
          //       .toNumber();
          //     if (stats.volumeUsdByActions[action]) {
          //       stats.volumeUsdByActions[action] += amountUsd;
          //     } else {
          //       stats.volumeUsdByActions[action] = amountUsd;
          //     }
          //   } else {
          //     logger.onWarn({
          //       service: this.name,
          //       message: 'failed to get token price using oracle',
          //       props: {
          //         chain: document.chain,
          //         token: token.address,
          //         timestamp: currentTimestamp,
          //       },
          //     });
          //   }
          // }
        }
      }

      return stats;
    }

    return null;
  }

  public async getSnapshotStats(fromTime: number, toTime: number): Promise<ProtocolSnapshotStats | null> {
    if (this.providers) {
      const stats: ProtocolSnapshotStats = {
        protocol: this.config.protocol,

        timestamp: toTime,

        totalEventCount: 0,
        totalTransactionCount: 0,

        eventCountByActions: {},
      };

      const collections = await this.providers.mongodb.requireCollections();
      const cursor = await collections.logsCollection.find({
        protocol: this.config.protocol,
        timestamp: {
          $lte: toTime,
          $gte: fromTime,
        },
      });

      const transactions: { [key: string]: boolean } = {};
      while (await cursor.hasNext()) {
        const document = await cursor.next();

        if (document) {
          // count event
          stats.totalEventCount += 1;
          const action: KnownAction = document.action;
          if (stats.eventCountByActions[action]) {
            stats.eventCountByActions[action] += 1;
          } else {
            stats.eventCountByActions[action] = 1;
          }

          // count transaction
          if (!transactions[document.transactionHash]) {
            stats.totalTransactionCount += 1;
            transactions[document.transactionHash] = true;
          }
        }
      }

      return stats;
    }

    return null;
  }
}
