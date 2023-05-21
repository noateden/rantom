import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { Functions } from '../../../configs/functions';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Swap: '0xbeee1e6e7fe307ddcf84b0a16137a4430ad5e2480fc4f4a8e250ab56ccd7630d',
  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
};

export class MetamaskAdapter extends Adapter {
  public readonly name: string = 'adapter.metamask';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swap]: {
        abi: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'data',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'trader',
            type: 'address',
          },
        ],
      },
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const transaction = await web3.eth.getTransaction(options.hash as string);
      const context = await web3.eth.getTransactionReceipt(options.hash as string);

      if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(context.to)) !== -1) {
        // we support direct call to metamask router contract only for now
        const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));
        const trader = normalizeAddress(event.trader);

        // parse transaction input
        if (!options.input) {
          options.input = transaction.input;
        }

        const functionSignature = options.input.slice(0, 10);
        if (functionSignature === Functions.metamaskRouterSwap) {
          try {
            const transactionParams = web3.eth.abi.decodeParameters(
              ['string', 'address', 'uint256', 'bytes'],
              options.input.slice(10)
            );
            const token0 = await this.getWeb3Helper().getErc20Metadata(chain, transactionParams[1].toString());
            if (token0) {
              const amount0 = new BigNumber(transactionParams[2].toString())
                .dividedBy(new BigNumber(10).pow(token0.decimals))
                .toString(10);

              let token1Address = null;
              let amount1 = '0';
              if (transactionParams[0] === 'airswapLight3FeeDynamic') {
                const callData = transactionParams[3].slice(0, 322);
                const parsedParams = web3.eth.abi.decodeParameters(
                  ['uint256', 'uint256', 'address', 'address', 'uint256'],
                  callData
                );
                token1Address = parsedParams[3].toString();
                amount1 = parsedParams[4].toString();
              } else {
                const callData = transactionParams[3].slice(0, 258);
                const parsedParams = web3.eth.abi.decodeParameters(
                  ['address', 'address', 'uint256', 'uint256'],
                  callData
                );
                token1Address = parsedParams[1].toString();
                amount1 = parsedParams[3].toString();
              }

              const token1 = await this.getWeb3Helper().getErc20Metadata(chain, token1Address);
              if (token1) {
                amount1 = new BigNumber(amount1).dividedBy(new BigNumber(10).pow(token1.decimals)).toString(10);

                // the amount 1 is the minimum amount was passed by metamask
                // we need to find out the exact amount trader was received
                // by looking into token1 transfer to trader address

                for (const log of context.logs) {
                  if (compareAddress(log.address, token1.address) && log.topics[0] === Signatures.Transfer) {
                    const transferEvent = web3.eth.abi.decodeLog(
                      [
                        {
                          indexed: true,
                          internalType: 'address',
                          name: 'from',
                          type: 'address',
                        },
                        {
                          indexed: true,
                          internalType: 'address',
                          name: 'to',
                          type: 'address',
                        },
                        {
                          indexed: false,
                          internalType: 'uint256',
                          name: 'value',
                          type: 'uint256',
                        },
                      ],
                      log.data,
                      log.topics.slice(1)
                    );
                    if (compareAddress(transferEvent.to, trader)) {
                      amount1 = new BigNumber(transferEvent.value.toString())
                        .dividedBy(new BigNumber(10).pow(token1.decimals))
                        .toString(10);
                    }
                  }
                }

                return {
                  protocol: this.config.protocol,
                  action: 'trade',
                  addresses: [trader],
                  tokens: [token0, token1],
                  tokenAmounts: [amount0, amount1],
                  readableString: `${trader} trade ${amount0} ${token0.symbol} for ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
                };
              }
            }
          } catch (e: any) {
            logger.onDebug({
              service: this.name,
              message: 'failed to parse transaction params',
              props: {
                chain: chain,
                protocol: this.config.protocol,
                transaction: options.hash,
                error: e.message,
              },
            });
          }
        }
      }
    }

    return null;
  }
}
