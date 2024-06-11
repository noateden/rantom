// get static data of Maverick protocol: mav.xyz
import fs from 'fs';

import { ChainZksyncEra } from '../configs/constants/chains';
import { normalizeAddress } from '../lib/utils';
import { MaverickAbiMappings } from '../modules/adapters/maverick/abis';
import BlockchainService from '../services/blockchains/blockchain';
import { LiquidityPoolConstant } from '../types/domains';
import updateToken from './helpers/updateToken';

const Factories: Array<any> = [
  {
    chain: 'ethereum',
    protocol: 'maverick',
    birthblock: 17210221,
    address: '0xeb6625d65a0553c9dbc64449e56abfe519bd9c9b',
  },
  {
    chain: 'base',
    protocol: 'maverick',
    birthblock: 1489615,
    address: '0xb2855783a346735e4aae0c1eb894def861fa9b45',
  },
  {
    chain: 'bnbchain',
    protocol: 'maverick',
    birthblock: 29241050,
    address: '0x76311728ff86054ad4ac52d2e9ca005bc702f589',
  },
  {
    chain: ChainZksyncEra,
    protocol: 'maverick',
    birthblock: 3002731,
    address: '0x2c1a605f843a2e18b7d7772f0ce23c236accf7f5',
  },
];

const poolFilePath = './configs/data/MaverickPools.json';

(async function () {
  const blockchain = new BlockchainService();

  for (const config of Factories) {
    console.log(`Getting top liquidity pool ${config.chain} ${config.protocol} ${config.address}`);

    const web3 = await blockchain.getProvider(config.chain);
    const latestBlockNumber = await web3.eth.getBlockNumber();
    let startBlock = config.birthblock;

    let pools: Array<LiquidityPoolConstant> = [];
    if (fs.existsSync(poolFilePath)) {
      pools = JSON.parse(fs.readFileSync(poolFilePath).toString());
    }

    const RANGE = 5000;
    while (startBlock <= latestBlockNumber) {
      const toBlock = startBlock + RANGE > latestBlockNumber ? latestBlockNumber : startBlock + RANGE;
      const logs = await web3.eth.getPastLogs({
        address: config.address,
        fromBlock: startBlock,
        toBlock: toBlock,
        topics: [
          '0x9b3fb3a17b4e94eb4d1217257372dcc712218fcd4bc1c28482bd8a6804a7c775', // PoolCreated
        ],
      });
      for (const log of logs) {
        const event: any = web3.eth.abi.decodeLog(
          MaverickAbiMappings[log.topics[0]].abi,
          log.data,
          log.topics.slice(1)
        );
        const poolAddress = normalizeAddress(event.poolAddress);
        const token0 = await blockchain.getTokenInfo({
          chain: config.chain,
          address: event.tokenA,
        });
        const token1 = await blockchain.getTokenInfo({
          chain: config.chain,
          address: event.tokenB,
        });
        if (token0 && token1) {
          updateToken(token0);
          updateToken(token1);
          pools.push({
            chain: config.chain,
            address: poolAddress,
            protocol: config.protocol,
            version: 'mav',
            factory: normalizeAddress(log.address),
            tokens: [token0, token1],
          });

          console.log(`Got liquidity pool ${config.chain} ${config.protocol} ${token0.symbol}-${token1.symbol}`);

          fs.writeFileSync(poolFilePath, JSON.stringify(pools));
        }
      }

      startBlock += RANGE;
      console.log(`Got logs from ${config.chain} to block ${startBlock}`);
    }
  }
})();
