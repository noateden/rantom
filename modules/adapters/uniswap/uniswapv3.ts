import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import UniswapV3PoolAbi from '../../../configs/abi/uniswap/UniswapV3Pool.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { multicallv2 } from '../../../lib/multicall';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions, MulticallCall } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Swap: '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67',
  Mint: '0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde',
  Burn: '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c',
  Collect: '0x70935338e69775456a85ddef226c395fb668b63fa0115f5f20610b388e6ca9c0',
};

export class Uniswapv3Adapter extends Adapter {
  public readonly name: string = 'adapter.uniswapv3';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
      [Signatures.Mint]: EventSignatureMapping[Signatures.Mint],
      [Signatures.Burn]: EventSignatureMapping[Signatures.Burn],
      [Signatures.Collect]: EventSignatureMapping[Signatures.Collect],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      signature === Signatures.Swap ||
      signature === Signatures.Mint ||
      signature === Signatures.Burn ||
      signature === Signatures.Collect
    ) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);

      let factoryAddress;
      let token0Address;
      let token1Address;

      try {
        const calls: Array<MulticallCall> = [
          {
            name: 'factory',
            address: address,
            params: [],
          },
          {
            name: 'token0',
            address: address,
            params: [],
          },
          {
            name: 'token1',
            address: address,
            params: [],
          },
        ];

        const results = await multicallv2(chain, UniswapV3PoolAbi, calls);

        factoryAddress = results[0][0];
        token0Address = results[1][0];
        token1Address = results[2][0];
      } catch (e: any) {
        logger.onDebug({
          service: this.name,
          message: 'ignore to get pool info',
          props: {
            protocol: this.config.protocol,
            pool: normalizeAddress(address),
            signature: signature,
          },
        });
        return null;
      }

      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
      if (this.config.contracts[chain].indexOf(normalizeAddress(factoryAddress)) !== -1) {
        const token0 = await this.getWeb3Helper().getErc20Metadata(chain, token0Address);
        const token1 = await this.getWeb3Helper().getErc20Metadata(chain, token1Address);

        if (token0 && token1) {
          switch (signature) {
            case Signatures.Swap: {
              const sender = normalizeAddress(event.sender);
              const recipient = normalizeAddress(event.recipient);

              let amount0 = new BigNumber(event.amount0.toString()).dividedBy(new BigNumber(10).pow(token0.decimals));
              let amount1 = new BigNumber(event.amount1.toString()).dividedBy(new BigNumber(10).pow(token1.decimals));

              let tokenIn = token0;
              let tokenOut = token1;
              let amountIn = '0';
              let amountOut = '0';

              // we detect swap route
              if (amount0.lt(0)) {
                // swap from token1 -> token0
                tokenIn = token1;
                tokenOut = token0;
                amountIn = amount1.abs().toString(10);
                amountOut = amount0.abs().toString(10);
              } else {
                // swap from token0 -> token1
                tokenIn = token0;
                tokenOut = token1;
                amountIn = amount0.abs().toString(10);
                amountOut = amount1.abs().toString(10);
              }

              return {
                protocol: this.config.protocol,
                action: 'swap',
                addresses: [recipient, sender],
                tokens: [tokenIn, tokenOut],
                tokenAmounts: [amountIn, amountOut],
                readableString: `${sender} swaps ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }
            case Signatures.Mint: {
              const sender = normalizeAddress(options.sender);
              const owner = normalizeAddress(event.owner);

              const amount0 = new BigNumber(event.amount0.toString())
                .dividedBy(new BigNumber(10).pow(token0.decimals))
                .toString();
              const amount1 = new BigNumber(event.amount1.toString())
                .dividedBy(new BigNumber(10).pow(token1.decimals))
                .toString();

              return {
                protocol: this.config.protocol,
                action: 'deposit',
                addresses: [owner, sender],
                tokens: [token0, token1],
                tokenAmounts: [amount0, amount1],
                readableString: `${owner} adds ${amount0} ${token0.symbol} and ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }
            case Signatures.Burn: {
              const owner = normalizeAddress(event.owner);

              const amount0 = new BigNumber(event.amount0.toString())
                .dividedBy(new BigNumber(10).pow(token0.decimals))
                .toString();
              const amount1 = new BigNumber(event.amount1.toString())
                .dividedBy(new BigNumber(10).pow(token1.decimals))
                .toString();

              return {
                protocol: this.config.protocol,
                action: 'withdraw',
                addresses: [owner, options.sender],
                tokens: [token0, token1],
                tokenAmounts: [amount0, amount1],
                readableString: `${owner} removes ${amount0} ${token0.symbol} and ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }
            case Signatures.Collect: {
              const owner = normalizeAddress(event.owner);
              const recipient = normalizeAddress(event.recipient);

              const amount0 = new BigNumber(event.amount0.toString())
                .dividedBy(new BigNumber(10).pow(token0.decimals))
                .toString();
              const amount1 = new BigNumber(event.amount1.toString())
                .dividedBy(new BigNumber(10).pow(token1.decimals))
                .toString();

              return {
                protocol: this.config.protocol,
                action: 'collect',
                addresses: [recipient, owner],
                tokens: [token0, token1],
                tokenAmounts: [amount0, amount1],
                readableString: `${owner} collects ${amount0} ${token0.symbol} and ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }
          }
        }
      }
    }

    return null;
  }
}
