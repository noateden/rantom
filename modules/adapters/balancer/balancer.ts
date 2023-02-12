import BigNumber from 'bignumber.js';

import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Swap: '0x2170c741c41531aec20e7c107c24eecfdd15e69c9bb0a8dd37b1840b9e0b207b',
};

export class BalancerAdapter extends Adapter {
  public readonly name: string = 'adapter.uniswapv2';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, signature, event } = options;

    if (signature === Signatures.Swap) {
      if (this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
        const tokenIn = await this.getWeb3Helper().getErc20Metadata(chain, event.tokenIn);
        const tokenOut = await this.getWeb3Helper().getErc20Metadata(chain, event.tokenOut);

        if (tokenIn && tokenOut) {
          switch (signature) {
            case Signatures.Swap: {
              const amountIn = new BigNumber(event.amountIn.toString())
                .dividedBy(new BigNumber(10).pow(tokenIn.decimals))
                .toString(10);
              const amountOut = new BigNumber(event.amountOut.toString())
                .dividedBy(new BigNumber(10).pow(tokenOut.decimals))
                .toString(10);

              return {
                protocol: this.config.protocol,
                action: 'swap',
                addresses: [options.sender],
                tokens: [tokenIn, tokenOut],
                tokenAmounts: [amountIn, amountOut],
                readableString: `${options.sender} swaps ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }
          }
        }
      }
    }

    return null;
  }
}
