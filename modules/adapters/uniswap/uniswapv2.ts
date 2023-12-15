import BigNumber from 'bignumber.js';

import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import { UniswapAbiMappings, UniswapEventSignatures } from './abis';
import UniswapLibs from './libs';
import UniswapAdapter from './uniswap';

export default class Uniswapv2Adapter extends UniswapAdapter {
  public readonly name: string = 'adapter.uniswapv2';

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.eventMappings[UniswapEventSignatures.SwapV2] = UniswapAbiMappings[UniswapEventSignatures.SwapV2];
    this.eventMappings[UniswapEventSignatures.MintV2] = UniswapAbiMappings[UniswapEventSignatures.MintV2];
    this.eventMappings[UniswapEventSignatures.BurnV2] = UniswapAbiMappings[UniswapEventSignatures.BurnV2];
  }

  /**
   * @description turns a raw event log into TransactionActions
   *
   * @param options include raw log entry and transaction context
   */
  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];
    if (!this.eventMappings[signature]) {
      return actions;
    }

    let liquidityPool = await this.getLiquidityPool(options.chain, options.log.address);
    if (!liquidityPool && options.onchain) {
      liquidityPool = await UniswapLibs.getLiquidityPoolOnchain({
        chain: options.chain,
        address: options.log.address,
        version: 'univ2',
        protocol: this.config.protocol,
      });

      if (liquidityPool) {
        if (!this.supportedContract(options.chain, liquidityPool.factory)) {
          liquidityPool = null;
        }
      }
    }
    if (liquidityPool && this.supportedContract(options.chain, liquidityPool.factory)) {
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event: any = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      switch (signature) {
        case UniswapEventSignatures.SwapV2: {
          const amount0In = new BigNumber(event.amount0In.toString());

          const tokenIn = amount0In.gt(0) ? liquidityPool.tokens[0] : liquidityPool.tokens[1];
          const tokenOut = amount0In.gt(0) ? liquidityPool.tokens[1] : liquidityPool.tokens[0];
          const amountIn = amount0In.gt(0)
            ? formatFromDecimals(event.amount0In.toString(), tokenIn.decimals)
            : formatFromDecimals(event.amount1In.toString(), tokenIn.decimals);
          const amountOut = amount0In.gt(0)
            ? formatFromDecimals(event.amount1Out.toString(), tokenOut.decimals)
            : formatFromDecimals(event.amount0Out.toString(), tokenOut.decimals);

          const sender = normalizeAddress(event.sender);
          const recipient = normalizeAddress(event.to);

          actions.push({
            chain: options.chain,
            protocol: this.config.protocol,
            action: 'swap',
            transactionHash: options.log.transactionHash,
            logIndex: `${options.log.logIndex}:0`,
            blockNumber: Number(options.log.blockNumber),
            contract: normalizeAddress(options.log.address),
            addresses: [sender, recipient],
            tokens: [tokenIn, tokenOut],
            tokenAmounts: [amountIn, amountOut],
          });
          break;
        }
        case UniswapEventSignatures.MintV2:
        case UniswapEventSignatures.BurnV2: {
          const amount0 = formatFromDecimals(event.amount0.toString(), liquidityPool.tokens[0].decimals);
          const amount1 = formatFromDecimals(event.amount1.toString(), liquidityPool.tokens[1].decimals);
          const sender = normalizeAddress(event.sender);
          const action: KnownAction = signature === UniswapEventSignatures.MintV2 ? 'deposit' : 'withdraw';
          actions.push({
            chain: options.chain,
            protocol: this.config.protocol,
            action: action,
            transactionHash: options.log.transactionHash,
            logIndex: `${options.log.logIndex}:0`,
            blockNumber: Number(options.log.blockNumber),
            contract: normalizeAddress(options.log.address),
            addresses: [sender],
            tokens: [liquidityPool.tokens[0], liquidityPool.tokens[1]],
            tokenAmounts: [amount0, amount1],
          });
          break;
        }
      }
    }

    return actions;
  }
}
