import BigNumber from 'bignumber.js';
import { decodeEventLog } from 'viem';

import CompoundCTokenAbi from '../../../configs/abi/compound/cErc20.json';
import VenusVTokenV2Abi from '../../../configs/abi/venus/vTokenV2.json';
import { CompoundConfig, CompoundMarket } from '../../../configs/protocols/compound';
import { compareAddress, formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import { CompoundAbiMappings } from '../compound/abis';
import CompoundAdapter from '../compound/compound';
import { VenusAbiMappings, VenusEventSignatures } from './abis';

export default class VenusV2Adapter extends CompoundAdapter {
  public readonly name: string = 'adapter.venus';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = {
      ...this.eventMappings,
      ...VenusAbiMappings,
    };
  }

  protected getUnderlyingToken(cTokenAddress: string): Token | null {
    for (const market of (this.config as CompoundConfig).contracts) {
      if (compareAddress(cTokenAddress, market.address)) {
        return (market as CompoundMarket).underlying;
      }
    }

    return null;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const signature = options.log.topics[0];

    if (CompoundAbiMappings[signature]) {
      const supperActions = await super.parseEventLog(options);
      if (supperActions.length > 0) {
        return supperActions;
      }
    }

    const actions: Array<TransactionAction> = [];
    if (this.supportedContract(options.chain, options.log.address)) {
      const event: any = decodeEventLog({
        abi: VenusVTokenV2Abi,
        topics: options.log.topics,
        data: options.log.data,
      });

      const token = this.getUnderlyingToken(options.log.address);
      if (token) {
        switch (signature) {
          case VenusEventSignatures.Mint: {
            const user = normalizeAddress(event.args.minter);
            const amount = formatFromDecimals(event.args.mintAmount.toString(), token.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'deposit',
                addresses: [user],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );
            break;
          }
          case VenusEventSignatures.Redeem: {
            const user = normalizeAddress(event.args.redeemer);
            const amount = formatFromDecimals(event.args.redeemAmount.toString(), token.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'withdraw',
                addresses: [user],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );
            break;
          }
          case VenusEventSignatures.Borrow: {
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'borrow',
                addresses: [normalizeAddress(event.args.borrower)],
                tokens: [token],
                tokenAmounts: [formatFromDecimals(event.args.borrowAmount.toString(), token.decimals)],
              })
            );

            break;
          }
          case VenusEventSignatures.RepayBorrow: {
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'repay',
                addresses: [normalizeAddress(event.args.payer), normalizeAddress(event.args.borrower)],
                tokens: [token],
                tokenAmounts: [formatFromDecimals(event.args.repayAmount.toString(), token.decimals)],
              })
            );

            break;
          }
          case VenusEventSignatures.LiquidateBorrow: {
            const liquidator = normalizeAddress(event.args.liquidator);
            const borrower = normalizeAddress(event.args.borrower);

            // find the matching cTokenCollateral
            const collateralToken: Token | null = this.getUnderlyingToken(event.cTokenCollateral);
            if (collateralToken) {
              const exchangeRateCurrent = await this.services.blockchain.singlecall({
                chain: options.chain,
                abi: CompoundCTokenAbi,
                target: event.cTokenCollateral,
                method: 'exchangeRateCurrent',
                params: [],
                blockNumber: options.log.blockNumber,
              });
              const mantissa = 18 + collateralToken.decimals - 8;
              const oneCTokenInUnderlying = new BigNumber(exchangeRateCurrent).dividedBy(
                new BigNumber(10).pow(mantissa)
              );
              const amount = new BigNumber(event.seizeTokens)
                .multipliedBy(oneCTokenInUnderlying)
                .dividedBy(1e8)
                .toString(10);

              actions.push(
                this.buildUpAction({
                  ...options,
                  action: 'liquidate',
                  addresses: [liquidator, borrower],
                  tokens: [collateralToken],
                  tokenAmounts: [amount],
                })
              );

              break;
            }
          }
        }
      }
    }

    return actions;
  }
}
