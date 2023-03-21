import BigNumber from 'bignumber.js';
import { Collection } from 'mongodb';

import { AddressZero } from '../../../configs/constants';
import { normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { MarketplaceEvent } from '../../../types/domains';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { ContractWorker } from '../worker';

export class MarketplaceWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.marketplace';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return null;
  }

  public async getCollection(): Promise<Collection | null> {
    return (await this.providers.mongodb.requireCollections()).marketplaceActionsCollection;
  }

  public async parseEvent(contract: Contract, event: any, options: any): Promise<MarketplaceEvent | null> {
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

    const adapter = this.getAdapter();
    if (adapter) {
      const action = await adapter.tryParsingActions({
        chain: contract.chain,
        sender: AddressZero,
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
    }

    return null;
  }
}
