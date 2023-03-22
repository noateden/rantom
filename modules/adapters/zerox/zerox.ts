import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Trade: '0x0f6672f78a59ba8e5e5b5d38df3ebc67f3c792e2c9259b8d97d7f00dd78ba1b3',
  OtcOrderFilled: '0xac75f773e3a92f1a02b12134d65e1f47f8a14eabe4eaf1e24624918e6a8b269f',
  LimitOrderFilled: '0xab614d2b738543c0ea21f56347cf696a3a0c42a7cbec3212a5ca22a4dcff2124',
  RfqOrderFilled: '0x829fa99d94dc4636925b38632e625736a614c154d55006b7ab6bea979c210c32',
};

export class ZeroxAdapter extends Adapter {
  public readonly name: string = 'adapter.zerox';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Trade]: EventSignatureMapping[Signatures.Trade],
      [Signatures.OtcOrderFilled]: EventSignatureMapping[Signatures.OtcOrderFilled],
      [Signatures.LimitOrderFilled]: EventSignatureMapping[Signatures.LimitOrderFilled],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(address) !== 1 && EventSignatureMapping[signature]) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      switch (signature) {
        case Signatures.Trade: {
          const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.inputToken);
          const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.outputToken);

          if (token0 && token1) {
            const trader = normalizeAddress(event.taker);
            const amount0 = new BigNumber(event.inputTokenAmount)
              .dividedBy(new BigNumber(10).pow(token0.decimals))
              .toString(10);
            const amount1 = new BigNumber(event.outputTokenAmount)
              .dividedBy(new BigNumber(10).pow(token1.decimals))
              .toString(10);

            return {
              protocol: this.config.protocol,
              action: 'trade',
              addresses: [trader],
              tokens: [token0, token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${trader} trade ${amount0} ${token0.symbol} for ${amount1} ${token0.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          break;
        }
        case Signatures.OtcOrderFilled:
        case Signatures.LimitOrderFilled:
        case Signatures.RfqOrderFilled: {
          const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.takerToken);
          const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.makerToken);

          if (token0 && token1) {
            const amount0 = new BigNumber(event.takerTokenFilledAmount)
              .dividedBy(new BigNumber(10).pow(token0.decimals))
              .toString(10);
            const amount1 = new BigNumber(event.makerTokenFilledAmount)
              .dividedBy(new BigNumber(10).pow(token1.decimals))
              .toString(10);

            const trader = normalizeAddress(event.taker);

            return {
              protocol: this.config.protocol,
              action: 'trade',
              addresses: [trader, normalizeAddress(event.maker)],
              tokens: [token0, token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${trader} trade ${amount0} ${token0.symbol} for ${amount1} ${token0.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          break;
        }
      }
    }

    return null;
  }
}
