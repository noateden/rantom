import { TokenList } from '../../../configs';
import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { BancorAbiMappings, BancorEventSignatures } from './abis';

export default class BancorAdapter extends Adapter {
  public readonly name: string = 'adapter.bancor';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = BancorAbiMappings;
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

      if (signature === BancorEventSignatures.TokensTraded) {
        const tokenIn = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.sourceToken,
        });
        const tokenOut = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.targetToken,
        });
        if (tokenIn && tokenOut) {
          const trader = normalizeAddress(event.trader);
          const amountIn = formatFromDecimals(event.sourceAmount.toString(), tokenIn.decimals);
          const amountOut = formatFromDecimals(event.targetAmount.toString(), tokenOut.decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'swap',
              addresses: [trader],
              tokens: [tokenIn, tokenOut],
              tokenAmounts: [amountIn, amountOut],
            })
          );
        }
      } else if (
        signature === BancorEventSignatures.TokensDeposited ||
        signature === BancorEventSignatures.TokensWithdrawn
      ) {
        const token = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.token,
        });
        if (token) {
          const provider = normalizeAddress(event.provider);
          const amount = formatFromDecimals(event.baseTokenAmount.toString(), token.decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: signature === BancorEventSignatures.TokensDeposited ? 'deposit' : 'withdraw',
              addresses: [provider],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        }
      } else if (signature === BancorEventSignatures.FlashLoanCompleted) {
        const token = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.token,
        });
        if (token) {
          const borrower = normalizeAddress(event.borrower);
          const amount = formatFromDecimals(event.amount.toString(), token.decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'flashloan',
              addresses: [borrower],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        }
      } else if (
        signature === BancorEventSignatures.BNTPoolTokensDeposited ||
        signature === BancorEventSignatures.BNTPoolTokensWithdrawn
      ) {
        const user = normalizeAddress(event.provider);
        const amount = formatFromDecimals(event.bntAmount.toString(), TokenList.ethereum.BNT.decimals);

        actions.push(
          this.buildUpAction({
            ...options,
            action: signature === BancorEventSignatures.BNTPoolTokensDeposited ? 'deposit' : 'withdraw',
            addresses: [user],
            tokens: [TokenList.ethereum.BNT],
            tokenAmounts: [amount],
          })
        );
      }
    }

    return actions;
  }
}
