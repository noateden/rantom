import Web3 from 'web3';

import UniswapFactoryV3 from '../../../configs/abi/uniswap/UniswapV3Factory.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export interface UniswapPoolConstant {
  chain: string;
  protocol: string;
  version: 'univ2' | 'univ3';
  address: string; // LP address
  token0: Token;
  token1: Token;
}

export class UniswapHelper {
  public static async getFactoryPoolsV2(
    chain: string,
    protocol: string,
    factoryAddress: string,
    factoryAbi: any,
    factoryEvent: string = 'PoolCreated', // default uni v2
    fromBlock: number
  ): Promise<Array<UniswapPoolConstant>> {
    const web3Helper = new Web3HelperProvider(null);
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const factoryContract = new web3.eth.Contract(factoryAbi, factoryAddress);

    const pools: Array<UniswapPoolConstant> = [];

    let startBlock = fromBlock;
    const latestBlock = await web3.eth.getBlockNumber();

    const range = 2000;
    while (startBlock <= latestBlock) {
      const toBlock = startBlock + range > latestBlock ? latestBlock : startBlock + range;

      const logs = await factoryContract.getPastEvents(factoryEvent, { fromBlock: startBlock, toBlock });
      for (const log of logs) {
        const token0 = await web3Helper.getErc20Metadata(chain, log.returnValues.token0);
        const token1 = await web3Helper.getErc20Metadata(chain, log.returnValues.token1);

        if (token0 && token1) {
          pools.push({
            chain,
            protocol,
            version: 'univ2',
            address: normalizeAddress(log.returnValues.pair),
            token0,
            token1,
          });

          console.log(
            `Got pool ${protocol}:${chain}:${normalizeAddress(log.returnValues.pair)}:${token0.symbol}-${
              token1.symbol
            } latestBlock:${toBlock}`
          );
        }
      }

      startBlock += range;
    }

    return pools;
  }

  public static async getFactoryPoolsV3(
    chain: string,
    protocol: string,
    factoryAddress: string,
    fromBlock: number
  ): Promise<Array<UniswapPoolConstant>> {
    const web3Helper = new Web3HelperProvider(null);
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const factoryContract = new web3.eth.Contract(UniswapFactoryV3 as any, factoryAddress);

    const pools: Array<UniswapPoolConstant> = [];

    let startBlock = fromBlock;
    const latestBlock = await web3.eth.getBlockNumber();

    const range = 2000;
    while (startBlock <= latestBlock) {
      const toBlock = startBlock + range > latestBlock ? latestBlock : startBlock + range;

      const logs = await factoryContract.getPastEvents('PoolCreated', { fromBlock: startBlock, toBlock });
      for (const log of logs) {
        const token0 = await web3Helper.getErc20Metadata(chain, log.returnValues.token0);
        const token1 = await web3Helper.getErc20Metadata(chain, log.returnValues.token1);

        if (token0 && token1) {
          pools.push({
            chain,
            protocol,
            version: 'univ3',
            address: normalizeAddress(log.returnValues.pool),
            token0,
            token1,
          });

          console.log(
            `Got pool ${protocol}:${chain}:${normalizeAddress(log.returnValues.pool)}:${token0.symbol}-${
              token1.symbol
            } latestBlock:${toBlock}`
          );
        }
      }

      startBlock += range;
    }

    return pools;
  }
}
