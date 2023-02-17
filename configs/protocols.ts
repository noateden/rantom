import { normalizeAddress } from '../lib/helper';
import { ProtocolConfig } from '../types/configs';
import { Signatures } from './signatures';

export const Uniswapv2Configs: ProtocolConfig = {
  protocol: 'uniswapv2',
  contracts: {
    ethereum: [
      '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f', // v2 Factory
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
};

export const LidoConfigs: ProtocolConfig = {
  protocol: 'lido',
  contracts: {
    ethereum: [
      '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', // stETH
    ],
  },
};

export const SushiConfigs: ProtocolConfig = {
  protocol: 'sushi',
  contracts: {
    ethereum: [
      '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac', // uni v2 Factory
      '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd', // masterchef
    ],
  },
};

export const PancakeswapConfigs: ProtocolConfig = {
  protocol: 'pancakeswap',
  contracts: {
    ethereum: [
      '0x1097053fd2ea711dad45caccc45eff7548fcb362', // uni v2 Factory
    ],
  },
};

export const BalancerConfigs: ProtocolConfig = {
  protocol: 'balancer',
  contracts: {
    ethereum: [
      '0xba12222222228d8ba445958a75a0704d566bf2c8', // vault
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
};

export const Compoundv3Configs: ProtocolConfig = {
  protocol: 'compoundv3',
  contracts: {
    ethereum: [
      '0xc3d688b66703497daa19211eedff47f25384cdc3', // v3 USDC
      '0xa17581a9e3356d9a858b789d68b4d866e593ae94', // v3 ETH
    ],
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
    ],
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
