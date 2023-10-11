import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import YearnStableSwapPoolAbi from '../../../configs/abi/yearn/YearnStableswapPool.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { YearnyethMappings } from './abis';

const Signatures = {
  Swap: '0xb3e2773606abfd36b5bd91394b3a54d1398336c65005baf7bf7a05efeffaf75b',
  AddLiquidity: '0x67902069e86c21d5ad116d9df073bf02a2bfdbd591414157cda22d3b8476cd53',
  RemoveLiquidity: '0xd8ae9b9ba89e637bcb66a69ac91e8f688018e81d6f92c57e02226425c8efbdf6',
  RemoveLiquiditySingle: '0x7a3728879285f3ca5108b5f39698f28002a6b72cac81653343b8a7dfb75037f1',

  Deposit: '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
  Withdraw: '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db',
};

export class YearnyethAdapter extends Adapter {
  public readonly name: string = 'adapter.yearnyeth';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swap]: YearnyethMappings[Signatures.Swap],
      [Signatures.AddLiquidity]: YearnyethMappings[Signatures.AddLiquidity],
      [Signatures.RemoveLiquidity]: YearnyethMappings[Signatures.RemoveLiquidity],
      [Signatures.RemoveLiquiditySingle]: YearnyethMappings[Signatures.RemoveLiquiditySingle],

      [Signatures.Deposit]: YearnyethMappings[Signatures.Deposit],
      [Signatures.Withdraw]: YearnyethMappings[Signatures.Withdraw],
    });
  }

  private async getAsset(chain: string, address: string, assetIndex: number): Promise<Token | null> {
    if (this.config.staticData.assets[chain] && this.config.staticData.assets[chain].length > assetIndex) {
      return this.config.staticData.assets[chain][assetIndex] as Token;
    }

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(YearnStableSwapPoolAbi as any, address);
    try {
      const assetAddress = await contract.methods.assets(assetIndex).call();
      return await this.getWeb3Helper().getErc20Metadata(chain, assetAddress);
    } catch (e: any) {}

    return null;
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];

    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.Swap) {
        const tokenIn = await this.getAsset(chain, address, Number(event.asset_in));
        const tokenOut = await this.getAsset(chain, address, Number(event.asset_out));

        if (tokenIn && tokenOut) {
          const account = normalizeAddress(event.account);
          const receiver = normalizeAddress(event.receiver);
          const amountIn = new BigNumber(event.amount_in.toString())
            .dividedBy(new BigNumber(10).pow(tokenIn.decimals))
            .toString(10);
          const amountOut = new BigNumber(event.amount_out.toString())
            .dividedBy(new BigNumber(10).pow(tokenOut.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'swap',
            addresses: [receiver, account],
            tokens: [tokenIn, tokenOut],
            tokenAmounts: [amountIn, amountOut],
            readableString: `${receiver} swap ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.AddLiquidity) {
        const tokens: Array<Token> = [];
        const tokenAmounts: Array<string> = [];
        const account = normalizeAddress(event.account);
        const receiver = normalizeAddress(event.receiver);
        for (let i = 0; i < event.amounts_in.length; i++) {
          const token = await this.getAsset(chain, address, i);
          if (token) {
            tokens.push(token);
            tokenAmounts.push(
              new BigNumber(event.amounts_in[i].toString())
                .dividedBy(new BigNumber(10).pow(token.decimals))
                .toString(10)
            );
          }
        }

        return {
          protocol: this.config.protocol,
          action: 'deposit',
          addresses: [receiver, account],
          tokens: tokens,
          tokenAmounts: tokenAmounts,
          readableString: `${receiver} deposit ${tokens.length} tokens on ${this.config.protocol} chain ${chain}`,
        };
      } else if (signature === Signatures.RemoveLiquidity) {
        const account = normalizeAddress(event.account);
        const receiver = normalizeAddress(event.receiver);

        if (options.context) {
          const tokens: Array<Token> = [];
          const tokenAmounts: Array<string> = [];
          for (const token of this.config.staticData.assets[chain]) {
            for (const log of options.context.logs) {
              if (
                log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' &&
                compareAddress(log.address, token.address)
              ) {
                const transferEvent = web3.eth.abi.decodeLog(
                  EventSignatureMapping[log.topics[0]].abi,
                  log.data,
                  log.topics.slice(1)
                );
                if (compareAddress(transferEvent.from, address) && compareAddress(transferEvent.to, receiver)) {
                  tokens.push(token);
                  tokenAmounts.push(
                    new BigNumber(transferEvent.value.toString())
                      .dividedBy(new BigNumber(10).pow(token.decimals))
                      .toString(10)
                  );
                }
              }
            }
          }

          return {
            protocol: this.config.protocol,
            action: 'withdraw',
            addresses: [receiver, account],
            tokens: tokens,
            tokenAmounts: tokenAmounts,
            readableString: `${receiver} withdraw ${tokens.length} tokens on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.RemoveLiquiditySingle) {
        const account = normalizeAddress(event.account);
        const receiver = normalizeAddress(event.receiver);
        const token = await this.getAsset(chain, address, Number(event.asset));
        if (token) {
          const amount = new BigNumber(event.amount_out.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString(10);
          return {
            protocol: this.config.protocol,
            action: 'withdraw',
            addresses: [receiver, account],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${receiver} withdraw ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.Deposit || signature === Signatures.Withdraw) {
        const sender = normalizeAddress(event.sender);
        const owner = normalizeAddress(event.owner);

        const token = Tokens.ethereum.yETH;
        const amount = new BigNumber(event.assets.toString())
          .dividedBy(new BigNumber(10).pow(token.decimals))
          .toString(10);
        const action: KnownAction = signature === Signatures.Deposit ? 'deposit' : 'withdraw';
        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [owner, sender],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${owner} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
