import BigNumber from 'bignumber.js';

import CompoundCTokenAbi from '../../../configs/abi/compound/cErc20.json';
import { CompoundConfig, CompoundMarket } from '../../../configs/protocols/compound';
import { compareAddress, formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import { CompoundAbiMappings } from '../compound/abis';
import CompoundAdapter from '../compound/compound';
import { VenusAbiMappings, VenusEventSignatures } from './abis';

export default class VenusAdapter extends CompoundAdapter {
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
    if (this.supportedContract(options.chain, options.log.address) && options.log.topics.length === 1) {
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      const token = this.getUnderlyingToken(options.log.address);
      if (token) {
        switch (signature) {
          case VenusEventSignatures.Mint:
          case VenusEventSignatures.Redeem:
          case VenusEventSignatures.RedeemFee: {
            const user = normalizeAddress(event[0]);
            const amount = formatFromDecimals(event[1].toString(), token.decimals);
            const action: KnownAction = signature === VenusEventSignatures.Mint ? 'deposit' : 'withdraw';

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [user],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );

            break;
          }
          case VenusEventSignatures.MintBehalf: {
            const payer = normalizeAddress(event[0]);
            const receiver = normalizeAddress(event[1]);
            const amount = formatFromDecimals(event[2].toString(), token.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'deposit',
                addresses: [payer, receiver],
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
                addresses: [normalizeAddress(event[0])],
                tokens: [token],
                tokenAmounts: [formatFromDecimals(event[1].toString(), token.decimals)],
              })
            );

            break;
          }
          case VenusEventSignatures.RepayBorrow: {
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'repay',
                addresses: [normalizeAddress(event[0]), normalizeAddress(event[1])],
                tokens: [token],
                tokenAmounts: [formatFromDecimals(event[2].toString(), token.decimals)],
              })
            );

            break;
          }
          case VenusEventSignatures.LiquidateBorrow: {
            const liquidator = normalizeAddress(event.liquidator);
            const borrower = normalizeAddress(event.borrower);

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
