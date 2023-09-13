import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  IncreasePosition: '0x8f1a004341b7c2e1e0799b80c6b849e04431c20757ba9b8c9064d5132405465d',
  DecreasePosition: '0x8b8cf2b995650a0e5239d131bc9ace3606d59971f1c0370675babdbc1fc48e5f',
  LiquidatePosition: '0x136cbd19b29e7d7cbbb67178581f238ef5029382a513cd55f0096e974441a6fb',
  LiquidityAdded: '0x43c967b388d3a4ccad3f7ab80167852e322e5a3fde9893f530252281b2ae8b70',
  LiquidityRemoved: '0xd765e08eef31c0983ecca03ecd166297ac485ecd5dd69e291c848f0a020333c1',
  Swap: '0xb24b74123b08b3e5d2af6b47e948b1c8eed24d9f717f27a4b2fc3aa82699696e',
};

export class LevelfinanceAdapter extends Adapter {
  public readonly name: string = 'adapter.levelfinance';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.IncreasePosition]: EventSignatureMapping[Signatures.IncreasePosition],
      [Signatures.DecreasePosition]: EventSignatureMapping[Signatures.DecreasePosition],
      [Signatures.LiquidatePosition]: EventSignatureMapping[Signatures.LiquidatePosition],
      [Signatures.LiquidityAdded]: EventSignatureMapping[Signatures.LiquidityAdded],
      [Signatures.LiquidityRemoved]: EventSignatureMapping[Signatures.LiquidityRemoved],
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      // add/remove liquidity
      if (signature === Signatures.LiquidityAdded || signature === Signatures.LiquidityRemoved) {
        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
        if (token) {
          const account = normalizeAddress(event.sender);
          const amount = new BigNumber(event.amount ? event.amount.toString() : event.amountOut.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString();
          const action: KnownAction = signature === Signatures.LiquidityAdded ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [account],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${account} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.Swap) {
        const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.tokenIn);
        const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.tokenOut);
        if (token0 && token1) {
          const account = normalizeAddress(event.sender);
          const amount0 = new BigNumber(event.amountIn.toString())
            .dividedBy(new BigNumber(10).pow(token0.decimals))
            .toString(10);
          const amount1 = new BigNumber(event.amountOut.toString())
            .dividedBy(new BigNumber(10).pow(token1.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'swap',
            addresses: [account],
            tokens: [token0, token1],
            tokenAmounts: [amount0, amount1],
            readableString: `${account} swap ${amount0} ${token0.symbol} for ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.IncreasePosition || signature === Signatures.DecreasePosition) {
        const collateralToken = await this.getWeb3Helper().getErc20Metadata(chain, event.collateralToken);
        const indexToken = await this.getWeb3Helper().getErc20Metadata(chain, event.indexToken);
        if (collateralToken && indexToken) {
          // should be long or short
          let action: KnownAction;
          if (signature === Signatures.IncreasePosition) {
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

          // gmx uses 30 decimals precision
          const collateralDelta = new BigNumber(
            event.collateralValue ? event.collateralValue.toString() : event.collateralChanged.toString()
          )
            .dividedBy(1e30)
            .toString(10);
          const sizeDelta = new BigNumber(event.sizeChanged.toString()).dividedBy(1e30).toString(10);

          // on perpetual protocol increase/decrease leverage action
          // amount should be position size (or delta) in USD
          // the first token is collateral, the second is index token
          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [account],
            tokens: [indexToken, collateralToken],
            tokenAmounts: [],
            usdAmounts: [sizeDelta, collateralDelta],
            readableString: `${account} ${action} ${indexToken.symbol} size $${sizeDelta} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.LiquidatePosition) {
        const collateralToken = await this.getWeb3Helper().getErc20Metadata(chain, event.collateralToken);
        const indexToken = await this.getWeb3Helper().getErc20Metadata(chain, event.indexToken);

        if (collateralToken && indexToken) {
          const account = normalizeAddress(event.account);
          const collateralDelta = new BigNumber(event.collateralValue.toString()).dividedBy(1e30).toString(10);
          const sizeDelta = new BigNumber(event.size.toString()).dividedBy(1e30).toString(10);

          // should be long or short
          let action: KnownAction;
          if (Number(event.side) === 0) {
            action = 'liquidateLong';
          } else {
            action = 'liquidateShort';
          }

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [account],
            tokens: [indexToken, collateralToken],
            tokenAmounts: [],
            usdAmounts: [sizeDelta, collateralDelta],
            readableString: `${account} ${action} ${indexToken.symbol} size $${sizeDelta} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
