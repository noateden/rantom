import { Collection } from 'mongodb';
import Web3 from 'web3';

import { BlockSubgraphs } from '../../configs/constants';
import EnvConfig from '../../configs/envConfig';
import { normalizeAddress, shortenAddress } from '../../lib/helper';
import logger from '../../lib/logger';
import { getBlockTimestamps } from '../../lib/subgraph';
import { Contract } from '../../types/configs';
import { EventBase, MongoCollections } from '../../types/domains';
import { GlobalProviders, IContractWorker } from '../../types/namespaces';
import { WorkerRunOptions } from '../../types/options';

export class ContractWorker implements IContractWorker {
  public readonly name: string = 'worker';
  public contracts: Array<Contract>;
  public providers: GlobalProviders;

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    this.providers = providers;
    this.contracts = contracts;
  }

  public async getCollection(): Promise<Collection | null> {
    return null;
  }

  public async parseEvent(contract: Contract, event: any, options: any): Promise<any> {
    return null;
  }

  public async processEvents(contract: Contract, events: Array<any>, options: any): Promise<number> {
    const actions: Array<EventBase> = [];

    for (const event of events) {
      const transformedEvent: any = await this.parseEvent(contract, event, options);
      if (transformedEvent) {
        actions.push(transformedEvent);
      }
    }

    const operations: Array<any> = [];
    for (const action of actions) {
      operations.push({
        updateOne: {
          filter: {
            chain: action.chain,
            contract: action.contract,
            transactionHash: action.transactionHash,
            logIndex: action.logIndex,
          },
          update: {
            $set: {
              ...action,
            },
          },
          upsert: true,
        },
      });
    }
    if (operations.length > 0) {
      const collection = await this.getCollection();
      if (collection) {
        await collection.bulkWrite(operations);
      }
    }

    return operations.length;
  }

  private async indexContract(config: Contract, options: WorkerRunOptions): Promise<void> {
    const web3 = new Web3(EnvConfig.blockchains[config.chain].nodeRpc);
    const contract = new web3.eth.Contract(config.abi, config.address);

    // if fromBlock was given, start sync from fromBlock value
    // and do not save contract state
    let stateBlock = options.fromBlock;

    const { statesCollection } = await this.providers.mongodb.requireCollections();
    const stateKey = `index-${config.chain}-${normalizeAddress(config.address)}`;
    if (stateBlock === 0) {
      stateBlock = config.birthday;
      const states = await statesCollection.find({ name: stateKey }).limit(1).toArray();
      if (states.length > 0) {
        stateBlock = states[0].blockNumber;
      }
    }

    let tip = 0;
    try {
      tip = await web3.eth.getBlockNumber();
    } catch (e: any) {
      logger.onError({
        service: this.name,
        message: 'failed to get tip',
        props: {
          chain: config.chain,
          protocol: config.protocol,
          contract: shortenAddress(config.address),
        },
        error: e,
      });
      return;
    }

    logger.onInfo({
      service: this.name,
      message: 'start contract worker',
      props: {
        chain: config.chain,
        protocol: config.protocol,
        contract: shortenAddress(config.address),
        fromBlock: stateBlock,
        toBlock: tip,
      },
    });

    const CHUNK = 2000;
    while (stateBlock <= tip) {
      const startExeTime = Math.floor(new Date().getTime() / 1000);

      const toBlock = stateBlock + CHUNK > tip ? tip : stateBlock + CHUNK;

      let events: Array<any> = [];
      for (const eventName of config.events) {
        const pastEvents = await contract.getPastEvents(eventName, { fromBlock: stateBlock, toBlock });
        events = events.concat(pastEvents);
      }

      const blockTimes = await getBlockTimestamps({
        endpoint: BlockSubgraphs[config.chain],
        fromBlock: stateBlock,
        numberOfBlocks: CHUNK,
      });

      await this.processEvents(config, events, { blockTimes });

      const endExeTime = Math.floor(new Date().getTime() / 1000);
      const elapsed = endExeTime - startExeTime;
      logger.onInfo({
        service: this.name,
        message: 'got contract events',
        props: {
          chain: config.chain,
          protocol: config.protocol,
          contract: shortenAddress(config.address),
          events: events.length,
          toBlock: toBlock,
          elapsed: `${elapsed}s`,
        },
      });

      // save state only when fromBlock was not given
      if (options.fromBlock === 0) {
        const collections: MongoCollections = await this.providers.mongodb.requireCollections();
        await collections.statesCollection.updateOne(
          {
            name: stateKey,
          },
          {
            $set: {
              name: stateKey,
              blockNumber: toBlock,
            },
          },
          { upsert: true }
        );
      }

      stateBlock += CHUNK;
    }
  }

  public async run(options: WorkerRunOptions): Promise<void> {
    for (const contract of this.contracts) {
      await this.indexContract(contract, options);
    }
  }
}
