import BigNumber from 'bignumber.js';

import { AddressZero } from '../../../configs/constants';
import { OpenseaConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { MarketplaceEvent, MongoCollections } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { OpenseaAdapter } from '../../adapters/opensea/opensea';
import { ContractWorker } from '../worker';

export class OpenseaWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.opensea';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async processEvents(contract: Contract, events: Array<any>, options: any): Promise<any> {
    const actions: Array<MarketplaceEvent> = [];

    for (const event of events) {
      const transformedEvent: MarketplaceEvent | null = await this.parseEventFromOpensea(contract, event);
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
      await collections.marketplaceActionsCollection.bulkWrite(operations);
    }
  }

  private async parseEventFromOpensea(contract: Contract, event: any): Promise<MarketplaceEvent | null> {
    const timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, event.blockNumber);
    const logIndex = event.logIndex;
    const transactionHash = event.transactionHash;
    const blockNumber = event.blockNumber;

    const adapter = new OpenseaAdapter(OpenseaConfigs, this.providers);
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
        action: 'buy',
        nonFungibleToken: {
          chain: contract.chain,
          symbol: action.addition.token.symbol,
          address: action.addition.token.address,
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

    return null;
  }
}
