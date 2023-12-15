import { AddressZero } from '../../../configs/constants/addresses';
import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { EnsAbiMappings, EnsEventSignatures } from './abis';

export default class EnsAdapter extends Adapter {
  public readonly name: string = 'adapter.ens';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = EnsAbiMappings;
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
        chain: options.chain,
        symbol: 'ETH',
        decimals: 18,
        address: AddressZero,
      };

      if (signature === EnsEventSignatures.Register || signature === EnsEventSignatures.Register2) {
        const owner = normalizeAddress(event.owner);
        const amount = formatFromDecimals(
          event.cost ? event.cost.toString() : event.baseCost.toString(),
          token.decimals
        );
        const expired = Number(event.expires);

        actions.push({
          ...this.buildUpAction({
            ...options,
            action: 'register',
            addresses: [owner],
            tokens: [token],
            tokenAmounts: [amount],
          }),
          addition: {
            name: event.name,
            expired: expired,
          },
        });
      } else if (signature === EnsEventSignatures.ReNew) {
        const expired = Number(event.expires);

        let transaction = options.transaction;
        if (!transaction) {
          transaction = await this.services.blockchain.getTransaction({
            chain: options.chain,
            hash: options.log.transactionHash,
          });
        }
        const sender = transaction.from;
        const amount = formatFromDecimals(event.cost.toString(), token.decimals);
        actions.push({
          ...this.buildUpAction({
            ...options,
            action: 'renew',
            addresses: [sender],
            tokens: [token],
            tokenAmounts: [amount],
          }),
          addition: {
            name: event.name,
            expired: expired,
          },
        });
      }
    }

    return actions;
  }
}
