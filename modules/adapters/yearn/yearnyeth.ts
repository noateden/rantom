import BigNumber from 'bignumber.js';

import YearnStableswapPoolAbi from '../../../configs/abi/yearn/YearnStableswapPool.json';
import { compareAddress, formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { TransferAbiMappings } from '../transfer/abis';
import { YearnEventSignatures, YearnyethAbiMappings } from './abis';

export default class YearnyethAdapter extends Adapter {
  public readonly name: string = 'adapter.yearnyeth';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = YearnyethAbiMappings;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      switch (signature) {
        case YearnEventSignatures.Swap: {
          const [fromAddress, toAddress] = await this.services.blockchain.multicall({
            chain: options.chain,
            calls: [
              {
                abi: YearnStableswapPoolAbi,
                target: options.log.address,
                method: 'assets',
                params: [event.asset_in],
              },
              {
                abi: YearnStableswapPoolAbi,
                target: options.log.address,
                method: 'assets',
                params: [event.asset_out],
              },
            ],
          });
          const tokenIn = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: fromAddress,
          });
          const tokenOut = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: toAddress,
          });
          if (tokenIn && tokenOut) {
            const account = normalizeAddress(event.account);
            const receiver = normalizeAddress(event.receiver);
            const amountIn = formatFromDecimals(event.amount_in.toString(), tokenIn.decimals);
            const amountOut = formatFromDecimals(event.amount_out.toString(), tokenOut.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'swap',
                addresses: [account, receiver],
                tokens: [tokenIn, tokenOut],
                tokenAmounts: [amountIn, amountOut],
              })
            );
          }

          break;
        }
        case YearnEventSignatures.AddLiquidity: {
          const tokens: Array<Token> = [];
          const tokenAmounts: Array<string> = [];
          const account = normalizeAddress(event.account);
          const receiver = normalizeAddress(event.receiver);
          for (let i = 0; i < event.amounts_in.length; i++) {
            const asset = await this.services.blockchain.readContract({
              chain: options.chain,
              abi: YearnStableswapPoolAbi,
              target: options.log.address,
              method: 'assets',
              params: [i],
            });
            const token = await this.services.blockchain.getTokenInfo({
              chain: options.chain,
              address: asset,
            });
            if (token) {
              tokens.push(token);
              tokenAmounts.push(
                new BigNumber(event.amounts_in[i].toString())
                  .dividedBy(new BigNumber(10).pow(token.decimals))
                  .toString(10)
              );
            }
          }
          actions.push(
            this.buildUpAction({
              ...options,
              action: 'deposit',
              addresses: [account, receiver],
              tokens,
              tokenAmounts,
            })
          );
          break;
        }
        case YearnEventSignatures.RemoveLiquidity: {
          const account = normalizeAddress(event.account);
          const receiver = normalizeAddress(event.receiver);
          const tokens: Array<Token> = [];
          const tokenAmounts: Array<string> = [];

          const num_assets = await this.services.blockchain.readContract({
            chain: options.chain,
            abi: YearnStableswapPoolAbi,
            target: options.log.address,
            method: 'num_assets',
            params: [],
          });
          for (let i = 0; i < Number(num_assets); i++) {
            const asset = await this.services.blockchain.readContract({
              chain: options.chain,
              abi: YearnStableswapPoolAbi,
              target: options.log.address,
              method: 'assets',
              params: [i],
            });
            const token = await this.services.blockchain.getTokenInfo({
              chain: options.chain,
              address: asset,
            });
            if (token) {
              for (const log of options.allLogs) {
                if (
                  log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' &&
                  compareAddress(log.address, token.address)
                ) {
                  const transferEvent = web3.eth.abi.decodeLog(
                    TransferAbiMappings[log.topics[0]].abi,
                    log.data,
                    log.topics.slice(1)
                  );
                  if (
                    compareAddress(transferEvent.from, options.log.address) &&
                    compareAddress(transferEvent.to, receiver)
                  ) {
                    tokens.push(token);
                    tokenAmounts.push(formatFromDecimals(transferEvent.value.toString(), token.decimals));
                  }
                }
              }
            }
          }

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'withdraw',
              addresses: [account, receiver],
              tokens: tokens,
              tokenAmounts: tokenAmounts,
            })
          );

          break;
        }
        case YearnEventSignatures.RemoveLiquiditySingle: {
          const account = normalizeAddress(event.account);
          const receiver = normalizeAddress(event.receiver);

          const asset = await this.services.blockchain.readContract({
            chain: options.chain,
            abi: YearnStableswapPoolAbi,
            target: options.log.address,
            method: 'assets',
            params: [event.asset],
          });
          const token = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: asset,
          });

          if (token) {
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'withdraw',
                addresses: [account, receiver],
                tokens: [token],
                tokenAmounts: [formatFromDecimals(event.amount_out.toString(), token.decimals)],
              })
            );
          }
          break;
        }
        case YearnEventSignatures.Deposit:
        case YearnEventSignatures.Withdraw: {
          const sender = normalizeAddress(event.sender);
          const owner = normalizeAddress(event.owner);

          const token = {
            chain: 'ethereum',
            address: '0x1bed97cbc3c24a4fb5c069c6e311a967386131f7',
            symbol: 'yETH',
            decimals: 18,
          };

          actions.push(
            this.buildUpAction({
              ...options,
              action: signature === YearnEventSignatures.Deposit ? 'deposit' : 'withdraw',
              addresses: [sender, owner],
              tokens: [token],
              tokenAmounts: [formatFromDecimals(event.assets.toString(), token.decimals)],
            })
          );
        }
      }
    }
    return actions;
  }
}
