import { decodeEventLog } from 'viem';

import V3vaultAbi from '../../../configs/abi/yearn/V3Vault.json';
import { formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { YearnV3VaultEvents } from './abis';

export default class YearnV3VaultAdapter extends Adapter {
  public readonly name: string = 'adapter.yearn';

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });
  }

  public supportedSignature(signature: string): boolean {
    return Object.values(YearnV3VaultEvents).includes(signature);
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];

    const [factory, tokenAddress] = await this.services.blockchain.multicall({
      chain: options.chain,
      calls: [
        {
          abi: V3vaultAbi,
          target: options.log.address,
          method: 'FACTORY',
          params: [],
        },
        {
          abi: V3vaultAbi,
          target: options.log.address,
          method: 'asset',
          params: [],
        },
      ],
    });
    if (this.supportedContract(options.chain, factory)) {
      const token = await this.services.blockchain.getTokenInfo({
        chain: options.chain,
        address: tokenAddress,
      });
      if (token) {
        const event: any = decodeEventLog({
          abi: V3vaultAbi,
          topics: options.log.topics,
          data: options.log.data,
        });

        const sender = normalizeAddress(event.args.sender);
        const owner = normalizeAddress(event.args.owner);
        const amount = formatFromDecimals(event.args.assets.toString(), token.decimals);
        actions.push(
          this.buildUpAction({
            ...options,
            action: signature === YearnV3VaultEvents.Deposit ? 'deposit' : 'withdraw',
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
