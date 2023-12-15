import BigNumber from 'bignumber.js';

import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { BalancerAbiMappings, BalancerEventSignatures } from './abis';

export default class BalancerAdapter extends Adapter {
  public readonly name: string = 'adapter.balancer';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = BalancerAbiMappings;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];
    if (!this.eventMappings[signature] || !this.supportedContract(options.chain, options.log.address)) {
      return actions;
    }

    const web3 = this.services.blockchain.getProvider(options.chain);
    const event = web3.eth.abi.decodeLog(
      this.eventMappings[signature].abi,
      options.log.data,
      options.log.topics.slice(1)
    );

    switch (signature) {
      case BalancerEventSignatures.Deposit:
      case BalancerEventSignatures.Withdraw: {
        const provider = normalizeAddress(event.provider);
        const token: Token = {
          chain: 'ethereum',
          address: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
          symbol: 'B-80BAL-20WETH',
          decimals: 18,
        };

        const amount = formatFromDecimals(event.value.toString(), 18);
        const action: KnownAction = signature === BalancerEventSignatures.Deposit ? 'lock' : 'unlock';

        actions.push({
          chain: options.chain,
          protocol: this.config.protocol,
          action: action,
          transactionHash: options.log.transactionHash,
          logIndex: `${options.log.logIndex}:0`,
          blockNumber: Number(options.log.blockNumber),
          contract: normalizeAddress(options.log.address),
          addresses: [provider],
          tokens: [token],
          tokenAmounts: [amount],
          addition: BalancerEventSignatures.Deposit
            ? {
                // lock until this unix timestamp
                lockTime: Number(event.locktime),
              }
            : undefined,
        });

        break;
      }

      case BalancerEventSignatures.Swap: {
        const tokenIn = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.tokenIn,
        });
        const tokenOut = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.tokenOut,
        });

        if (tokenIn && tokenOut) {
          const amountIn = formatFromDecimals(event.amountIn.toString(), tokenIn.decimals);
          const amountOut = formatFromDecimals(event.amountOut.toString(), tokenOut.decimals);

          let transaction = options.transaction;
          if (!transaction) {
            transaction = await this.services.blockchain.getTransaction({
              chain: options.chain,
              hash: options.log.transactionHash,
            });
          }
          if (transaction) {
            const sender = normalizeAddress(transaction.from);
            actions.push({
              chain: options.chain,
              protocol: this.config.protocol,
              action: 'swap',
              transactionHash: options.log.transactionHash,
              logIndex: `${options.log.logIndex}:0`,
              blockNumber: Number(options.log.blockNumber),
              contract: normalizeAddress(options.log.address),
              addresses: [sender],
              tokens: [tokenIn, tokenOut],
              tokenAmounts: [amountIn, amountOut],
            });
          }
        }
        break;
      }

      case BalancerEventSignatures.FlashLoan: {
        const token = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.token,
        });
        if (token) {
          const amount = formatFromDecimals(event.amount.toString(), token.decimals);
          const recipient = normalizeAddress(event.recipient);
          actions.push({
            chain: options.chain,
            protocol: this.config.protocol,
            action: 'flashloan',
            transactionHash: options.log.transactionHash,
            logIndex: `${options.log.logIndex}:0`,
            blockNumber: Number(options.log.blockNumber),
            contract: normalizeAddress(options.log.address),
            addresses: [recipient],
            tokens: [token],
            tokenAmounts: [amount],
          });
        }

        break;
      }

      case BalancerEventSignatures.PoolChanges: {
        const tokens: Array<Token> = [];
        for (const tokenAddr of event.tokens) {
          const token = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: tokenAddr,
          });
          if (token) {
            tokens.push(token);
          }
        }

        if (tokens.length > 0) {
          let action: KnownAction = 'deposit';
          const amounts: Array<string> = [];
          for (let i = 0; i < event.deltas.length; i++) {
            const amount = new BigNumber(event.deltas[i].toString());
            if (amount.lt(0)) {
              action = 'withdraw';
            }
            amounts.push(amount.dividedBy(new BigNumber(10).pow(tokens[i].decimals)).abs().toString(10));
          }

          const provider = normalizeAddress(event.liquidityProvider);

          actions.push({
            chain: options.chain,
            protocol: this.config.protocol,
            action: action,
            transactionHash: options.log.transactionHash,
            logIndex: `${options.log.logIndex}:0`,
            blockNumber: Number(options.log.blockNumber),
            contract: normalizeAddress(options.log.address),
            addresses: [provider],
            tokens: tokens,
            tokenAmounts: amounts,
          });
        }

        break;
      }
    }

    return actions;
  }
}
