import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { AddressZero, BeaconDepositContract } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { Eth2Configs, LidoConfigs } from '../../../configs/protocols';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { KnownAction, StakingEvent } from '../../../types/domains';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { Eth2Adapter } from '../../adapters/eth2/eth2';
import { LidoAdapter } from '../../adapters/lido/lido';
import { StakingWorker } from '../worker';

export class LidoWorkerHook extends StakingWorker {
  public readonly name: string = 'worker.lido';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new LidoAdapter(LidoConfigs, this.providers);
  }

  public async parseStakingEvent(contract: Contract, event: any): Promise<StakingEvent | null> {
    let adapter: IAdapter | null = this.getAdapter();

    if (!adapter) return null;

    const timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, event.blockNumber);
    const logIndex = event.logIndex;
    const transactionHash = event.transactionHash;
    const blockNumber = event.blockNumber;

    if (compareAddress(contract.address, BeaconDepositContract)) {
      const web3 = new Web3(EnvConfig.blockchains[contract.chain].nodeRpc);
      const receipt = await web3.eth.getTransactionReceipt(transactionHash);
      if (compareAddress(receipt.to, LidoConfigs.staticData.depositSecurityModule2)) {
        adapter = new Eth2Adapter(Eth2Configs, this.providers);
      }
    }

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
        action: action.action as KnownAction,
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
