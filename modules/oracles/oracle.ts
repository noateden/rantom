import BigNumber from 'bignumber.js';

import ChainlinkAggregatorAbi from '../../configs/abi/chainlink/OffchainAggregator.json';
import { AddressZero, BlockSubgraphs, Tokens } from '../../configs/constants';
import { TokenOracleBases, TokenOracleSources } from '../../configs/oracles';
import { compareAddress, getStartDayTimestamp, getTimestamp, normalizeAddress } from '../../lib/helper';
import logger from '../../lib/logger';
import { getBlockNumberAtTimestamp } from '../../lib/subgraph';
import { CachingHelper, CachingProvider } from '../../services/caching';
import { RpcWrapperProvider } from '../../services/rpc';
import { Web3HelperProvider } from '../../services/web3';
import { Token, TokenOracleBase, TokenOracleSource } from '../../types/configs';
import { TokenOracleResult } from '../../types/domains';
import { IMongodbProvider, IOracleProvider } from '../../types/namespaces';
import { OracleGetTokenPriceOptions } from '../../types/options';
import { UniswapOracleLib } from './libs/uniswap';

export class OracleProvider extends CachingProvider implements IOracleProvider {
  public readonly name: string = 'oracle';

  constructor(mongodb: IMongodbProvider | null) {
    super(mongodb);
  }

  private async getTokenOracleBasePriceUsd(oracle: TokenOracleBase, blockNumber: number): Promise<string | null> {
    const tokenBasePriceCacheKey = CachingHelper.getOracleTokenName(oracle.token.chain, oracle.token.address);
    const cachePrice = await this.getCachingData(tokenBasePriceCacheKey);
    if (cachePrice) {
      return cachePrice.spotPriceUsd;
    }

    try {
      const rpcWrapper = new RpcWrapperProvider(null);
      const latestAnswer = await rpcWrapper.queryContract({
        chain: oracle.token.chain,
        abi: ChainlinkAggregatorAbi,
        contract: oracle.priceFeed,
        method: 'latestAnswer',
        params: [],
        blockNumber: blockNumber,
      });

      const spotPriceUsd = new BigNumber(latestAnswer)
        .dividedBy(new BigNumber(10).pow(oracle.priceFeedDecimals))
        .toString(10);

      // save caching price
      await this.setCachingData(tokenBasePriceCacheKey, { spotPriceUsd: spotPriceUsd });

      return spotPriceUsd;
    } catch (e: any) {
      logger.onError({
        service: this.name,
        message: 'failed to get token price from chainlink aggregator',
        props: {
          chain: oracle.token.chain,
          token: oracle.token.address,
          address: normalizeAddress(oracle.priceFeed),
          blockNumber,
        },
        error: e,
      });
    }

    return null;
  }

  // get token spot price USD from given oracle source
  private async getTokenSpotPriceUsdFromOracleSource(
    chain: string,
    token: Token,
    oracleSource: TokenOracleSource,
    blockNumber: number
  ): Promise<string | null> {
    const rpcWrapper = new RpcWrapperProvider(null);

    for (const [, oracleTokenBase] of Object.entries(TokenOracleBases)) {
      // find the pool with token base
      let poolAddress = AddressZero;

      if (oracleSource.type === 'pool2') {
        poolAddress = await rpcWrapper.queryContract({
          chain: oracleSource.chain,
          abi: oracleSource.factoryAbi,
          contract: oracleSource.factory,
          method: 'getPair',
          params: [token.address, oracleTokenBase.token.address],
        });
      } else if (oracleSource.type === 'pool3') {
        poolAddress = await rpcWrapper.queryContract({
          chain: oracleSource.chain,
          abi: oracleSource.factoryAbi,
          contract: oracleSource.factory,
          method: 'getPool',
          params: [token.address, oracleTokenBase.token.address, 3000],
        });

        if (compareAddress(poolAddress, AddressZero)) {
          // try with 10000
          poolAddress = await rpcWrapper.queryContract({
            chain: oracleSource.chain,
            abi: oracleSource.factoryAbi,
            contract: oracleSource.factory,
            method: 'getPool',
            params: [token.address, oracleTokenBase.token.address, 10000],
          });
        }

        if (compareAddress(poolAddress, AddressZero)) {
          // try with 500
          poolAddress = await rpcWrapper.queryContract({
            chain: oracleSource.chain,
            abi: oracleSource.factoryAbi,
            contract: oracleSource.factory,
            method: 'getPool',
            params: [token.address, oracleTokenBase.token.address, 500],
          });
        }
      }

      if (!compareAddress(poolAddress, AddressZero)) {
        const priceTokenBaseUsd = await this.getTokenOracleBasePriceUsd(oracleTokenBase, blockNumber);
        if (priceTokenBaseUsd) {
          if (oracleSource.type === 'pool2') {
            const spotPrice = await UniswapOracleLib.getSpotPriceV2({
              chain: oracleSource.chain,
              poolAddress: poolAddress,
              baseToken: oracleTokenBase.token,
              quotaToken: token,
              blockNumber: blockNumber,
            });
            return new BigNumber(spotPrice).multipliedBy(new BigNumber(priceTokenBaseUsd)).toString(10);
          } else if (oracleSource.type === 'pool3') {
            // uniswap v3
            const spotPrice = await UniswapOracleLib.getSpotPriceV3({
              chain: oracleSource.chain,
              poolAddress: poolAddress,
              baseToken: oracleTokenBase.token,
              quotaToken: token,
              blockNumber: blockNumber,
            });
            return new BigNumber(spotPrice).multipliedBy(new BigNumber(priceTokenBaseUsd)).toString(10);
          }
        }
      }
    }

    return null;
  }

  // this function get token price in USD term via multiple routes
  // for example, in case token was paired with ETH:
  // 1. we get token spot price per ETH
  // 2. we get ETH price in USD and convert token price to USD
  public async getTokenSpotPriceUsd(options: OracleGetTokenPriceOptions): Promise<TokenOracleResult> {
    const timestamp = options.timestamp === 0 ? getTimestamp() : getStartDayTimestamp(options.timestamp);
    const blockNumber = await getBlockNumberAtTimestamp(BlockSubgraphs[options.chain], timestamp);

    if (TokenOracleBases[options.address]) {
      const priceUsd = await this.getTokenOracleBasePriceUsd(TokenOracleBases[options.address], blockNumber);
      return {
        chain: options.chain,
        token: TokenOracleBases[options.address].token.address,
        sources: [
          {
            source: 'chainlink',
            spotPriceUsd: priceUsd ? priceUsd : '0',
          },
        ],
        timestamp: timestamp,
      };
    } else {
      const result: TokenOracleResult = {
        chain: options.chain,
        token: options.address,
        sources: [],
        timestamp: timestamp,
      };

      // get token metadata
      let token: Token | null = null;
      for (const [, config] of Object.entries(Tokens.ethereum)) {
        if (compareAddress(config.address, options.address)) {
          token = config;
        }
      }

      if (!token) {
        const web3Helper = new Web3HelperProvider(this._mongodb);
        token = await web3Helper.getErc20Metadata(options.chain, options.address);
      }

      if (!token) {
        return result;
      }

      for (const oracleSource of TokenOracleSources.filter((item) => item.chain === options.chain)) {
        const spotPriceUsd = await this.getTokenSpotPriceUsdFromOracleSource(
          options.chain,
          token,
          oracleSource,
          blockNumber
        );

        if (spotPriceUsd) {
          result.sources.push({
            source: oracleSource.source,
            spotPriceUsd: spotPriceUsd,
          });
        }
      }

      if (result.sources.length === 0) {
        logger.onWarn({
          service: this.name,
          message: 'failed to get token price',
          props: {
            ...options,
          },
        });
      }

      return result;
    }
  }
}
