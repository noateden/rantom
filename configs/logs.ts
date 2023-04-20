import { ProtocolConfig } from '../types/configs';
import AbracadabraCauldrons from './data/AbracadabraCauldrons.json';
import BeefyVaults from './data/BeefyVaults.json';
import ExactlyMarkets from './data/ExactlyMarkets.json';
import FraxLendPairs from './data/FraxlendPairs.json';
import SiloPools from './data/SiloPools.json';
import YearnVaults from './data/YearnVaults.json';
import {
  Aavev2Configs,
  Aavev3Configs,
  AbracadabraConfigs,
  AurafinanceConfigs,
  BalancerConfigs,
  BancorConfigs,
  BeanstalkConfigs,
  CompoundConfigs,
  Compoundv3Configs,
  ConvexConfigs,
  CurveConfigs,
  EulerConfigs,
  IronbankConfigs,
  LidoConfigs,
  LiquityConfigs,
  LooksrareConfigs,
  MakerConfigs,
  PancakeswapConfigs,
  PancakeswapV3Configs,
  RocketpoolConfigs,
  SushiConfigs,
  YearnConfigs,
} from './protocols';

export const ContractWhitelistedGetLogs: { [key: string]: Array<string> } = {
  ethereum: [
    ...AbracadabraCauldrons.map((item) => item.address),
    ...YearnVaults.map((item) => item.address),
    ...BeefyVaults.map((item) => item.address),
    ...FraxLendPairs.map((item) => item.address),
    ...ExactlyMarkets.map((item) => item.address),
    ...SiloPools.map((item) => item.address),

    '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9', // Aave lending pool v2
    '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2', // Aave lending pool v3
    '0xa57b8d98dae62b26ec3bcc4a365338157060b234', // Aura booster
    '0xba12222222228d8ba445958a75a0704d566bf2c8', // Balancer vault
    '0xeef417e1d5cc832e619ae18d2f140de2999dd4fb', // Bancor network v3
    '0xd982e001491d414c857f2a1aaa4b43ccf9f642b4', // Bancor pool v3
    '0x02651e355d26f3506c1e644ba393fdd9ac95eaca', // Bancor BNT pool
    '0xc1e088fc1323b20bcbee9bd1b9fc9546db5624c5', // Beanstalk
    '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c', // Compound AAVE
    '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e', // Compound BAT
    '0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4', // Compound COMP
    '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643', // Compound DAI
    '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5', // Compound ETH
    '0x7713dd9ca933848f6819f38b8352d9a15ea73f67', // Compound FEI
    '0xface851a4921ce59e912d19329929ce6da6eb0c7', // Compound LINK
    '0x95b4ef2869ebd94beb4eee400a99824bf5dc325b', // Compound MKR
    '0x158079ee67fce2f58472a96584a73c7ab9ac95c1', // Compound REP
    '0xf5dce57282a584d2746faf1593d3121fcac444dc', // Compound SAI
    '0x4b0181102a0112a2ef11abee5563bb4a3176c9d7', // Compound SUSHI
    '0x12392f67bdf24fae0af363c24ac620a2f67dad86', // Compound TUSD
    '0x35a18000230da775cac24873d00ff85bccded550', // Compound UNI
    '0x39aa39c021dfbae8fac545936693ac917d5e7563', // Compound USDC
    '0x041171993284df560249b57358f931d9eb7b925d', // Compound USDP
    '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9', // Compound USDT
    '0xc11b1268c1a384e55c48c2391d8d480264a3a7f4', // Compound WBTC
    '0xccf4429db6322d5c611ee964527d42e5d685dd6a', // Compound WBTC 2
    '0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946', // Compound YFI
    '0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407', // Compound ZRX
    '0xc3d688b66703497daa19211eedff47f25384cdc3', // Compound v3 USDC
    '0xa17581a9e3356d9a858b789d68b4d866e593ae94', // Compound v3 ETH
    '0xf403c135812408bfbe8713b5a23a04b3d48aae31', // Convex booster
    '0x9008d19f58aabd9ed0d60971565aa8510560ab41', // CowSwap settlement
    '0x27182842e098f60e3d576794a5bffb0777e025d3', // Euler protocol
    '0x41c84c0e2ee0b740cf0d31f63f3b6f627dc6b393', // Ironbank WETH
    '0x8e595470ed749b85c6f7669de83eae304c2ec68f', // Ironbank DAI
    '0xe7bff2da8a2f619c2586fb83938fa56ce803aa16', // Ironbank LINK
    '0xfa3472f7319477c9bfecdd66e4b948569e7621b9', // Ironbank YFI
    '0x12a9cc33a980daa74e00cc2d1a0e74c57a93d12c', // Ironbank SNX
    '0x8fc8bfd80d6a9f17fb98a373023d72531792b431', // Ironbank WBTC
    '0x48759f220ed983db51fa7a8c0d2aab8f3ce4166a', // Ironbank USDT
    '0x76eb2fe28b36b3ee97f3adae0c69606eedb2a37c', // Ironbank USDC
    '0xa7c4054afd3dbbbf5bfe80f41862b89ea05c9806', // Ironbank sUSD
    '0xa8caea564811af0e92b1e044f3edd18fa9a73e4f', // Ironbank EURS
    '0xca55f9c4e77f7b8524178583b0f7c798de17fd54', // Ironbank sEUR
    '0x7736ffb07104c0c400bb0cc9a7c228452a732992', // Ironbank DPI
    '0xfeeb92386a055e2ef7c2b598c872a4047a7db59f', // Ironbank UNI
    '0x226f3738238932ba0db2319a8117d9555446102f', // Ironbank SUSHI
    '0xb8c5af54bbdcc61453144cf472a9276ae36109f9', // Ironbank CRV
    '0x30190a3b52b5ab1daf70d46d72536f5171f22340', // Ironbank AAVE
    '0x9e8e207083ffd5bdc3d99a1f32d1e6250869c1a9', // Ironbank MIM
    '0xe0b57feed45e7d908f2d0dacd26f113cf26715bf', // Ironbank CVX
    '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', // stETH
    '0x24179cd81c9e782a4096035f7ec97fb8b783e007', // Liquity borrow operation
    '0xa39739ef8b0231dbfa0dcda07d7e29faabcf4bb2', // Liquity trove manager
    '0x59728544b08ab483533076417fbbb2fd0b17ce3a', // Looksrare exchange
    '0xbcd7254a1d759efa08ec7c3291b2e85c5dcc12ce', // Looksrare staking
    '0x0000000000e655fae4d56241588680f86e3b2377', // Looksrare exchange v2
    '0x60744434d6339a6b27d73d9eda62b6f66a0a04fa', // Maker DAI flashloan
    '0x9759a6ac90977b93b58547b4a71c78317f391a28', // Maker DAI join
    '0x79a0fa989fb7adf1f8e80c93ee605ebb94f7c6a5', // Maker GUSD join
    '0x2f0b23f53734252bda2277357e97e1517d6b042a', // Maker Gems
    '0x08638eF1A205bE6762A8b935F5da9b700Cf7322c', // Maker Gems
    '0xf04a5cc80b1e94c69b48f5ee68a08cd2f09a7c3e', // Maker Gems
    '0xa191e578a6736167326d05c119ce0c90849e84b7', // Maker Gems
    '0x2600004fd1585f7270756ddc88ad9cfa10dd0428', // Maker Gems
    '0x0ac6a1d74e84c2df9063bddc31699ff2a2bb22a2', // Maker Gems
    '0xbf72da2bd84c5170618fbe5914b0eca9638d5eb5', // Maker Gems
    '0xfa8c996e158b80d77fbd0082bb437556a65b96e0', // Maker Gems
    '0x0a59649758aa4d66e25f08dd01271e891fe52199', // Maker Gems
    '0xae78736cd615f374d3085123a210448e74fc6393', // Rocketpool rETH
    '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f', // Uniswap factory v2
    '0x1f98431c8ad98523631ae4a59f267346ea31f984', // Uniswap factory v3
    '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac', // Sushi factory v2
    '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd', // Sushi masterchef
    '0xef0881ec094552b2e128cf945ef17a6752b4ec5d', // Sushi masterchef v2
    '0x1097053fd2ea711dad45caccc45eff7548fcb362', // Pancakeswap factory v2
    '0x0bfbcf9fa4f9c56b0f40a671ad40e0805a091865', // Pancakeswap factory v3
    '0x5954ab967bc958940b7eb73ee84797dc8a2afbb9', // APE staking
    '0xdef1c0ded9bec7f1a1670819833240f027b25eff', // 0x exchange
    '0xa7df60785e556d65292a2c9a077bb3a8fbf048bc', // Gearbox airdrop distributor
    '0x24946bcbbd028d5abb62ad9b635eb1b1a67af668', // Gearbox Pool DAI
    '0x79012c8d491dcf3a30db20d1f449b14caf01da6c', // Gearbox Pool FRAX
    '0x86130bdd69143d8a4e5fc50bf4323d48049e98e4', // Gearbox Pool USDC
    '0xb2a015c71c17bcac6af36645dead8c572ba08a08', // Gearbox Pool WBTC
    '0xb8cf3ed326bb0e51454361fb37e9e8df6dc5c286', // Gearbox Pool wstETH
    '0x000000000000ad05ccc4f10045630fb830b95127', // Blur Marketplace
    '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3', // X2y2 Exchange
    '0x09eab21c40743b2364b94345419138ef80f39e30', // Rarible Exchange
    '0x26fa3fffb6efe8c1e69103acb4044c26b9a106a9', // sSPELL
    '0xbd2fbaf2dc95bd78cf1cd3c5235b33d1165e6797', // mSPELL
    '0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc', // Tornadocash ETH 0.1
    '0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936', // Tornadocash ETH 1
    '0x910cbd523d972eb0a6f4cae4618ad62622b39dbf', // Tornadocash ETH 10
    '0xa160cdab225685da1d56aa342ad8841c3b53f291', // Tornadocash ETH 100
    '0xfd8610d20aa15b7b2e3be39b396a1bc3516c7144', // Tornadocash DAI 1,000
    '0x07687e702b410fa43f4cb4af7fa097918ffd2730', // Tornadocash DAI 10,000
    '0x23773e65ed146a459791799d01336db287f25334', // Tornadocash DAI 100,000
    '0xbb93e510bbcd0b7beb5a853875f9ec60275cf498', // Tornadocash WBTC 10
    '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', // ENS registration controller
    // '0x00000000006c3852cbef3e08e8df289169ede581', // Seaport 1.1
    // '0x00000000000001ad428e4906ae43d8f9852d0dd6', // Seaport 1.4
  ],
};

export const ProtocolWhitelistedSubgraphs: Array<ProtocolConfig> = [
  SushiConfigs,
  PancakeswapConfigs,
  PancakeswapV3Configs,
];

export const ReportProtocolConfigs: Array<ProtocolConfig> = [
  Aavev2Configs,
  Aavev3Configs,
  AbracadabraConfigs,
  AurafinanceConfigs,
  BalancerConfigs,
  BancorConfigs,
  BeanstalkConfigs,
  CompoundConfigs,
  Compoundv3Configs,
  ConvexConfigs,
  CurveConfigs,
  EulerConfigs,
  IronbankConfigs,
  LidoConfigs,
  LiquityConfigs,
  LooksrareConfigs,
  MakerConfigs,
  PancakeswapConfigs,
  RocketpoolConfigs,
  SushiConfigs,
  YearnConfigs,
];
