import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { AddressZero } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { BalancerConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { KnownAction, TradingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { BalancerAdapter } from '../../adapters/balancer/balancer';
import { TradingWorker } from '../worker';

export class BalancerWorkerHook extends TradingWorker {
  public readonly name: string = 'worker.balancer';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async parseTradingEvent(contract: Contract, event: any, options: any): Promise<TradingEvent | null> {
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

    const web3 = new Web3(EnvConfig.blockchains[contract.chain].nodeRpc);
    const receipt = await web3.eth.getTransactionReceipt(transactionHash);
    const adapter = new BalancerAdapter(BalancerConfigs, this.providers);
    const action = await adapter.tryParsingActions({
      chain: contract.chain,
      sender: receipt ? receipt.from : AddressZero, // don't use this field
      address: contract.address,
      data: event.raw.data,
      topics: event.raw.topics,
    });

    if (action !== null) {
      return {
        chain: contract.chain,
        contract: normalizeAddress(contract.address),
        transactionHash: transactionHash,
        logIndex: logIndex,
        protocol: contract.protocol,
        timestamp,
        blockNumber: blockNumber,
        action: action.action as KnownAction,
        tokens: action.tokens,
        amounts: action.tokenAmounts.map((amount, index) => {
          return new BigNumber(amount)
            .multipliedBy(new BigNumber(10).pow((action as any).tokens[index].decimals))
            .toString(10);
        }),
        caller: action.addresses.length > 0 ? action.addresses[1] : action.addresses[0],
        user: action.addresses[0],
        addition: action.addition ? action.addition : undefined,
      };
    }

    return null;
  }
}
