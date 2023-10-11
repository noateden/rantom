import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import UniswapV2PairAbi from '../../../configs/abi/uniswap/UniswapV2Pair.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { multicallv2 } from '../../../lib/multicall';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction, UniLiquidityPool } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions, MulticallCall } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Swap: '0xb3e2773606abfd36b5bd91394b3a54d1398336c65005baf7bf7a05efeffaf75b',
  Mint: '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
  Burn: '0x5d624aa9c148153ab3446c1b154f660ee7701e549fe9b62dab7171b1c80e6fa2',
  Claim: '0x865ca08d59f5cb456e85cd2f7ef63664ea4f73327414e9d8152c4158b0e94645',
};

export class AerodromeAdapter extends Adapter {
  public readonly name: string = 'adapter.aerodrome';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
      [Signatures.Mint]: EventSignatureMapping[Signatures.Mint],
      [Signatures.Burn]: config.customEventMapping
        ? config.customEventMapping[Signatures.Burn]
        : EventSignatureMapping[Signatures.Burn],
      [Signatures.Claim]: EventSignatureMapping[Signatures.Claim],
    });
  }

  protected async getPool(chain: string, address: string): Promise<UniLiquidityPool | null> {
    if (!this.config.contracts[chain]) {
      return null;
    }

    let poolConfig: UniLiquidityPool | null = null;
    if (this.config.staticData) {
      for (const pool of this.config.staticData.liquidityPools) {
        if (chain === pool.chain && compareAddress(address, pool.address)) {
          poolConfig = pool;
        }
      }
    }

    if (!poolConfig) {
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

        const results = await multicallv2(chain, UniswapV2PairAbi, calls);

        const factoryAddress = results[0][0];
        const token0Address = results[1][0];
        const token1Address = results[2][0];

        if (
          this.config.contracts[chain] &&
          this.config.contracts[chain].indexOf(normalizeAddress(factoryAddress)) !== -1
        ) {
          const token0 = await this.getWeb3Helper().getErc20Metadata(chain, token0Address);
          const token1 = await this.getWeb3Helper().getErc20Metadata(chain, token1Address);

          if (token0 && token1) {
            poolConfig = {
              chain,
              protocol: this.config.protocol,
              version: 'univ2',
              address: normalizeAddress(address),
              token0: token0,
              token1: token1,
            };
          }
        }
      } catch (e: any) {}
    }

    return poolConfig;
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);

    if (
      signature === Signatures.Swap ||
      signature === Signatures.Mint ||
      signature === Signatures.Burn ||
      signature === Signatures.Claim
    ) {
      const poolConfig: UniLiquidityPool | null = await this.getPool(chain, address);
      if (poolConfig) {
        const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

        switch (signature) {
          case Signatures.Swap: {
            const amount0In = new BigNumber(event.amount0In.toString()).dividedBy(
              new BigNumber(10).pow(poolConfig.token0.decimals)
            );
            const amount1In = new BigNumber(event.amount1In.toString()).dividedBy(
              new BigNumber(10).pow(poolConfig.token1.decimals)
            );
            const amount0Out = new BigNumber(event.amount0Out.toString()).dividedBy(
              new BigNumber(10).pow(poolConfig.token0.decimals)
            );
            const amount1Out = new BigNumber(event.amount1Out.toString()).dividedBy(
              new BigNumber(10).pow(poolConfig.token1.decimals)
            );

            const amountIn = amount0In.gt(0) ? amount0In.toString(10) : amount1In.toString(10);
            const amountOut = amount0Out.gt(0) ? amount0Out.toString(10) : amount1Out.toString(10);

            const tokenIn = amount0In.gt(0) ? poolConfig.token0 : poolConfig.token1;
            const tokenOut = amount0In.gt(0) ? poolConfig.token1 : poolConfig.token0;

            const sender = await this.getSenderAddress(options);
            const to = normalizeAddress(event.to);

            return {
              protocol: this.config.protocol,
              action: 'swap',
              addresses: [to, sender],
              tokens: [tokenIn, tokenOut],
              tokenAmounts: [amountIn, amountOut],
              readableString: `${sender} swaps ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.Mint: {
            const amount0 = new BigNumber(event.amount0.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token0.decimals))
              .toString(10);
            const amount1 = new BigNumber(event.amount1.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token1.decimals))
              .toString(10);
            const sender = await this.getSenderAddress(options);
            const caller = normalizeAddress(event.sender);

            return {
              protocol: this.config.protocol,
              action: 'deposit',
              addresses: [caller, sender],
              tokens: [poolConfig.token0, poolConfig.token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${caller} adds ${amount0} ${poolConfig.token0.symbol} and ${amount1} ${poolConfig.token1.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.Burn: {
            const amount0 = new BigNumber(event.amount0.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token0.decimals))
              .toString(10);
            const amount1 = new BigNumber(event.amount1.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token1.decimals))
              .toString(10);
            const sender = await this.getSenderAddress(options);
            const to = normalizeAddress(event.to);

            return {
              protocol: this.config.protocol,
              action: 'withdraw',
              addresses: [to, sender],
              tokens: [poolConfig.token0, poolConfig.token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${to} removes ${amount0} ${poolConfig.token0.symbol} and ${amount1} ${poolConfig.token1.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.Claim: {
            const amount0 = new BigNumber(event.amount0.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token0.decimals))
              .toString(10);
            const amount1 = new BigNumber(event.amount1.toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.token1.decimals))
              .toString(10);
            const sender = await this.getSenderAddress(options);
            const recipient = normalizeAddress(event.recipient);

            return {
              protocol: this.config.protocol,
              action: 'collect',
              addresses: [recipient, sender],
              tokens: [poolConfig.token0, poolConfig.token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${recipient} collect ${amount0} ${poolConfig.token0.symbol} and ${amount1} ${poolConfig.token1.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }
}
