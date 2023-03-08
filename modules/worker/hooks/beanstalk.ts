import BigNumber from 'bignumber.js';

import { AddressZero } from '../../../configs/constants';
import { BeanstalkConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { StakingAction, StakingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { BeanstalkAdapter } from '../../adapters/beanstalk/beanstalk';
import { StakingWorker } from '../worker';

export class BeanstalkWorkerHook extends StakingWorker {
  public readonly name: string = 'worker.beanstalk';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async parseStakingEvent(contract: Contract, event: any): Promise<StakingEvent | null> {
    const timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, event.blockNumber);
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
