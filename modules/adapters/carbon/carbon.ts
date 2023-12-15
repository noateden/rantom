import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { CarbonAbiMappings, CarbonEventSignatures } from './abis';

export default class CarbonAdapter extends Adapter {
  public readonly name: string = 'adapter.carbon';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = CarbonAbiMappings;
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

      if (signature === CarbonEventSignatures.TokensTraded) {
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
      } else {
        const token0 = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.token0,
        });
        const token1 = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.token1,
        });
        if (token0 && token1) {
          const amount0 = formatFromDecimals((event.order0 as any).y.toString(), token0.decimals);
          const amount1 = formatFromDecimals((event.order1 as any).y.toString(), token1.decimals);
          const user = normalizeAddress(event.owner);

          actions.push(
            this.buildUpAction({
              ...options,
              action: signature === CarbonEventSignatures.StrategyCreated ? 'deposit' : 'withdraw',
              addresses: [user],
              tokens: [token0, token1],
              tokenAmounts: [amount0, amount1],
            })
          );
        }
      }
    }

    return actions;
  }
}
