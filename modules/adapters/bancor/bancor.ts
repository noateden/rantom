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
  Trade: '0x5c02c2bb2d1d082317eb23916ca27b3e7c294398b60061a2ad54f1c3c018c318',
  Deposit: '0xecb7e4cd1580472adaeba712b36acf94439b2e1760af55fedb61960ca4422af3',
  Withdraw: '0xeab8ac9e9478a4b3c37a794ecef629b8a8bbcd96f9eaeac8ed26054d144da52d',
  Flashloan: '0x0da3485ef1bb570df7bb888887eae5aa01d81b83cd8ccc80c0ea0922a677ecef',
};

export class BancorAdapter extends Adapter {
  public readonly name: string = 'adapter.bancor';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Trade]: EventSignatureMapping[Signatures.Trade],
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
      [Signatures.Flashloan]: EventSignatureMapping[Signatures.Flashloan],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      (signature === Signatures.Trade ||
        signature === Signatures.Deposit ||
        signature === Signatures.Withdraw ||
        signature === Signatures.Flashloan) &&
      this.config.contracts[chain].indexOf(address) !== 1
    ) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      switch (signature) {
        case Signatures.Trade: {
          const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.sourceToken);
          const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.targetToken);

          if (token0 && token1) {
            const trader = normalizeAddress(event.trader);
            const amount0 = new BigNumber(event.sourceAmount)
              .dividedBy(new BigNumber(10).pow(token0.decimals))
              .toString(10);
            const amount1 = new BigNumber(event.targetAmount)
              .dividedBy(new BigNumber(10).pow(token1.decimals))
              .toString(10);

            return {
              protocol: this.config.protocol,
              action: 'swap',
              addresses: [trader],
              tokens: [token0, token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${trader} swap ${amount0} ${token0.symbol} for ${amount1} ${token0.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          break;
        }
        case Signatures.Deposit:
        case Signatures.Withdraw: {
          const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
          if (token) {
            const provider = normalizeAddress(event.provider);
            const amount = new BigNumber(event.baseTokenAmount)
              .dividedBy(new BigNumber(10).pow(token.decimals))
              .toString(10);

            return {
              protocol: this.config.protocol,
              action: signature === Signatures.Deposit ? 'addLiquidity' : 'removeLiquidity',
              addresses: [provider],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${provider} ${signature === Signatures.Deposit ? 'add' : 'remove'} ${amount} ${
                token.symbol
              } on ${this.config.protocol} chain ${chain}`,
            };
          }
          break;
        }
        case Signatures.Flashloan: {
          const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);

          if (token) {
            const borrower = normalizeAddress(event.borrower);
            const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

            return {
              protocol: this.config.protocol,
              action: 'flashloan',
              addresses: [borrower],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${borrower} flashloan ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }
}
