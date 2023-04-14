import { normalizeAddress } from '../lib/helper';
import { ProtocolConfig } from '../types/configs';
import { Tokens } from './constants';
import { CompoundContracts, Compoundv3Contracts } from './contracts/compound';
import { CurveContracts } from './contracts/curve';
import { YearnContracts } from './contracts/yearn';
import AbracadabraCauldrons from './data/AbracadabraCauldrons.json';
import AuraFinanceBoosterPoolsData from './data/AuraFinanceBoosterPools.json';
import BeefyVaults from './data/BeefyVaults.json';
import ConvexBoosterPoolsData from './data/ConvexBoosterPools.json';
import FraxlendPairs from './data/FraxlendPairs.json';
import SushiPools from './data/SushiPools.json';
import { Signatures } from './signatures';

export const Uniswapv2Configs: ProtocolConfig = {
  protocol: 'uniswapv2',
  contracts: {
    ethereum: [
      '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f', // v2 Factory
    ],
  },
  staticData: {
    subgraphConfigs: [
      {
        protocol: 'uniswapv2',
        chain: 'ethereum',
        version: 'univ2',
        birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
        filters: {},
        endpoint: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
      },
    ],
  },
};

export const Uniswapv3Configs: ProtocolConfig = {
  protocol: 'uniswapv3',
  contracts: {
    ethereum: [
      '0x1f98431c8ad98523631ae4a59f267346ea31f984', // v3 Factory
    ],
  },
  staticData: {
    subgraphConfigs: [
      {
        protocol: 'uniswapv3',
        chain: 'ethereum',
        version: 'univ3',
        birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
        filters: {},
        endpoint: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
      },
    ],
  },
};

export const LidoConfigs: ProtocolConfig = {
  protocol: 'lido',
  contracts: {
    ethereum: [
      '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', // stETH
    ],
  },
  staticData: {
    depositSecurityModule2: '0x710b3303fb508a84f10793c1106e32be873c24cd',
  },
};

export const SushiConfigs: ProtocolConfig = {
  protocol: 'sushi',
  contracts: {
    ethereum: [
      '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac', // uni v2 Factory
      '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd', // masterchef
      '0xef0881ec094552b2e128cf945ef17a6752b4ec5d', // masterchef v2
    ],
  },
  staticData: {
    pools: SushiPools,
    subgraphConfigs: [
      {
        protocol: 'sushi',
        chain: 'ethereum',
        version: 'univ2',
        birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
        filters: {},
        endpoint: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
      },
    ],
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
  ],
};

export const PancakeswapConfigs: ProtocolConfig = {
  protocol: 'pancakeswap',
  contracts: {
    ethereum: [
      '0x1097053fd2ea711dad45caccc45eff7548fcb362', // uni v2 Factory
    ],
  },
  staticData: {
    subgraphConfigs: [
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
  ],
};

export const PancakeswapV3Configs: ProtocolConfig = {
  protocol: 'pancakeswapv3',
  contracts: {
    ethereum: [
      '0x0bfbcf9fa4f9c56b0f40a671ad40e0805a091865', // pancakeswap v3 Factory
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
  ],
};

export const BalancerConfigs: ProtocolConfig = {
  protocol: 'balancer',
  contracts: {
    ethereum: [
      '0xba12222222228d8ba445958a75a0704d566bf2c8', // vault
    ],
  },
  staticData: {
    subgraphConfigs: [
      {
        protocol: 'balancer',
        chain: 'ethereum',
        version: 'balv2', // balancer v2
        birthday: 1672567200, // Sun Jan 01 2023 10:00:00 GMT+0000
        filters: {},
        endpoint: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
      },
    ],
  },
};

export const Aavev1Configs: ProtocolConfig = {
  protocol: 'aavev1',
  contracts: {
    ethereum: [
      '0x398ec7346dcd622edc5ae82352f02be94c62d119', // lending pool v1
    ],
  },
};

export const Aavev2Configs: ProtocolConfig = {
  protocol: 'aavev2',
  contracts: {
    ethereum: [
      '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9', // lending pool v2
    ],
  },
};

export const Aavev3Configs: ProtocolConfig = {
  protocol: 'aavev3',
  contracts: {
    ethereum: [
      '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2', // lending pool v3
    ],
  },
};

export const ShibaswapConfigs: ProtocolConfig = {
  protocol: 'shibaswap',
  contracts: {
    ethereum: [
      '0x115934131916c8b277dd010ee02de363c09d037c', // uni v2 Factory
    ],
  },
};

export const FraxswapConfigs: ProtocolConfig = {
  protocol: 'fraxswap',
  contracts: {
    ethereum: [
      '0x43ec799eadd63848443e2347c49f5f52e8fe0f6f', // uni v2 Factory
    ],
  },
};

export const CompoundConfigs: ProtocolConfig = {
  protocol: 'compound',
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
    pools: CompoundContracts,
  },
};

export const Compoundv3Configs: ProtocolConfig = {
  protocol: 'compoundv3',
  contracts: {
    ethereum: [
      '0xc3d688b66703497daa19211eedff47f25384cdc3', // v3 USDC
      '0xa17581a9e3356d9a858b789d68b4d866e593ae94', // v3 ETH
    ],
  },
  staticData: {
    pools: Compoundv3Contracts,
  },
};

export const IronbankConfigs: ProtocolConfig = {
  protocol: 'ironbank',
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
};

export const RocketpoolConfigs: ProtocolConfig = {
  protocol: 'rocketpool',
  contracts: {
    ethereum: [
      '0xae78736cd615f374d3085123a210448e74fc6393', // rETH
    ],
  },
};

export const CurveConfigs: ProtocolConfig = {
  protocol: 'curve',
  contracts: {
    ethereum: [
      '0xecb456ea5365865ebab8a2661b0c503410e9b347', // Curve.fi pool owner
      '0xbabe61887f1de2713c6f97e567623453d3c79f67', // Curve.fi deployer 2
      '0xf18056bbd320e96a48e3fbf8bc061322531aac99', // Curve.fi factory
    ],
  },
  staticData: {
    pools: CurveContracts,
  },
};

export const CowswapConfigs: ProtocolConfig = {
  protocol: 'cowswap',
  contracts: {
    ethereum: [
      '0x9008d19f58aabd9ed0d60971565aa8510560ab41', // GPv2Settlement
    ],
  },
};

export const LoopringConfigs: ProtocolConfig = {
  protocol: 'loopring',
  contracts: {
    ethereum: [
      '0x0baba1ad5be3a5c0a66e7ac838a129bf948f1ea4', // Exchange v2
    ],
  },
};

export const BancorConfigs: ProtocolConfig = {
  protocol: 'bancor',
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
  contracts: {
    ethereum: [
      '0xa57b8d98dae62b26ec3bcc4a365338157060b234', // Booster
    ],
  },
  staticData: {
    pools: AuraFinanceBoosterPoolsData,
  },
};

export const EnsConfigs: ProtocolConfig = {
  protocol: 'ens',
  contracts: {
    ethereum: [
      '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', // registration controller
    ],
  },
};

export const OptimismConfigs: ProtocolConfig = {
  protocol: 'optimism',
  contracts: {
    ethereum: [
      '0x5e4e65926ba27467555eb562121fac00d24e9dd2', // CanonicalTransactionChain
    ],
  },
};

export const HopConfigs: ProtocolConfig = {
  protocol: 'hop',
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
  contracts: {
    ethereum: [
      '0xc1e088fc1323b20bcbee9bd1b9fc9546db5624c5', // Beanstalk Protocol
    ],
  },
};

export const BlurConfigs: ProtocolConfig = {
  protocol: 'blur',
  contracts: {
    ethereum: [
      '0x000000000000ad05ccc4f10045630fb830b95127', // Blur Marketplace
    ],
  },
};

export const LooksrareConfigs: ProtocolConfig = {
  protocol: 'looksrare',
  contracts: {
    ethereum: [
      '0x59728544b08ab483533076417fbbb2fd0b17ce3a', // Looksrare Exchange
      '0xbcd7254a1d759efa08ec7c3291b2e85c5dcc12ce', // LOOK Staking
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
  contracts: {
    ethereum: [
      '0x00000000006c3852cbef3e08e8df289169ede581', // Seaport 1.1
      '0x00000000000006c7676171937c444f6bde3d6282', // Seaport 1.2
      '0x0000000000000ad24e80fd803c6ac37206a45f15', // Seaport 1.3
      '0x00000000000001ad428e4906ae43d8f9852d0dd6', // Seaport 1.4
    ],
  },
};

export const X2y2Configs: ProtocolConfig = {
  protocol: 'x2y2',
  contracts: {
    ethereum: [
      '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3', // X2y2 Exchange
    ],
  },
};

export const Eth2Configs: ProtocolConfig = {
  protocol: 'eth2',
  contracts: {
    ethereum: [
      '0x00000000219ab540356cbb839cbe05303d7705fa', // Beacon Deposit Contract
    ],
  },
};

export const ChainlinkConfigs: ProtocolConfig = {
  protocol: 'chainlink',
  contracts: {
    ethereum: [],
  },
};

export const ZeroxConfigs: ProtocolConfig = {
  protocol: 'zerox',
  contracts: {
    ethereum: [
      '0xdef1c0ded9bec7f1a1670819833240f027b25eff', // Proxy Exchange
    ],
  },
};

export const ParaswapConfigs: ProtocolConfig = {
  protocol: 'paraswap',
  contracts: {
    ethereum: [
      '0xdef171fe48cf0115b1d80b88dc8eab59176fee57', // Paraswap Augustus Swapper v5
    ],
  },
};

export const YearnConfigs: ProtocolConfig = {
  protocol: 'yearn',
  contracts: {
    ethereum: [
      // We detect yearn vault by checking vault governance address is match with
      // Yearn Treasury or not?
      '0xfeb4acf3df3cdea7399794d0869ef76a6efaff52',
    ],
  },
  customEventMapping: {
    [Signatures['Deposit(address,uint256,uint256)']]: {
      abi: [
        {
          name: 'recipient',
          type: 'address',
          indexed: true,
        },
        {
          name: 'shares',
          type: 'uint256',
          indexed: false,
        },
        {
          name: 'amount',
          type: 'uint256',
          indexed: false,
        },
      ],
    },
    [Signatures['Withdraw(address,uint256,uint256)']]: {
      abi: [
        {
          name: 'recipient',
          type: 'address',
          indexed: true,
        },
        {
          name: 'shares',
          type: 'uint256',
          indexed: false,
        },
        {
          name: 'amount',
          type: 'uint256',
          indexed: false,
        },
      ],
    },
  },
  staticData: {
    vaults: YearnContracts,
  },
};

export const TornadocashConfigs: ProtocolConfig = {
  protocol: 'tornadocash',
  contracts: {
    ethereum: [
      '0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc', // ETH 0.1
      '0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936', // ETH 1
      '0x910cbd523d972eb0a6f4cae4618ad62622b39dbf', // ETH 10
      '0xa160cdab225685da1d56aa342ad8841c3b53f291', // ETH 100
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
    },
  },
};

export const ConvexConfigs: ProtocolConfig = {
  protocol: 'convex',
  contracts: {
    ethereum: [
      '0xf403c135812408bfbe8713b5a23a04b3d48aae31', // Booster
    ],
  },
  staticData: {
    pools: ConvexBoosterPoolsData,
  },
};

export const EulerConfigs: ProtocolConfig = {
  protocol: 'euler',
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
  contracts: {
    ethereum: [
      '0x24179cd81c9e782a4096035f7ec97fb8b783e007', // Borrow Operation
      '0xa39739ef8b0231dbfa0dcda07d7e29faabcf4bb2', // Trove Manager
    ],
  },
  staticData: {
    troveManagerAddress: '0xa39739ef8b0231dbfa0dcda07d7e29faabcf4bb2',
  },
};

export const AbracadabraConfigs: ProtocolConfig = {
  protocol: 'abracadabra',
  contracts: {
    ethereum: [],
  },
  staticData: {
    magicInternetMoney: {
      chain: 'ethereum',
      symbol: 'MIM',
      decimals: 18,
      address: '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3',
    },
    cauldrons: AbracadabraCauldrons,
  },
};

export const MakerConfigs: ProtocolConfig = {
  protocol: 'maker',
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
      '0x60744434d6339a6b27d73d9eda62b6f66a0a04fa', // DAI Flashloan
      '0x0a59649758aa4d66e25f08dd01271e891fe52199', // USDC PSM A GemJoin
      '0x79a0fa989fb7adf1f8e80c93ee605ebb94f7c6a5', // GUSD PSM A GemJoin
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
        address: '0x0a59649758aa4d66e25f08dd01271e891fe52199',
        token: Tokens.ethereum.USDC,
      },
      {
        chain: 'ethereum',
        address: '0x79a0fa989fb7adf1f8e80c93ee605ebb94f7c6a5',
        token: Tokens.ethereum.GUSD,
      },
    ],
  },
};

export const StargateConfigs: ProtocolConfig = {
  protocol: 'stargate',
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
    ],
  },
  staticData: {
    chainIds: {
      ethereum: 101,
      bnbchain: 102,
      avalanche: 106,
      polygon: 109,
      arbitrum: 110,
      optimism: 111,
      fantom: 112,
      metis: 151,
    },
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
    ],
  },
};

export const SiloConfigs: ProtocolConfig = {
  protocol: 'silo',
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
};

export const BeefyConfigs: ProtocolConfig = {
  protocol: 'beefy',
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
  contracts: {
    ethereum: FraxlendPairs.map((item) => item.address),
  },
  staticData: {
    pairs: FraxlendPairs,
  },
};

export const ApecoinConfigs: ProtocolConfig = {
  protocol: 'apecoin',
  contracts: {
    ethereum: [
      '0x5954ab967bc958940b7eb73ee84797dc8a2afbb9', // APE staking
    ],
  },
};

export const GearboxConfigs: ProtocolConfig = {
  protocol: 'gearbox',
  contracts: {
    ethereum: [
      '0xa7df60785e556d65292a2c9a077bb3a8fbf048bc', // Airdrop distributor
      '0x24946bcbbd028d5abb62ad9b635eb1b1a67af668', // Pool DAI
      '0x79012c8d491dcf3a30db20d1f449b14caf01da6c', // Pool FRAX
      '0x86130bdd69143d8a4e5fc50bf4323d48049e98e4', // Pool USDC
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
        token: Tokens.ethereum.DAI,
      },
      {
        chain: 'ethereum',
        address: '0x79012c8d491dcf3a30db20d1f449b14caf01da6c',
        token: Tokens.ethereum.FRAX,
      },
      {
        chain: 'ethereum',
        address: '0x86130bdd69143d8a4e5fc50bf4323d48049e98e4',
        token: Tokens.ethereum.USDC,
      },
      {
        chain: 'ethereum',
        address: '0xb2a015c71c17bcac6af36645dead8c572ba08a08',
        token: Tokens.ethereum.WBTC,
      },
      {
        chain: 'ethereum',
        address: '0xb8cf3ed326bb0e51454361fb37e9e8df6dc5c286',
        token: Tokens.ethereum.wstETH,
      },
    ],
  },
};
