import BigNumber from 'bignumber.js';

import { AddressZero } from '../../../configs/constants';
import { CurveConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { TradingAction, TradingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { CurveAdapter } from '../../adapters/curve/curve';
import { TradingWorker } from '../worker';

export class CurveWorkerHook extends TradingWorker {
  public readonly name: string = 'worker.curve';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async parseTradingEvent(contract: Contract, event: any): Promise<TradingEvent | null> {
    const timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, event.blockNumber);
    const logIndex = event.logIndex;
    const transactionHash = event.transactionHash;
    const blockNumber = event.blockNumber;

    const adapter = new CurveAdapter(CurveConfigs, this.providers);
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
        action: action.action as TradingAction,
        tokens: action.tokens,
        amounts: action.tokenAmounts.map((amount, index) => {
          return new BigNumber(amount).multipliedBy(new BigNumber(10).pow(action.tokens[index].decimals)).toString(10);
        }),
        caller: action.addresses.length > 0 ? action.addresses[1] : action.addresses[0],
        user: action.addresses[0],
        addition: action.addition ? action.addition : undefined,
      };
    }

    return null;
  }
}
