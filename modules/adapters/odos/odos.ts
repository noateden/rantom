import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { CelerbridgeMappings } from './abis';

const Signatures = {
  Swap: '0x823eaf01002d7353fbcadb2ea3305cc46fa35d799cb0914846d185ac06f8ad05',
  SwapMulti: '0x7d7fb03518253ae01913536628b78d6d82e63e19b943aab5f4948356021259be',
};

export class OdosAdapter extends Adapter {
  public readonly name: string = 'adapter.odos';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swap]: CelerbridgeMappings[Signatures.Swap],
      [Signatures.SwapMulti]: CelerbridgeMappings[Signatures.SwapMulti],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.Swap) {
        const tokenIn = await this.getWeb3Helper().getErc20Metadata(chain, event.inputToken);
        const tokenOut = await this.getWeb3Helper().getErc20Metadata(chain, event.outputToken);
        if (tokenIn && tokenOut) {
          const amountIn = new BigNumber(event.inputAmount.toString())
            .dividedBy(new BigNumber(10).pow(tokenIn.decimals))
            .toString(10);
          const amountOut = new BigNumber(event.amountOut.toString())
            .dividedBy(new BigNumber(10).pow(tokenOut.decimals))
            .toString(10);
          const sender = normalizeAddress(event.sender);

          return {
            protocol: this.config.protocol,
            action: 'trade',
            tokens: [tokenIn, tokenOut],
            tokenAmounts: [amountIn, amountOut],
            addresses: [sender],
            readableString: `${sender} trade ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol} on ${this.config.protocol}`,
          };
        }
      } else if (signature === Signatures.SwapMulti) {
        const tokenIn = await this.getWeb3Helper().getErc20Metadata(chain, event.tokensIn[0]);
        const tokenOut = await this.getWeb3Helper().getErc20Metadata(
          chain,
          event.tokensOut[event.tokensOut.length - 1]
        );
        if (tokenIn && tokenOut) {
          const amountIn = new BigNumber(event.amountsIn[0].toString())
            .dividedBy(new BigNumber(10).pow(tokenIn.decimals))
            .toString(10);
          const amountOut = new BigNumber(event.amountsOut[event.amountsOut.length - 1].toString())
            .dividedBy(new BigNumber(10).pow(tokenOut.decimals))
            .toString(10);
          const sender = normalizeAddress(event.sender);

          return {
            protocol: this.config.protocol,
            action: 'trade',
            tokens: [tokenIn, tokenOut],
            tokenAmounts: [amountIn, amountOut],
            addresses: [sender],
            readableString: `${sender} trade ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol} on ${this.config.protocol}`,
          };
        }
      }
    }

    return null;
  }
}
