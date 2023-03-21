import BigNumber from 'bignumber.js';

import { AddressZero } from '../../../configs/constants';
import { BeanstalkConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { KnownAction, MarketplaceEvent, StakingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { BeanstalkAdapter } from '../../adapters/beanstalk/beanstalk';
import { ContractWorker } from '../worker';

export class BeanstalkWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.beanstalk';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async parseEvent(
    contract: Contract,
    event: any,
    options: any
  ): Promise<StakingEvent | MarketplaceEvent | null> {
    let timestamp =
      options && options.blockTimes && options.blockTimes[event.blockNumber.toString()]
        ? Number(options.blockTimes[event.blockNumber.toString()].timestamp)
        : null;
    if (!timestamp) {
      timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, event.blockNumber);
    }

    const logIndex = event.logIndex;
    const transactionHash = event.transactionHash;
    const blockNumber = event.blockNumber;

    const adapter = new BeanstalkAdapter(BeanstalkConfigs, this.providers);
    const action = await adapter.tryParsingActions({
      chain: contract.chain,
      sender: AddressZero, // don't use this field
      address: contract.address,
      data: event.raw.data,
      topics: event.raw.topics,
    });

    if (action !== null) {
      switch (event.event) {
        case 'AddDeposit':
        case 'AddWithdrawal':
        case 'Sow':
        case 'RemoveWithdrawal':
        case 'RemoveWithdrawals':
        case 'Harvest': {
          return {
            chain: contract.chain,
            contract: normalizeAddress(contract.address),
            transactionHash: transactionHash,
            logIndex: logIndex,
            protocol: contract.protocol,
            timestamp,
            blockNumber: blockNumber,
            action: action.action as KnownAction,
            token: action.tokens[0],
            amount: new BigNumber(action.tokenAmounts[0])
              .multipliedBy(new BigNumber(10).pow(action.tokens[0].decimals))
              .toString(10),
            caller: action.addresses[0],
            user: action.addresses[0],
            addition: action.addition ? action.addition : undefined,
          };
        }
        case 'PodOrderCreated':
        case 'PodOrderFilled':
        case 'PodListingCreated':
        case 'PodListingFilled': {
          return {
            chain: contract.chain,
            contract: normalizeAddress(contract.address),
            transactionHash: transactionHash,
            logIndex: logIndex,
            protocol: contract.protocol,
            timestamp,
            blockNumber: blockNumber,
            action: 'buy',
            nonFungibleToken: {
              chain: contract.chain,
              symbol: 'POD',
              address: AddressZero,
              tokenId: '0',
              image: '',
            },
            nonFungibleTokenAmount: action.addition.podAmount ? action.addition.podAmount : '0',
            paymentToken: action.tokens[0],
            paymentTokenAmount: new BigNumber(action.tokenAmounts[0])
              .multipliedBy(new BigNumber(10).pow(action.tokens[0].decimals))
              .toString(10),
            buyer: action.addresses[0],
            seller: action.addresses.length > 1 ? action.addresses[1] : action.addresses[0],
          };
        }
      }
    }

    return null;
  }

  public async processEvents(contract: Contract, events: Array<any>, options: any): Promise<number> {
    const stakingActions: Array<StakingEvent> = [];
    const marketplaceActions: Array<MarketplaceEvent> = [];

    for (const event of events) {
      const transformedEvent: any = await this.parseEvent(contract, event, options);
      if (transformedEvent) {
        switch (event.event) {
          case 'AddDeposit':
          case 'AddWithdrawal':
          case 'Sow':
          case 'RemoveWithdrawal':
          case 'RemoveWithdrawals':
          case 'Harvest': {
            stakingActions.push(transformedEvent);
            break;
          }
          case 'PodOrderCreated':
          case 'PodOrderFilled':
          case 'PodListingCreated':
          case 'PodListingFilled': {
            marketplaceActions.push(transformedEvent);
          }
        }
      }
    }

    let operations: Array<any> = [];
    for (const action of stakingActions) {
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
      const collection = (await this.providers.mongodb.requireCollections()).stakingActionsCollection;
      await collection.bulkWrite(operations);
    }

    operations = [];
    for (const action of marketplaceActions) {
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
      const collection = (await this.providers.mongodb.requireCollections()).marketplaceActionsCollection;
      await collection.bulkWrite(operations);
    }

    return stakingActions.length + marketplaceActions.length;
  }
}
