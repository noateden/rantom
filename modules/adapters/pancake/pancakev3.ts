import BigNumber from 'bignumber.js';

import { normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import UniswapLibs from '../uniswap/libs';
import Uniswapv3Adapter from '../uniswap/uniswapv3';
import { PancakeAbiMappings, PancakeEventSignatures } from './abis';

export default class Pancakev3Adapter extends Uniswapv3Adapter {
  public readonly name: string = 'adapter.pancakev3';

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.eventMappings[PancakeEventSignatures.SwapV3] = PancakeAbiMappings[PancakeEventSignatures.SwapV3];
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = await super.parseEventLog(options);
    if (actions.length > 0) {
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
      const signature = options.log.topics[0];
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event: any = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      if (signature === PancakeEventSignatures.SwapV3) {
        let amountIn = '0';
        let amountOut = '0';
        let tokenIn = liquidityPool.tokens[0];
        let tokenOut = liquidityPool.tokens[1];

        const amount0 = new BigNumber(event.amount0.toString()).dividedBy(
          new BigNumber(10).pow(liquidityPool.tokens[0].decimals)
        );
        const amount1 = new BigNumber(event.amount1.toString()).dividedBy(
          new BigNumber(10).pow(liquidityPool.tokens[1].decimals)
        );

        if (amount0.lt(0)) {
          // swap from token1 -> token0
          tokenIn = liquidityPool.tokens[1];
          tokenOut = liquidityPool.tokens[0];
          amountIn = amount1.abs().toString(10);
          amountOut = amount0.abs().toString(10);
        } else {
          // swap from token0 -> token1
          tokenIn = liquidityPool.tokens[0];
          tokenOut = liquidityPool.tokens[1];
          amountIn = amount0.abs().toString(10);
          amountOut = amount1.abs().toString(10);
        }

        const sender = normalizeAddress(event.sender);
        const recipient = normalizeAddress(event.recipient);

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
      }
    }

    return actions;
  }
}
