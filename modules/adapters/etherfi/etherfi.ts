import BigNumber from 'bignumber.js';
import { decodeEventLog } from 'viem';

import LiquidityPoolAbi from '../../../configs/abi/etherfi/LiquidityPool.json';
import WithdrawNFTAbi from '../../../configs/abi/etherfi/WithdrawRequestNFT.json';
import { AddressZero } from '../../../configs/constants/addresses';
import { normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { EtherfiEventSignatures } from './abis';

export default class EtherfiAdapter extends Adapter {
  public readonly name: string = 'adapter.etherfi';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = {
      [EtherfiEventSignatures.Deposit]: {
        abi: [],
      },
      [EtherfiEventSignatures.WithdrawRequestCreated]: {
        abi: [],
      },
    };
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];

      if (signature === EtherfiEventSignatures.Deposit) {
        const event: any = decodeEventLog({
          abi: LiquidityPoolAbi,
          topics: options.log.topics,
          data: options.log.data,
        });

        const depositor = normalizeAddress(event.args.sender);
        const amount = new BigNumber(event.args.amount.toString()).dividedBy(1e18).toString(10);

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
      } else if (signature === EtherfiEventSignatures.WithdrawRequestCreated) {
        const event: any = decodeEventLog({
          abi: WithdrawNFTAbi,
          topics: options.log.topics,
          data: options.log.data,
        });

        const depositor = normalizeAddress(event.args.owner);
        const amount = new BigNumber(event.args.amountOfEEth.toString()).dividedBy(1e18).toString(10);

        actions.push(
          this.buildUpAction({
            ...options,
            action: 'withdraw',
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
