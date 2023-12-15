import { AddressZero } from '../../../configs/constants/addresses';
import { NativeTokens } from '../../../configs/constants/nativeTokens';
import { normalizeAddress } from '../../../lib/utils';
import { fromLittleEndian64 } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { Eth2AbiMappings } from './abis';

export default class Eth2Adapter extends Adapter {
  public readonly name: string = 'adapter.eth2';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = Eth2AbiMappings;
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

      const amount = fromLittleEndian64(event.amount);
      let transaction = options.transaction;
      if (!transaction) {
        transaction = await this.services.blockchain.getTransaction({
          chain: options.chain,
          hash: options.log.transactionHash,
        });
      }

      actions.push({
        ...this.buildUpAction({
          ...options,
          action: 'deposit',
          addresses: [normalizeAddress(transaction.from)],
          tokens: [
            {
              ...NativeTokens.ethereum,
              chain: options.chain,
              address: AddressZero,
            },
          ],
          tokenAmounts: [amount],
        }),
        addition: {
          pubkey: event.pubkey,
          withdrawalCredentials: event.withdrawal_credentials,
        },
      });
    }

    return actions;
  }
}
