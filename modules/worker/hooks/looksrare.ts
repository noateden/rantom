import BigNumber from 'bignumber.js';

import { AddressZero } from '../../../configs/constants';
import { LooksrareConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { KnownAction, MarketplaceEvent, StakingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { LooksrareAdapter } from '../../adapters/looksrare/looksrare';
import { ContractWorker } from '../worker';

export class LooksrareWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.looksrare';

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

    const adapter = new LooksrareAdapter(LooksrareConfigs, this.providers);
    const action = await adapter.tryParsingActions({
      chain: contract.chain,
      sender: AddressZero, // don't use this field
      address: contract.address,
      data: event.raw.data,
      topics: event.raw.topics,
    });

    if (action !== null) {
      switch (event.event) {
        case 'TakerAsk':
        case 'TakerBid': {
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
              symbol: action.addition.symbol,
              address: action.addition.address,
              tokenId: action.addition.tokenId,
              image: action.addition.image,
            },
            nonFungibleTokenAmount: action.addition.amount,
            paymentToken: action.tokens[0],
            paymentTokenAmount: new BigNumber(action.tokenAmounts[0])
              .multipliedBy(new BigNumber(10).pow(action.tokens[0].decimals))
              .toString(10),
            buyer: action.addresses[0],
            seller: action.addresses[1],
          };
        }
        case 'Deposit':
        case 'Withdraw':
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
          case 'TakerAsk':
          case 'TakerBid': {
            marketplaceActions.push(transformedEvent);
            break;
          }
          case 'Deposit':
          case 'Withdraw':
          case 'Harvest': {
            stakingActions.push(transformedEvent);
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
