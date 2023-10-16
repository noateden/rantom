import { normalizeAddress } from '../lib/helper';
import { ProtocolConfig } from '../types/configs';
import { Tokens } from './constants';
import AbracadabraCauldrons from './data/AbracadabraCauldrons.json';
import AgilityPools from './data/AgilityStakingPools.json';
import ArrakisVaults from './data/ArrakisVaults.json';
import AuraFinanceBoosterPoolsData from './data/AuraFinanceBoosterPools.json';
import BeefyVaults from './data/BeefyVaults.json';
import CompoundMarkets from './data/CompoundMarkets.json';
import CompoundMarketsV3 from './data/CompoundMarketsV3.json';
import ConvexBoosterPoolsData from './data/ConvexBoosterPools.json';
import CurvePools from './data/CurvePools.json';
import ExactlyMarkets from './data/ExactlyMarkets.json';
import FluxfinanceMarkets from './data/FluxfinanceMarkets.json';
import FraxlendPairs from './data/FraxlendPairs.json';
import GainsPairIndex from './data/GainsPairIndex.json';
import Gmxv2Markets from './data/Gmxv2Markets.json';
import IronbankMarkets from './data/IronbankMarkets.json';
import MaverickPools from './data/MaverickPools.json';
import MorphoMarkets from './data/MorphoMarkets.json';
import MuxAssets from './data/MuxAssets.json';
import PendleContracts from './data/PendleContracts.json';
import SiloPools from './data/SiloPools.json';
import SonnefinanceMarkets from './data/SonnefinanceMarkets.json';
import SushiPools from './data/SushiPools.json';
import TraderjoeLbPairs from './data/TraderjoeLbPairs.json';
import UniFactoryPools from './data/UniFactoryPools.json';
import UniLiquidityPools from './data/UniLiquidityPools.json';
import YearnVaults from './data/YearnVaults.json';
import { Signatures } from './signatures';

export const Uniswapv2Configs: ProtocolConfig = {
  protocol: 'uniswapv2',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f', // v2 Factory

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'uniswapv2').map((item) => item.address),
    ],
  },
  subgraphs: [
    {
      protocol: 'uniswapv2',
      chain: 'ethereum',
      version: 'univ2',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v2-dev',
    },
  ],
  staticData: {
    liquidityPools: UniLiquidityPools.filter((item) => item.protocol === 'uniswapv2'),
  },
};

export const Uniswapv3Configs: ProtocolConfig = {
  protocol: 'uniswapv3',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0x1f98431c8ad98523631ae4a59f267346ea31f984', // v3 Factory

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'uniswapv3' && item.chain === 'ethereum').map(
        (item) => item.address
      ),
    ],
    arbitrum: [
      '0x1f98431c8ad98523631ae4a59f267346ea31f984', // v3 factory

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'uniswapv3' && item.chain === 'arbitrum').map(
        (item) => item.address
      ),
    ],
    base: [
      '0x33128a8fc17869897dce68ed026d694621f6fdfd', // v3 factory

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'uniswapv3' && item.chain === 'base').map(
        (item) => item.address
      ),
    ],
    optimism: [
      '0x1f98431c8ad98523631ae4a59f267346ea31f984', // v3 factory

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'uniswapv3' && item.chain === 'optimism').map(
        (item) => item.address
      ),
    ],
    polygon: [
      '0x1f98431c8ad98523631ae4a59f267346ea31f984', // v3 factory

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'uniswapv3' && item.chain === 'polygon').map(
        (item) => item.address
      ),
    ],
  },
  subgraphs: [
    {
      protocol: 'uniswapv3',
      chain: 'ethereum',
      version: 'univ3',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    },
    {
      protocol: 'uniswapv3',
      chain: 'arbitrum',
      version: 'univ3',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-arbitrum-one',
    },
    {
      protocol: 'uniswapv3',
      chain: 'base',
      version: 'univ3',
      birthday: 1689552000, // Mon Jul 17 2023 00:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/lynnshaoyu/uniswap-v3-base',
    },
    {
      protocol: 'uniswapv3',
      chain: 'optimism',
      version: 'univ3',
      birthday: 1689552000, // Mon Jul 17 2023 00:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/ianlapham/optimism-post-regenesis',
    },
    {
      protocol: 'uniswapv3',
      chain: 'polygon',
      version: 'univ3',
      birthday: 1689552000, // Mon Jul 17 2023 00:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon',
    },
  ],
  staticData: {
    liquidityPools: UniLiquidityPools.filter((item) => item.protocol === 'uniswapv3'),
  },
};

export const LidoConfigs: ProtocolConfig = {
  protocol: 'lido',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', // stETH
      '0x9ee91f9f426fa633d227f7a9b000e28b9dfd8599', // stMATIC
      '0x889edc2edab5f40e902b864ad4d7ade8e412f9b1', // stETH withdrawal queue
    ],
  },
  staticData: {
    depositSecurityModule2: '0x710b3303fb508a84f10793c1106e32be873c24cd',
  },
};

export const SushiConfigs: ProtocolConfig = {
  protocol: 'sushi',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac', // uni v2 Factory
      '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd', // masterchef
      '0xef0881ec094552b2e128cf945ef17a6752b4ec5d', // masterchef v2
      '0x8798249c2e607446efb7ad49ec89dd1865ff4272', // xSUSHI
      '0xf5bce5077908a1b7370b9ae04adc565ebd643966', // Bentobox

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'sushi' && item.chain === 'ethereum').map(
        (item) => item.address
      ),
    ],
    arbitrum: [
      '0xc35dadb65012ec5796536bd9864ed8773abc74c4', // factory v2
      '0xf4d73326c13a4fc5fd7a064217e12780e9bd62c3', // minichef

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'sushi' && item.chain === 'arbitrum').map(
        (item) => item.address
      ),
    ],
  },
  staticData: {
    // masterchef pools
    pools: SushiPools,

    // dex pools
    liquidityPools: UniLiquidityPools.filter((item) => item.protocol === 'sushi'),
  },
  subgraphs: [
    {
      protocol: 'sushi',
      chain: 'ethereum',
      version: 'univ2',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
    },
    {
      protocol: 'sushi',
      chain: 'arbitrum',
      version: 'univ2',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/sushiswap/arbitrum-exchange',
    },
  ],
  customEventMapping: {
    [Signatures['Deposit(address,uint256,uint256,address)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'pid',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
      ],
    },
    [Signatures['Withdraw(address,uint256,uint256,address)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'pid',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
      ],
    },
    [Signatures['EmergencyWithdraw(address,uint256,uint256,address)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'pid',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
      ],
    },
  },
};

export const Sushiv3Configs: ProtocolConfig = {
  protocol: 'sushiv3',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0xbaceb8ec6b9355dfc0269c18bac9d6e2bdc29c4f', // sushi v3 Factory

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'sushiv3' && item.chain === 'ethereum').map(
        (item) => item.address
      ),
    ],
    arbitrum: [
      '0x1af415a1eba07a4986a52b6f2e7de7003d82231e', // factory v3

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'sushiv3' && item.chain === 'arbitrum').map(
        (item) => item.address
      ),
    ],
    base: [
      '0xc35dadb65012ec5796536bd9864ed8773abc74c4', // v3 factory

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'sushiv3' && item.chain === 'base').map(
        (item) => item.address
      ),
    ],
  },
  staticData: {
    // dex pools
    liquidityPools: UniLiquidityPools.filter((item) => item.protocol === 'sushiv3'),
  },
  subgraphs: [
    {
      protocol: 'sushiv3',
      chain: 'ethereum',
      version: 'univ3',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/sushi-v3/v3-ethereum',
    },
    {
      protocol: 'sushiv3',
      chain: 'arbitrum',
      version: 'univ3',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/sushi-v3/v3-arbitrum',
    },
    {
      protocol: 'sushiv3',
      chain: 'base',
      version: 'univ3',
      birthday: 1691020800, // Thu Aug 03 2023 00:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.studio.thegraph.com/query/32073/v3-base/v0.0.1',
    },
  ],
};

export const PancakeswapConfigs: ProtocolConfig = {
  protocol: 'pancakeswap',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0x1097053fd2ea711dad45caccc45eff7548fcb362', // uni v2 Factory

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'pancakeswap' && item.chain === 'ethereum').map(
        (item) => item.address
      ),
    ],
    arbitrum: [
      '0x02a84c1b3bbd7401a5f7fa98a384ebc70bb5749e', // uni v2 factory
    ],
    base: [
      '0x02a84c1b3bbd7401a5f7fa98a384ebc70bb5749e', // uni v2 factory
    ],
  },
  subgraphs: [
    {
      protocol: 'pancakeswap',
      chain: 'ethereum',
      version: 'univ2',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {
        transactionBlockNumber: 'block',
      },
      endpoint: 'https://api.thegraph.com/subgraphs/name/pancakeswap/exhange-eth',
    },
    {
      protocol: 'pancakeswap',
      chain: 'arbitrum',
      version: 'univ2',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {
        transactionBlockNumber: 'block',
      },
      endpoint: 'https://api.studio.thegraph.com/query/45376/exchange-v2-arbitrum/version/latest',
    },
    {
      protocol: 'pancakeswap',
      chain: 'base',
      version: 'univ2',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {
        transactionBlockNumber: 'block',
      },
      endpoint: 'https://api.studio.thegraph.com/query/45376/exchange-v2-base/version/latest',
    },
  ],
  staticData: {
    liquidityPools: UniLiquidityPools.filter((item) => item.protocol === 'pancakeswap'),
  },
};

export const PancakeswapV3Configs: ProtocolConfig = {
  protocol: 'pancakeswapv3',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0x0bfbcf9fa4f9c56b0f40a671ad40e0805a091865', // pancakeswap v3 Factory

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'pancakeswapv3' && item.chain === 'ethereum').map(
        (item) => item.address
      ),
    ],
    arbitrum: [
      '0x0bfbcf9fa4f9c56b0f40a671ad40e0805a091865', // pancakeswap v3 fatory
    ],
    base: [
      '0x0bfbcf9fa4f9c56b0f40a671ad40e0805a091865', // pancakeswap v3 fatory
    ],
  },
  subgraphs: [
    {
      protocol: 'pancakeswapv3',
      chain: 'ethereum',
      version: 'univ3',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-eth',
    },
    {
      protocol: 'pancakeswapv3',
      chain: 'arbitrum',
      version: 'univ3',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.studio.thegraph.com/query/45376/exchange-v3-arbitrum/version/latest',
    },
    {
      protocol: 'pancakeswapv3',
      chain: 'base',
      version: 'univ3',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.studio.thegraph.com/query/45376/exchange-v3-base/version/latest',
    },
  ],
  staticData: {
    liquidityPools: UniLiquidityPools.filter((item) => item.protocol === 'pancakeswapv3'),
  },
};

export const BalancerConfigs: ProtocolConfig = {
  protocol: 'balancer',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0xba12222222228d8ba445958a75a0704d566bf2c8', // vault
      '0xc128a9954e6c874ea3d62ce62b468ba073093f25', // veBAL
    ],
    arbitrum: [
      '0xba12222222228d8ba445958a75a0704d566bf2c8', // vault
    ],
    base: [
      '0xba12222222228d8ba445958a75a0704d566bf2c8', // vault
    ],
  },
  customEventMapping: {
    [Signatures['Withdraw(address,uint256,uint256)']]: {
      abi: [
        {
          type: 'address',
          name: 'provider',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'value',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'ts',
          indexed: false,
        },
      ],
    },
  },
};

export const Aavev1Configs: ProtocolConfig = {
  protocol: 'aavev1',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x398ec7346dcd622edc5ae82352f02be94c62d119', // lending pool v1
    ],
  },
};

export const Aavev2Configs: ProtocolConfig = {
  protocol: 'aavev2',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9', // lending pool v2
    ],
  },
};

export const Aavev3Configs: ProtocolConfig = {
  protocol: 'aavev3',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2', // lending pool v3
    ],
    arbitrum: [
      '0x794a61358d6845594f94dc1db02a252b5b4814ad', // lending pool v3
    ],
    base: [
      '0xa238dd80c259a72e81d7e4664a9801593f98d1c5', // lending pool v3
    ],
  },
};

export const ShibaswapConfigs: ProtocolConfig = {
  protocol: 'shibaswap',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0x115934131916c8b277dd010ee02de363c09d037c', // uni v2 Factory
    ],
  },
};

export const FraxswapConfigs: ProtocolConfig = {
  protocol: 'fraxswap',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0x43ec799eadd63848443e2347c49f5f52e8fe0f6f', // uni v2 Factory
    ],
  },
};

export const CompoundConfigs: ProtocolConfig = {
  protocol: 'compound',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c', // cAAVE
      '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e', // cBAT
      '0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4', // cCOMP
      '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643', // cDAI
      '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5', // cETH
      '0x7713dd9ca933848f6819f38b8352d9a15ea73f67', // cFEI
      '0xface851a4921ce59e912d19329929ce6da6eb0c7', // cLINK
      '0x95b4ef2869ebd94beb4eee400a99824bf5dc325b', // cMKR
      '0x158079ee67fce2f58472a96584a73c7ab9ac95c1', // cREP
      '0xf5dce57282a584d2746faf1593d3121fcac444dc', // cSAI
      '0x4b0181102a0112a2ef11abee5563bb4a3176c9d7', // cSUSHI
      '0x12392f67bdf24fae0af363c24ac620a2f67dad86', // cTUSD
      '0x35a18000230da775cac24873d00ff85bccded550', // cUNI
      '0x39aa39c021dfbae8fac545936693ac917d5e7563', // cUSDC
      '0x041171993284df560249b57358f931d9eb7b925d', // cUSDP
      '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9', // cUSDT
      '0xc11b1268c1a384e55c48c2391d8d480264a3a7f4', // cWBTC
      '0xccf4429db6322d5c611ee964527d42e5d685dd6a', // cWBTC2
      '0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946', // cYFI
      '0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407', // cZRX
      '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b', // Comptroller
    ],
  },
  customEventMapping: {
    [Signatures['Mint(address,uint256,uint256)']]: {
      abi: [
        {
          indexed: false,
          internalType: 'address',
          name: 'minter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintTokens',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    pools: CompoundMarkets,
  },
};

export const Compoundv3Configs: ProtocolConfig = {
  protocol: 'compoundv3',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0xc3d688b66703497daa19211eedff47f25384cdc3', // v3 USDC
      '0xa17581a9e3356d9a858b789d68b4d866e593ae94', // v3 ETH
      '0x1b0e765f6224c21223aea2af16c1c46e38885a40', // Comet rewards
    ],
    arbitrum: [
      '0xa5edbdd9646f8dff606d7448e414884c7d905dca', // v3 USDC
    ],
    base: [
      '0x9c4ec768c28520b50860ea7a15bd7213a9ff58bf', // v3 USDCbC
      '0x46e6b214b524310239732d51387075e0e70970bf', // v3 WETH
    ],
  },
  staticData: {
    pools: CompoundMarketsV3,
  },
};

export const IronbankConfigs: ProtocolConfig = {
  protocol: 'ironbank',
  categories: ['lending'],
  contracts: {
    ethereum: [
      normalizeAddress('0x41c84c0e2EE0b740Cf0d31F63f3B6F627DC6b393'), // iETH
      normalizeAddress('0x8e595470ed749b85c6f7669de83eae304c2ec68f'), // iDAI
      normalizeAddress('0xe7bff2da8a2f619c2586fb83938fa56ce803aa16'), // iLINK
      normalizeAddress('0xfa3472f7319477c9bfecdd66e4b948569e7621b9'), // iYFI
      normalizeAddress('0x12a9cc33a980daa74e00cc2d1a0e74c57a93d12c'), // iSNX
      normalizeAddress('0x8fc8bfd80d6a9f17fb98a373023d72531792b431'), // iWBTC
      normalizeAddress('0x48759f220ed983db51fa7a8c0d2aab8f3ce4166a'), // iUSDT
      normalizeAddress('0x76eb2fe28b36b3ee97f3adae0c69606eedb2a37c'), // iUSDC
      normalizeAddress('0xa7c4054afd3dbbbf5bfe80f41862b89ea05c9806'), // isUSD
      normalizeAddress('0xa8caea564811af0e92b1e044f3edd18fa9a73e4f'), // iEURS
      normalizeAddress('0xca55f9c4e77f7b8524178583b0f7c798de17fd54'), // isEUR
      normalizeAddress('0x7736ffb07104c0c400bb0cc9a7c228452a732992'), // iDPI
      normalizeAddress('0xFEEB92386A055E2eF7C2B598c872a4047a7dB59F'), // iUNI
      normalizeAddress('0x226F3738238932BA0dB2319a8117D9555446102f'), // iSUSHI
      normalizeAddress('0xB8c5af54bbDCc61453144CF472A9276aE36109F9'), // iCRV
      normalizeAddress('0x30190a3B52b5AB1daF70D46D72536F5171f22340'), // iAAVE
      normalizeAddress('0x9e8E207083ffd5BDc3D99A1F32D1e6250869C1A9'), // iMIM
      normalizeAddress('0xE0B57FEEd45e7D908f2d0DaCd26F113Cf26715BF'), // iCVX

      normalizeAddress('0xAB1c342C7bf5Ec5F02ADEA1c2270670bCa144CbB'), // Comptroller
    ],
  },
  customEventMapping: {
    [Signatures['Mint(address,uint256,uint256)']]: {
      abi: [
        {
          indexed: false,
          internalType: 'address',
          name: 'minter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintTokens',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    pools: IronbankMarkets,
  },
};

export const RocketpoolConfigs: ProtocolConfig = {
  protocol: 'rocketpool',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0xae78736cd615f374d3085123a210448e74fc6393', // rETH
    ],
  },
};

export const CurveConfigs: ProtocolConfig = {
  protocol: 'curve',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0xecb456ea5365865ebab8a2661b0c503410e9b347', // Curve.fi pool owner
      '0xbabe61887f1de2713c6f97e567623453d3c79f67', // Curve.fi deployer 2
      '0xf18056bbd320e96a48e3fbf8bc061322531aac99', // Curve.fi factory
      '0x5f3b5dfeb7b28cdbd7faba78963ee202a494e2a2', // Curve.fi veCRV
      ...CurvePools.map((item) => item.address),
    ],
  },
  customEventMapping: {
    [Signatures['Withdraw(address,uint256,uint256)']]: {
      abi: [
        {
          type: 'address',
          name: 'provider',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'value',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'ts',
          indexed: false,
        },
      ],
    },
  },
  staticData: {
    pools: CurvePools,
    lpTokenMaps: {
      // DAI- USDC - USDT
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490': CurvePools.filter(
        (item) => item.address === normalizeAddress('0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7')
      )[0],

      // FRAX- USDC
      '0x3175df0976dfa876431c2e9ee6bc45b65d3473cc': CurvePools.filter(
        (item) => item.address === normalizeAddress('0xb30da2376f63de30b42dc055c93fa474f31330a5')
      )[0],

      // Aave A tokens
      '0x028171bca77440897b824ca71d1c56cac55b68a3': Tokens.ethereum.DAI,
      '0xbcca60bb61934080951369a648fb03df4f96263c': Tokens.ethereum.USDC,
      '0x3ed3b47dd13ec9a98b44e6204a523e766b225811': Tokens.ethereum.USDT,

      // arbitrum USDC - USDT
      '0x7f90122bf0700f9e7e1f688fe926940e8839f353': CurvePools.filter(
        (item) => item.address === normalizeAddress('0x7f90122bf0700f9e7e1f688fe926940e8839f353')
      )[0],
    },
  },
};

export const CowswapConfigs: ProtocolConfig = {
  protocol: 'cowswap',
  categories: ['dexAggregator'],
  contracts: {
    ethereum: [
      '0x9008d19f58aabd9ed0d60971565aa8510560ab41', // GPv2Settlement
    ],
  },
};

export const LoopringConfigs: ProtocolConfig = {
  protocol: 'loopring',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4', // Exchange v2
    ],
  },
};

export const BancorConfigs: ProtocolConfig = {
  protocol: 'bancor',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0xeef417e1d5cc832e619ae18d2f140de2999dd4fb', // BancorNetwork v3
      '0xd982e001491d414c857f2a1aaa4b43ccf9f642b4', // BancorNetwork v3 Pool
      '0x02651e355d26f3506c1e644ba393fdd9ac95eaca', // BNT Pool
    ],
  },
  staticData: {
    v1Registry: '0x52ae12abe5d8bd778bd5397f99ca900624cfadd4',
  },
};

export const AurafinanceConfigs: ProtocolConfig = {
  protocol: 'aurafinance',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0xa57b8d98dae62b26ec3bcc4a365338157060b234', // Booster
      '0x00a7ba8ae7bca0b10a32ea1f8e2a1da980c6cad2', // auraBAL staking
      '0x5e5ea2048475854a5702f5b8468a51ba1296efcc', // auraBAL staking 2
      '0x3fa73f1e5d8a792c80f426fc8f84fbf7ce9bbcac', // aura locker
    ],
    arbitrum: [
      '0x98ef32edd24e2c92525e59afc4475c1242a30184', // Booster lite
    ],
  },
  staticData: {
    rewardToken: {
      ethereum: Tokens.ethereum.AURA,
    },
    pools: AuraFinanceBoosterPoolsData,
  },
};

export const EnsConfigs: ProtocolConfig = {
  protocol: 'ens',
  categories: ['service'],
  contracts: {
    ethereum: [
      '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', // registration controller
      '0x253553366da8546fc250f225fe3d25d0c782303b', // registration controller
    ],
  },
};

export const OptimismConfigs: ProtocolConfig = {
  protocol: 'optimism',
  categories: ['service'],
  contracts: {
    ethereum: [
      '0x5e4e65926ba27467555eb562121fac00d24e9dd2', // CanonicalTransactionChain
    ],
  },
};

export const HopConfigs: ProtocolConfig = {
  protocol: 'hop',
  categories: ['bridge'],
  contracts: {
    ethereum: [
      '0x3666f603cc164936c1b87e207f36beba4ac5f18a', // USDC
      '0x3e4a3a4796d16c0cd582c382691998f7c06420b6', // USDT
      '0x22b1cbb8d98a01a3b71d034bb899775a76eb1cc2', // MATIC
      '0x3d4cc8a61c7528fd86c55cfe061a78dcba48edd1', // DAI
      '0xb8901acb165ed027e32754e0ffe830802919727f', // ETH
      '0x914f986a44acb623a277d6bd17368171fcbe4273', // HOP
      '0x893246facf345c99e4235e5a7bbee7404c988b96', // SNX
    ],
  },
};

export const MultichainConfigs: ProtocolConfig = {
  protocol: 'multichain',
  categories: ['bridge'],
  contracts: {
    ethereum: [
      '0xe95fd76cf16008c12ff3b3a937cb16cd9cc20284', // Router v3
      '0x6b7a87899490ece95443e979ca9485cbe7e71522', // Router v4
      '0x765277eebeca2e31912c9946eae1021199b39c61', // Router v4 2
      '0xba8da9dcf11b50b03fd5284f164ef5cdef910705', // Router v6
    ],
  },
};

export const BeanstalkConfigs: ProtocolConfig = {
  protocol: 'beanstalk',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0xc1e088fc1323b20bcbee9bd1b9fc9546db5624c5', // Beanstalk Protocol
    ],
  },
};

export const BlurConfigs: ProtocolConfig = {
  protocol: 'blur',
  categories: ['marketplace'],
  contracts: {
    ethereum: [
      '0x000000000000ad05ccc4f10045630fb830b95127', // Blur Marketplace
    ],
  },
};

export const LooksrareConfigs: ProtocolConfig = {
  protocol: 'looksrare',
  categories: ['marketplace', 'staking'],
  contracts: {
    ethereum: [
      '0x59728544b08ab483533076417fbbb2fd0b17ce3a', // Looksrare Exchange
      '0xbcd7254a1d759efa08ec7c3291b2e85c5dcc12ce', // LOOK Staking
      '0x0000000000e655fae4d56241588680f86e3b2377', // Looksrare Exchange v2
    ],
  },
  customEventMapping: {
    [Signatures['Deposit(address,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'harvestedAmount',
          type: 'uint256',
        },
      ],
    },
    [Signatures['Withdraw(address,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'harvestedAmount',
          type: 'uint256',
        },
      ],
    },
  },
};

export const OpenseaConfigs: ProtocolConfig = {
  protocol: 'opensea',
  categories: ['marketplace'],
  contracts: {
    ethereum: [
      '0x00000000006c3852cbef3e08e8df289169ede581', // Seaport 1.1
      '0x00000000000006c7676171937c444f6bde3d6282', // Seaport 1.2
      '0x0000000000000ad24e80fd803c6ac37206a45f15', // Seaport 1.3
      '0x00000000000001ad428e4906ae43d8f9852d0dd6', // Seaport 1.4
      '0x00000000000000adc04c56bf30ac9d3c0aaf14dc', // Seaport 1.5
    ],
  },
};

export const X2y2Configs: ProtocolConfig = {
  protocol: 'x2y2',
  categories: ['marketplace'],
  contracts: {
    ethereum: [
      '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3', // X2y2 Exchange
    ],
  },
};

export const Eth2Configs: ProtocolConfig = {
  protocol: 'eth2',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0x00000000219ab540356cbb839cbe05303d7705fa', // Beacon Deposit Contract
    ],
  },
};

export const ChainlinkConfigs: ProtocolConfig = {
  protocol: 'chainlink',
  categories: ['service'],
  contracts: {
    ethereum: [],
  },
};

export const ZeroxConfigs: ProtocolConfig = {
  protocol: 'zerox',
  categories: ['dexAggregator'],
  contracts: {
    ethereum: [
      '0xdef1c0ded9bec7f1a1670819833240f027b25eff', // Proxy Exchange
    ],
    arbitrum: [
      '0xdef1c0ded9bec7f1a1670819833240f027b25eff', // Proxy Exchange
    ],
  },
};

export const ParaswapConfigs: ProtocolConfig = {
  protocol: 'paraswap',
  categories: ['dexAggregator'],
  contracts: {
    ethereum: [
      '0xdef171fe48cf0115b1d80b88dc8eab59176fee57', // Paraswap Augustus Swapper v5
    ],
    arbitrum: [
      '0xdef171fe48cf0115b1d80b88dc8eab59176fee57', // Paraswap Augustus Swapper
    ],
  },
};

export const YearnConfigs: ProtocolConfig = {
  protocol: 'yearn',
  categories: ['staking'],
  contracts: {
    ethereum: [
      // We detect yearn vault by checking vault governance address is match with
      // Yearn Treasury or not?
      '0xfeb4acf3df3cdea7399794d0869ef76a6efaff52',
      '0x90c1f9220d90d3966fbee24045edd73e1d588ad5', // veYFI
    ],
  },
  customEventMapping: {
    [Signatures['Withdraw(address,uint256,uint256)']]: {
      abi: [
        {
          name: 'user',
          type: 'address',
          indexed: true,
        },
        {
          name: 'amount',
          type: 'uint256',
          indexed: false,
        },
        {
          name: 'ts',
          type: 'uint256',
          indexed: false,
        },
      ],
    },
  },
  staticData: {
    vaults: YearnVaults,
  },
};

export const YearnyethConfigs: ProtocolConfig = {
  protocol: 'yearnyeth',
  categories: ['staking', 'trading'],
  contracts: {
    ethereum: [
      '0x2cced4ffa804adbe1269cdfc22d7904471abde63', // Liquidity Pool
      '0x583019ff0f430721ada9cfb4fac8f06ca104d0b4', // yETH Staking
    ],
  },
  staticData: {
    assets: {
      ethereum: [
        Tokens.ethereum.sfrxETH,
        Tokens.ethereum.swETH,
        Tokens.ethereum.wstETH,
        Tokens.ethereum.ETHx,
        Tokens.ethereum.cbETH,
      ],
    },
  },
};

export const TornadocashConfigs: ProtocolConfig = {
  protocol: 'tornadocash',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc', // ETH 0.1
      '0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936', // ETH 1
      '0x910cbd523d972eb0a6f4cae4618ad62622b39dbf', // ETH 10
      '0xa160cdab225685da1d56aa342ad8841c3b53f291', // ETH 100
      '0xfd8610d20aa15b7b2e3be39b396a1bc3516c7144', // DAI 1,000
      '0x07687e702b410fa43f4cb4af7fa097918ffd2730', // DAI 10,000
      '0x23773e65ed146a459791799d01336db287f25334', // DAI 100,000
      '0xbb93e510bbcd0b7beb5a853875f9ec60275cf498', // WBTC 10
    ],
  },
  staticData: {
    pools: {
      '0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc': {
        token: Tokens.ethereum.NativeCoin,
        amount: '0.1',
      },
      '0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936': {
        token: Tokens.ethereum.NativeCoin,
        amount: '1',
      },
      '0x910cbd523d972eb0a6f4cae4618ad62622b39dbf': {
        token: Tokens.ethereum.NativeCoin,
        amount: '10',
      },
      '0xa160cdab225685da1d56aa342ad8841c3b53f291': {
        token: Tokens.ethereum.NativeCoin,
        amount: '100',
      },
      '0xfd8610d20aa15b7b2e3be39b396a1bc3516c7144': {
        token: Tokens.ethereum.DAI,
        amount: '1000',
      },
      '0x07687e702b410fa43f4cb4af7fa097918ffd2730': {
        token: Tokens.ethereum.DAI,
        amount: '10000',
      },
      '0x23773e65ed146a459791799d01336db287f25334': {
        token: Tokens.ethereum.DAI,
        amount: '100000',
      },
      '0xbb93e510bbcd0b7beb5a853875f9ec60275cf498': {
        token: Tokens.ethereum.WBTC,
        amount: '10',
      },
    },
  },
};

export const ConvexConfigs: ProtocolConfig = {
  protocol: 'convex',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0xf403c135812408bfbe8713b5a23a04b3d48aae31', // Booster
      '0xcf50b810e57ac33b91dcf525c6ddd9881b139332', // Stake CVX earn CRV
      '0x3fe65692bfcd0e6cf84cb1e7d24108e434a7587e', // Stake cvxCRV earn CRV
      '0xd18140b4b819b895a3dba5442f959fa44994af50', // CVX locker old
      '0x72a19342e8f1838460ebfccef09f6585e32db86e', // CVX locker v2
    ],
    arbitrum: [
      '0xf403c135812408bfbe8713b5a23a04b3d48aae31', // Booster
    ],
  },
  staticData: {
    rewardToken: {
      ethereum: Tokens.ethereum.CVX,
      arbitrum: Tokens.arbitrum.CVX,
    },
    pools: ConvexBoosterPoolsData,
  },
};

export const EulerConfigs: ProtocolConfig = {
  protocol: 'euler',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x27182842e098f60e3d576794a5bffb0777e025d3', // Euler Protocol
    ],
  },
  customEventMapping: {
    [Signatures['Withdraw(address,address,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'underlying',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
    },
  },
};

export const LiquityConfigs: ProtocolConfig = {
  protocol: 'liquity',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x24179cd81c9e782a4096035f7ec97fb8b783e007', // Borrow Operation
      '0xa39739ef8b0231dbfa0dcda07d7e29faabcf4bb2', // Trove Manager
      '0x66017d22b0f8556afdd19fc67041899eb65a21bb', // Stability Pool
    ],
  },
  staticData: {
    rewardTokens: {
      ethereum: Tokens.ethereum.LQTY,
    },
    borrowTokens: {
      ethereum: Tokens.ethereum.LUSD,
    },
    markets: [
      {
        chain: 'ethereum',
        debtToken: Tokens.ethereum.LUSD,
        collToken: Tokens.ethereum.ETH,
        troveManager: '0xa39739ef8b0231dbfa0dcda07d7e29faabcf4bb2',
      },
    ],
  },
};

export const AbracadabraConfigs: ProtocolConfig = {
  protocol: 'abracadabra',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x26fa3fffb6efe8c1e69103acb4044c26b9a106a9', // sSPELL
      '0xbd2fbaf2dc95bd78cf1cd3c5235b33d1165e6797', // mSPELL
    ],
  },
  staticData: {
    cauldrons: AbracadabraCauldrons,
  },
};

export const MakerConfigs: ProtocolConfig = {
  protocol: 'maker',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x9759a6ac90977b93b58547b4a71c78317f391a28', // DaiJoin
      '0x2f0b23f53734252bda2277357e97e1517d6b042a', // ETH-A GemJoin
      '0x08638eF1A205bE6762A8b935F5da9b700Cf7322c', // ETH-B GemJoin
      '0xf04a5cc80b1e94c69b48f5ee68a08cd2f09a7c3e', // ETH-C GemJoin
      '0xa191e578a6736167326d05c119ce0c90849e84b7', // USDC-A GemJoin
      '0x2600004fd1585f7270756ddc88ad9cfa10dd0428', // USDC-B GemJoin
      '0x0ac6a1d74e84c2df9063bddc31699ff2a2bb22a2', // USDT-A GemJoin
      '0xbf72da2bd84c5170618fbe5914b0eca9638d5eb5', // WBTC-A GemJoin
      '0xfa8c996e158b80d77fbd0082bb437556a65b96e0', // WBTC-B GemJoin
      '0x7f62f9592b823331e012d3c5ddf2a7714cfb9de2', // WBTC-C GemJoin
      '0x60744434d6339a6b27d73d9eda62b6f66a0a04fa', // DAI Flashloan
      '0x0a59649758aa4d66e25f08dd01271e891fe52199', // USDC PSM A GemJoin
      '0x79a0fa989fb7adf1f8e80c93ee605ebb94f7c6a5', // GUSD PSM A GemJoin
      '0x7e62b7e279dfc78deb656e34d6a435cc08a44666', // USDP PSM A GemJoin
      '0x10cd5fbe1b404b7e19ef964b63939907bdaf42e2', // wstETH-A GemJoin
      '0x248ccbf4864221fc0e840f29bb042ad5bfc89b5c', // wstETH-B GemJoin
    ],
  },
  customEventMapping: {
    [Signatures['FlashLoan(address,address,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'fee',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    daiJoin: '0x9759a6ac90977b93b58547b4a71c78317f391a28',
    gems: [
      {
        chain: 'ethereum',
        address: '0x2f0b23f53734252bda2277357e97e1517d6b042a',
        token: Tokens.ethereum.WETH,
      },
      {
        chain: 'ethereum',
        address: '0x08638eF1A205bE6762A8b935F5da9b700Cf7322c',
        token: Tokens.ethereum.WETH,
      },
      {
        chain: 'ethereum',
        address: '0xf04a5cc80b1e94c69b48f5ee68a08cd2f09a7c3e',
        token: Tokens.ethereum.WETH,
      },
      {
        chain: 'ethereum',
        address: '0xa191e578a6736167326d05c119ce0c90849e84b7',
        token: Tokens.ethereum.USDC,
      },
      {
        chain: 'ethereum',
        address: '0x2600004fd1585f7270756ddc88ad9cfa10dd0428',
        token: Tokens.ethereum.USDC,
      },
      {
        chain: 'ethereum',
        address: '0x0ac6a1d74e84c2df9063bddc31699ff2a2bb22a2',
        token: Tokens.ethereum.USDT,
      },
      {
        chain: 'ethereum',
        address: '0xbf72da2bd84c5170618fbe5914b0eca9638d5eb5',
        token: Tokens.ethereum.WBTC,
      },
      {
        chain: 'ethereum',
        address: '0xfa8c996e158b80d77fbd0082bb437556a65b96e0',
        token: Tokens.ethereum.WBTC,
      },
      {
        chain: 'ethereum',
        address: '0x7f62f9592b823331e012d3c5ddf2a7714cfb9de2',
        token: Tokens.ethereum.WBTC,
      },
      {
        chain: 'ethereum',
        address: '0x0a59649758aa4d66e25f08dd01271e891fe52199',
        token: Tokens.ethereum.USDC,
      },
      {
        chain: 'ethereum',
        address: '0x79a0fa989fb7adf1f8e80c93ee605ebb94f7c6a5',
        token: Tokens.ethereum.GUSD,
      },
      {
        chain: 'ethereum',
        address: '0x7e62b7e279dfc78deb656e34d6a435cc08a44666',
        token: Tokens.ethereum.USDP,
      },
      {
        chain: 'ethereum',
        address: '0x10cd5fbe1b404b7e19ef964b63939907bdaf42e2',
        token: Tokens.ethereum.wstETH,
      },
      {
        chain: 'ethereum',
        address: '0x248ccbf4864221fc0e840f29bb042ad5bfc89b5c',
        token: Tokens.ethereum.wstETH,
      },
    ],
  },
};

export const StargateConfigs: ProtocolConfig = {
  protocol: 'stargate',
  categories: ['bridge'],
  contracts: {
    ethereum: [
      '0x101816545f6bd2b1076434b54383a1e633390a2e', // Pool ETH
      '0xdf0770df86a8034b3efef0a1bb3c889b8332ff56', // Pool USDC
      '0x38ea452219524bb87e18de1c24d3bb59510bd783', // Pool USDT
      '0x692953e758c3669290cb1677180c64183cee374e', // Pool USDD
      '0x0faf1d2d3ced330824de3b8200fc8dc6e397850d', // Pool DAI
      '0xfa0f307783ac21c39e939acff795e27b650f6e68', // Pool FRAX
      '0x590d4f8a68583639f215f675f3a259ed84790580', // Pool sUSD
      '0xe8f55368c82d38bbbbdb5533e7f56afc2e978cc2', // Pool LUSD
      '0x9cef9a0b1be0d289ac9f4a98ff317c33eaa84eb8', // Pool MAI
      '0xd8772edbf88bba2667ed011542343b0eddacda47', // Pool METIS
      '0x430ebff5e3e80a6c58e7e6ada1d90f5c28aa116d', // Pool METIS USDT
    ],
    arbitrum: [
      '0x915a55e36a01285a14f05de6e81ed9ce89772f8e', // Pool ETH
      '0x892785f33cdee22a30aef750f285e18c18040c3e', // Pool USDC
      '0xb6cfcf89a7b22988bfc96632ac2a9d6dab60d641', // Pool USDT
      '0xaa4bf442f024820b2c28cd0fd72b82c63e66f56c', // Pool FRAX
      '0xf39b7be294cb36de8c510e267b82bb588705d977', // Pool MAI
      '0x600e576f9d853c95d58029093a16ee49646f3ca5', // Pool LUSD
    ],
    base: [
      '0x28fc411f9e1c480ad312b3d9c60c22b965015c6b', // Pool ETH
      '0x4c80e24119cfb836cdf0a6b53dc23f04f7e652ca', // Pool USDC
    ],
  },
  staticData: {
    pools: [
      {
        chain: 'ethereum',
        address: '0x101816545f6bd2b1076434b54383a1e633390a2e',
        token: Tokens.ethereum.NativeCoin,
      },
      {
        chain: 'ethereum',
        address: '0xdf0770df86a8034b3efef0a1bb3c889b8332ff56',
        token: Tokens.ethereum.USDC,
      },
      {
        chain: 'ethereum',
        address: '0x38ea452219524bb87e18de1c24d3bb59510bd783',
        token: Tokens.ethereum.USDT,
      },
      {
        chain: 'ethereum',
        address: '0x692953e758c3669290cb1677180c64183cee374e',
        token: Tokens.ethereum.USDD,
      },
      {
        chain: 'ethereum',
        address: '0x0faf1d2d3ced330824de3b8200fc8dc6e397850d',
        token: Tokens.ethereum.DAI,
      },
      {
        chain: 'ethereum',
        address: '0xfa0f307783ac21c39e939acff795e27b650f6e68',
        token: Tokens.ethereum.FRAX,
      },
      {
        chain: 'ethereum',
        address: '0x590d4f8a68583639f215f675f3a259ed84790580',
        token: Tokens.ethereum.sUSD,
      },
      {
        chain: 'ethereum',
        address: '0xe8f55368c82d38bbbbdb5533e7f56afc2e978cc2',
        token: Tokens.ethereum.LUSD,
      },
      {
        chain: 'ethereum',
        address: '0x9cef9a0b1be0d289ac9f4a98ff317c33eaa84eb8',
        token: Tokens.ethereum.MAI,
      },
      {
        chain: 'ethereum',
        address: '0xd8772edbf88bba2667ed011542343b0eddacda47',
        token: Tokens.ethereum.METIS,
      },
      {
        chain: 'ethereum',
        address: '0x430ebff5e3e80a6c58e7e6ada1d90f5c28aa116d',
        token: Tokens.ethereum.USDT,
      },

      {
        chain: 'arbitrum',
        address: '0x915a55e36a01285a14f05de6e81ed9ce89772f8e',
        token: Tokens.arbitrum.ETH,
      },
      {
        chain: 'arbitrum',
        address: '0x892785f33cdee22a30aef750f285e18c18040c3e',
        token: Tokens.arbitrum.USDC,
      },
      {
        chain: 'arbitrum',
        address: '0xb6cfcf89a7b22988bfc96632ac2a9d6dab60d641',
        token: Tokens.arbitrum.USDT,
      },
      {
        chain: 'arbitrum',
        address: '0xaa4bf442f024820b2c28cd0fd72b82c63e66f56c',
        token: Tokens.arbitrum.FRAX,
      },
      {
        chain: 'arbitrum',
        address: '0xf39b7be294cb36de8c510e267b82bb588705d977',
        token: Tokens.arbitrum.MAI,
      },
      {
        chain: 'arbitrum',
        address: '0x600e576f9d853c95d58029093a16ee49646f3ca5',
        token: Tokens.arbitrum.LUSD,
      },

      {
        chain: 'base',
        address: '0x28fc411f9e1c480ad312b3d9c60c22b965015c6b',
        token: Tokens.base.ETH,
      },
      {
        chain: 'base',
        address: '0x4c80e24119cfb836cdf0a6b53dc23f04f7e652ca',
        token: Tokens.base.USDC,
      },
    ],
  },
};

export const SiloConfigs: ProtocolConfig = {
  protocol: 'silo',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0xd998c35b7900b344bbbe6555cc11576942cf309d', // Silo Depository
    ],
  },
  customEventMapping: {
    [Signatures['Borrow(address,address,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'asset',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
    },
    [Signatures['Repay(address,address,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'asset',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    pools: SiloPools,
  },
};

export const BeefyConfigs: ProtocolConfig = {
  protocol: 'beefy',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0xf49c523f08b4e7c8e51a44088ea2a5e6b5f397d9', // Beefy reward vault
      '0x4dd0cf20237deb5f2be76340838b9e2d7c70e852', // Stargate ETH vault
      '0x61cf8d861ff3c939147c2aa1f694f9592bf51983', // Stargate USDT vault
      '0x66f5263d51174bab17ac2bda31e51f5bcf05a69a', // Stargate USDC vault
      '0x378416346914a8b530d26b621bda7ae291ce264a', // pETH/ETH vault
      '0xa7739fd3d12ac7f16d8329af3ee407e19de10d8d', // stETH/ETH vault
      '0x8affc4591de6eaec6836c243b00b80f4339f99f5', // wstETH/rETH/sfrxETH v2 vault
      '0x047c41817954b51309a2bd6f60e47bc115c23f1f', // WBTC-ETH vault
      '0xe0d5f9da3613c047003b77caa31270abe3eda6b0', // wstETH/ETH balancer vault
      '0x15780e0e9618c26da679740c43bec76830ff187b', // multiBTC/sBTC/WBTC curve convex vault
      '0xe17d6212eaa54d98187026a770dee96f7c264fec', // rETH-ETH balancer vault
      '0xd5bad7c89028b3f7094e40dcce83d4e6b3fd9aa4', // MIM/DAI/USDT/USDC vault
      '0xcaa51337d91d61e0575f3892cfc6b243a335c0f4', // frxETH-ETH vault
      '0x6853691ca8da03da16194e468068be5a80f103b0', // sBTC/WBTC curve convex vault
      '0x4de81ad42e9651755716177fae9911c54f5b055b', // rETH-ETH curve convex vault
      '0xcc19786f91bb1f3f3fd9a2ea9fd9a54f7743039e', // cvxFXS vault
      '0xe50e2fe90745a8510491f89113959a1ef01ad400', // curve tri crypto vault
      '0xde9aec2f40c7bc783974122ef84c7f1f237f46dd', // USDC-USDT sLP vault
      '0x7f3f33b42b9734e61cb44424d130b5f6e09c9db3', // USDD/DAI/USDT/USDC vault
      '0xffa54b4bfe0225c9b6a830ae1433516736e9a97a', // sETH-ETH vault
      '0x245186caa063b13d0025891c0d513acf552fb38e', // CRV-ETH vault
      '0x8785e892e6c7f1bce907680ce35b580eea7fb24c', // USDC-ETH vault
      '0xd9800eef1756f156e025859ee0dbe6e5f6a6428b', // WBTC-USDC vault
      '0x383f9b2d080c58301d821e9f0ec5a35a17070be6', // DOLA-USDC vault
      '0x4115150523599d1f6c6fa27f5a4c27d578fd8ce5', // cvxCRV vault
      '0x445be44783b9b04b27d23b87ed69985abab1bef3', // VERSE-ETH vault
      '0x3fe43d4ba0a5bacc800c7e7e782466a27ab108bf', // DOLA/FRAX/USDC vault
      '0x3f80f7ae80f54ddb31b1211e7d03cf24fcbb8334', // DAI-ETH vault
      '0xb9911ab699fd781efda446e7fd995d375b437c8b', // SOLID-ETH vault
      '0x6e8aa36716669c575ab308c0f48965a681db03b4', // MATIC-ETH vault
      '0x941e1deac6c58391b266ab849cb7368d6a60910e', // BLUR-ETH vault
      '0xd6f5bef9b63bf648eea43b80b480be653138d116', // CNC-ETH vault
      '0xb9548238d875fb4e12727b2750d8a0bdbc7171c7', // CVX-ETH vault
      '0x60a1cf0d617eeadbb48e488d9ca3e74f50ab4b71', // cbETH-ETH vault
      '0x6660fd0a97af41c6a7b29450d3532feddbe0478a', // BIFI-ETH vault
    ],
  },
  customEventMapping: {
    [Signatures['RewardPaid(address,uint256)']]: {
      abi: [
        {
          indexed: true,
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          name: 'reward',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    vaults: BeefyVaults,
  },
};

export const FraxlendConfigs: ProtocolConfig = {
  protocol: 'fraxlend',
  categories: ['lending'],
  contracts: {
    ethereum: FraxlendPairs.map((item) => item.address),
  },
  staticData: {
    pairs: FraxlendPairs,
  },
};

export const ApecoinConfigs: ProtocolConfig = {
  protocol: 'apecoin',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0x5954ab967bc958940b7eb73ee84797dc8a2afbb9', // APE staking
    ],
  },
};

export const GearboxConfigs: ProtocolConfig = {
  protocol: 'gearbox',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0xa7df60785e556d65292a2c9a077bb3a8fbf048bc', // Airdrop distributor
      '0x24946bcbbd028d5abb62ad9b635eb1b1a67af668', // Pool DAI
      '0x79012c8d491dcf3a30db20d1f449b14caf01da6c', // Pool FRAX
      '0x86130bdd69143d8a4e5fc50bf4323d48049e98e4', // Pool USDC
      '0xb03670c20f87f2169a7c4ebe35746007e9575901', // Pool WETH
      '0xb2a015c71c17bcac6af36645dead8c572ba08a08', // Pool WBTC
      '0xb8cf3ed326bb0e51454361fb37e9e8df6dc5c286', // Pool wstETH
    ],
  },
  customEventMapping: {
    [Signatures['Borrow(address,address,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'creditManager',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'creditAccount',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    pools: [
      {
        chain: 'ethereum',
        address: '0x24946bcbbd028d5abb62ad9b635eb1b1a67af668',
        creditManager: '0x672461bfc20dd783444a830ad4c38b345ab6e2f7',
        token: Tokens.ethereum.DAI,
      },
      {
        chain: 'ethereum',
        address: '0xb03670c20f87f2169a7c4ebe35746007e9575901',
        creditManager: '0x5887ad4cb2352e7f01527035faa3ae0ef2ce2b9b',
        token: Tokens.ethereum.WETH,
      },
      {
        chain: 'ethereum',
        address: '0x79012c8d491dcf3a30db20d1f449b14caf01da6c',
        creditManager: '',
        token: Tokens.ethereum.FRAX,
      },
      {
        chain: 'ethereum',
        address: '0x86130bdd69143d8a4e5fc50bf4323d48049e98e4',
        creditManager: '0x95357303f995e184a7998da6c6ea35cc728a1900',
        token: Tokens.ethereum.USDC,
      },
      {
        chain: 'ethereum',
        address: '0xb2a015c71c17bcac6af36645dead8c572ba08a08',
        creditManager: '0xc62bf8a7889adf1c5dc4665486c7683ae6e74e0f',
        token: Tokens.ethereum.WBTC,
      },
      {
        chain: 'ethereum',
        address: '0xb8cf3ed326bb0e51454361fb37e9e8df6dc5c286',
        creditManager: '0xe0bce4460795281d39c91da9b0275bca968293de',
        token: Tokens.ethereum.wstETH,
      },
    ],
  },
};

export const RaribleConfigs: ProtocolConfig = {
  protocol: 'rarible',
  categories: ['marketplace'],
  contracts: {
    ethereum: [
      '0x09eab21c40743b2364b94345419138ef80f39e30', // Exchange v1
    ],
  },
};

export const ExactlyConfigs: ProtocolConfig = {
  protocol: 'exactly',
  categories: ['lending'],
  contracts: {
    ethereum: ExactlyMarkets.map((item) => item.address),
  },
  customEventMapping: {
    [Signatures['Deposit(address,address,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'caller',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'assets',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'shares',
          type: 'uint256',
        },
      ],
    },
    [Signatures['Withdraw(address,address,address,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'caller',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'assets',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'shares',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    markets: ExactlyMarkets,
  },
};

export const FraxethConfigs: ProtocolConfig = {
  protocol: 'fraxeth',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0xbafa44efe7901e04e39dad13167d089c559c1138', // frxETH minter
      '0xac3e018457b222d93114458476f3e3416abbe38f', // sfrxETH
    ],
  },
};

export const CarbonConfigs: ProtocolConfig = {
  protocol: 'carbon',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0xc537e898cd774e2dcba3b14ea6f34c93d5ea45e1', // Controller
    ],
  },
};

export const StakewiseConfigs: ProtocolConfig = {
  protocol: 'stakewise',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0xfe2e637202056d30016725477c5da089ab0a043a', // sETH2
      '0xa3f21010e8b9a3930996c8849df38f9ca3647c20', // rETH2, SWISE claim
    ],
  },
};

export const ConicConfigs: ProtocolConfig = {
  protocol: 'conic',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0x40293380f5292bb13905608b35a936c332f07f94', // Omnipool FRAX
      '0x07b577f10d4e00f3018542d08a87f255a49175a5', // Omnipool USDC
      '0xabb735648a076d570aff2a61d8d141099823eae9', // Omnipool DAI
      '0xf432110e5206356cd6448da16b05394a89b44cef', // Omnipool USDT
      '0x3f41480dd3b32f1cc579125f9570dccd07e07667', // CNC locker v1
      '0x5f2e1ac047e6a8526f8640a7ed8ab53a0b3f4acf', // CNC locker v2
    ],
  },
  customEventMapping: {
    [Signatures['Deposit(address,address,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'depositedAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'lpReceived',
          type: 'uint256',
        },
      ],
    },
    [Signatures['Withdraw(address,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    poolTokens: {
      '0x40293380f5292bb13905608b35a936c332f07f94': Tokens.ethereum.FRAX,
      '0x07b577f10d4e00f3018542d08a87f255a49175a5': Tokens.ethereum.USDC,
      '0xabb735648a076d570aff2a61d8d141099823eae9': Tokens.ethereum.DAI,
      '0xf432110e5206356cd6448da16b05394a89b44cef': Tokens.ethereum.USDT,
    },
  },
};

export const KyberswapAggregatorConfigs: ProtocolConfig = {
  protocol: 'kyberswap-aggregator',
  categories: ['dexAggregator'],
  contracts: {
    ethereum: [
      '0x6131b5fae19ea4f9d964eac0408e4408b66337b5', // Meta Router v2
    ],
    arbitrum: [
      '0x6131b5fae19ea4f9d964eac0408e4408b66337b5', // Meta Router v2
    ],
    base: [
      '0x6131b5fae19ea4f9d964eac0408e4408b66337b5', // Meta Router v2
    ],
  },
};

export const KyberswapClassicConfigs: ProtocolConfig = {
  protocol: 'kyberswap-classic',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0x1c758af0688502e49140230f6b0ebd376d429be5', // KSFactory
      '0x833e4083b7ae46cea85695c4f7ed25cdad8886de', // DMMFactory
    ],
  },
  subgraphs: [
    {
      protocol: 'kyberswap-classic',
      chain: 'ethereum',
      version: 'univ2',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/kybernetwork/kyberswap-exchange-ethereum',
    },
  ],
};

export const KyberswapElasticConfigs: ProtocolConfig = {
  protocol: 'kyberswap-elastic',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a', // Factory
      ...UniLiquidityPools.filter((item) => item.protocol === 'kyberswap-elastic' && item.chain === 'ethereum').map(
        (item) => item.address
      ),
    ],
    arbitrum: [
      '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a', // Factory
      ...UniLiquidityPools.filter((item) => item.protocol === 'kyberswap-elastic' && item.chain === 'arbitrum').map(
        (item) => item.address
      ),
    ],
    base: [
      '0xc7a590291e07b9fe9e64b86c58fd8fc764308c4a', // Factory
      ...UniLiquidityPools.filter((item) => item.protocol === 'kyberswap-elastic' && item.chain === 'base').map(
        (item) => item.address
      ),
    ],
  },
  subgraphs: [
    {
      protocol: 'kyberswap-elastic',
      chain: 'ethereum',
      version: 'univ3',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/kybernetwork/kyberswap-elastic-mainnet',
    },
    {
      protocol: 'kyberswap-elastic',
      chain: 'arbitrum',
      version: 'univ3',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/kybernetwork/kyberswap-elastic-arbitrum-one',
    },
    {
      protocol: 'kyberswap-elastic',
      chain: 'base',
      version: 'univ3',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://base-graph.kyberengineering.io/subgraphs/name/kybernetwork/kyberswap-elastic-base',
    },
  ],
};

export const ArrakisConfigs: ProtocolConfig = {
  protocol: 'arrakis',
  categories: ['staking'],
  contracts: {
    ethereum: ArrakisVaults.map((item) => item.address),
  },
  staticData: {
    vaults: ArrakisVaults,
  },
};

export const LybraConfigs: ProtocolConfig = {
  protocol: 'lybra',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x97de57ec338ab5d51557da3434828c5dbfada371', // Lybra
    ],
  },
};

export const PendleConfigs: ProtocolConfig = {
  protocol: 'pendle',
  categories: ['staking'],
  contracts: {
    ethereum: [
      // all sy tokens and markets
      ...PendleContracts.syTokens.filter((item) => item.chain === 'ethereum').map((item) => item.address),
      ...PendleContracts.markets.map((item) => item.address),
    ],
  },
  customEventMapping: {
    [Signatures['Mint(address,uint256,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'netLpMinted',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'netSyUsed',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'netPtUsed',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    syTokens: PendleContracts.syTokens,
    markets: PendleContracts.markets,
  },
};

export const BinanceStakedEthConfigs: ProtocolConfig = {
  protocol: 'binance-staked-eth',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0xa2e3356610840701bdf5611a53974510ae27e2e1', // wbETH
    ],
  },
};

export const AgilityConfigs: ProtocolConfig = {
  protocol: 'agility',
  categories: ['staking'],
  contracts: {
    ethereum: [...AgilityPools.map((item) => item.address)],
  },
  staticData: {
    pools: AgilityPools,
  },
};

export const DodoConfigs: ProtocolConfig = {
  protocol: 'dodo',
  categories: ['dexAggregator'],
  contracts: {
    ethereum: [
      '0xa2398842f37465f89540430bdc00219fa9e4d28a', // Router proxy v2
      '0xa356867fdcea8e71aeaf87805808803806231fdc', // V2Proxy02
      '0x50f9bde1c76bba997a5d6e7fefff695ec8536194', // DODOFeeRouteProxy
      '0x21b9f852534fb9ddc3a0a7b24f067b50d8ac9a99', // FeeRouteProxy(for widget)
      '0x3058ef90929cb8180174d74c507176cca6835d73', // USDT-DAI stable pool
      '0xc9f93163c99695c6526b799ebca2207fdf7d61ad', // USDT-USDC stable pool
    ],
    arbitrum: [
      '0x3b6067d4caa8a14c63fdbe6318f27a0bbc9f9237', // Router proxy
      '0x88cbf433471a0cd8240d2a12354362988b4593e5', // Router proxy 02
      '0xe05dd51e4eb5636f4f0e8e7fbe82ea31a2ecef16', // Router fee route
      '0xc4a1a152812de96b2b1861e433f42290cdd7f113', // Router fee route for widget
    ],
  },
};

export const MorphoConfigs: ProtocolConfig = {
  protocol: 'morpho',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x777777c9898d384f785ee44acfe945efdff5f3e0', // Morpho Aave v2
      '0x8888882f8f843896699869179fb6e4f7e3b58888', // Morpho Compound
      '0x33333aea097c193e66081e930c33020272b33333', // Morpho Aave v3
    ],
  },
  staticData: {
    markets: MorphoMarkets,
  },
  customEventMapping: {
    [Signatures['Supplied(address,address,address,uint256,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'onBehalf',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'underlying',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'scaledOnPool',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'scaledInP2P',
          type: 'uint256',
        },
      ],
    },
    [Signatures['Repaid(address,address,address,uint256,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'repayer',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'onBehalf',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'underlying',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'scaledOnPool',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'scaledInP2P',
          type: 'uint256',
        },
      ],
    },
    [Signatures['Liquidated(address,address,address,uint256,address,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'liquidator',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'borrower',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'underlyingBorrowed',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountLiquidated',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'underlyingCollateral',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountSeized',
          type: 'uint256',
        },
      ],
    },
  },
};

export const ChaiConfigs: ProtocolConfig = {
  protocol: 'chai',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0x06af07097c9eeb7fd685c692751d5c66db49c215', // CHAI token
    ],
  },
};

export const AnkrConfigs: ProtocolConfig = {
  protocol: 'ankr',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0x84db6ee82b7cf3b47e8f19270abde5718b936670', // ETH staking
    ],
  },
};

export const DefisaverConfigs: ProtocolConfig = {
  protocol: 'defisaver',
  categories: ['service'],
  contracts: {
    ethereum: [
      '0xce7a977cac4a481bc84ac06b2da0df614e621cf3', // Logger
      '0x1d6dedb49af91a11b5c5f34954fd3e8cc4f03a86', // Recipe executor
    ],
  },
};

export const MetamaskConfigs: ProtocolConfig = {
  protocol: 'metamask',
  categories: ['dexAggregator'],
  contracts: {
    ethereum: [
      '0x881d40237659c251811cec9c364ef91dc08d300c', // Swap router
    ],
    arbitrum: [
      '0x9dda6ef3d919c9bc8885d5560999a3640431e8e6', // Swap router
    ],
  },
};

export const AirswapConfigs: ProtocolConfig = {
  protocol: 'airswap',
  categories: ['dexAggregator'],
  contracts: {
    ethereum: [
      '0x4572f2554421bd64bef1c22c8a81840e8d496bea', // Swap V2
      '0x522d6f36c95a1b6509a14272c17747bbb582f2a6', // Swap V3
    ],
  },
};

export const BungeeConfigs: ProtocolConfig = {
  protocol: 'bungee',
  categories: ['bridge'],
  contracts: {
    ethereum: [
      '0x3a23f943181408eac424116af7b7790c94cb97a5', // Socket gateway
    ],
    arbitrum: [
      '0x3a23f943181408eac424116af7b7790c94cb97a5', // Socket gateway
    ],
    base: [
      '0x3a23f943181408eac424116af7b7790c94cb97a5', // Socket gateway
    ],
  },
};

export const SparkConfigs: ProtocolConfig = {
  protocol: 'spark',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0xc13e21b648a5ee794902342038ff3adab66be987', // lending pool
    ],
  },
};

export const RaftConfigs: ProtocolConfig = {
  protocol: 'raft',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x5f59b322eb3e16a0c78846195af1f588b77403fc', // PositionManager
      '0x839d6833cee34ffab6fa9057b39f02bd3091a1d6', // PositionManagerStETH
    ],
  },
};

export const SturdyConfigs: ProtocolConfig = {
  protocol: 'sturdy',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0xa422ca380bd70eef876292839222159e41aaee17', // lending pool
    ],
  },
};

export const SwellConfigs: ProtocolConfig = {
  protocol: 'swell',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0xf951e335afb289353dc249e82926178eac7ded78', // swETH
    ],
  },
};

export const CrvusdConfigs: ProtocolConfig = {
  protocol: 'crvusd',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x8472a9a7632b173c8cf3a86d3afec50c35548e76', // sfrxETH
      '0xec0820efafc41d8943ee8de495fc9ba8495b15cf', // sfrxETH v2
      '0x100daa78fc509db39ef7d04de0c1abd299f4c6ce', // wstETH
      '0x4e59541306910ad6dc1dac0ac9dfb29bd9f15c67', // WBTC
      '0xa920de414ea4ab66b97da1bfe9e6eca7d4219635', // ETH
      '0x1c91da0223c763d2e0173243eadaa0a2ea47e704', // tBTC
    ],
  },
};

export const OpenOceanConfigs: ProtocolConfig = {
  protocol: 'openocean',
  categories: ['dexAggregator'],
  contracts: {
    ethereum: [
      '0x6352a56caadc4f1e25cd6c75970fa768a3304e64', // OpenOcean Exchange
    ],
  },
};

export const InstadappConfigs: ProtocolConfig = {
  protocol: 'instadapp',
  categories: ['service'],
  contracts: {
    ethereum: [
      '0xcba828153d3a85b30b5b912e1f2dacac5816ae9d', // Account v2 implementation
    ],
  },
};

export const MaverickConfigs: ProtocolConfig = {
  protocol: 'maverick',
  categories: ['trading'],
  contracts: {
    ethereum: MaverickPools.filter((item) => item.chain === 'ethereum').map((item) => item.address),
    base: MaverickPools.filter((item) => item.chain === 'base').map((item) => item.address),
  },
  staticData: {
    pools: MaverickPools,
  },
};

export const GravitaConfigs: ProtocolConfig = {
  protocol: 'gravita',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x2bca0300c2aa65de6f19c2d241b54a445c9990e2', // Borrow Operations
    ],
  },
  staticData: {
    vesselManagers: {
      ethereum: '0xdb5dacb1dfbe16326c3656a88017f0cb4ece0977',
    },
  },
};

export const GelatoConfigs: ProtocolConfig = {
  protocol: 'gelato',
  categories: ['service'],
  contracts: {
    ethereum: [
      '0x3caca7b48d0573d793d3b0279b5f0029180e83b6', // Gelato Network
    ],
  },
};

export const RadiantConfigs: ProtocolConfig = {
  protocol: 'radiant',
  categories: ['lending'],
  contracts: {
    arbitrum: [
      '0xf4b1486dd74d07706052a33d31d7c0aafd0659e1', // Radiant Capital
    ],
  },
};

export const CamelotConfigs: ProtocolConfig = {
  protocol: 'camelot',
  categories: ['trading'],
  contracts: {
    arbitrum: [
      '0x6eccab422d763ac031210895c81787e87b43a652', // factory v2

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'camelot' && item.chain === 'arbitrum').map(
        (item) => item.address
      ),
    ],
  },
  subgraphs: [
    {
      protocol: 'camelot',
      chain: 'arbitrum',
      version: 'univ2',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/camelotlabs/camelot-amm',
    },
  ],
};

export const Camelotv3Configs: ProtocolConfig = {
  protocol: 'camelotv3',
  categories: ['trading'],
  contracts: {
    arbitrum: [
      '0x1a3c9b1d2f0529d97f2afc5136cc23e58f1fd35b', // factory v3

      // top pools
      ...UniLiquidityPools.filter((item) => item.protocol === 'camelotv3' && item.chain === 'arbitrum').map(
        (item) => item.address
      ),
    ],
  },
  subgraphs: [
    {
      protocol: 'camelotv3',
      chain: 'arbitrum',
      version: 'univ3',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/camelotlabs/camelot-amm-v3',
    },
  ],
};

export const GmxConfigs: ProtocolConfig = {
  protocol: 'gmx',
  categories: ['trading', 'perpetual'],
  contracts: {
    arbitrum: [
      '0x489ee077994b6658eafa855c308275ead8097c4a', // Vault
      '0xd2d1162512f927a7e282ef43a362659e4f2a728f', // GMX staking
    ],
  },
};

export const MuxConfigs: ProtocolConfig = {
  protocol: 'mux',
  categories: ['perpetual'],
  contracts: {
    arbitrum: [
      '0x3e0199792ce69dc29a0a36146bfa68bd7c8d6633', // Liquidity pool
    ],
  },
  staticData: {
    assets: MuxAssets,
  },
};

export const HmxConfigs: ProtocolConfig = {
  protocol: 'hmx',
  categories: ['perpetual'],
  contracts: {
    arbitrum: [
      '0xe7d96684a56e60ffbaae0fc0683879da48dab383', // Liquidity service
      '0x0a8d9c0a4a039dde3cb825ff4c2f063f8b54313a', // Margin service
    ],
  },
};

export const OneinchConfigs: ProtocolConfig = {
  protocol: 'oneinch',
  categories: ['dexAggregator'],
  contracts: {
    ethereum: [
      '0x11111112542d85b3ef69ae05771c2dccff4faa26', // Aggregator v3
      '0x1111111254fb6c44bac0bed2854e76f90643097d', // Aggregator v4
      '0x1111111254eeb25477b68fb85ed929f73a960582', // Aggregator v5
    ],
    arbitrum: [
      '0x1111111254eeb25477b68fb85ed929f73a960582', // Aggregator v5
    ],
  },
};

export const ClipperConfigs: ProtocolConfig = {
  protocol: 'clipper',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0x655edce464cc797526600a462a8154650eee4b77', // Clipper Exchange
    ],
    arbitrum: [
      '0xe7b0ce0526fbe3969035a145c9e9691d4d9d216c', // Clipper Exchange
    ],
  },
};

export const BasinConfigs: ProtocolConfig = {
  protocol: 'basin',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0xbea0e11282e2bb5893bece110cf199501e872bad', // BEAN-WETH Well
    ],
  },
};

// export const BaseswapConfigs: ProtocolConfig = {
//   protocol: 'baseswap',
//   categories: ['trading'],
//   contracts: {
//     base: [
//       '0xfda619b6d20975be80a10332cd39b9a4b0faa8bb', // v2 Factory
//
//       // top pools
//       ...UniLiquidityPools.filter((item) => item.protocol === 'baseswap').map((item) => item.address),
//     ],
//   },
//   subgraphs: [
//     {
//       protocol: 'baseswap',
//       chain: 'base',
//       version: 'univ2',
//       birthday: 1690495200, // Thu Jul 27 2023 22:00:00 GMT+0000
//       filters: {},
//       endpoint: 'https://api.thegraph.com/subgraphs/name/harleen-m/baseswap',
//     },
//   ],
//   staticData: {
//     liquidityPools: UniLiquidityPools.filter((item) => item.protocol === 'baseswap'),
//   },
// }

export const UnibotConfigs: ProtocolConfig = {
  protocol: 'unibot',
  categories: ['dexAggregator'],
  contracts: {
    ethereum: [
      '0x07490d45a33d842ebb7ea8c22cc9f19326443c75', // Unibot router v9
      '0xec6a3fd12176438969ebb0aed2d6b1d3885e38cc', // Unibot router v12
      '0x3999d2c5207c06bbc5cf8a6bea52966cabb76d41', // Unibot router
    ],
  },
};

export const AmbientConfigs: ProtocolConfig = {
  protocol: 'ambient',
  categories: ['trading'],
  contracts: {
    ethereum: [
      '0xaaaaaaaaa24eeeb8d57d431224f73832bc34f688', // CrocSwapDex
    ],
  },
};

export const SommelierConfigs: ProtocolConfig = {
  protocol: 'sommelier',
  categories: ['staking'],
  contracts: {
    ethereum: [
      // v2
      '0x97e6e0a40a3d02f12d1cec30ebfbae04e37c119e', // Real Yield USD - USDC
      '0xb5b29320d2dde5ba5bafa1ebcd270052070483ec', // Real Yield ETH - WETH

      // v1.5
      '0x6b7f87279982d919bbf85182ddeab179b366d8f2', // ETH-BTC Trend
      '0x6e2dac3b9e9adc0cbbae2d0b9fd81952a8d33872', // ETH-BTC Momentum
      '0x3f07a84ecdf494310d397d24c1c78b041d2fa622', // Steady ETH
      '0x4986fd36b6b16f49b43282ee2e24c5cf90ed166d', // Steady BTC
      '0x6f069f711281618467dae7873541ecc082761b33', // Steady UNI
      '0x05641a27c82799aaf22b436f20a3110410f29652', // Steady MATIC
    ],
  },
  staticData: {
    assets: {
      '0x97e6e0a40a3d02f12d1cec30ebfbae04e37c119e': Tokens.ethereum.USDC,
      '0xb5b29320d2dde5ba5bafa1ebcd270052070483ec': Tokens.ethereum.WETH,
      '0x6b7f87279982d919bbf85182ddeab179b366d8f2': Tokens.ethereum.USDC,
      '0x6e2dac3b9e9adc0cbbae2d0b9fd81952a8d33872': Tokens.ethereum.USDC,
      '0x4986fd36b6b16f49b43282ee2e24c5cf90ed166d': Tokens.ethereum.USDC,
      '0x6f069f711281618467dae7873541ecc082761b33': Tokens.ethereum.USDC,
      '0x05641a27c82799aaf22b436f20a3110410f29652': Tokens.ethereum.USDC,
    },
  },
  customEventMapping: {
    [Signatures['Deposit(address,address,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'caller',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'assets',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'shares',
          type: 'uint256',
        },
      ],
    },
    [Signatures['Withdraw(address,address,address,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'caller',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'assets',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'shares',
          type: 'uint256',
        },
      ],
    },
  },
};

export const PrismaConfigs: ProtocolConfig = {
  protocol: 'prisma',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x72c590349535ad52e6953744cb2a36b409542719', // Borrow operations
      '0xf69282a7e7ba5428f92f610e7afa1c0cedc4e483', // Trove manager sfrxETH
      '0xbf6883a03fd2fcfa1b9fc588ad6193b3c3178f8f', // Trove manager wstETH
      '0xe0e255fd5281bec3bb8fa1569a20097d9064e445', // Trove manager rETH
      '0x63cc74334f4b1119276667cf0079ac0c8a96cfb2', // Trove manager cbETH
      '0xed8b26d99834540c5013701bb3715fafd39993ba', // Stability pool
    ],
  },
  staticData: {
    // rewardTokens: {
    //   ethereum: Tokens.ethereum.LQTY,
    // },
    borrowTokens: {
      ethereum: Tokens.ethereum.mkUSD,
    },
    markets: [
      {
        chain: 'ethereum',
        debtToken: Tokens.ethereum.mkUSD,
        collToken: Tokens.ethereum.sfrxETH,
        troveManager: '0xf69282a7e7ba5428f92f610e7afa1c0cedc4e483',
      },
      {
        chain: 'ethereum',
        debtToken: Tokens.ethereum.mkUSD,
        collToken: Tokens.ethereum.wstETH,
        troveManager: '0xbf6883a03fd2fcfa1b9fc588ad6193b3c3178f8f',
      },
      {
        chain: 'ethereum',
        debtToken: Tokens.ethereum.mkUSD,
        collToken: Tokens.ethereum.rETH,
        troveManager: '0xe0e255fd5281bec3bb8fa1569a20097d9064e445',
      },
      {
        chain: 'ethereum',
        debtToken: Tokens.ethereum.mkUSD,
        collToken: Tokens.ethereum.cbETH,
        troveManager: '0x63cc74334f4b1119276667cf0079ac0c8a96cfb2',
      },
    ],
  },
};

export const AerodromeConfigs: ProtocolConfig = {
  protocol: 'aerodrome',
  categories: ['trading'],
  contracts: {
    base: [
      '0x420dd381b31aef6683db6b902084cb0ffece40da', // factory
    ],
  },
  customEventMapping: {
    [Signatures['Burn(address,address,uint256,uint256)']]: {
      abi: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount0',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount1',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    liquidityPools: UniFactoryPools.filter((item) => item.protocol === 'aerodrome'),
  },
};

export const SonnefinanceConfigs: ProtocolConfig = {
  protocol: 'sonnefinance',
  categories: ['lending'],
  contracts: {
    base: [
      '0x5f5c479fe590cd4442a05ae4a941dd991a633b8e', // soWETH
      '0xb864ba2aab1f53bc3af7ae49a318202dd3fd54c2', // soDAI
      '0x225886c9beb5eee254f79d58bbd80cf9f200d4d0', // soUSDbC
    ],
  },
  customEventMapping: {
    [Signatures['Mint(address,uint256,uint256)']]: {
      abi: [
        {
          indexed: false,
          internalType: 'address',
          name: 'minter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintTokens',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    pools: SonnefinanceMarkets,
  },
};

export const ReflexerConfigs: ProtocolConfig = {
  protocol: 'reflexer',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x2d3cd7b81c93f188f3cb8ad87c8acc73d6226e3a', // ETH Join
      '0x0a5653cca4db1b6e265f47caf6969e64f1cfdc45', // CoinJoin
    ],
  },
};

export const EigenlayerConfigs: ProtocolConfig = {
  protocol: 'eigenlayer',
  categories: ['staking'],
  contracts: {
    ethereum: [
      '0x858646372cc42e1a627fce94aa7a7033e7cf075a', // Strategy Manager
    ],
  },
  staticData: {
    strategies: {
      ethereum: {
        '0x54945180db7943c0ed0fee7edab2bd24620256bc': Tokens.ethereum.cbETH,
        '0x93c4b944d05dfe6df7645a86cd2206016c51564d': Tokens.ethereum.stETH,
        '0x1bee69b7dfffa4e2d53c2a2df135c388ad25dcd2': Tokens.ethereum.rETH,
      },
    },
  },
};

export const FluxfinanceConfigs: ProtocolConfig = {
  protocol: 'fluxfinance',
  categories: ['lending'],
  contracts: {
    ethereum: [
      '0x465a5a630482f3abd6d3b84b39b29b07214d19e5', // fUSDC
      '0xe2ba8693ce7474900a045757fe0efca900f6530b', // fDAI
      '0x81994b9607e06ab3d5cf3afff9a67374f05f27d7', // fUSDT
      '0x1c9a2d6b33b4826757273d47ebee0e2dddcd978b', // fFRAX
      '0x1dd7950c266fb1be96180a8fdb0591f70200e018', // fOUSG
    ],
  },
  customEventMapping: {
    [Signatures['Mint(address,uint256,uint256)']]: {
      abi: [
        {
          indexed: false,
          internalType: 'address',
          name: 'minter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintTokens',
          type: 'uint256',
        },
      ],
    },
  },
  staticData: {
    pools: FluxfinanceMarkets,
  },
};

export const LevelfinanceConfigs: ProtocolConfig = {
  protocol: 'levelfinance',
  categories: ['trading', 'perpetual'],
  contracts: {
    arbitrum: [
      '0x32b7bf19cb8b95c27e644183837813d4b595dcc6', // Liquidity Pool
    ],
  },
};

export const SeamlessConfigs: ProtocolConfig = {
  protocol: 'seamless',
  categories: ['lending'],
  contracts: {
    base: [
      '0x8f44fd754285aa6a2b8b9b97739b79746e0475a7', // lending pool - forked from aave lending pool v3
    ],
  },
};

export const TraderjoeConfigs: ProtocolConfig = {
  protocol: 'traderjoe',
  categories: ['trading'],
  contracts: {
    arbitrum: [
      '0x1886d09c9ade0c5db822d85d21678db67b6c2982', // LB Factory
    ],
  },
  subgraphs: [
    {
      protocol: 'traderjoe',
      chain: 'arbitrum',
      version: 'traderjoeLiquidityBook',
      birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
      filters: {},
      endpoint: 'https://api.thegraph.com/subgraphs/name/traderjoe-xyz/joe-v2-arbitrum',
    },
  ],
  staticData: {
    lbPairs: TraderjoeLbPairs,
  },
};

export const AgnifinanceConfigs: ProtocolConfig = {
  protocol: 'agnifinance',
  categories: ['trading'],
  contracts: {
    mantle: [
      '0x25780dc8fc3cfbd75f33bfdab65e969b603b2035', // Factory
    ],
  },
};

export const Gmxv2Configs: ProtocolConfig = {
  protocol: 'gmxv2',
  categories: ['trading', 'perpetual'],
  contracts: {
    arbitrum: [
      '0xc8ee91a54287db53897056e12d9819156d3822fb', // Event emitter
    ],
  },
  staticData: {
    markets: Gmxv2Markets,
  },
};

export const GainsConfigs: ProtocolConfig = {
  protocol: 'gains',
  categories: ['perpetual'],
  contracts: {
    arbitrum: [
      '0x298a695906e16aea0a184a2815a76ead1a0b7522', // Trading Callbacks
    ],
  },
  staticData: {
    pairsIndex: {
      arbitrum: GainsPairIndex.filter((item) => item.chain === 'arbitrum'),
    },
  },
};
