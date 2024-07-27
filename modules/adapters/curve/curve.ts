import { decodeEventLog } from 'viem';

import CurveStableSwapNGAbi from '../../../configs/abi/curve/CurveStableSwapNG.json';
import CurveMetapoolFactoryAbi from '../../../configs/abi/curve/MetaPoolFactory.json';
import CrvusdAmmAbi from '../../../configs/abi/curve/crvUSDAMM.json';
import { AddressZero } from '../../../configs/constants/addresses';
import { formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { CurveSwapEvents } from './abis';

const MetaPoolFactories: any = {
  arbitrum: '0xb17b674d9c5cb2e441f8e196a2f048a81355d031',
};

export default class CurveAdapter extends Adapter {
  public readonly name: string = 'adapter.curve';

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);
  }

  public supportedSignature(signature: string): boolean {
    const signatures = [
      ...Object.values(CurveSwapEvents.VersionCurveStableSwapNG),
      ...Object.values(CurveSwapEvents.VersionCurveUsdAmm),
    ];
    return signatures.includes(signature);
  }

  protected async returnStandardTokenExchange(
    options: ParseEventLogOptions,
    versionAbi: Array<any>
  ): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const event: any = decodeEventLog({
      abi: versionAbi,
      topics: options.log.topics,
      data: options.log.data,
    });

    const [fromTokenAddress, toTokenAddress] = await this.services.blockchain.multicall({
      chain: options.chain,
      blockNumber: options.log.blockNumber,
      calls: [
        {
          abi: CurveStableSwapNGAbi,
          target: options.log.address,
          method: 'coins',
          params: [event.args.sold_id],
        },
        {
          abi: CurveStableSwapNGAbi,
          target: options.log.address,
          method: 'coins',
          params: [event.args.bought_id],
        },
      ],
    });
    const fromToken = await this.services.blockchain.getTokenInfo({
      chain: options.chain,
      address: fromTokenAddress,
    });
    const toToken = await this.services.blockchain.getTokenInfo({
      chain: options.chain,
      address: toTokenAddress,
    });
    if (fromToken && toToken) {
      const fromAmount = formatFromDecimals(event.args.tokens_sold.toString(), fromToken.decimals);
      const toAmount = formatFromDecimals(event.args.tokens_bought.toString(), toToken.decimals);

      actions.push({
        chain: options.chain,
        protocol: this.config.protocol,
        action: 'swap',
        transactionHash: options.log.transactionHash,
        logIndex: `${options.log.logIndex}:0`,
        blockNumber: Number(options.log.blockNumber),
        contract: normalizeAddress(options.log.address),
        addresses: [normalizeAddress(event.args.buyer)],
        tokens: [fromToken, toToken],
        tokenAmounts: [fromAmount, toAmount],
      });
    }

    return actions;
  }

  protected async returnStandardTokenExchangeUnderlying(
    options: ParseEventLogOptions,
    versionAbi: Array<any>
  ): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (MetaPoolFactories[options.chain]) {
      const isMetaPool = await this.services.blockchain.readContract({
        chain: options.chain,
        abi: CurveMetapoolFactoryAbi,
        target: MetaPoolFactories[options.chain],
        method: 'is_meta',
        params: [options.log.address],
      });
      if (isMetaPool) {
        const event: any = decodeEventLog({
          abi: versionAbi,
          topics: options.log.topics,
          data: options.log.data,
        });

        const [coins, underlyingCoins] = await this.services.blockchain.multicall({
          chain: options.chain,
          calls: [
            {
              abi: CurveMetapoolFactoryAbi,
              target: MetaPoolFactories[options.chain],
              method: 'get_coins',
              params: [options.log.address],
            },
            {
              abi: CurveMetapoolFactoryAbi,
              target: MetaPoolFactories[options.chain],
              method: 'get_underlying_coins',
              params: [options.log.address],
            },
          ],
        });

        let fromToken: Token | null = null;
        let toToken: Token | null = null;
        if (coins[Number(event.args.sold_id)] !== AddressZero) {
          fromToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: coins[Number(event.args.sold_id)],
          });
        } else {
          fromToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: underlyingCoins[Number(event.args.sold_id)],
          });
        }
        if (coins[Number(event.args.bought_id)] !== AddressZero) {
          toToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: coins[Number(event.args.bought_id)],
          });
        } else {
          toToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: underlyingCoins[Number(event.args.bought_id)],
          });
        }
        if (fromToken && toToken) {
          // todo: amounts in 18 decimals
          const fromAmount = formatFromDecimals(event.args.tokens_sold.toString(), 18);
          const toAmount = formatFromDecimals(event.args.tokens_bought.toString(), 18);

          actions.push({
            chain: options.chain,
            protocol: this.config.protocol,
            action: 'swap',
            transactionHash: options.log.transactionHash,
            logIndex: `${options.log.logIndex}:0`,
            blockNumber: Number(options.log.blockNumber),
            contract: normalizeAddress(options.log.address),
            addresses: [normalizeAddress(event.args.buyer)],
            tokens: [fromToken, toToken],
            tokenAmounts: [fromAmount, toAmount],
          });
        }
      }
    }

    return actions;
  }

  public async returnStandardAddRemoveLiquidity(
    options: ParseEventLogOptions,
    versionAbi: Array<any>
  ): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const event: any = decodeEventLog({
      abi: versionAbi,
      topics: options.log.topics,
      data: options.log.data,
    });

    const tokens: Array<Token> = [];
    const tokenAmounts: Array<string> = [];

    const tokenCount = event.args.token_amounts.length;
    for (let i = 0; i < tokenCount; i++) {
      const tokenAddress = await this.services.blockchain.readContract({
        chain: options.chain,
        abi: versionAbi,
        target: options.log.address,
        method: 'coins',
        params: [i],
      });
      const token = await this.services.blockchain.getTokenInfo({
        chain: options.chain,
        address: tokenAddress,
      });
      if (token) {
        tokens.push(token);
        tokenAmounts.push(formatFromDecimals(event.args.token_amounts[i].toString(), token.decimals));
      }
    }

    actions.push({
      chain: options.chain,
      protocol: this.config.protocol,
      action: options.log.topics[0] === CurveSwapEvents.VersionCurveStableSwapNG.AddLiquidity ? 'deposit' : 'withdraw',
      transactionHash: options.log.transactionHash,
      logIndex: `${options.log.logIndex}:0`,
      blockNumber: Number(options.log.blockNumber),
      contract: normalizeAddress(options.log.address),
      addresses: [normalizeAddress(event.args.provider)],
      tokens: tokens,
      tokenAmounts: tokenAmounts,
    });

    return actions;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];

    // version CurveStableSwapNG
    if (Object.values(CurveSwapEvents.VersionCurveStableSwapNG).includes(signature)) {
      if (signature === CurveSwapEvents.VersionCurveStableSwapNG.TokenExchange) {
        return await this.returnStandardTokenExchange(options, CurveStableSwapNGAbi);
      } else if (signature === CurveSwapEvents.VersionCurveStableSwapNG.TokenExchangeUnderlying) {
        return await this.returnStandardTokenExchangeUnderlying(options, CurveStableSwapNGAbi);
      } else if (
        signature === CurveSwapEvents.VersionCurveStableSwapNG.AddLiquidity ||
        signature === CurveSwapEvents.VersionCurveStableSwapNG.RemoveLiquidity
      ) {
        return await this.returnStandardAddRemoveLiquidity(options, CurveStableSwapNGAbi);
      }
    }

    // CurveUsdAmm
    if (Object.values(CurveSwapEvents.VersionCurveUsdAmm).includes(signature)) {
      if (signature === CurveSwapEvents.VersionCurveUsdAmm.TokenExchange) {
        return await this.returnStandardTokenExchange(options, CrvusdAmmAbi);
      }
    }

    return actions;
  }
}
