import BigNumber from 'bignumber.js';

import TraderJoeLbPairAbi from '../../../configs/abi/traderjoe/LBPairV2.1.json';
import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { Traderjoev2AbiMappings, Traderjoev2EventSignatures } from './abis';

export default class Traderjoev2Adapter extends Adapter {
  public readonly name: string = 'adapter.traderjoev2';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = Traderjoev2AbiMappings;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];
    const factoryAddress = await this.services.blockchain.readContract({
      chain: options.chain,
      abi: TraderJoeLbPairAbi,
      target: options.log.address,
      method: 'getFactory',
      params: [],
    });
    if (this.supportedContract(options.chain, factoryAddress)) {
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event: any = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      const [token0Address, token1Address] = await this.services.blockchain.multicall({
        chain: options.chain,
        calls: [
          {
            abi: TraderJoeLbPairAbi,
            target: options.log.address,
            method: 'getTokenX',
            params: [],
          },
          {
            abi: TraderJoeLbPairAbi,
            target: options.log.address,
            method: 'getTokenY',
            params: [],
          },
        ],
      });
      const token0 = await this.services.blockchain.getTokenInfo({
        chain: options.chain,
        address: token0Address,
      });
      const token1 = await this.services.blockchain.getTokenInfo({
        chain: options.chain,
        address: token1Address,
      });

      if (token0 && token1) {
        switch (signature) {
          case Traderjoev2EventSignatures.Swap: {
            const amount1In = new BigNumber(event.amountsIn.slice(2).slice(0, 32), 16);
            const amount0In = new BigNumber(event.amountsIn.slice(2).slice(-32), 16);
            const amount1Out = new BigNumber(event.amountsOut.slice(2).slice(0, 32), 16);
            const amount0Out = new BigNumber(event.amountsOut.slice(2).slice(-32), 16);

            const tokenIn = amount0In.gt(0) ? token0 : token1;
            const tokenOut = amount0In.gt(0) ? token1 : token0;
            const amountIn = formatFromDecimals(
              amount0In.gt(0) ? amount0In.toString(10) : amount1In.toString(10),
              tokenIn.decimals
            );
            const amountOut = formatFromDecimals(
              amount0In.gt(0) ? amount1Out.toString(10) : amount0Out.toString(10),
              tokenOut.decimals
            );

            const sender = normalizeAddress(event.sender);
            const to = normalizeAddress(event.to);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'swap',
                addresses: [sender, to],
                tokens: [tokenIn, tokenOut],
                tokenAmounts: [amountIn, amountOut],
              })
            );

            break;
          }
          case Traderjoev2EventSignatures.DepositedToBins:
          case Traderjoev2EventSignatures.WithdrawnFromBins: {
            let amount0 = new BigNumber(0);
            let amount1 = new BigNumber(0);
            for (const amount of event.amounts) {
              amount0 = amount0.plus(new BigNumber(amount.slice(2).slice(-32), 16));
              amount1 = amount1.plus(new BigNumber(amount.slice(2).slice(0, 32), 16));
            }

            const sender = normalizeAddress(event.sender);
            const to = normalizeAddress(event.to);

            actions.push(
              this.buildUpAction({
                ...options,
                action: signature === Traderjoev2EventSignatures.DepositedToBins ? 'deposit' : 'withdraw',
                addresses: [sender, to],
                tokens: [token0, token1],
                tokenAmounts: [
                  formatFromDecimals(amount0.toString(10), token0.decimals),
                  formatFromDecimals(amount1.toString(10), token1.decimals),
                ],
              })
            );

            break;
          }
          case Traderjoev2EventSignatures.FlashLoan: {
            const amount0 = new BigNumber(event.amounts.slice(2).slice(-32), 16);
            const amount1 = new BigNumber(event.amounts.slice(2).slice(0, 32), 16);

            const sender = normalizeAddress(event.sender);
            const receiver = normalizeAddress(event.receiver);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'flashloan',
                addresses: [sender, receiver],
                tokens: [token0, token1],
                tokenAmounts: [
                  formatFromDecimals(amount0.toString(10), token0.decimals),
                  formatFromDecimals(amount1.toString(10), token1.decimals),
                ],
              })
            );
          }
        }
      }
    }

    return actions;
  }
}
