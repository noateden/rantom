import { LidoConfig, LidoStakingPool } from '../../../configs/protocols/lido';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { LidoAbiMappings, LidoEventSignatures } from './abis';

export default class LidoAdapter extends Adapter {
  public readonly name: string = 'adapter.lido';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = LidoAbiMappings;
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

      let token: Token | null = null;
      for (const contract of (this.config as LidoConfig).contracts) {
        if (compareAddress(contract.address, options.log.address)) {
          token = (contract as LidoStakingPool).stakingToken;
        }
      }

      if (token) {
        switch (signature) {
          case LidoEventSignatures.Submitted:
          case LidoEventSignatures.SubmitEvent: {
            const amount = formatFromDecimals(event.amount ? event.amount.toString() : event._amount, token.decimals);
            const user = normalizeAddress(event.sender ? event.sender : event._from);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'deposit',
                addresses: [user],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );

            break;
          }
          case LidoEventSignatures.WithdrawalClaimed: {
            const owner = normalizeAddress(event.owner);
            const receiver = normalizeAddress(event.receiver);
            const amount = formatFromDecimals(event.amountOfETH, token.decimals);
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'withdraw',
                addresses: [owner, receiver],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );
            break;
          }
          case LidoEventSignatures.ClaimTokensEvent: {
            const owner = normalizeAddress(event._from);
            const amount = formatFromDecimals(event._amountClaimed, token.decimals);
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'withdraw',
                addresses: [owner],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );
            break;
          }
        }
      }
    }

    return actions;
  }
}
