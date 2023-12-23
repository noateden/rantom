import { Gmxv2Config, Gmxv2MarketConfig } from '../../../configs/protocols/gmx';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { Gmxv2AbiMappings } from './abis';

export default class Gmxv2Adapter extends Adapter {
  public readonly name: string = 'adapter.gmxv2';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = Gmxv2AbiMappings;
  }

  protected getMarket(chain: string, marketAddress: string): Gmxv2MarketConfig | null {
    for (const market of (this.config as Gmxv2Config).markets) {
      if (chain === market.chain && compareAddress(marketAddress, market.address)) {
        return market;
      }
    }

    return null;
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

      const eventData: any = event.eventData as any;
      switch (event.eventName) {
        case 'SwapInfo': {
          const tokenIn = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: eventData.addressItems[0][3].value,
          });
          const tokenOut = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: eventData.addressItems[0][2].value,
          });

          if (tokenIn && tokenOut) {
            const userAddress: string = normalizeAddress(eventData.addressItems[0][1].value);

            const amountIn = formatFromDecimals(eventData.uintItems[0][4].value.toString(), tokenIn.decimals);
            const amountOut = formatFromDecimals(eventData.uintItems[0][2].value.toString(), tokenOut.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'swap',
                addresses: [userAddress],
                tokens: [tokenIn, tokenOut],
                tokenAmounts: [amountIn, amountOut],
              })
            );
          }
          break;
        }
        case 'DepositCreated': {
          const longToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: eventData.addressItems[0][4].value,
          });
          const shortToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: eventData.addressItems[0][5].value,
          });
          if (longToken && shortToken) {
            const userAddress = normalizeAddress(eventData.addressItems[0][0].value);
            const longTokenAmount = formatFromDecimals(eventData.uintItems[0][0].value.toString(), longToken.decimals);
            const shortTokenAmount = formatFromDecimals(
              eventData.uintItems[0][1].value.toString(),
              shortToken.decimals
            );

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'deposit',
                addresses: [userAddress],
                tokens: [longToken, shortToken],
                tokenAmounts: [longTokenAmount, shortTokenAmount],
              })
            );
          }
          break;
        }
        case 'WithdrawalCreated': {
          const market = this.getMarket(options.chain, eventData.addressItems[0][3].value);
          if (market) {
            const userAddress = normalizeAddress(eventData.addressItems[0][0].value);
            const receiverAddress = normalizeAddress(eventData.addressItems[0][1].value);
            const longTokenAmount = formatFromDecimals(
              eventData.uintItems[0][1].value.toString(),
              market.longToken.decimals
            );
            const shortTokenAmount = formatFromDecimals(
              eventData.uintItems[0][2].value.toString(),
              market.shortToken.decimals
            );

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'withdraw',
                addresses: [userAddress, receiverAddress],
                tokens: [market.longToken, market.shortToken],
                tokenAmounts: [longTokenAmount, shortTokenAmount],
              })
            );
          }
          break;
        }
        case 'PositionIncrease':
        case 'PositionDecrease': {
          const market = this.getMarket(options.chain, eventData.addressItems[0][1].value);

          if (market) {
            const collateralToken = await this.services.blockchain.getTokenInfo({
              chain: options.chain,
              address: eventData.addressItems[0][2].value,
            });
            if (collateralToken) {
              const userAddress: string = normalizeAddress(eventData.addressItems[0][0].value);
              const sizeDeltaUsd = formatFromDecimals(eventData.uintItems[0][12].value.toString(), 30);
              const collateralDeltaAmount = formatFromDecimals(eventData.uintItems[0][14].value.toString(), 30);

              const isLong = Boolean(eventData.boolItems[0][0]);
              // should be long or short
              let action: KnownAction;
              if (isLong) {
                action = event.eventName === 'PositionIncrease' ? 'increaseLong' : 'decreaseLong';
              } else {
                action = event.eventName === 'PositionIncrease' ? 'increaseShort' : 'decreaseShort';
              }

              const txAction = this.buildUpAction({
                ...options,
                action: action,
                addresses: [userAddress],
                tokens: [market.indexToken, collateralToken],
                tokenAmounts: [],
              });
              txAction.usdAmounts = [sizeDeltaUsd, collateralDeltaAmount];

              actions.push(txAction);
            }
          }
        }
      }
    }

    return actions;
  }
}
