import { SushiConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Uniswapv2Adapter } from '../../../modules/adapters/uniswap/uniswapv2';
import { TestLog } from '../../types';

export const SushiActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x46aa86275864203e4e5a6fafe964ca05daf55739533217b22954c79aed14d3a2',
    sender: normalizeAddress('0xfaee3e1f69c5affdbf8b9cd1c1096dc966ac4ca2'),
    address: normalizeAddress('0x397ff1542f962076d0bfe58ea045ffa2d347aca0'),
    log: {
      address: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
      topics: [
        '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
        '0x000000000000000000000000d9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
        '0x000000000000000000000000db06a76733528761eda47d356647297bc35a98bd',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000c66c8240000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001cffad8ee745d43c',
      blockNumber: '0xfdd1e9',
      transactionHash: '0x46aa86275864203e4e5a6fafe964ca05daf55739533217b22954c79aed14d3a2',
      transactionIndex: '0x63',
      blockHash: '0xc8cfe4a5dad3551cb9df2bbcc83a9a147ac008dab8591bcca916bfb5572cade9',
      logIndex: '0xd3',
      removed: false,
    },
    adapter: new Uniswapv2Adapter(SushiConfigs, null),
    action: 'swap',
  },
  {
    chain: 'ethereum',
    hash: '0xeeb74ec5d18ef103bc9af4d6c40affdf52bff94e441c1e80faf1ada6b3efa15e',
    sender: normalizeAddress('0x937b742a057eee2e5fe3cad18026149a08b9f7a3'),
    address: normalizeAddress('0x397ff1542f962076d0bfe58ea045ffa2d347aca0'),
    log: {
      address: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
      topics: [
        '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
        '0x000000000000000000000000d9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000024b12a70933b6',
      blockNumber: '0xfdce71',
      transactionHash: '0xeeb74ec5d18ef103bc9af4d6c40affdf52bff94e441c1e80faf1ada6b3efa15e',
      transactionIndex: '0x62',
      blockHash: '0x11423abfe8b51f504da319b4cf51eb1b9b4613f1450509c9d9c7f24e3959e0fc',
      logIndex: '0xcd',
      removed: false,
    },
    adapter: new Uniswapv2Adapter(SushiConfigs, null),
    action: 'addLiquidity',
  },
  {
    chain: 'ethereum',
    hash: '0x73a55fbab3fca4fb93afad8924c08ab5d69230d6d06f353a107fb784570a4a4c',
    sender: normalizeAddress('0x9fe1e2f4e3a068d243f042ccfab3f08832ee5398'),
    address: normalizeAddress('0x397ff1542f962076d0bfe58ea045ffa2d347aca0'),
    log: {
      address: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
      topics: [
        '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496',
        '0x000000000000000000000000d9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
        '0x000000000000000000000000d9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
      ],
      data: '0x000000000000000000000000000000000000000000000000000000032f1b31940000000000000000000000000000000000000000000000007a52792176b83024',
      blockNumber: '0xfdceb5',
      transactionHash: '0x73a55fbab3fca4fb93afad8924c08ab5d69230d6d06f353a107fb784570a4a4c',
      transactionIndex: '0x44',
      blockHash: '0xa2028987d66df3031254150c9b2e02f37b019f23491baac5e57b51964061728f',
      logIndex: '0x8b',
      removed: false,
    },
    adapter: new Uniswapv2Adapter(SushiConfigs, null),
    action: 'removeLiquidity',
  },
];
