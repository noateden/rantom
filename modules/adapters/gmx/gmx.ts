import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { GmxAbiMappings, GmxEventSignatures } from './abis';

export default class GmxAdapter extends Adapter {
  public readonly name: string = 'adapter.gmx';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = GmxAbiMappings;
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

      switch (signature) {
        case GmxEventSignatures.BuyUSDG:
        case GmxEventSignatures.SellUSDG: {
          const token = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.token,
          });
          if (token) {
            const amount = formatFromDecimals(event.tokenAmount.toString(), token.decimals);
            const account = normalizeAddress(event.account);

            actions.push(
              this.buildUpAction({
                ...options,
                action: signature === GmxEventSignatures.BuyUSDG ? 'deposit' : 'withdraw',
                addresses: [account],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );
          }
          break;
        }
        case GmxEventSignatures.Swap: {
          const tokenIn = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.tokenIn,
          });
          const tokenOut = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.tokenOut,
          });
          if (tokenIn && tokenOut) {
            const amountIn = formatFromDecimals(event.amountIn.toString(), tokenIn.decimals);
            const amountOut = formatFromDecimals(event.amountOut.toString(), tokenOut.decimals);
            const account = normalizeAddress(event.account);
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'swap',
                addresses: [account],
                tokens: [tokenIn, tokenOut],
                tokenAmounts: [amountIn, amountOut],
              })
            );
          }
          break;
        }
        case GmxEventSignatures.IncreasePosition:
        case GmxEventSignatures.DecreasePosition: {
          const collateralToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.collateralToken,
          });
          const indexToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.indexToken,
          });
          if (collateralToken && indexToken) {
            let action: KnownAction;
            if (signature === GmxEventSignatures.IncreasePosition) {
              if (event.isLong) {
                action = 'increaseLong';
              } else {
                action = 'increaseShort';
              }
            } else {
              if (event.isLong) {
                action = 'decreaseLong';
              } else {
                action = 'decreaseShort';
              }
            }

            const account = normalizeAddress(event.account);

            // gmx uses 30 decimals precision
            const collateralAmount = formatFromDecimals(event.collateralDelta.toString(), 30);
            const sizeAmount = formatFromDecimals(event.sizeDelta.toString(), 30);

            // on perpetual protocol increase/decrease leverage action
            // amount should be position size (or delta) in USD
            // the first token is index token, the second is collateral token
            const transactionAction = this.buildUpAction({
              ...options,
              action: action,
              addresses: [account],
              tokens: [indexToken, collateralToken],
              tokenAmounts: [],
            });
            transactionAction.usdAmounts = [sizeAmount, collateralAmount];

            actions.push(transactionAction);
          }

          break;
        }
        case GmxEventSignatures.LiquidatePosition: {
          const collateralToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.collateralToken,
          });
          const indexToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.indexToken,
          });

          if (indexToken && collateralToken) {
            const account = normalizeAddress(event.account);

            // gmx uses 30 decimals precision
            const collateralAmount = formatFromDecimals(event.collateral.toString(), 30);
            const sizeAmount = formatFromDecimals(event.size.toString(), 30);

            // should be long or short
            let action: KnownAction;
            if (event.isLong) {
              action = 'liquidateLong';
            } else {
              action = 'liquidateShort';
            }

            const transactionAction = this.buildUpAction({
              ...options,
              action: action,
              addresses: [account],
              tokens: [indexToken, collateralToken],
              tokenAmounts: [],
            });
            transactionAction.usdAmounts = [sizeAmount, collateralAmount];

            actions.push(transactionAction);
          }

          break;
        }
      }
    }

    return actions;
  }
}
