import BigNumber from 'bignumber.js';

import ChainlinkAggregatorAbi from '../../configs/abi/chainlink/OffchainAggregator.json';
import { BlockSubgraphs } from '../../configs/constants';
import { TokenOracles } from '../../configs/oracles';
import { getStartDayTimestamp, getTimestamp, normalizeAddress } from '../../lib/helper';
import logger from '../../lib/logger';
import { getBlockNumberAtTimestamp } from '../../lib/subgraph';
import { CachingProvider } from '../../services/caching';
import { RpcWrapperProvider } from '../../services/rpc';
import { TokenOracle, TokenOracleChainlink, TokenOracleCurvePool, TokenOraclePool2 } from '../../types/configs';
import { TokenOracleResult } from '../../types/domains';
import { IMongodbProvider, IOracleProvider } from '../../types/namespaces';
import { OracleGetTokenPriceOptions } from '../../types/options';
import { BalancerOracleLib } from './libs/balancer';
import { UniswapOracleLib } from './libs/uniswap';

export class OracleProvider extends CachingProvider implements IOracleProvider {
  public readonly name: string = 'oracle';

  constructor(mongodb: IMongodbProvider | null) {
    super(mongodb);
  }

  private async getPriceSourceChainlink(oracle: TokenOracle, blockNumber: number): Promise<string> {
    const rpcWrapper = new RpcWrapperProvider(null);
    const config: TokenOracleChainlink = oracle.config as TokenOracleChainlink;

    try {
      const latestAnswer = await rpcWrapper.queryContract({
        chain: oracle.token.chain,
        abi: ChainlinkAggregatorAbi,
        contract: config.priceFeed,
        method: 'latestAnswer',
        params: [],
        blockNumber: blockNumber,
      });

      return new BigNumber(latestAnswer).dividedBy(new BigNumber(10).pow(config.priceFeedDecimals)).toString(10);
    } catch (e: any) {
      logger.onError({
        service: this.name,
        message: 'failed to get token price from chainlink aggregator',
        props: {
          chain: oracle.token.chain,
          token: oracle.token.address,
          address: normalizeAddress(config.priceFeed),
          blockNumber,
        },
        error: e,
      });
    }

    return '0';
  }

  // how many base token per quota token?
  private async getBasePriceSourcePool2(oracle: TokenOracle, blockNumber: number): Promise<string> {
    const config: TokenOraclePool2 = oracle.config as TokenOraclePool2;

    if (oracle.source === 'pool2') {
      return await UniswapOracleLib.getSpotPriceV2({
        chain: oracle.chain,
        poolAddress: config.poolAddress,
        baseToken: config.baseToken,
        quotaToken: oracle.token,
        blockNumber: blockNumber,
      });
    } else if (oracle.source === 'pool3') {
      return await UniswapOracleLib.getSpotPriceV3({
        chain: oracle.chain,
        poolAddress: config.poolAddress,
        baseToken: config.baseToken,
        quotaToken: oracle.token,
        blockNumber: blockNumber,
      });
    }

    return '0';
  }

  private async getBasePriceSourceCurvePool(oracle: TokenOracle, blockNumber: number): Promise<string> {
    const config: TokenOracleCurvePool = oracle.config as TokenOracleCurvePool;
    const rpcWrapper = new RpcWrapperProvider(null);

    const method: string = oracle.source === 'curveMeta' ? 'get_dy_underlying' : 'get_dy';
    const baseAmount = await rpcWrapper.queryContract({
      chain: oracle.token.chain,
      abi: config.poolAbi,
      contract: config.poolAddress,
      method: method,
      params: [...config.indies, new BigNumber(10).pow(new BigNumber(oracle.token.decimals)).toString(10)],
      blockNumber: blockNumber,
    });

    if (baseAmount) {
      return new BigNumber(baseAmount)
        .dividedBy(new BigNumber(10).pow((oracle.config as TokenOracleCurvePool).baseToken.decimals))
        .toString(10);
    } else {
      return '0';
    }
  }

  private async getPrice(tokenAddress: string, blockNumber: number): Promise<string> {
    const oracleConfig: TokenOracle | undefined = TokenOracles[tokenAddress];

    if (oracleConfig) {
      if (oracleConfig.source === 'chainlink') {
        return await this.getPriceSourceChainlink(oracleConfig, blockNumber);
      } else if (oracleConfig.source === 'pool2' || oracleConfig.source === 'pool3') {
        return await this.getBasePriceSourcePool2(oracleConfig, blockNumber);
      } else if (oracleConfig.source === 'curveMeta' || oracleConfig.source === 'curvePol') {
        return await this.getBasePriceSourceCurvePool(oracleConfig, blockNumber);
      } else if (oracleConfig.source === 'balancer') {
        const config: TokenOraclePool2 = oracleConfig.config as TokenOraclePool2;
        return await BalancerOracleLib.getSpotPrice({
          poolId: config.poolAddress,
          baseToken: config.baseToken,
          quotaToken: oracleConfig.token,
        });
      }
    }

    return '0';
  }

  private async getPriceUsd(tokenAddress: string, blockNumber: number): Promise<string> {
    const oracleConfig: TokenOracle | undefined = TokenOracles[tokenAddress];

    if (oracleConfig) {
      if (oracleConfig.source === 'chainlink') {
        return await this.getPriceSourceChainlink(oracleConfig, blockNumber);
      } else if (oracleConfig.source === 'pool2' || oracleConfig.source === 'pool3') {
        const priceBase = await this.getBasePriceSourcePool2(oracleConfig, blockNumber);
        const pool2Config: TokenOraclePool2 = oracleConfig.config as TokenOraclePool2;
        if (TokenOracles[pool2Config.baseToken.address]) {
          const basePriceUsd = await this.getPrice(pool2Config.baseToken.address, blockNumber);
          return new BigNumber(priceBase).multipliedBy(basePriceUsd).toString(10);
        }
      } else if (oracleConfig.source === 'curveMeta' || oracleConfig.source === 'curvePol') {
        const priceVsBase = await this.getBasePriceSourceCurvePool(oracleConfig, blockNumber);
        const basePrice = await this.getPrice(
          (oracleConfig.config as TokenOracleCurvePool).baseToken.address,
          blockNumber
        );
        return new BigNumber(priceVsBase).multipliedBy(basePrice).toString(10);
      } else if (oracleConfig.source === 'balancer') {
        const config: TokenOraclePool2 = oracleConfig.config as TokenOraclePool2;
        const priceVsBase = await BalancerOracleLib.getSpotPrice({
          poolId: config.poolAddress,
          baseToken: config.baseToken,
          quotaToken: oracleConfig.token,
        });
        const basePrice = await this.getPrice(config.baseToken.address, blockNumber);
        return new BigNumber(priceVsBase).multipliedBy(basePrice).toString(10);
      }
    }

    return '0';
  }

  // this function get token price in USD term via multiple routes
  // for example, in case token was paired with ETH:
  // 1. we get token spot price per ETH
  // 2. we get ETH price in USD and convert token price to USD
  public async getTokenSpotPriceUsd(options: OracleGetTokenPriceOptions): Promise<TokenOracleResult | null> {
    const timestamp = options.timestamp === 0 ? getTimestamp() : getStartDayTimestamp(options.timestamp);
    const blockNumber = await getBlockNumberAtTimestamp(BlockSubgraphs[options.chain], timestamp);

    const config: TokenOracle = TokenOracles[options.address];
    if (!config) {
      return null;
    }

    return {
      chain: options.chain,
      token: config.token,
      spotPriceUsd: await this.getPriceUsd(config.token.address, blockNumber),
      timestamp: timestamp,
    };
  }
}
