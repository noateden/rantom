import { formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import SushiAdapter from '../sushi/sushi';
import { PancakeAbiMappings, PancakeEventSignatures } from './abis';

export default class PancakeAdapter extends SushiAdapter {
  public readonly name: string = 'adapter.pancake';

  protected readonly rewardToken: Token = {
    chain: 'bnbchain',
    symbol: 'CAKE',
    decimals: 18,
    address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  };

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.eventMappings[PancakeEventSignatures.TokenExchange] = PancakeAbiMappings[PancakeEventSignatures.TokenExchange];
    this.eventMappings[PancakeEventSignatures.AddLiquidity] = PancakeAbiMappings[PancakeEventSignatures.AddLiquidity];
    this.eventMappings[PancakeEventSignatures.RemoveLiquidity] =
      PancakeAbiMappings[PancakeEventSignatures.RemoveLiquidity];
    this.eventMappings[PancakeEventSignatures.RemoveLiquidityOne] =
      PancakeAbiMappings[PancakeEventSignatures.RemoveLiquidityOne];
    this.eventMappings[PancakeEventSignatures.RemoveLiquidityImbalance] =
      PancakeAbiMappings[PancakeEventSignatures.RemoveLiquidityImbalance];
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions = await super.parseEventLog(options);
    if (actions.length > 0) {
      return actions;
    }

    const stableswapPool = await this.services.datastore.getLiquidityPoolConstant({
      chain: options.chain,
      protocol: this.config.protocol,
      address: options.log.address,
    });
    if (stableswapPool) {
      const signature = options.log.topics[0];
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event: any = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      switch (signature) {
        case PancakeEventSignatures.TokenExchange: {
          const buyer = normalizeAddress(event.buyer);
          const tokenIn = stableswapPool.tokens[Number(event.sold_id)];
          const tokenOut = stableswapPool.tokens[Number(event.bought_id)];
          const amountIn = formatFromDecimals(event.tokens_sold.toString(), tokenIn.decimals);
          const amountOut = formatFromDecimals(event.tokens_bought.toString(), tokenOut.decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'swap',
              addresses: [buyer],
              tokens: [tokenIn, tokenOut],
              tokenAmounts: [amountIn, amountOut],
            })
          );
          break;
        }
        case PancakeEventSignatures.AddLiquidity:
        case PancakeEventSignatures.RemoveLiquidity:
        case PancakeEventSignatures.RemoveLiquidityImbalance: {
          const provider = normalizeAddress(event.provider);
          actions.push(
            this.buildUpAction({
              ...options,
              action: signature === PancakeEventSignatures.AddLiquidity ? 'deposit' : 'withdraw',
              addresses: [provider],
              tokens: stableswapPool.tokens,
              tokenAmounts: stableswapPool.tokens.map((item: Token, index: number) => {
                return formatFromDecimals(event.token_amounts[index].toString(), item.decimals);
              }),
            })
          );
          break;
        }
        case PancakeEventSignatures.RemoveLiquidityOne: {
          const provider = normalizeAddress(event.provider);
          const token = stableswapPool.tokens[Number(event.index)];
          actions.push(
            this.buildUpAction({
              ...options,
              action: 'withdraw',
              addresses: [provider],
              tokens: [token],
              tokenAmounts: [formatFromDecimals(event.coin_amount.toString(), token.decimals)],
            })
          );
          break;
        }
      }
    }

    return actions;
  }
}
