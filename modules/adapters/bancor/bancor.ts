import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import BancorNetworkAbi from '../../../configs/abi/bancor/BancorNetwork.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
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
  Conversion: '0x7154b38b5dd31bb3122436a96d4e09aba5b323ae1fd580025fab55074334c095',
  TokensDeposited: '0x98ac1ba20f9c40c6579f93634a34a46bd425744a5ef297e4c739ba0ce1d7f6b5',
  TokensWithdrawn: '0x2d3e6c9d7b23425696e79d70b11c80ff35e7e65291f79a03f9aef35570686351',
};

export class BancorAdapter extends Adapter {
  public readonly name: string = 'adapter.bancor';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Trade]: EventSignatureMapping[Signatures.Trade],
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
      [Signatures.Flashloan]: EventSignatureMapping[Signatures.Flashloan],
      [Signatures.Conversion]: EventSignatureMapping[Signatures.Conversion],
      [Signatures.TokensDeposited]: EventSignatureMapping[Signatures.TokensDeposited],
      [Signatures.TokensWithdrawn]: EventSignatureMapping[Signatures.TokensWithdrawn],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const signature = topics[0];

    if (signature === Signatures.Conversion) {
      const swapContract = new web3.eth.Contract(BancorNetworkAbi as any, address);
      try {
        const registryAddress = await swapContract.methods.registry().call();
        if (compareAddress(registryAddress, this.config.staticData.v1Registry)) {
          const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
          const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event._fromToken);
          const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event._toToken);

          if (token0 && token1) {
            const trader = normalizeAddress(event._trader);
            const amount0 = new BigNumber(event._fromAmount)
              .dividedBy(new BigNumber(10).pow(token0.decimals))
              .toString(10);
            const amount1 = new BigNumber(event._toAmount)
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
        }
      } catch (e: any) {
        return null;
      }
    }

    if (signature === Signatures.TokensDeposited || signature === Signatures.TokensWithdrawn) {
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
      const user = normalizeAddress(event.provider);
      const amount = new BigNumber(event.bntAmount).dividedBy(1e18).toString(10);

      return {
        protocol: this.config.protocol,
        action: signature === Signatures.TokensDeposited ? 'deposit' : 'withdraw',
        addresses: [user],
        tokens: [Tokens.ethereum.BNT],
        tokenAmounts: [amount],
        readableString: `${user} ${signature === Signatures.TokensDeposited ? 'deposit' : 'withdraw'} ${amount} ${
          Tokens.ethereum.BNT.symbol
        } on ${this.config.protocol} chain ${chain}`,
      };
    }

    if (this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
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
              action: signature === Signatures.Deposit ? 'deposit' : 'withdraw',
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
