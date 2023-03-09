import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { AddressZero } from '../../configs/constants';
import EnvConfig from '../../configs/envConfig';
import { normalizeAddress, shortenAddress } from '../../lib/helper';
import logger from '../../lib/logger';
import { Contract } from '../../types/configs';
import { LendingEvent, MongoCollections, StakingAction, StakingEvent, TradingEvent } from '../../types/domains';
import { GlobalProviders, IAdapter, IContractWorker } from '../../types/namespaces';

export class ContractWorker implements IContractWorker {
  public readonly name: string = 'worker';
  public contracts: Array<Contract>;
  public providers: GlobalProviders;

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    this.providers = providers;
    this.contracts = contracts;
  }

  public async processEvents(contract: Contract, events: Array<any>): Promise<any> {
    return [];
  }

  private async indexContract(config: Contract): Promise<void> {
    const web3 = new Web3(EnvConfig.blockchains[config.chain].nodeRpc);
    const contract = new web3.eth.Contract(config.abi, config.address);

    const { statesCollection } = await this.providers.mongodb.requireCollections();
    let stateBlock = config.birthday;

    const stateKey = `index-${config.chain}-${normalizeAddress(config.address)}`;
    const states = await statesCollection.find({ name: stateKey }).limit(1).toArray();
    if (states.length > 0) {
      stateBlock = states[0].blockNumber;
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
      const toBlock = stateBlock + CHUNK > tip ? tip : stateBlock + CHUNK;

      let events: Array<any> = [];
      for (const eventName of config.events) {
        const pastEvents = await contract.getPastEvents(eventName, { fromBlock: stateBlock, toBlock });
        events = events.concat(pastEvents);
      }

      await this.processEvents(config, events);

      logger.onInfo({
        service: this.name,
        message: 'got contract events',
        props: {
          chain: config.chain,
          protocol: config.protocol,
          contract: shortenAddress(config.address),
          events: events.length,
          fromBlock: stateBlock,
          toBlock: toBlock,
        },
      });

      // save state
      const collections: MongoCollections = await this.providers.mongodb.requireCollections();
      await collections.statesCollection.updateOne(
        {
          name: stateKey,
        },
        {
          $set: {
            name: stateKey,
            blockNumber: stateBlock,
          },
        },
        { upsert: true }
      );

      stateBlock += CHUNK;
    }
  }

  public async run(): Promise<void> {
    for (const contract of this.contracts) {
      await this.indexContract(contract);
    }
  }
}

export class LendingWorker extends ContractWorker {
  public readonly name: string = 'worker.lending';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async processEvents(contract: Contract, events: Array<any>): Promise<any> {
    const actions: Array<LendingEvent> = [];

    for (const event of events) {
      const transformedEvent: LendingEvent | null = await this.parseLendingEvent(contract, event);
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
      const collections: MongoCollections = await this.providers.mongodb.requireCollections();
      await collections.lendingActionsCollection.bulkWrite(operations);
    }
  }

  public async parseLendingEvent(contract: Contract, event: any): Promise<LendingEvent | null> {
    return null;
  }
}

export class StakingWorker extends ContractWorker {
  public readonly name: string = 'worker.staking';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return null;
  }

  public async processEvents(contract: Contract, events: Array<any>): Promise<any> {
    const actions: Array<StakingEvent> = [];

    for (const event of events) {
      const transformedEvent: StakingEvent | null = await this.parseStakingEvent(contract, event);
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
      const collections: MongoCollections = await this.providers.mongodb.requireCollections();
      await collections.stakingActionsCollection.bulkWrite(operations);
    }
  }

  public async parseStakingEvent(contract: Contract, event: any): Promise<StakingEvent | null> {
    const adapter: IAdapter | null = this.getAdapter();

    if (!adapter) return null;

    const timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, event.blockNumber);
    const logIndex = event.logIndex;
    const transactionHash = event.transactionHash;
    const blockNumber = event.blockNumber;

    const action = await adapter.tryParsingActions({
      chain: contract.chain,
      sender: AddressZero, // don't use this field
      address: contract.address,
      data: event.raw.data,
      topics: event.raw.topics,
    });

    if (action) {
      return {
        chain: contract.chain,
        contract: normalizeAddress(contract.address),
        transactionHash: transactionHash,
        logIndex: logIndex,
        protocol: contract.protocol,
        timestamp,
        blockNumber: blockNumber,
        action: action.action as StakingAction,
        token: action.tokens[0],
        amount: new BigNumber(action.tokenAmounts[0])
          .multipliedBy(new BigNumber(10).pow(action.tokens[0].decimals))
          .toString(10),
        caller: action.addresses[0],
        user: action.addresses[0],
        addition: action.addition ? action.addition : undefined,
      };
    }

    return null;
  }
}

export class TradingWorker extends ContractWorker {
  public readonly name: string = 'worker.trading';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async processEvents(contract: Contract, events: Array<any>): Promise<any> {
    const actions: Array<TradingEvent> = [];

    for (const event of events) {
      const transformedEvent: TradingEvent | null = await this.parseTradingEvent(contract, event);
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
      const collections: MongoCollections = await this.providers.mongodb.requireCollections();
      await collections.tradingActionsCollection.bulkWrite(operations);
    }
  }

  public async parseTradingEvent(contract: Contract, event: any): Promise<TradingEvent | null> {
    return null;
  }
}
