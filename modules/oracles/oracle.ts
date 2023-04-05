import { Token as UniswapSdkToken } from '@uniswap/sdk-core';
import { Pool } from '@uniswap/v3-sdk';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import ERC20Abi from '../../configs/abi/ERC20.json';
import ChainlinkAggregatorAbi from '../../configs/abi/chainlink/OffchainAggregator.json';
import UniswapV3PoolAbi from '../../configs/abi/uniswap/UniswapV3Pool.json';
import { BlockSubgraphs } from '../../configs/constants';
import EnvConfig from '../../configs/envConfig';
import { TokenOracles } from '../../configs/oracles';
import { normalizeAddress } from '../../lib/helper';
import logger from '../../lib/logger';
import { getBlockNumberAtTimestamp } from '../../lib/subgraph';
import { TokenOracle, TokenOracleChainlinkAggregator, TokenOraclePool2 } from '../../types/configs';
import { TokenOracleResult } from '../../types/domains';
import { IMongodbProvider, IOracleProvider } from '../../types/namespaces';
import { OracleGetTokenPriceOptions } from '../../types/options';

export class OracleProvider implements IOracleProvider {
  public readonly name: string = 'oracle';
  public mongodb: IMongodbProvider | null;

  constructor(mongodb: IMongodbProvider | null) {
    this.mongodb = mongodb;
  }

  // this function get token price in USD term via multiple routes
  // for example, in case token was paired with ETH:
  // 1. we get token spot price per ETH
  // 2. we get ETH price in USD and convert token price to USD
  public async getTokenSpotPriceUsd(options: OracleGetTokenPriceOptions): Promise<TokenOracleResult | null> {
    const { symbol, timestamp } = options;

    const config: TokenOracle = TokenOracles[symbol];

    if (config && config.oracles.length > 0) {
      const result: TokenOracleResult = {
        token: config.token.symbol,
        timestamp: timestamp,
        sources: [],
      };

      for (const oracleConfig of config.oracles) {
        let basePrice = await this.getTokenBasePriceOracle(oracleConfig, timestamp);

        if (basePrice) {
          if (oracleConfig.base !== 'USD') {
            let quotaOracleBaseUsd: TokenOracleChainlinkAggregator | TokenOraclePool2 | null = null;

            // we find the first oracle source base on USD
            if (TokenOracles[oracleConfig.base]) {
              for (const baseOracleSource of TokenOracles[oracleConfig.base].oracles) {
                if (baseOracleSource.base === 'USD') {
                  quotaOracleBaseUsd = baseOracleSource;
                }
              }
            }

            if (quotaOracleBaseUsd) {
              const quotaSpotPrice = await this.getTokenBasePriceOracle(quotaOracleBaseUsd, timestamp);
              if (quotaSpotPrice) {
                basePrice = new BigNumber(basePrice).multipliedBy(quotaSpotPrice).toString(10);
              }
            }
          }

          result.sources.push({
            source: oracleConfig.source,
            spotPrice: basePrice,
          });
        }
      }

      return result;
    }

    return {
      token: symbol,
      timestamp,
      sources: [],
    };
  }

  // this function get base token price on an oracle config
  // for example, in case token was paired with ETH
  // this function will return token price in ETH
  protected async getTokenBasePriceOracle(
    oracle: TokenOracleChainlinkAggregator | TokenOraclePool2,
    timestamp: number
  ): Promise<string | null> {
    let spotPrice: string | null = null;
    switch (oracle.type) {
      case 'chainlink': {
        spotPrice = await this.getTokenPriceFromChainlinkAggregator(
          oracle as TokenOracleChainlinkAggregator,
          timestamp
        );
        break;
      }
      case 'pool2': {
        spotPrice = await this.getTokenPriceFromPool2(oracle as TokenOraclePool2, timestamp);
        break;
      }
      case 'pool3': {
        spotPrice = await this.getTokenPriceFromPool2(oracle as TokenOraclePool2, timestamp);
        break;
      }
    }

    return spotPrice;
  }

  private async getTokenPriceFromChainlinkAggregator(
    config: TokenOracleChainlinkAggregator,
    timestamp: number
  ): Promise<string | null> {
    const web3 = new Web3(EnvConfig.blockchains[config.chain].nodeRpc);
    const contract = new web3.eth.Contract(ChainlinkAggregatorAbi as any, config.address);

    // get block number at timestamp
    const blockNumber = await getBlockNumberAtTimestamp(BlockSubgraphs[config.chain], timestamp);

    try {
      const latestAnswer = await contract.methods.latestAnswer().call(blockNumber);
      return new BigNumber(latestAnswer.toString()).dividedBy(new BigNumber(10).pow(config.decimals)).toString(10);
    } catch (e: any) {
      logger.onWarn({
        service: this.name,
        message: 'failed to call get data from aggregator',
        props: {
          chain: config.chain,
          address: normalizeAddress(config.address),
          blockNumber,
          error: e.message,
        },
      });
    }

    return null;
  }

  private async getTokenPriceFromPool2(config: TokenOraclePool2, timestamp: number): Promise<string | null> {
    const web3 = new Web3(EnvConfig.blockchains[config.chain].nodeRpc);
    // get block number at timestamp
    const blockNumber = await getBlockNumberAtTimestamp(BlockSubgraphs[config.chain], timestamp);

    if (config.type == 'pool2') {
      try {
        const baseContract = new web3.eth.Contract(ERC20Abi as any, config.baseToken.address);
        const quoteContract = new web3.eth.Contract(ERC20Abi as any, config.quotaToken.address);
        const baseBalance = new BigNumber(
          (await baseContract.methods.balanceOf(config.address).call(blockNumber)).toString()
        ).dividedBy(new BigNumber(10).pow(config.baseToken.decimals));
        const quoteBalance = new BigNumber(
          (await quoteContract.methods.balanceOf(config.address).call(blockNumber)).toString()
        ).dividedBy(new BigNumber(10).pow(config.quotaToken.decimals));
        return quoteBalance.dividedBy(baseBalance).toString(10);
      } catch (e: any) {
        logger.onWarn({
          service: this.name,
          message: 'failed to get price from lp contract',
          props: {
            chain: config.chain,
            address: normalizeAddress(config.address),
            blockNumber,
            error: e.message,
          },
        });
      }
    } else if (config.type === 'pool3') {
      const poolContract = new web3.eth.Contract(UniswapV3PoolAbi as any, config.address);

      const poolFee = new BigNumber((await poolContract.methods.fee().call()).toString()).toNumber();
      const state = await poolContract.methods.slot0().call(blockNumber);
      const liquidity = await poolContract.methods.liquidity().call(blockNumber);

      const baseTokenConfig = new UniswapSdkToken(1, config.baseToken.address, config.baseToken.decimals, '', '');
      const quoteTokenConfig = new UniswapSdkToken(1, config.quotaToken.address, config.quotaToken.decimals, '', '');

      const pool = new Pool(
        baseTokenConfig,
        quoteTokenConfig,
        poolFee,
        state.sqrtPriceX96.toString(),
        liquidity.toString(),
        new BigNumber(state.tick.toString()).toNumber()
      );

      if (normalizeAddress(pool.token0.address) === normalizeAddress(config.baseToken.address)) {
        return new BigNumber(pool.token0Price.toFixed(12)).toString(10);
      } else {
        return new BigNumber(pool.token1Price.toFixed(12)).toString(10);
      }
    }

    return null;
  }
}
