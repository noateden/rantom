import BigNumber from 'bignumber.js';
import { Collection } from 'mongodb';

import { AddressZero } from '../../../configs/constants';
import { normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { KnownAction, LendingEvent } from '../../../types/domains';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { ContractWorker } from '../worker';

export class LendingWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.lending';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async getCollection(): Promise<Collection | null> {
    return (await this.providers.mongodb.requireCollections()).lendingActionsCollection;
  }

  public getAdapter(): IAdapter | null {
    return null;
  }

  public async parseEvent(contract: Contract, event: any, options: any): Promise<LendingEvent | null> {
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
        sender: AddressZero, // don't use this field
        address: contract.address,
        data: event.raw.data,
        topics: event.raw.topics,
        hash: transactionHash,
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
          action: action.action === 'deposit' ? 'supply' : (action.action as KnownAction),
          token: action.tokens[0],
          amount: new BigNumber(action.tokenAmounts[0])
            .multipliedBy(new BigNumber(10).pow(action.tokens[0].decimals))
            .toString(10),
          caller: action.addresses[0],
          user: action.addresses.length > 1 ? action.addresses[1] : action.addresses[0],
          debtToken: action.addition ? action.addition.debtToken : undefined,
          debtAmount: action.addition ? action.addition.debtAmount : undefined,
        };
      }
    }

    return null;
  }
}
