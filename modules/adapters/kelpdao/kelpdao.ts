import BigNumber from 'bignumber.js';
import { decodeEventLog } from 'viem';

import KelpdaoLRTRepositPoolAbi from '../../../configs/abi/kelpdao/LRTDepositPool.json';
import DepositPoolAbi from '../../../configs/abi/kelpdao/RSETHPool.json';
import { AddressZero } from '../../../configs/constants/addresses';
import { normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { KelpdaoEventSignatures } from './abis';

export default class KelpdaoAdapter extends Adapter {
  public readonly name: string = 'adapter.kelpdao';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = {
      [KelpdaoEventSignatures.ETHDeposit]: {
        abi: [],
      },
      [KelpdaoEventSignatures.SwapOccurred]: {
        abi: [],
      },
    };
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];

      if (signature === KelpdaoEventSignatures.ETHDeposit) {
        const event: any = decodeEventLog({
          abi: KelpdaoLRTRepositPoolAbi,
          topics: options.log.topics,
          data: options.log.data,
        });

        const depositor = normalizeAddress(event.args.depositor);
        const amount = new BigNumber(event.args.depositAmount.toString()).dividedBy(1e18).toString(10);

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
      } else if (signature === KelpdaoEventSignatures.SwapOccurred) {
        const event: any = decodeEventLog({
          abi: DepositPoolAbi,
          topics: options.log.topics,
          data: options.log.data,
        });

        const depositor = normalizeAddress(event.args.user);
        const amount = new BigNumber(event.args.rsETHAmount.toString()).dividedBy(1e18).toString(10);

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
