import AbracadabraCauldrons from './data/AbracadabraCauldrons.json';
import AgilityPools from './data/AgilityStakingPools.json';
import ArrakisVaults from './data/ArrakisVaults.json';
import AurafinancePools from './data/AuraFinanceBoosterPools.json';
import BeefyVaults from './data/BeefyVaults.json';
import ConvexPools from './data/ConvexBoosterPools.json';
import CurvePools from './data/CurvePools.json';
import ExactlyMarkets from './data/ExactlyMarkets.json';
import FraxLendPairs from './data/FraxlendPairs.json';
import MaverickPools from './data/MaverickPools.json';
import PendleContracts from './data/PendleContracts.json';
import SiloPools from './data/SiloPools.json';
import UniFactoryPools from './data/UniFactoryPools.json';
import UniLiquidityPools from './data/UniLiquidityPools.json';
import YearnVaults from './data/YearnVaults.json';

export const ContractWhitelistedGetLogs: { [key: string]: Array<string> } = {
  ethereum: [
    ...AbracadabraCauldrons.filter((item) => item.chain === 'ethereum').map((item) => item.address),
    ...YearnVaults.map((item) => item.address),
    ...BeefyVaults.map((item) => item.address),
    ...FraxLendPairs.map((item) => item.address),
    ...ExactlyMarkets.map((item) => item.address),
    ...SiloPools.map((item) => item.address),
    ...ArrakisVaults.map((item) => item.address),
    ...PendleContracts.syTokens.map((item) => item.address),
    ...AgilityPools.map((item) => item.address),
    ...CurvePools.map((item) => item.address),
    ...MaverickPools.map((item) => item.address),

    // convex finance reward pools
    ...ConvexPools.map((item) => item.rewardPool),

    // aura finance reward pools
    ...AurafinancePools.map((item) => item.rewardPool),

    // we sync only top tvl and volume pools
    // ignore malicious pools
    ...UniLiquidityPools.filter(
      (item: any) => (item.protocol === 'uniswapv2' || item.protocol === 'uniswapv3') && item.chain === 'ethereum'
    ).map((item: any) => item.address),
    ...UniLiquidityPools.filter(
      (item: any) => (item.protocol === 'sushi' || item.protocol === 'sushiv3') && item.chain === 'ethereum'
    ).map((item: any) => item.address),
    ...UniLiquidityPools.filter(
      (item: any) => (item.protocol === 'pancakeswap' || item.protocol === 'pancakeswapv3') && item.chain === 'ethereum'
    ).map((item: any) => item.address),

    '0x000000000000ad05ccc4f10045630fb830b95127', // Blur Marketplace
    '0x00000000006c3852cbef3e08e8df289169ede581', // Seaport 1.1
    '0x00000000000006c7676171937c444f6bde3d6282', // Seaport 1.2
    '0x0000000000000ad24e80fd803c6ac37206a45f15', // Seaport 1.3
    '0x00000000000001ad428e4906ae43d8f9852d0dd6', // Seaport 1.4
    '0x00000000000000adc04c56bf30ac9d3c0aaf14dc', // Seaport 1.5

    '0x00000000219ab540356cbb839cbe05303d7705fa', // Eth beacon deposit
    '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9', // Aave lending pool v2
    '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2', // Aave lending pool v3
    '0xa57b8d98dae62b26ec3bcc4a365338157060b234', // Aura booster
    '0x00a7ba8ae7bca0b10a32ea1f8e2a1da980c6cad2', // Aura auraBAL staking
    '0x5e5ea2048475854a5702f5b8468a51ba1296efcc', // Aura auraBAL staking 2
    '0x3fa73f1e5d8a792c80f426fc8f84fbf7ce9bbcac', // Aura locker
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
    '0x1b0e765f6224c21223aea2af16c1c46e38885a40', // Compound comet reward
    '0xf403c135812408bfbe8713b5a23a04b3d48aae31', // Convex booster
    '0xcf50b810e57ac33b91dcf525c6ddd9881b139332', // Convex stake CVX earn CRV
    '0x3fe65692bfcd0e6cf84cb1e7d24108e434a7587e', // Convex Stake cvxCRV earn CRV
    '0xd18140b4b819b895a3dba5442f959fa44994af50', // Convex locker old
    '0x72a19342e8f1838460ebfccef09f6585e32db86e', // Convex locker v2
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
    '0x9ee91f9f426fa633d227f7a9b000e28b9dfd8599', // stMATIC
    '0x889edc2edab5f40e902b864ad4d7ade8e412f9b1', // stETH withdrawal queue
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
    '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd', // Sushi masterchef
    '0xef0881ec094552b2e128cf945ef17a6752b4ec5d', // Sushi masterchef v2
    '0x8798249c2e607446efb7ad49ec89dd1865ff4272', // Sushi xSUSHI
    '0xf5bce5077908a1b7370b9ae04adc565ebd643966', // Sushi Bentobox
    '0x5954ab967bc958940b7eb73ee84797dc8a2afbb9', // APE staking
    '0xdef1c0ded9bec7f1a1670819833240f027b25eff', // 0x exchange
    '0xa7df60785e556d65292a2c9a077bb3a8fbf048bc', // Gearbox airdrop distributor
    '0x24946bcbbd028d5abb62ad9b635eb1b1a67af668', // Gearbox Pool DAI
    '0x79012c8d491dcf3a30db20d1f449b14caf01da6c', // Gearbox Pool FRAX
    '0x86130bdd69143d8a4e5fc50bf4323d48049e98e4', // Gearbox Pool USDC
    '0xb03670c20f87f2169a7c4ebe35746007e9575901', // Gearbox Pool WETH
    '0xb2a015c71c17bcac6af36645dead8c572ba08a08', // Gearbox Pool WBTC
    '0xb8cf3ed326bb0e51454361fb37e9e8df6dc5c286', // Gearbox Pool wstETH
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
    '0x253553366da8546fc250f225fe3d25d0c782303b', // ENS registration controller new
    '0xc537e898cd774e2dcba3b14ea6f34c93d5ea45e1', // Carbon controller
    '0xbafa44efe7901e04e39dad13167d089c559c1138', // Fraxeth frxETHMinter
    '0xac3e018457b222d93114458476f3e3416abbe38f', // Fraxeth sfrxETH
    '0xfe2e637202056d30016725477c5da089ab0a043a', // Stakewise sETH2
    '0xa3f21010e8b9a3930996c8849df38f9ca3647c20', // Stakewise rETH2, SWISE claim
    '0x3f41480dd3b32f1cc579125f9570dccd07e07667', // Conic CNC staking
    '0x5f2e1ac047e6a8526f8640a7ed8ab53a0b3f4acf', // Conic CNC staking v2
    '0x40293380f5292bb13905608b35a936c332f07f94', // Conic FRAX
    '0x07b577f10d4e00f3018542d08a87f255a49175a5', // Conic USDC
    '0xabb735648a076d570aff2a61d8d141099823eae9', // Conic DAI
    '0xf432110e5206356cd6448da16b05394a89b44cef', // Conic USDT
    '0x6131b5fae19ea4f9d964eac0408e4408b66337b5', // Kyberswap aggregator meta router v2
    '0x97de57ec338ab5d51557da3434828c5dbfada371', // Lybra finance main
    '0xa2e3356610840701bdf5611a53974510ae27e2e1', // Binance staked eth
    '0xa2398842f37465f89540430bdc00219fa9e4d28a', // DODO router proxy v2
    '0x50f9bde1c76bba997a5d6e7fefff695ec8536194', // DODOFeeRouteProxy
    '0x5f3b5dfeb7b28cdbd7faba78963ee202a494e2a2', // Curve.fi veCRV
    '0xc128a9954e6c874ea3d62ce62b468ba073093f25', // Balancer veBAL
    '0x90c1f9220d90d3966fbee24045edd73e1d588ad5', // Yearn veYFI
    '0x777777c9898d384f785ee44acfe945efdff5f3e0', // Morpho Aave v2
    '0x33333aea097c193e66081e930c33020272b33333', // Morpho Aave v3
    '0x8888882f8f843896699869179fb6e4f7e3b58888', // Morpho Compound
    '0x06af07097c9eeb7fd685c692751d5c66db49c215', // CHAI Token
    '0x84db6ee82b7cf3b47e8f19270abde5718b936670', // Ankr ETH staking
    '0xdef171fe48cf0115b1d80b88dc8eab59176fee57', // Paraswap v5 augustus swapper
    '0x4572f2554421bd64bef1c22c8a81840e8d496bea', // Airswap v2
    '0x522d6f36c95a1b6509a14272c17747bbb582f2a6', // Airswap v3
    '0x3a23f943181408eac424116af7b7790c94cb97a5', // Bungee socket gateway
    '0xc13e21b648a5ee794902342038ff3adab66be987', // Spark lending pool
    '0x5f59b322eb3e16a0c78846195af1f588b77403fc', // Raft.fi PositionManager
    '0x839d6833cee34ffab6fa9057b39f02bd3091a1d6', // Raft.fi PositionManagerStETH
    '0xa422ca380bd70eef876292839222159e41aaee17', // Sturdy lending pool
    '0xf951e335afb289353dc249e82926178eac7ded78', // Swell swETH
    '0x8472a9a7632b173c8cf3a86d3afec50c35548e76', // Crvusd controller sfrxETH
    '0x100daa78fc509db39ef7d04de0c1abd299f4c6ce', // Crvusd controller wstETH
    '0x4e59541306910ad6dc1dac0ac9dfb29bd9f15c67', // Crvusd controller WBTC
    '0xa920de414ea4ab66b97da1bfe9e6eca7d4219635', // Crvusd controller ETH
    '0x6352a56caadc4f1e25cd6c75970fa768a3304e64', // Openocean exchange v2
    '0x881d40237659c251811cec9c364ef91dc08d300c', // Metamask swap router
    '0x2bca0300c2aa65de6f19c2d241b54a445c9990e2', // GravitaProtocol.com borrow operations
    '0x3caca7b48d0573d793d3b0279b5f0029180e83b6', // Gelato network
    '0xcba828153d3a85b30b5b912e1f2dacac5816ae9d', // Instadapp account implementation
    '0xce7a977cac4a481bc84ac06b2da0df614e621cf3', // Defisaver logger
    '0x1d6dedb49af91a11b5c5f34954fd3e8cc4f03a86', // Defisaver recipe executor
    '0x655edce464cc797526600a462a8154650eee4b77', // Clipper exchange
    '0x72c590349535ad52e6953744cb2a36b409542719', // Prisma borrow operations
    '0xf69282a7e7ba5428f92f610e7afa1c0cedc4e483', // Prisma trove manager sfrxETH
    '0xbf6883a03fd2fcfa1b9fc588ad6193b3c3178f8f', // Prisma trove manager wstETH
    '0xe0e255fd5281bec3bb8fa1569a20097d9064e445', // Prisma trove manager rETH
    '0x63cc74334f4b1119276667cf0079ac0c8a96cfb2', // Prisma trove manager cbETH
    '0x97e6e0a40a3d02f12d1cec30ebfbae04e37c119e', // Sommelier real Yield USD - USDC
    '0xb5b29320d2dde5ba5bafa1ebcd270052070483ec', // Sommelier real Yield ETH - WETH
    '0x6b7f87279982d919bbf85182ddeab179b366d8f2', // Sommelier ETH-BTC Trend
    '0x6e2dac3b9e9adc0cbbae2d0b9fd81952a8d33872', // Sommelier ETH-BTC Momentum
    '0x3f07a84ecdf494310d397d24c1c78b041d2fa622', // Sommelier steady ETH
    '0x4986fd36b6b16f49b43282ee2e24c5cf90ed166d', // Sommelier steady BTC
    '0x6f069f711281618467dae7873541ecc082761b33', // Sommelier steady UNI
    '0x05641a27c82799aaf22b436f20a3110410f29652', // Sommelier steady MATIC
    '0xbea0e11282e2bb5893bece110cf199501e872bad', // Basin BEAN-WETH Well
  ],

  arbitrum: [
    ...AbracadabraCauldrons.filter((item) => item.chain === 'arbitrum').map((item) => item.address),
    // we sync only top tvl and volume pools
    // ignore malicious pools
    ...UniLiquidityPools.filter(
      (item: any) => (item.protocol === 'uniswapv2' || item.protocol === 'uniswapv3') && item.chain === 'arbitrum'
    ).map((item: any) => item.address),
    ...UniLiquidityPools.filter(
      (item: any) => (item.protocol === 'sushi' || item.protocol === 'sushiv3') && item.chain === 'arbitrum'
    ).map((item: any) => item.address),
    ...UniLiquidityPools.filter(
      (item: any) => (item.protocol === 'camelot' || item.protocol === 'camelotv3') && item.chain === 'arbitrum'
    ).map((item: any) => item.address),

    '0xba12222222228d8ba445958a75a0704d566bf2c8', // Balancer vault
    '0x794a61358d6845594f94dc1db02a252b5b4814ad', // Aave v3 lending pool
    '0xf4b1486dd74d07706052a33d31d7c0aafd0659e1', // Radiant v2 lending pool
    '0x489ee077994b6658eafa855c308275ead8097c4a', // Gmx vault
    '0xd2d1162512f927a7e282ef43a362659e4f2a728f', // Gmx staking
    '0x3e0199792ce69dc29a0a36146bfa68bd7c8d6633', // Mux liquidity pool
    '0xe7b0ce0526fbe3969035a145c9e9691d4d9d216c', // Clipper exchange
    '0x9dda6ef3d919c9bc8885d5560999a3640431e8e6', // Metamask swap router
    '0xf4d73326c13a4fc5fd7a064217e12780e9bd62c3', // Sushi minichef
    '0xa5edbdd9646f8dff606d7448e414884c7d905dca', // Compound v3 USDC
  ],

  base: [
    // we sync only top tvl and volume pools
    // ignore malicious pools
    ...UniLiquidityPools.filter((item: any) => item.protocol === 'uniswapv3' && item.chain === 'base').map(
      (item: any) => item.address
    ),
    ...UniLiquidityPools.filter((item: any) => item.protocol === 'sushiv3' && item.chain === 'base').map(
      (item: any) => item.address
    ),
    ...UniFactoryPools.filter((item: any) => item.protocol === 'aerodrome' && item.chain === 'base').map(
      (item: any) => item.address
    ),
    '0x9c4ec768c28520b50860ea7a15bd7213a9ff58bf', // Compound v3 USDCbC
    '0x46e6b214b524310239732d51387075e0e70970bf', // Compound v3 WETH
    '0xba12222222228d8ba445958a75a0704d566bf2c8', // Balancer vault
    '0xa238dd80c259a72e81d7e4664a9801593f98d1c5', // Aave v3 lending pool
  ],
};

// will parse transaction input if transaction is calling to these contracts
export const ContractWhitelistedInputData: { [key: string]: Array<string> } = {
  ethereum: [
    '0x1111111254eeb25477b68fb85ed929f73a960582', // 1inch aggregator v5
  ],
};
