import { ContractConfig, Token } from '../../types/configs';
import EthereumTokens from '../tokenlists/ethereum.json';
import { LiquityConfig } from './liquity';

const mkUSDToken: Token = {
  chain: 'ethereum',
  address: '0x4591dbff62656e7859afe5e45f6f47d3669fbb28',
  symbol: 'mkUSD',
  decimals: 18,
};

const sfrxETH: Token = {
  chain: 'ethereum',
  address: '0xac3e018457b222d93114458476f3e3416abbe38f',
  symbol: 'sfrxETH',
  decimals: 18,
};

const PrismaBorrowOperation: ContractConfig = {
  chain: 'ethereum',
  protocol: 'prisma',
  address: '0x72c590349535ad52e6953744cb2a36b409542719',
};
const PrismaTroveManager_sfrxETH: ContractConfig = {
  chain: 'ethereum',
  protocol: 'prisma',
  address: '0xf69282a7e7ba5428f92f610e7afa1c0cedc4e483',
};
const PrismaTroveManager_wstETH: ContractConfig = {
  chain: 'ethereum',
  protocol: 'prisma',
  address: '0xbf6883a03fd2fcfa1b9fc588ad6193b3c3178f8f',
};
const PrismaTroveManager_rETH: ContractConfig = {
  chain: 'ethereum',
  protocol: 'prisma',
  address: '0xe0e255fd5281bec3bb8fa1569a20097d9064e445',
};
const PrismaTroveManager_cbETH: ContractConfig = {
  chain: 'ethereum',
  protocol: 'prisma',
  address: '0x63cc74334f4b1119276667cf0079ac0c8a96cfb2',
};

export const PrismaConfigs: LiquityConfig = {
  protocol: 'prisma',
  contracts: [PrismaBorrowOperation, PrismaTroveManager_sfrxETH],
  markets: [
    {
      chain: 'ethereum',
      protocol: 'prisma',
      borrowOperation: PrismaBorrowOperation,
      troveManager: PrismaTroveManager_sfrxETH,
      debtToken: mkUSDToken,
      collToken: sfrxETH,
    },
    {
      chain: 'ethereum',
      protocol: 'prisma',
      borrowOperation: PrismaBorrowOperation,
      troveManager: PrismaTroveManager_wstETH,
      debtToken: mkUSDToken,
      collToken: EthereumTokens.wstETH,
    },
    {
      chain: 'ethereum',
      protocol: 'prisma',
      borrowOperation: PrismaBorrowOperation,
      troveManager: PrismaTroveManager_rETH,
      debtToken: mkUSDToken,
      collToken: EthereumTokens.rETH,
    },
    {
      chain: 'ethereum',
      protocol: 'prisma',
      borrowOperation: PrismaBorrowOperation,
      troveManager: PrismaTroveManager_cbETH,
      debtToken: mkUSDToken,
      collToken: EthereumTokens.cbETH,
    },
  ],
};
