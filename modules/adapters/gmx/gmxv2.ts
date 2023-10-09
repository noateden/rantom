import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { Gmxv2Mappings } from './abis';

const Signatures = {
  EventLog1: '0x137a44067c8961cd7e1d876f4754a5a3a75989b4552f1843fc69c3b372def160',
};

export class Gmxv2Adapter extends Adapter {
  public readonly name: string = 'adapter.gmxv2';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.EventLog1]: Gmxv2Mappings[Signatures.EventLog1],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const eventData: any = event.eventData as any;
      switch (event.eventName) {
        case 'SwapInfo': {
          const userAddress: string = normalizeAddress(eventData.addressItems[0][1].value);
          const [tokenIn, tokenOut] = await Promise.all([
            this.getWeb3Helper().getErc20Metadata(chain, eventData.addressItems[0][2].value),
            this.getWeb3Helper().getErc20Metadata(chain, eventData.addressItems[0][3].value),
          ]);
          if (tokenIn && tokenOut) {
            const amountIn = new BigNumber(eventData.uintItems[0][2].value.toString())
              .dividedBy(new BigNumber(10).pow(tokenIn.decimals))
              .toString(10);
            const amountOut = new BigNumber(eventData.uintItems[0][4].value.toString())
              .dividedBy(new BigNumber(10).pow(tokenOut.decimals))
              .toString(10);

            return {
              protocol: this.config.protocol,
              action: 'swap',
              addresses: [userAddress],
              tokens: [tokenIn, tokenOut],
              tokenAmounts: [amountIn, amountOut],
              readableString: `${userAddress} swap ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          break;
        }
        case 'DepositCreated': {
          const longToken: Token | null = await this.getWeb3Helper().getErc20Metadata(
            chain,
            eventData.addressItems[0][4].value
          );
          const shortToken: Token | null = await this.getWeb3Helper().getErc20Metadata(
            chain,
            eventData.addressItems[0][5].value
          );
          if (longToken && shortToken) {
            const userAddress = normalizeAddress(eventData.addressItems[0][0].value);
            const longTokenAmount = new BigNumber(eventData.uintItems[0][0].value.toString())
              .dividedBy(new BigNumber(10).pow(longToken.decimals))
              .toString(10);
            const shortTokenAmount = new BigNumber(eventData.uintItems[0][1].value.toString())
              .dividedBy(new BigNumber(10).pow(longToken.decimals))
              .toString(10);
            return {
              protocol: this.config.protocol,
              action: 'deposit',
              addresses: [userAddress],
              tokens: [longToken, shortToken],
              tokenAmounts: [longTokenAmount, shortTokenAmount],
              readableString: `${userAddress} deposit ${longTokenAmount} ${longToken.symbol} and ${shortTokenAmount} ${shortToken.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          break;
        }
        case 'WithdrawalCreated': {
          let longToken: Token | null = null;
          let shortToken: Token | null = null;

          const marketAddress = eventData.addressItems[0][3].value;
          for (const market of this.config.staticData.markets) {
            if (market.chain === chain && compareAddress(market.address, marketAddress)) {
              longToken = market.longToken;
              shortToken = market.shortToken;
            }
          }

          if (longToken && shortToken) {
            const userAddress = normalizeAddress(eventData.addressItems[0][0].value);
            const receiverAddress = normalizeAddress(eventData.addressItems[0][1].value);
            const longTokenAmount = new BigNumber(eventData.uintItems[0][1].value.toString())
              .dividedBy(new BigNumber(10).pow(longToken.decimals))
              .toString(10);
            const shortTokenAmount = new BigNumber(eventData.uintItems[0][2].value.toString())
              .dividedBy(new BigNumber(10).pow(longToken.decimals))
              .toString(10);

            return {
              protocol: this.config.protocol,
              action: 'withdraw',
              addresses: [userAddress, receiverAddress],
              tokens: [longToken, shortToken],
              tokenAmounts: [longTokenAmount, shortTokenAmount],
              readableString: `${userAddress} withdraw ${longTokenAmount} ${longToken.symbol} and ${shortTokenAmount} ${shortToken.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          break;
        }
        case 'PositionIncrease':
        case 'PositionDecrease': {
          let indexToken: Token | null = null;
          for (const market of this.config.staticData.markets) {
            if (market.chain === chain && compareAddress(eventData.addressItems[0][1].value, market.address)) {
              indexToken = market.indexToken as Token;
            }
          }

          if (indexToken) {
            const userAddress: string = normalizeAddress(eventData.addressItems[0][0].value);
            const collateralToken = await this.getWeb3Helper().getErc20Metadata(
              chain,
              eventData.addressItems[0][2].value
            );

            if (collateralToken) {
              const sizeDeltaUsd = new BigNumber(eventData.uintItems[0][12].value.toString())
                .dividedBy(1e30)
                .toString(10);
              const collateralDeltaAmount = new BigNumber(eventData.uintItems[0][14].value.toString())
                .dividedBy(1e30)
                .toString(10);

              const isLong = Boolean(eventData.boolItems[0][0]);
              // should be long or short
              let action: KnownAction;
              if (isLong) {
                action = event.eventName === 'PositionIncrease' ? 'increaseLong' : 'decreaseLong';
              } else {
                action = event.eventName === 'PositionIncrease' ? 'increaseShort' : 'decreaseShort';
              }

              return {
                protocol: this.config.protocol,
                action: action,
                addresses: [userAddress],
                tokens: [indexToken, collateralToken],
                tokenAmounts: [],
                usdAmounts: [sizeDeltaUsd, collateralDeltaAmount],
                readableString: `${userAddress} ${action} ${indexToken.symbol} size $${sizeDeltaUsd} on ${this.config.protocol} chain ${chain}`,
              };
            }
          }
          break;
        }
      }
    }

    return null;
  }
}
