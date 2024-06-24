import BigNumber from 'bignumber.js';
import { decodeEventLog } from 'viem';

import PufferVaultAbi from '../../../configs/abi/puffer/PufferVaultV2.json';
import { AddressZero } from '../../../configs/constants/addresses';
import { normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { PufferEventSignatures } from './abis';

export default class PufferAdapter extends Adapter {
  public readonly name: string = 'adapter.puffer';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = {
      [PufferEventSignatures.Deposit]: {
        abi: [],
      },
    };
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];

      if (signature === PufferEventSignatures.Deposit) {
        const event: any = decodeEventLog({
          abi: PufferVaultAbi,
          topics: options.log.topics,
          data: options.log.data,
        });

        const depositor = normalizeAddress(event.args.sender);
        const amount = new BigNumber(event.args.assets.toString()).dividedBy(1e18).toString(10);

        actions.push(
          this.buildUpAction({
            ...options,
            action: 'deposit',
            addresses: [depositor],
            tokens: [
              {
                chain: 'ethereum',
                symbol: 'ETH',
                decimals: 18,
                address: AddressZero,
              },
            ],
            tokenAmounts: [amount],
          })
        );
      }
    }

    return actions;
  }
}
