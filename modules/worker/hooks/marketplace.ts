import BigNumber from 'bignumber.js';

import { normalizeAddress } from '../../../lib/helper';
import { Contract, Token } from '../../../types/configs';
import { MarketplaceEvent, MongoCollections } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { ContractWorker } from '../worker';

export class MarketplaceWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.marketplace';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async processEvents(contract: Contract, events: Array<any>): Promise<any> {
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

    const offers = event.returnValues.offer as Array<any>;
    const considerations = event.returnValues.consideration as Array<any>;
    const offerer = normalizeAddress(event.returnValues.offerer);
    const recipient = normalizeAddress(event.returnValues.recipient);

    const offerAssetType = parseInt(offers[0].itemType);
    if (offerAssetType === 0 || offerAssetType === 1) {
      // buy
      if (considerations.length === 0) return null;

      const nftToken = await this.providers.web3Helper.getNonFungibleTokenData(
        contract.chain,
        considerations[0].token,
        considerations[0].identifier
      );
      const paymentToken = await this.providers.web3Helper.getErc20Metadata(contract.chain, offers[0].token);

      if (nftToken && paymentToken) {
        const paymentAmount = offers[0].amount.toString();
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
            symbol: nftToken.token.symbol,
            address: nftToken.token.address,
            tokenId: nftToken.tokenId,
            image: nftToken.image,
          },
          nonFungibleTokenAmount: considerations[0].amount,
          paymentToken: paymentToken,
          paymentTokenAmount: paymentAmount,
          seller: offerer,
          buyer: recipient,
        };
      }
    } else {
      const nftToken = await this.providers.web3Helper.getNonFungibleTokenData(
        contract.chain,
        offers[0].token,
        offers[0].identifier
      );

      let paymentToken: Token | null = null;
      let paymentTokenAmount: BigNumber = new BigNumber(0);
      for (const consideration of considerations) {
        if (consideration.itemType === 0 || consideration.itemType === 1) {
          const payToken = await this.providers.web3Helper.getErc20Metadata(contract.chain, consideration.token);
          if (payToken) {
            paymentToken = payToken;
            paymentTokenAmount = paymentTokenAmount.plus(new BigNumber(consideration.amount));
          }
        }
      }

      if (nftToken && paymentToken) {
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
            symbol: nftToken.token.symbol,
            address: nftToken.token.address,
            tokenId: nftToken.tokenId,
            image: nftToken.image,
          },
          nonFungibleTokenAmount: offers[0].amount,
          paymentToken: paymentToken,
          paymentTokenAmount: paymentTokenAmount.toString(10),
          seller: recipient,
          buyer: offerer,
        };
      }
    }

    return null;
  }
}
