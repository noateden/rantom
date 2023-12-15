import { BasinConfig, BasinPoolConfig } from '../../../configs/protocols/basin';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { BasinAbiMappings, BasinEventSignatures } from './abis';

export default class BasinAdapter extends Adapter {
  public readonly name: string = 'adapter.basin';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = BasinAbiMappings;
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

      if (signature === BasinEventSignatures.AddLiquidity || signature === BasinEventSignatures.RemoveLiquidity) {
        let pool: BasinPoolConfig | null = null;
        for (const contract of (this.config as BasinConfig).contracts) {
          if (contract.chain === options.chain && compareAddress(contract.address, options.log.address)) {
            pool = contract;
          }
        }

        if (pool) {
          const amounts: Array<string> = [];
          const rawAmounts = event.tokenAmountsIn ? event.tokenAmountsIn : event.tokenAmountsOut;
          for (let i = 0; i < rawAmounts.length; i++) {
            amounts.push(formatFromDecimals(rawAmounts[i].toString(), pool.tokens[i].decimals));
          }

          const recipient = normalizeAddress(event.recipient);
          const action: KnownAction = signature === BasinEventSignatures.AddLiquidity ? 'deposit' : 'withdraw';

          actions.push(
            this.buildUpAction({
              ...options,
              action,
              addresses: [recipient],
              tokens: pool.tokens,
              tokenAmounts: amounts,
            })
          );
        }
      } else if (signature === BasinEventSignatures.Swap) {
        const tokenIn = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.fromToken,
        });
        const tokenOut = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.toToken,
        });
        if (tokenIn && tokenOut) {
          const recipient = normalizeAddress(event.recipient);
          const amountIn = formatFromDecimals(event.amountIn.toString(), tokenIn.decimals);
          const amountOut = formatFromDecimals(event.amountOut.toString(), tokenOut.decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'swap',
              addresses: [recipient],
              tokens: [tokenIn, tokenOut],
              tokenAmounts: [amountIn, amountOut],
            })
          );
        }
      } else if (signature === BasinEventSignatures.RemoveLiquidityOneToken) {
        const token = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.tokenOut,
        });
        if (token) {
          const recipient = normalizeAddress(event.recipient);
          const amount = formatFromDecimals(event.tokenAmountOut.toString(), token.decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'withdraw',
              addresses: [recipient],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        }
      } else if (signature === BasinEventSignatures.Shift) {
        const token = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.toToken,
        });
        if (token) {
          const recipient = normalizeAddress(event.recipient);
          const amount = formatFromDecimals(event.amountOut.toString(), token.decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'collect',
              addresses: [recipient],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        }
      }
    }

    return actions;
  }
}
