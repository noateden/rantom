import { AddressZero } from '../../../configs/constants/addresses';
import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { RocketpoolAbiMappings, RocketpoolEventSignatures } from './abis';

export default class RocketpoolAdapter extends Adapter {
  public readonly name: string = 'adapter.rocketpool';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = RocketpoolAbiMappings;
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

      const token: Token = {
        chain: 'ethereum',
        symbol: 'ETH',
        decimals: 18,
        address: AddressZero,
      };
      const user = event.to ? normalizeAddress(event.to) : normalizeAddress(event.from);
      const amount = formatFromDecimals(event.ethAmount.toString(), token.decimals);

      actions.push(
        this.buildUpAction({
          ...options,
          action: signature === RocketpoolEventSignatures.Deposit ? 'deposit' : 'withdraw',
          addresses: [user],
          tokens: [token],
          tokenAmounts: [amount],
        })
      );
    }

    return actions;
  }
}
