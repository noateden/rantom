import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { OdosAbiMappings, OdosEventSignatures } from './abis';

export default class OdosAdapter extends Adapter {
  public readonly name: string = 'adapter.odos';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = OdosAbiMappings;
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

      if (signature === OdosEventSignatures.Swap) {
        const tokenIn = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.inputToken,
        });
        const tokenOut = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.outputToken,
        });

        if (tokenIn && tokenOut) {
          const amountIn = formatFromDecimals(event.inputAmount.toString(), tokenIn.decimals);
          const amountOut = formatFromDecimals(event.amountOut.toString(), tokenOut.decimals);
          const sender = normalizeAddress(event.sender);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'trade',
              addresses: [sender],
              tokens: [tokenIn, tokenOut],
              tokenAmounts: [amountIn, amountOut],
            })
          );
        }
      } else if (signature === OdosEventSignatures.SwapMulti) {
        const tokenIn = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.tokensIn[0],
        });
        const tokenOut = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.tokensOut[event.tokensOut.length - 1],
        });
        if (tokenIn && tokenOut) {
          const amountIn = formatFromDecimals(event.amountsIn[0].toString(), tokenIn.decimals);
          const amountOut = formatFromDecimals(
            event.amountsOut[event.amountsOut.length - 1].toString(),
            tokenOut.decimals
          );
          const sender = normalizeAddress(event.sender);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'trade',
              addresses: [sender],
              tokens: [tokenIn, tokenOut],
              tokenAmounts: [amountIn, amountOut],
            })
          );
        }
      }
    }

    return actions;
  }
}
