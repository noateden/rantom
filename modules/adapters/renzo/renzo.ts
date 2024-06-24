import BigNumber from 'bignumber.js';
import { decodeEventLog } from 'viem';

import RestakeManagerAbi from '../../../configs/abi/renzo/RestakeManager.json';
import WithdrawlQueueAbi from '../../../configs/abi/renzo/WithdrawQueue.json';
import xRestakeAbi from '../../../configs/abi/renzo/xRenzoDeposit.json';
import { AddressZero } from '../../../configs/constants/addresses';
import { normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { RenzoEventSignatures } from './abis';

const layer2Tokens: { [key: string]: Token } = {
  arbitrum: {
    chain: 'arbitrum',
    symbol: 'ETH',
    decimals: 18,
    address: AddressZero,
  },
  bnbchain: {
    chain: 'bnbchain',
    symbol: 'ETH',
    decimals: 18,
    address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  },
  base: {
    chain: 'base',
    symbol: 'ETH',
    decimals: 18,
    address: AddressZero,
  },
};

export default class RenzoAdapter extends Adapter {
  public readonly name: string = 'adapter.renzo';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = {
      [RenzoEventSignatures.Deposit]: {
        abi: [],
      },
      [RenzoEventSignatures.DepositLayer2]: {
        abi: [],
      },
      [RenzoEventSignatures.WithdrawQueueCreated]: {
        abi: [],
      },
    };
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];

      if (signature === RenzoEventSignatures.Deposit) {
        const event: any = decodeEventLog({
          abi: RestakeManagerAbi,
          topics: options.log.topics,
          data: options.log.data,
        });

        const depositor = normalizeAddress(event.args.depositor);
        const token = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.args.token.toString(),
        });
        if (token) {
          const amount = new BigNumber(event.args.amount.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString(10);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'deposit',
              addresses: [depositor],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        }
      } else if (signature === RenzoEventSignatures.WithdrawQueueCreated) {
        const event: any = decodeEventLog({
          abi: WithdrawlQueueAbi,
          topics: options.log.topics,
          data: options.log.data,
        });

        const user = normalizeAddress(event.args.user);
        const token = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.args.claimToken.toString(),
        });
        if (token) {
          const amount = new BigNumber(event.args.amountToRedeem.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString(10);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'withdraw',
              addresses: [user],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        }
      } else if (signature === RenzoEventSignatures.DepositLayer2) {
        const event: any = decodeEventLog({
          abi: xRestakeAbi,
          topics: options.log.topics,
          data: options.log.data,
        });

        const depositor = normalizeAddress(event.args.user);
        const token = layer2Tokens[options.chain];
        if (token) {
          const amount = new BigNumber(event.args.amountIn.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString(10);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'deposit',
              addresses: [depositor],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        }
      }
    }

    return actions;
  }
}
