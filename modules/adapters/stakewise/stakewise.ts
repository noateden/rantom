import { AddressZero } from '../../../configs/constants/addresses';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { TransferAbiMappings, TransferEventSignatures } from '../transfer/abis';
import { StakewiseAbiMappings, StakewiseEventSignatures } from './abis';

export default class StakewiseAdapter extends Adapter {
  public readonly name: string = 'adapter.stakewise';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = StakewiseAbiMappings;
    this.eventMappings[TransferEventSignatures.Transfer] = TransferAbiMappings[TransferEventSignatures.Transfer];
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

      if (signature === TransferEventSignatures.Transfer) {
        const from = normalizeAddress(event.from);
        const to = normalizeAddress(event.to);
        if (compareAddress(from, AddressZero) || compareAddress(to, AddressZero)) {
          const token: Token = {
            chain: 'ethereum',
            symbol: 'ETH',
            decimals: 18,
            address: AddressZero,
          };
          const amount = formatFromDecimals(event.value.toString(), token.decimals);
          const action: KnownAction = compareAddress(from, AddressZero) ? 'deposit' : 'withdraw';
          const user = compareAddress(from, AddressZero) ? to : from;

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
      } else if (signature === StakewiseEventSignatures.Claimed) {
        const tokens: Array<Token> = [];
        const amounts: Array<string> = [];
        for (let i = 0; i < event.tokens.length; i++) {
          const token = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.tokens[i].toString(),
          });
          if (token) {
            tokens.push(token);
            amounts.push(formatFromDecimals(event.amounts[i].toString(), token.decimals));
          }
        }
        actions.push(
          this.buildUpAction({
            ...options,
            action: 'collect',
            addresses: [normalizeAddress(event.account)],
            tokens: tokens,
            tokenAmounts: amounts,
          })
        );
      }
    }

    return actions;
  }
}
