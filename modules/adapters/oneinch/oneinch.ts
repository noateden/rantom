import { formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { OneinchAbiMappings, OneinchFunctionSignatures } from './abis';

export default class OneinchAdapter extends Adapter {
  public readonly name: string = 'adapter.oneinch';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = OneinchAbiMappings;
  }

  public async parseInputData(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.transaction.input.slice(0, 10);
    if (
      options.transaction &&
      this.eventMappings[signature] &&
      this.supportedContract(options.chain, options.transaction.to)
    ) {
      const web3 = this.services.blockchain.getProvider(options.chain);
      const params = web3.eth.abi.decodeParameters(
        this.eventMappings[signature].abi,
        options.transaction.input.slice(10)
      );

      if (signature === OneinchFunctionSignatures.Swap) {
        const tokenIn = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: params.desc.srcToken,
        });
        const tokenOut = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: params.desc.dstToken,
        });
        if (tokenIn && tokenOut) {
          const sender = normalizeAddress(options.transaction.from);
          const receiver = normalizeAddress(params.desc.dstReceiver);
          const amountIn = formatFromDecimals(params.desc.amount.toString(), tokenIn.decimals);
          const amountOut = formatFromDecimals(params.desc.minReturnAmount.toString(), tokenOut.decimals);
          actions.push(
            this.buildUpAction({
              ...options,
              action: 'trade',
              addresses: [sender, receiver],
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
