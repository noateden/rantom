import BigNumber from 'bignumber.js';

import { TokenList } from '../../../configs';
import { normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { ApecoinAbiMappings, ApecoinEventSignatures } from './abis';

export default class ApecoinAdapter extends Adapter {
  public readonly name: string = 'adapter.apecoin';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = ApecoinAbiMappings;
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

      let action: KnownAction = 'deposit';
      if (signature === ApecoinEventSignatures.Withdraw || signature === ApecoinEventSignatures.WithdrawNft) {
        action = 'withdraw';
      }
      if (signature === ApecoinEventSignatures.ClaimRewards || signature === ApecoinEventSignatures.ClaimRewardsNft) {
        action = 'collect';
      }

      const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);
      const user = normalizeAddress(event.user);

      actions.push(
        this.buildUpAction({
          ...options,
          action: action,
          addresses: [user],
          tokens: [TokenList.ethereum.APE],
          tokenAmounts: [amount],
        })
      );
    }

    return actions;
  }
}
