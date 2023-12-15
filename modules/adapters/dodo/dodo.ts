import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { DodoAbiMappings, DodoEventSignatures } from './abis';

export default class DodoAdapter extends Adapter {
  public readonly name: string = 'adapter.dodo';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = DodoAbiMappings;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const pool = await this.services.datastore.getLiquidityPoolConstant({
      chain: options.chain,
      protocol: this.config.protocol,
      address: options.log.address,
    });
    if (pool) {
      const signature = options.log.topics[0];

      const web3 = this.services.blockchain.getProvider(options.chain);
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      switch (signature) {
        // stable swap
        case DodoEventSignatures.DODOSwap: {
          const tokenIn = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.fromToken,
          });
          const tokenOut = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.toToken,
          });
          if (tokenIn && tokenOut) {
            const amountIn = formatFromDecimals(event.fromAmount.toString(), tokenIn.decimals);
            const amountOut = formatFromDecimals(event.toAmount.toString(), tokenOut.decimals);
            const trader = normalizeAddress(event.trader);
            const receiver = normalizeAddress(event.receiver);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'swap',
                addresses: [trader, receiver],
                tokens: [tokenIn, tokenOut],
                tokenAmounts: [amountIn, amountOut],
              })
            );
          }

          break;
        }
        case DodoEventSignatures.DODOFlashLoan: {
          const borrower = normalizeAddress(event.borrower);
          const receiver = normalizeAddress(event.assetTo);

          const baseAmount = formatFromDecimals(event.baseAmount.toString(), pool.tokens[0].decimals);
          const quoteAmount = formatFromDecimals(event.quoteAmount.toString(), pool.tokens[1].decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'flashloan',
              addresses: [borrower, receiver],
              tokens: [pool.tokens[0], pool.tokens[1]],
              tokenAmounts: [baseAmount, quoteAmount],
            })
          );

          break;
        }

        // v1
        case DodoEventSignatures.Deposit:
        case DodoEventSignatures.Withdraw: {
          const isBaseToken = Boolean(event.isBaseToken);
          const token = isBaseToken ? pool.tokens[0] : pool.tokens[1];
          const amount = formatFromDecimals(event.amount.toString(), token.decimals);
          const payer = normalizeAddress(event.payer);
          const receiver = normalizeAddress(event.receiver);

          actions.push(
            this.buildUpAction({
              ...options,
              action: signature === DodoEventSignatures.Deposit ? 'deposit' : 'withdraw',
              addresses: [payer, receiver],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );

          break;
        }

        case DodoEventSignatures.BuyBaseToken:
        case DodoEventSignatures.SellBaseToken: {
          let tokenIn;
          let tokenOut;
          let amountIn;
          let amountOut;
          let addresses;

          if (signature === DodoEventSignatures.BuyBaseToken) {
            tokenIn = pool.tokens[1];
            tokenOut = pool.tokens[0];
            amountIn = formatFromDecimals(event.payQuote.toString(), tokenIn.decimals);
            amountOut = formatFromDecimals(event.receiveBase.toString(), tokenOut.decimals);
            addresses = [normalizeAddress(event.buyer)];
          } else {
            tokenIn = pool.tokens[0];
            tokenOut = pool.tokens[1];
            amountIn = formatFromDecimals(event.payBase.toString(), tokenIn.decimals);
            amountOut = formatFromDecimals(event.receiveQuote.toString(), tokenOut.decimals);
            addresses = [normalizeAddress(event.seller)];
          }

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'swap',
              addresses,
              tokens: [tokenIn, tokenOut],
              tokenAmounts: [amountIn, amountOut],
            })
          );

          break;
        }
      }
    }

    return actions;
  }
}
