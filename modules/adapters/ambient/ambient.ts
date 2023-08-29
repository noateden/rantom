import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { FunctionAbis } from '../../../configs/functions';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionFunction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseFunctionCallDataOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: any = {
  useCmd: '0xa15112f9', // userCmd(uint16,bytes)
  swap: '0x3d719cd9', // swap(address,address,uint256,bool,bool,uint128,uint16,uint128,uint128,uint8)
};

export class AmbientAdapter extends Adapter {
  public readonly name: string = 'adapter.ambient';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {});
  }

  public async tryParsingFunctionCallData(
    options: AdapterParseFunctionCallDataOptions
  ): Promise<TransactionFunction | null> {
    const { chain, address, input } = options;

    const signature = input.slice(0, 10);

    if (
      FunctionAbis[signature] &&
      this.config.contracts[chain] &&
      this.config.contracts[chain].indexOf(address) !== -1
    ) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);

      let params = null;
      try {
        params = web3.eth.abi.decodeParameters(FunctionAbis[signature].abi, input.slice(10));
      } catch (e: any) {}

      if (params) {
        if (signature === Signatures.swap) {
          // docs: https://docs.ambient.finance/developers/dex-contract-interface/swaps
          let tokenIn = null;
          let tokenOut = null;
          if (params.isBuy) {
            tokenIn = await this.getWeb3Helper().getErc20Metadata(chain, params.base);
            tokenOut = await this.getWeb3Helper().getErc20Metadata(chain, params.quote);
          } else {
            tokenOut = await this.getWeb3Helper().getErc20Metadata(chain, params.base);
            tokenIn = await this.getWeb3Helper().getErc20Metadata(chain, params.quote);
          }

          if (tokenIn && tokenOut) {
            const sender = normalizeAddress(options.context.from);
            const amountIn = new BigNumber(params.qty.toString())
              .dividedBy(new BigNumber(10).pow(tokenIn.decimals))
              .toString();
            const amountOut = new BigNumber(params.minOut.toString())
              .dividedBy(new BigNumber(10).pow(tokenOut.decimals))
              .toString();

            return {
              signature: signature,
              contract: normalizeAddress(address),
              protocol: this.config.protocol,
              action: 'swap',
              addresses: [sender],
              tokens: [tokenIn, tokenOut],
              tokenAmounts: [amountIn, amountOut],
              readableString: `${sender} swap ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }
}
