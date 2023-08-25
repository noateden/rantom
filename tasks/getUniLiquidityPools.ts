// this script get top liquidity pools on Uniswap v2, Uniswap vb3 and forks
// sorted by total value locked
import axios from 'axios';
import fs from 'fs';

import { AddressZero } from '../configs/constants';
import {
  CamelotConfigs,
  Camelotv3Configs,
  KyberswapClassicConfigs,
  PancakeswapConfigs,
  PancakeswapV3Configs,
  SushiConfigs,
  Sushiv3Configs,
  Uniswapv2Configs,
  Uniswapv3Configs,
} from '../configs/protocols';
import { compareAddress, normalizeAddress } from '../lib/helper';
import { KyberHelper } from '../modules/adapters/kyberswap/helper';
import { ProtocolConfig } from '../types/configs';
import { UniLiquidityPool } from '../types/domains';

const HidePools: Array<string> = [
  '0x86d257cdb7bc9c0df10e84c8709697f92770b335',
  '0xf8dbd52488978a79dfe6ffbd81a01fc5948bf9ee',
  '0x8fe8d9bb8eeba3ed688069c3d6b556c9ca258248',
  '0xa850478adaace4c08fc61de44d8cf3b64f359bec',
  '0x277667eb3e34f134adf870be9550e9f323d0dc24',
  '0x8c0411f2ad5470a66cb2e9c64536cfb8dcd54d51',
  '0x055284a4ca6532ecc219ac06b577d540c686669d',

  // sushi v2 arbitrum
  '0xb1bc3f4eacc69c663d289516034981c5272e7fa1', //CPT
  '0xfbef65afa44faa7b69c8779d42ffb5d661ac8b25', //ACID
  '0x134781f5ab6014c9d75cbd87bb1654ab7e6bb432', //CPT
  '0x947d54973d908dc76ff415895bf29108d71ceba3', //ACID
  '0xbbb930795e2a974fd95064fa46a5525a7d447fa7', //ACID
  '0xb94ea12476c2591b8f7a1070a7db8e3b0722e00d', //ACID
  '0x7d823eefa4f801b0b9455ebd4fcbacb154e63b22', //CPT
  '0xaa4d8ab8aeafa2273d670d11acc46785346e5cb9', //GPT
  '0x2c347d1c20caebf45908b5f55841b25fd0c943d3', //GPT
  '0x04845e2af405063a6f3590efea87d418ad92ccc4', //ACID
  '0x29c170dfe9994a113fac69bb77708d90bd3d867e', //ACID
  '0xe41ce5d4aa167de4d59f54a5bb984139207c274d', //GPT
  '0xc09d04c474e78b130a8cb636a5132760bece5edf', //CPT
  '0xdc0b4039a0b358eec18dd6be01f690556098582b', //ARBPAD
  '0xb370f370780def161125afdd944e2d26e04e0178', //MZR
  '0xe167cb54d03ab5692e8d917b07f72bb1b177f652', //SPOOL
  '0x312ca799e46b58768aa64d209ae84b7ab5fcbfa1', //MZR Token
  '0x47480a09b270c559e78d30d63b31e694e091614a', //ARBK
  '0x29c170dfe9994a113fac69bb77708d90bd3d867e', //ACID,
  '0xcCbb8003C66BAa30406f08C52E4beE8ab102f65B', // RAM SCAM,
  '0xcdde1105161f32636982e875a608878e3c3c2059', // DZOO,
  '0x19b3a789f07b53F50c59A602B93c32bb5628D4C4', // DAO
  '0x703051e52b999920af1558541efecf2ba0afc690', // RAM SCAM
  '0x3c04d54fb2fded5a046be86dd546befe24abd75d', // RAM SCAM
  '0x28703c9d4bd6d9e1202c7c228b240310b44832b0', // RAM SCAM
  '0xcaf35894504aebd2ea1014a4f73b2c45d3ee12bb', // RAM SCAM
  '0x4e1f0ff2679a16f8c2fcdec5b018b74b71b680c7', // RAM SCAM
  '0xac385feff7633b644aa1e10781d041456e74c876', // RAM SCAM
  '0x45462873fc22842acecf4e165302fefe1d38bdc1', // RAM SCAM
  '0xDC29348A45b9cbEa574ce680bAEE4bf58Dd5B5fD', // RAM SCAM
  '0x02e93ecc531fa25ffcd9b96734813b25f80376f1', // ETHFAI
  '0x82F9C30A8295fD34437C204D388b659FE61cAf90', // ORO
  '0xf842a419bad027e962918ab795964f169f4c1692', // COCO
  '0x52d8ca895d215843886324899d8855a95e60456c', // ARB SCAM
  '0xde204d12c04188c5b069887fc4aed5a61df51496', // MEEET
];

const TopPoolCount = 50;

(async function () {
  const allPools: Array<UniLiquidityPool> = [];

  const configs: Array<ProtocolConfig> = [
    Uniswapv2Configs,
    Uniswapv3Configs,
    SushiConfigs,
    Sushiv3Configs,
    PancakeswapConfigs,
    PancakeswapV3Configs,
    KyberswapClassicConfigs,
    CamelotConfigs,
    Camelotv3Configs,
  ];

  for (const config of configs) {
    if (config.subgraphs) {
      for (const subgraph of config.subgraphs) {
        console.log(
          `getting top liquidity pools, ${config.protocol} ${subgraph.version} ${subgraph.chain} ${subgraph.endpoint}`
        );

        if (subgraph.version === 'univ2') {
          const response = await axios.post(subgraph.endpoint, {
            query: `
							{
								pairs(first: ${TopPoolCount}, orderBy: trackedReserveETH, orderDirection:desc) {
									id
									token0 {
										id
										symbol
										decimals
									}
									token1 {
										id
										symbol
										decimals
									}
								}
							}
						`,
          });
          for (const pair of response.data.data.pairs) {
            allPools.push({
              chain: subgraph.chain,
              protocol: subgraph.protocol,
              version: 'univ2',
              address: normalizeAddress(pair.id),
              token0: {
                chain: subgraph.chain,
                address: normalizeAddress(pair.token0.id),
                symbol: pair.token0.symbol,
                decimals: Number(pair.token0.decimals),
              },
              token1: {
                chain: subgraph.chain,
                address: normalizeAddress(pair.token1.id),
                symbol: pair.token1.symbol,
                decimals: Number(pair.token1.decimals),
              },
            });
          }
        } else if (subgraph.version === 'univ3') {
          const response = await axios.post(subgraph.endpoint, {
            query: `
							{
								pools(first: ${TopPoolCount}, where: {id_not_in: ${JSON.stringify(
              HidePools
            )}} orderBy: totalValueLockedUSD, orderDirection: desc) {
									id
									token0 {
										id
										symbol
										decimals
									}
									token1 {
										id
										symbol
										decimals
									}
								}
							}
						`,
          });
          for (const pool of response.data.data.pools) {
            allPools.push({
              chain: subgraph.chain,
              protocol: subgraph.protocol,
              version: 'univ3',
              address: normalizeAddress(pool.id),
              token0: {
                chain: subgraph.chain,
                address: normalizeAddress(pool.token0.id),
                symbol: pool.token0.symbol,
                decimals: Number(pool.token0.decimals),
              },
              token1: {
                chain: subgraph.chain,
                address: normalizeAddress(pool.token1.id),
                symbol: pool.token1.symbol,
                decimals: Number(pool.token1.decimals),
              },
            });
          }
        }
      }
    }
  }

  const savePools: Array<UniLiquidityPool> = JSON.parse(
    fs.readFileSync('./configs/data/UniLiquidityPools.json').toString()
  );

  const exitedPools: { [key: string]: boolean } = {};
  if (fs.existsSync('./configs/data/UniLiquidityPools.json')) {
    for (const savedPool of savePools) {
      exitedPools[savedPool.address] = true;
    }
  }

  for (const pool of allPools) {
    if (!exitedPools[pool.address]) {
      // transform kyberswap-classic pools
      if (pool.protocol === 'kyberswap-classic') {
        pool.address = await KyberHelper.getKyberswapClassicPool('ethereum', pool.token0.address, pool.token1.address);
      }

      if (!compareAddress(pool.address, AddressZero)) {
        savePools.push(pool);
      } else {
        console.log(`Ignore protocol${pool.protocol} token:${pool.token0.symbol}-${pool.token1.symbol}`);
      }
    }
  }

  fs.writeFileSync('./configs/data/UniLiquidityPools.json', JSON.stringify(savePools));
})();
