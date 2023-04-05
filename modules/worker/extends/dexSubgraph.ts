import { getTimestamp, sleep } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { Contract, ProtocolSubgraphConfig } from '../../../types/configs';
import { MongoCollections, TradingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { WorkerRunOptions } from '../../../types/options';
import { ContractWorker } from '../worker';

export interface QuerySubgraphResult {
  trades: Array<any>;
  deposits: Array<any>;
  withdrawals: Array<any>;
  nextTimestamp: number;
}

export class DexSubgraphWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.dex-subgraph';
  public subgraphs: Array<ProtocolSubgraphConfig>;

  constructor(providers: GlobalProviders, contracts: Array<Contract>, subgraphs: Array<ProtocolSubgraphConfig>) {
    super(providers, contracts);

    this.subgraphs = subgraphs;
  }

  // should get swap and liquidity events in a single query
  protected async querySubgraph(config: ProtocolSubgraphConfig, timestamp: number): Promise<any> {
    return {};
  }

  protected transformSwapEvents(config: ProtocolSubgraphConfig, events: Array<any>): Array<TradingEvent> {
    return [];
  }

  protected transformDepositEvents(config: ProtocolSubgraphConfig, events: Array<any>): Array<TradingEvent> {
    return [];
  }

  protected transformWithdrawEvents(config: ProtocolSubgraphConfig, events: Array<any>): Array<TradingEvent> {
    return [];
  }

  protected async indexSubgraphs(config: ProtocolSubgraphConfig, options: WorkerRunOptions): Promise<void> {
    // if fromBlock was given, start sync from fromBlock value
    // and do not save contract state
    let stateTime = options.fromTime;

    const { statesCollection } = await this.providers.mongodb.requireCollections();
    const stateKey = `index-subgraph-${config.chain}-${config.version}-${config.protocol}`;
    if (stateTime === 0) {
      stateTime = config.birthday;
      const states = await statesCollection.find({ name: stateKey }).limit(1).toArray();
      if (states.length > 0) {
        stateTime = states[0].timestamp;
      }
    }

    const tip = getTimestamp();

    logger.onInfo({
      service: this.name,
      message: 'start subgraph worker',
      props: {
        chain: config.chain,
        protocol: config.protocol,
        subgraph: config.endpoint,
        fromTime: stateTime,
        toTime: tip,
      },
    });

    while (stateTime <= tip) {
      try {
        const startExeTime = Math.floor(new Date().getTime() / 1000);
        const result: QuerySubgraphResult = await this.querySubgraph(config, stateTime);

        let events: Array<TradingEvent> = this.transformSwapEvents(config, result.trades);
        events = events.concat(this.transformDepositEvents(config, result.deposits));
        events = events.concat(this.transformWithdrawEvents(config, result.withdrawals));

        const operations: Array<any> = [];
        for (const event of events) {
          operations.push({
            updateOne: {
              filter: {
                chain: event.chain,
                contract: event.contract,
                transactionHash: event.transactionHash,
                logIndex: event.logIndex,
              },
              update: {
                $set: {
                  ...event,
                },
              },
              upsert: true,
            },
          });
        }

        if (operations.length > 0) {
          const collections = await this.providers.mongodb.requireCollections();
          await collections.tradingActionsCollection.bulkWrite(operations);
        }

        // save state only when fromBlock was not given
        if (options.fromTime === 0) {
          const collections: MongoCollections = await this.providers.mongodb.requireCollections();
          await collections.statesCollection.updateOne(
            {
              name: stateKey,
            },
            {
              $set: {
                name: stateKey,
                timestamp: stateTime,
              },
            },
            { upsert: true }
          );
        }

        stateTime = result.nextTimestamp;

        const endExeTime = Math.floor(new Date().getTime() / 1000);
        const elapsed = endExeTime - startExeTime;
        logger.onInfo({
          service: this.name,
          message: 'got subgraph swap events',
          props: {
            chain: config.chain,
            protocol: config.protocol,
            subgraph: config.endpoint,
            toTime: stateTime,
            events: operations.length,
            elapsed: `${elapsed}s`,
          },
        });
      } catch (e: any) {
        logger.onError({
          service: this.name,
          message: 'failed to query subgraph swap events',
          props: {
            chain: config.chain,
            protocol: config.protocol,
            subgraph: config.endpoint,
          },
          error: e,
        });
        await sleep(5);
      }
    }
  }

  public async run(options: WorkerRunOptions): Promise<void> {
    await super.run(options);

    for (const subgraph of this.subgraphs) {
      await this.indexSubgraphs(subgraph, options);
    }
  }
}
