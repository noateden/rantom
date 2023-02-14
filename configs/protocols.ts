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
