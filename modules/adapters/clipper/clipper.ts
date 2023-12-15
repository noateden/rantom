import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { ClipperAbiMappings, ClipperEventSignatures } from './abis';

export default class ClipperAdapter extends Adapter {
  public readonly name: string = 'adapter.clipper';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = ClipperAbiMappings;
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
        case ClipperEventSignatures.Swapped: {
          const tokenIn = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.inAsset,
          });
          const tokenOut = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.outAsset,
          });

          if (tokenIn && tokenOut) {
            const amountIn = formatFromDecimals(event.inAmount.toString(), tokenIn.decimals);
            const amountOut = formatFromDecimals(event.outAmount.toString(), tokenOut.decimals);
            const trader = normalizeAddress(event.recipient);

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

          break;
        }
      }
    }

    return actions;
  }
}
