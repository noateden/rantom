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
  Swap: '0x12aa3caf', // swap(address,(address,address,address,address,uint256,uint256,uint256),bytes,bytes)
  Unoswap: '0x0502b1c5', // unoswap(address,uint256,uint256,uint256[])
  ClipperSwap: '0x84bd6d29', // clipperSwap(address,address,address,uint256,uint256,uint256,bytes32,bytes32)
};

export class OneinchAdapter extends Adapter {
  public readonly name: string = 'adapter.oneinch';

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
      if (signature === Signatures.Swap) {
        try {
          const params = web3.eth.abi.decodeParameters(FunctionAbis[signature].abi, input.slice(10));
          const fromToken = await this.getWeb3Helper().getErc20Metadata(chain, params.desc.srcToken);
          const toToken = await this.getWeb3Helper().getErc20Metadata(chain, params.desc.dstToken);

          if (fromToken && toToken) {
            const sender = normalizeAddress(options.context.from);
            const receiver = normalizeAddress(params.desc.dstReceiver);
            const fromAmount = new BigNumber(params.desc.amount.toString())
              .dividedBy(new BigNumber(10).pow(fromToken.decimals))
              .toString(10);
            const toAmount = new BigNumber(params.desc.minReturnAmount.toString())
              .dividedBy(new BigNumber(10).pow(toToken.decimals))
              .toString(10);

            return {
              signature: signature,
              contract: normalizeAddress(address),
              protocol: this.config.protocol,
              action: 'swap',
              addresses: [sender, receiver],
              tokens: [fromToken, toToken],
              tokenAmounts: [fromAmount, toAmount],
              readableString: `${sender} swap ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        } catch (e: any) {}
      } else if (signature === Signatures.Unoswap) {
        const params = web3.eth.abi.decodeParameters(FunctionAbis[signature].abi, input.slice(10));
        console.log(params);
      } else if (signature === Signatures.ClipperSwap) {
        try {
          const params = web3.eth.abi.decodeParameters(FunctionAbis[signature].abi, input.slice(10));
          const fromToken = await this.getWeb3Helper().getErc20Metadata(chain, params.srcToken);
          const toToken = await this.getWeb3Helper().getErc20Metadata(chain, params.dstToken);

          if (fromToken && toToken) {
            const sender = normalizeAddress(options.context.from);
            const fromAmount = new BigNumber(params.inputAmount.toString())
              .dividedBy(new BigNumber(10).pow(fromToken.decimals))
              .toString(10);
            const toAmount = new BigNumber(params.outputAmount.toString())
              .dividedBy(new BigNumber(10).pow(toToken.decimals))
              .toString(10);

            return {
              signature: signature,
              contract: normalizeAddress(address),
              protocol: this.config.protocol,
              action: 'swap',
              addresses: [sender],
              tokens: [fromToken, toToken],
              tokenAmounts: [fromAmount, toAmount],
              readableString: `${sender} swap ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        } catch (e: any) {}
      }
    }

    return null;
  }
}
