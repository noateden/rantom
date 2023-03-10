import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Swap: '0x2170c741c41531aec20e7c107c24eecfdd15e69c9bb0a8dd37b1840b9e0b207b',
  FlashLoan: '0x0d7d75e01ab95780d3cd1c8ec0dd6c2ce19e3a20427eec8bf53283b6fb8e95f0',
  PoolChanges: '0xe5ce249087ce04f05a957192435400fd97868dba0e6a4b4c049abf8af80dae78',
};

export class BalancerAdapter extends Adapter {
  public readonly name: string = 'adapter.balancer';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
      [Signatures.FlashLoan]: EventSignatureMapping[Signatures.FlashLoan],
      [Signatures.PoolChanges]: EventSignatureMapping[Signatures.PoolChanges],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1 && EventSignatureMapping[signature]) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      switch (signature) {
        case Signatures.Swap: {
          const tokenIn = await this.getWeb3Helper().getErc20Metadata(chain, event.tokenIn);
          const tokenOut = await this.getWeb3Helper().getErc20Metadata(chain, event.tokenOut);

          if (tokenIn && tokenOut) {
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

          break;
        }
        case Signatures.FlashLoan: {
          const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
          if (token) {
            const amount = new BigNumber(event.amount.toString())
              .dividedBy(new BigNumber(10).pow(token.decimals))
              .toString(10);
            const recipient = normalizeAddress(event.recipient);
            return {
              protocol: this.config.protocol,
              action: 'flashloan',
              addresses: [options.sender, recipient],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${options.sender} flashloans ${amount} ${token.symbol} from ${this.config.protocol} chain ${chain}`,
            };
          }

          break;
        }
        case Signatures.PoolChanges: {
          const tokens: Array<Token> = [];
          for (const tokenAddr of event.tokens) {
            const token = await this.getWeb3Helper().getErc20Metadata(chain, tokenAddr);
            if (token) {
              tokens.push(token);
            }
          }

          if (tokens.length > 0) {
            let action: KnownAction = 'deposit';
            const amounts: Array<string> = [];
            for (let i = 0; i < event.deltas.length; i++) {
              const amount = new BigNumber(event.deltas[i].toString()).dividedBy(
                new BigNumber(10).pow(tokens[i].decimals)
              );
              if (amount.lt(0)) {
                action = 'withdraw';
              }
              amounts.push(amount.abs().toString(10));
            }

            const provider = normalizeAddress(event.liquidityProvider);

            let tokenAmount: string = '';
            for (let i = 0; i < tokens.length; i++) {
              tokenAmount += `, ${amounts[i]} ${tokens[i].symbol}`;
            }

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [provider],
              tokens: tokens,
              tokenAmounts: amounts,
              readableString: `${options.sender} ${action === 'deposit' ? 'adds' : 'removes'} ${tokenAmount.slice(
                2
              )} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }
}
