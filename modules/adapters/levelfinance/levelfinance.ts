import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { LevelfinanceAbiMappings, LevelfinanceEventSignatures } from './abis';

export default class LevelfinanceAdapter extends Adapter {
  public readonly name: string = 'adapter.levelfinance';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = LevelfinanceAbiMappings;
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
        case LevelfinanceEventSignatures.LiquidityAdded:
        case LevelfinanceEventSignatures.LiquidityRemoved: {
          const token = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.token,
          });
          if (token) {
            const account = normalizeAddress(event.sender);
            const amount = formatFromDecimals(event.amount ? event.amount : event.amountOut, token.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: signature === LevelfinanceEventSignatures.LiquidityAdded ? 'deposit' : 'withdraw',
                addresses: [account],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );
          }
          break;
        }
        case LevelfinanceEventSignatures.Swap:
        case LevelfinanceEventSignatures.SwapBnb: {
          const tokenIn = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.tokenIn,
          });
          const tokenOut = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.tokenOut,
          });
          if (tokenIn && tokenOut) {
            const account = normalizeAddress(event.sender);
            const amountIn = formatFromDecimals(event.amountIn.toString(), tokenIn.decimals);
            const amountOut = formatFromDecimals(event.amountOut.toString(), tokenOut.decimals);

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
        case LevelfinanceEventSignatures.IncreasePosition:
        case LevelfinanceEventSignatures.DecreasePosition: {
          const collateralToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.collateralToken,
          });
          const indexToken = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.indexToken,
          });
          if (indexToken && collateralToken) {
            // should be long or short
            let action: KnownAction;
            if (signature === LevelfinanceEventSignatures.IncreasePosition) {
              if (Number(event.side) === 0) {
                action = 'increaseLong';
              } else {
                action = 'increaseShort';
              }
            } else {
              if (Number(event.side) === 0) {
                action = 'decreaseLong';
              } else {
                action = 'decreaseShort';
              }
            }

            const account = normalizeAddress(event.account);
            const collateralAmount = formatFromDecimals(
              event.collateralValue ? event.collateralValue.toString() : event.collateralChanged.toString(),
              30
            );
            const sizeAmount = formatFromDecimals(event.sizeChanged.toString(), 30);

            const txAction = this.buildUpAction({
              ...options,
              action: action,
              addresses: [account],
              tokens: [indexToken, collateralToken],
              tokenAmounts: [],
            });
            txAction.usdAmounts = [sizeAmount, collateralAmount];
            actions.push(txAction);
          }
          break;
        }
        case LevelfinanceEventSignatures.LiquidatePosition: {
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
            const collateralAmount = formatFromDecimals(event.collateralValue.toString(), 30);
            const sizeAmount = formatFromDecimals(event.size.toString(), 30);

            // should be long or short
            let action: KnownAction;
            if (Number(event.side) === 0) {
              action = 'liquidateLong';
            } else {
              action = 'liquidateShort';
            }

            const txAction = this.buildUpAction({
              ...options,
              action: action,
              addresses: [account],
              tokens: [indexToken, collateralToken],
              tokenAmounts: [],
            });
            txAction.usdAmounts = [sizeAmount, collateralAmount];
            actions.push(txAction);
          }
        }
      }
    }

    return actions;
  }
}
