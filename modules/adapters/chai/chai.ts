import BigNumber from 'bignumber.js';

import { TokenList } from '../../../configs';
import McdPotAbi from '../../../configs/abi/maker/McdPot.json';
import { AddressZero } from '../../../configs/constants/addresses';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { TransferAbiMappings, TransferEventSignatures } from '../transfer/abis';

export default class ChaiAdapter extends Adapter {
  public readonly name: string = 'adapter.chai';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = {
      [TransferEventSignatures.Transfer]: TransferAbiMappings[TransferEventSignatures.Transfer],
    };
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];

      const web3 = this.services.blockchain.getProvider(options.chain);
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      const from = normalizeAddress(event.from);
      const to = normalizeAddress(event.to);

      if (compareAddress(from, AddressZero) || compareAddress(to, AddressZero)) {
        const token = TokenList.ethereum.DAI;
        const daiRate = await this.services.blockchain.singlecall({
          chain: options.chain,
          abi: McdPotAbi,
          target: '0x197e90f9fad81970ba7976f33cbd77088e5d7cf7',
          method: 'chi',
          params: [],
          blockNumber: Number(options.log.blockNumber),
        });
        const amount = new BigNumber(event.value)
          .multipliedBy(new BigNumber(daiRate.toString()))
          .dividedBy(1e27)
          .dividedBy(new BigNumber(10).pow(token.decimals))
          .toString(10);
        const action: KnownAction = compareAddress(from, AddressZero) ? 'deposit' : 'withdraw';
        const user: string = compareAddress(from, AddressZero) ? to : from;

        actions.push(
          this.buildUpAction({
            ...options,
            action: action,
            addresses: [user],
            tokens: [token],
            tokenAmounts: [amount],
          })
        );
      }
    }

    return actions;
  }
}
