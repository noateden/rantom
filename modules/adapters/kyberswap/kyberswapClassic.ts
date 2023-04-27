import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import UniswapV2PairAbi from '../../../configs/abi/uniswap/UniswapV2Pair.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { multicallv2 } from '../../../lib/multicall';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions, MulticallCall } from '../../../types/options';
import { Uniswapv2Adapter } from '../uniswap/uniswapv2';

const Signatures = {
  Swap: '0x606ecd02b3e3b4778f8e97b2e03351de14224efaa5fa64e62200afc9395c2499',
  PoolCreated: '0xb6bce363b712c921bead4bcc977289440eb6172eb89e258e3a25bd49ca806de6',
  PoolCreatedDynamicFee: '0xfc574402c445e75f2b79b67884ff9c662244dce454c5ae68935fcd0bebb7c8ff',
};

export class KyberswapClassicAdapter extends Uniswapv2Adapter {
  public readonly name: string = 'adapter.kyberswap-classic';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);

    this.eventMappings[Signatures.Swap] = EventSignatureMapping[Signatures.Swap];
    this.eventMappings[Signatures.PoolCreated] = EventSignatureMapping[Signatures.PoolCreated];
    this.eventMappings[Signatures.PoolCreatedDynamicFee] = EventSignatureMapping[Signatures.PoolCreatedDynamicFee];
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const action: TransactionAction | null = await super.tryParsingActions(options);

    if (action) {
      return action;
    }

    const { chain, address, topics, data } = options;
    const signature = topics[0];
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);

    if (signature === Signatures.Swap) {
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

        const results = await multicallv2(chain, UniswapV2PairAbi, calls);

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

      if (
        this.config.contracts[chain] &&
        this.config.contracts[chain].indexOf(normalizeAddress(factoryAddress)) !== -1
      ) {
        const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

        const token0 = await this.getWeb3Helper().getErc20Metadata(chain, token0Address);
        const token1 = await this.getWeb3Helper().getErc20Metadata(chain, token1Address);

        if (token0 && token1) {
          const amount0In = new BigNumber(event.amount0In.toString()).dividedBy(new BigNumber(10).pow(token0.decimals));
          const amount1In = new BigNumber(event.amount1In.toString()).dividedBy(new BigNumber(10).pow(token1.decimals));
          const amount0Out = new BigNumber(event.amount0Out.toString()).dividedBy(
            new BigNumber(10).pow(token0.decimals)
          );
          const amount1Out = new BigNumber(event.amount1Out.toString()).dividedBy(
            new BigNumber(10).pow(token1.decimals)
          );

          const amountIn = amount0In.gt(0) ? amount0In.toString(10) : amount1In.toString(10);
          const amountOut = amount0Out.gt(0) ? amount0Out.toString(10) : amount1Out.toString(10);

          const tokenIn = amount0In.gt(0) ? token0 : token1;
          const tokenOut = amount0In.gt(0) ? token1 : token0;

          const sender = normalizeAddress(event.sender);
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
      }
    } else if (signature === Signatures.PoolCreated || signature === Signatures.PoolCreatedDynamicFee) {
      if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
        // new pair created on factory contract
        const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));
        const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.token0);
        const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.token1);
        const factory = normalizeAddress(address);

        if (token0 && token1) {
          return {
            protocol: this.config.protocol,
            action: 'createLiquidityPool',
            addresses: [factory],
            tokens: [token0, token1],
            tokenAmounts: ['0', '0'],
            readableString: `${factory} create liquidity pool ${token0.symbol} and ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
            addition: {
              pairAddress: normalizeAddress(event.pair),
            },
          };
        }
      }
    }

    return null;
  }
}
