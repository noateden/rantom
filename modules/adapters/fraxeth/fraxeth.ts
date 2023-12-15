import { AddressZero } from '../../../configs/constants/addresses';
import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { FraxethAbiMappings, FraxethEventSignatures } from './abis';

export default class FraxethAdapter extends Adapter {
  public readonly name: string = 'adapter.fraxeth';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = FraxethAbiMappings;
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

      if (signature === FraxethEventSignatures.ETHSubmitted) {
        const token: Token = {
          chain: 'ethereum',
          symbol: 'ETH',
          decimals: 18,
          address: AddressZero,
        };
        const sender = normalizeAddress(event.sender);
        const recipient = normalizeAddress(event.recipient);
        const amount = formatFromDecimals(event.sent_amount.toString(), token.decimals);
        actions.push(
          this.buildUpAction({
            ...options,
            action: 'deposit',
            addresses: [sender, recipient],
            tokens: [token],
            tokenAmounts: [amount],
          })
        );
      } else if (signature === FraxethEventSignatures.Deposit || signature === FraxethEventSignatures.Withdraw) {
        const token: Token = {
          chain: 'ethereum',
          address: '0x5e8422345238f34275888049021821e8e08caa1f',
          symbol: 'frxETH',
          decimals: 18,
        };
        const sender = normalizeAddress(event.caller);
        const owner = normalizeAddress(event.owner);
        const amount = formatFromDecimals(event.assets.toString(), token.decimals);
        actions.push(
          this.buildUpAction({
            ...options,
            action: signature === FraxethEventSignatures.Deposit ? 'deposit' : 'withdraw',
            addresses: [sender, owner],
            tokens: [token],
            tokenAmounts: [amount],
          })
        );
      }
    }

    return actions;
  }
}
