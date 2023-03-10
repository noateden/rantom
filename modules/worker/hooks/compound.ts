import BigNumber from 'bignumber.js';

import { AddressZero } from '../../../configs/constants';
import { CompoundConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { KnownAction, LendingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { CompoundAdapter } from '../../adapters/compound/compound';
import { LendingWorker } from '../worker';

export class CompoundWorkerHook extends LendingWorker {
  public readonly name: string = 'worker.compound';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async parseLendingEvent(contract: Contract, event: any): Promise<LendingEvent | null> {
    const timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, event.blockNumber);
    const logIndex = event.logIndex;
    const transactionHash = event.transactionHash;
    const blockNumber = event.blockNumber;

    const adapter = new CompoundAdapter(CompoundConfigs, this.providers);
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
