import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import StrategyBaseAbi from '../../../configs/abi/eigenlayer/StrategyBase.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0x7cfff908a4b583f36430b25d75964c458d8ede8a99bd61be750e97ee1b2f3a96',
  WithdrawalCompleted: '0xe7eb0ca11b83744ece3d78e9be01b913425fbae70c32ce27726d0ecde92ef8d2',
};

export class EigenlayerAdapter extends Adapter {
  public readonly name: string = 'adapter.eigenlayer';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.WithdrawalCompleted]: EventSignatureMapping[Signatures.WithdrawalCompleted],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      try {
        let blockNumber = options.blockNumber ? options.blockNumber : null;
        if (!blockNumber) {
          const transaction = await web3.eth.getTransaction(options.hash as string);
          blockNumber = transaction.blockNumber;
        }

        if (signature === Signatures.Deposit) {
          const strategy = normalizeAddress(event.strategy);
          const strategyContract = new web3.eth.Contract(StrategyBaseAbi as any, strategy);
          const token: Token | null =
            this.config.staticData.strategies[chain] && this.config.staticData.strategies[chain][strategy]
              ? this.config.staticData.strategies[chain][strategy]
              : null;
          if (token) {
            const amountUnderlying = await strategyContract.methods
              .sharesToUnderlying(event.shares.toString())
              .call(blockNumber);
            const amount = new BigNumber(amountUnderlying.toString())
              .dividedBy(new BigNumber(10).pow(token.decimals))
              .toString(10);
            const address = normalizeAddress(event.depositor);

            return {
              protocol: this.config.protocol,
              action: 'deposit',
              tokens: [token],
              tokenAmounts: [amount],
              addresses: [address],
              readableString: `${address} deposit ${amount} ${token.symbol} on ${this.config.protocol} chain ${options.chain}`,
            };
          }
        } else if (signature === Signatures.WithdrawalCompleted) {
          const input = await this.getTransactionInput(options);
          const depositor = normalizeAddress(event.depositor);
          const params = web3.eth.abi.decodeParameters(
            ['(address[],uint256[],address,(address,uint96),uint32,address)[]', 'address[][]', 'uint256[]', 'bool[]'],
            input.slice(10)
          );

          for (let i = 0; i < params[0].length; i++) {
            if (compareAddress(depositor, params[0][i][2])) {
              const strategy = normalizeAddress(params[0][i][0][0]);
              const strategyContract = new web3.eth.Contract(StrategyBaseAbi as any, strategy);
              const token: Token | null =
                this.config.staticData.strategies[chain] && this.config.staticData.strategies[chain][strategy]
                  ? this.config.staticData.strategies[chain][strategy]
                  : null;

              if (token) {
                const amountUnderlying = await strategyContract.methods
                  .sharesToUnderlying(params[0][i][1][0].toString())
                  .call(blockNumber);
                const amount = new BigNumber(amountUnderlying.toString())
                  .dividedBy(new BigNumber(10).pow(token.decimals))
                  .toString(10);

                return {
                  protocol: this.config.protocol,
                  action: 'withdraw',
                  tokens: [token],
                  tokenAmounts: [amount],
                  addresses: [address],
                  readableString: `${address} withdraw ${amount} ${token.symbol} on ${this.config.protocol} chain ${options.chain}`,
                };
              }
            }
          }
        }
      } catch (e: any) {}
    }

    return null;
  }
}
