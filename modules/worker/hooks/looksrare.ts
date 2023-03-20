import BigNumber from 'bignumber.js';

import { AddressZero } from '../../../configs/constants';
import { LooksrareConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { MarketplaceEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { LooksrareAdapter } from '../../adapters/looksrare/looksrare';
import { MarketplaceWorkerHook } from '../extends/marketplace';

export class LooksrareWorkerHook extends MarketplaceWorkerHook {
  public readonly name: string = 'worker.looksrare';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
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

    const adapter = new LooksrareAdapter(LooksrareConfigs, this.providers);
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

    return null;
  }
}
