import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { FunctionAbis } from '../../../configs/functions';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionFunction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseFunctionCallDataOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: any = {
  uniV2_sell_pctFee_v9: '0x8ee938a9',
  uniV2_swapExactETHForTokens_pctFee_v9: '0x19948479',
};

export class UnibotAdapter extends Adapter {
  public readonly name: string = 'adapter.unibot';

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

      if (
        signature === Signatures.uniV2_sell_pctFee_v9 ||
        signature === Signatures.uniV2_swapExactETHForTokens_pctFee_v9
      ) {
        let params = null;
        try {
          params = web3.eth.abi.decodeParameters(FunctionAbis[signature].abi, input.slice(10));
        } catch (e: any) {}

        if (params) {
          if (signature === Signatures.uniV2_sell_pctFee_v9) {
            const fromToken = await this.getWeb3Helper().getErc20Metadata(chain, params.path[0]);
            const toToken = await this.getWeb3Helper().getErc20Metadata(chain, params.path[params.path.length - 1]);

            if (fromToken && toToken) {
              const sender = normalizeAddress(options.context.from);
              const fromAmount = new BigNumber(params.amt_in.toString())
                .dividedBy(new BigNumber(10).pow(fromToken.decimals))
                .toString(10);
              const toAmount = new BigNumber(params.amt_out_min.toString())
                .dividedBy(new BigNumber(10).pow(toToken.decimals))
                .toString(10);

              return {
                signature: signature,
                contract: normalizeAddress(address),
                protocol: this.config.protocol,
                action: 'trade',
                addresses: [sender],
                tokens: [fromToken, toToken],
                tokenAmounts: [fromAmount, toAmount],
                readableString: `${sender} swap ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }
          } else if (signature === Signatures.uniV2_swapExactETHForTokens_pctFee_v9) {
            const receiver = normalizeAddress(params.to);
            const fromToken = Tokens.ethereum.ETH;
            const toToken = await this.getWeb3Helper().getErc20Metadata(chain, params.path[params.path.length - 1]);

            if (toToken) {
              const fromAmount = new BigNumber(options.tx.value.toString()).dividedBy(1e18).toString(10);
              const toAmount = new BigNumber(params.amt_out_min.toString())
                .dividedBy(new BigNumber(10).pow(toToken.decimals))
                .toString(10);
              return {
                signature: signature,
                contract: normalizeAddress(address),
                protocol: this.config.protocol,
                action: 'trade',
                addresses: [receiver],
                tokens: [fromToken, toToken],
                tokenAmounts: [fromAmount, toAmount],
                readableString: `${receiver} swap ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }
          }
        }
      }
    }

    return null;
  }
}
