import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { ZeroxAbiMappings, ZeroxEventSignatures } from './abis';

export default class ZeroxAdapter extends Adapter {
  public readonly name: string = 'adapter.zerox';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = ZeroxAbiMappings;
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

      switch (signature) {
        case ZeroxEventSignatures.Trade: {
          const tokenIn = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.inputToken,
          });
          const tokenOut = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.outputToken,
          });

          if (tokenIn && tokenOut) {
            const amountIn = formatFromDecimals(event.inputTokenAmount.toString(), tokenIn.decimals);
            const amountOut = formatFromDecimals(event.outputTokenAmount.toString(), tokenOut.decimals);
            const trader = normalizeAddress(event.taker);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'trade',
                addresses: [trader],
                tokens: [tokenIn, tokenOut],
                tokenAmounts: [amountIn, amountOut],
              })
            );
          }

          break;
        }

        case ZeroxEventSignatures.OtcOrderFilled:
        case ZeroxEventSignatures.LimitOrderFilled:
        case ZeroxEventSignatures.RfqOrderFilled: {
          const tokenIn = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.takerToken,
          });
          const tokenOut = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.makerToken,
          });
          if (tokenIn && tokenOut) {
            const amountIn = formatFromDecimals(event.takerTokenFilledAmount.toString(), tokenIn.decimals);
            const amountOut = formatFromDecimals(event.makerTokenFilledAmount.toString(), tokenOut.decimals);
            const trader = normalizeAddress(event.taker);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'trade',
                addresses: [trader],
                tokens: [tokenIn, tokenOut],
                tokenAmounts: [amountIn, amountOut],
              })
            );
          }

          break;
        }
      }
    }

    return actions;
  }
}
