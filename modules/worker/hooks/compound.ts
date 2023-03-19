import BigNumber from 'bignumber.js';

import { AddressZero } from '../../../configs/constants';
import { CompoundConfigs, Compoundv3Configs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { KnownAction, LendingEvent } from '../../../types/domains';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { CompoundAdapter } from '../../adapters/compound/compound';
import { Compoundv3Adapter } from '../../adapters/compound/compoundv3';
import { LendingWorkerHook } from '../extends/lending';

export class CompoundWorkerHook extends LendingWorkerHook {
  public readonly name: string = 'worker.compound';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter {
    return new CompoundAdapter(CompoundConfigs, this.providers);
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

    return null;
  }
}

export class Compoundv3WorkerHook extends CompoundWorkerHook {
  public readonly name: string = 'worker.compoundv3';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter {
    return new Compoundv3Adapter(Compoundv3Configs, this.providers);
  }
}
