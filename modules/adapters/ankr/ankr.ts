import BigNumber from 'bignumber.js';

import { AddressZero } from '../../../configs/constants/addresses';
import { NativeTokens } from '../../../configs/constants/nativeTokens';
import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { AnkrAbiMappings, AnkrEventSignatures } from './abis';

export default class AnkrAdapter extends Adapter {
  public readonly name: string = 'adapter.ankr';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = AnkrAbiMappings;
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

      switch (signature) {
        case AnkrEventSignatures.StakeConfirmed:
        case AnkrEventSignatures.PendingUnstake:
        case AnkrEventSignatures.Staked:
        case AnkrEventSignatures.Unstaked: {
          const amount = formatFromDecimals(event.amount.toString(), 18);
          const user = event.staker ? normalizeAddress(event.staker) : normalizeAddress(event.ownerAddress);

          actions.push(
            this.buildUpAction({
              ...options,
              action:
                signature === AnkrEventSignatures.StakeConfirmed || signature === AnkrEventSignatures.Staked
                  ? 'deposit'
                  : 'withdraw',
              addresses: [user],
              tokens: [
                {
                  ...NativeTokens[options.chain],
                  chain: options.chain,
                  address: AddressZero,
                },
              ],
              tokenAmounts: [amount],
            })
          );

          break;
        }
        case AnkrEventSignatures.RewardsClaimed: {
          const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);
          const user = normalizeAddress(event.claimer);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'collect',
              addresses: [user],
              tokens: [
                {
                  ...NativeTokens[options.chain],
                  chain: options.chain,
                  address: AddressZero,
                },
              ],
              tokenAmounts: [amount],
            })
          );

          break;
        }
      }
    }

    return actions;
  }
}
