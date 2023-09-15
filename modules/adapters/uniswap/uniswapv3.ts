import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction, UniLiquidityPool } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { UniswapAdapter } from './uniswap';

const Signatures = {
  Swap: '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67',
  Mint: '0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde',
  Burn: '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c',
  Collect: '0x70935338e69775456a85ddef226c395fb668b63fa0115f5f20610b388e6ca9c0',
  PoolCreated: '0x783cca1c0412dd0d695e784568c96da2e9c22ff989357a2e8b1d9b2b4e6b7118',
};

export class Uniswapv3Adapter extends UniswapAdapter {
  public readonly name: string = 'adapter.uniswapv3';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);

    this.eventMappings = {
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
      [Signatures.Mint]: EventSignatureMapping[Signatures.Mint],
      [Signatures.Burn]: EventSignatureMapping[Signatures.Burn],
      [Signatures.Collect]: EventSignatureMapping[Signatures.Collect],
      [Signatures.PoolCreated]: EventSignatureMapping[Signatures.PoolCreated],
    };
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    if (
      signature === Signatures.Swap ||
      signature === Signatures.Mint ||
      signature === Signatures.Burn ||
      signature === Signatures.Collect
    ) {
      // first, we use known pools from configs
      let poolConfig: UniLiquidityPool | null = await this.getPoolConfig(chain, address);

      if (poolConfig) {
        const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

        switch (signature) {
          case Signatures.Swap: {
            const sender = await this.getSenderAddress(options);
            const recipient = normalizeAddress(event.recipient);

            let amount0 = new BigNumber(event.amount0.toString()).dividedBy(
              new BigNumber(10).pow(poolConfig.token0.decimals)
            );
            let amount1 = new BigNumber(event.amount1.toString()).dividedBy(
              new BigNumber(10).pow(poolConfig.token1.decimals)
            );

            let tokenIn = poolConfig.token0;
            let tokenOut = poolConfig.token1;
            let amountIn = '0';
            let amountOut = '0';

            // we detect swap route
            if (amount0.lt(0)) {
              // swap from token1 -> token0
              tokenIn = poolConfig.token1;
              tokenOut = poolConfig.token0;
              amountIn = amount1.abs().toString(10);
              amountOut = amount0.abs().toString(10);
            } else {
              // swap from token0 -> token1
              tokenIn = poolConfig.token0;
              tokenOut = poolConfig.token1;
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
            const sender = await this.getSenderAddress(options);
            const owner = normalizeAddress(event.owner);

            const amount0 = new BigNumber(event.amount0.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token0.decimals))
              .toString();
            const amount1 = new BigNumber(event.amount1.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token1.decimals))
              .toString();

            return {
              protocol: this.config.protocol,
              action: 'deposit',
              addresses: [owner, sender],
              tokens: [poolConfig.token0, poolConfig.token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${owner} adds ${amount0} ${poolConfig.token0.symbol} and ${amount1} ${poolConfig.token1.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.Burn: {
            const owner = normalizeAddress(event.owner);
            const sender = await this.getSenderAddress(options);

            const amount0 = new BigNumber(event.amount0.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token0.decimals))
              .toString();
            const amount1 = new BigNumber(event.amount1.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token1.decimals))
              .toString();

            return {
              protocol: this.config.protocol,
              action: 'withdraw',
              addresses: [owner, sender],
              tokens: [poolConfig.token0, poolConfig.token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${owner} removes ${amount0} ${poolConfig.token0.symbol} and ${amount1} ${poolConfig.token1.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.Collect: {
            const sender = await this.getSenderAddress(options);
            const recipient = normalizeAddress(event.recipient);

            const amount0 = new BigNumber(event.amount0.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token0.decimals))
              .toString();
            const amount1 = new BigNumber(event.amount1.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token1.decimals))
              .toString();

            return {
              protocol: this.config.protocol,
              action: 'collect',
              addresses: [recipient, sender],
              tokens: [poolConfig.token0, poolConfig.token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${recipient} collects ${amount0} ${poolConfig.token0.symbol} and ${amount1} ${poolConfig.token1.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    } else if (
      signature === Signatures.PoolCreated &&
      this.config.contracts[chain] &&
      this.config.contracts[chain].indexOf(address) !== -1
    ) {
      // new pool created on factory contract
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
      const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.token0);
      const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.token1);
      const factory = normalizeAddress(address);
      const sender = await this.getSenderAddress(options);

      if (token0 && token1) {
        return {
          protocol: this.config.protocol,
          action: 'createLiquidityPool',
          addresses: [factory, sender],
          tokens: [token0, token1],
          tokenAmounts: ['0', '0'],
          readableString: `${sender} create liquidity pool ${token0.symbol} and ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
          addition: {
            poolAddress: normalizeAddress(event.pool),
            fee: new BigNumber(event.fee).toNumber(),
          },
        };
      }
    }

    return null;
  }
}
