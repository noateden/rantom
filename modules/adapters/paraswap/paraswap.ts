import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { ParaswapAbiMappings } from './abis';

export default class ParaswapAdapter extends Adapter {
  public readonly name: string = 'adapter.paraswap';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = ParaswapAbiMappings;
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
        address: event.srcToken,
      });
      const tokenOut = await this.services.blockchain.getTokenInfo({
        chain: options.chain,
        address: event.destToken,
      });

      if (tokenIn && tokenOut) {
        const amountIn = formatFromDecimals(event.srcAmount.toString(), tokenIn.decimals);
        const amountOut = formatFromDecimals(event.receivedAmount.toString(), tokenOut.decimals);
        const initiator = normalizeAddress(event.initiator);
        const beneficiary = normalizeAddress(event.beneficiary);

        actions.push(
          this.buildUpAction({
            ...options,
            action: 'trade',
            addresses: [initiator, beneficiary],
            tokens: [tokenIn, tokenOut],
            tokenAmounts: [amountIn, amountOut],
          })
        );
      }
    }

    return actions;
  }
}
