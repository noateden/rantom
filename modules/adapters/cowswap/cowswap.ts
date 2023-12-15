import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { CowswapAbiMappings } from './abis';

export default class CowswapAdapter extends Adapter {
  public readonly name: string = 'adapter.cowswap';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = CowswapAbiMappings;
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

      const tokenIn = await this.services.blockchain.getTokenInfo({
        chain: options.chain,
        address: event.sellToken,
      });
      const tokenOut = await this.services.blockchain.getTokenInfo({
        chain: options.chain,
        address: event.buyToken,
      });

      if (tokenIn && tokenOut) {
        const amountIn = formatFromDecimals(event.sellAmount.toString(), tokenIn.decimals);
        const amountOut = formatFromDecimals(event.buyAmount.toString(), tokenOut.decimals);
        const trader = normalizeAddress(event.owner);

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
    }

    return actions;
  }
}
