import { ContractConfig, ProtocolConfig } from '../../types/configs';
import { StakingPoolConstant } from '../../types/domains';

const ConvexBooster: ContractConfig = {
  chain: 'ethereum',
  protocol: 'convex',
  address: '0xf403c135812408bfbe8713b5a23a04b3d48aae31',
};

const ConvexBoosterArbitrum: ContractConfig = {
  chain: 'arbitrum',
  protocol: 'convex',
  address: '0xf403c135812408bfbe8713b5a23a04b3d48aae31',
};

const ConvexBoosterPolygon: ContractConfig = {
  chain: 'polygon',
  protocol: 'convex',
  address: '0xf403c135812408bfbe8713b5a23a04b3d48aae31',
};

export interface ConvexStakingPoolConstant extends StakingPoolConstant {
  rewardContract: string;
}

export const ConvexConfigs: ProtocolConfig = {
  protocol: 'convex',
  contracts: [
    ConvexBooster,
    ConvexBoosterArbitrum,
    ConvexBoosterPolygon,
    {
      chain: 'ethereum',
      protocol: 'convex',
      address: '0xcf50b810e57ac33b91dcf525c6ddd9881b139332', // Stake CVX earn CRV
    },
    {
      chain: 'ethereum',
      protocol: 'convex',
      address: '0x3fe65692bfcd0e6cf84cb1e7d24108e434a7587e', // Stake cvxCRV earn CRV
    },
    {
      chain: 'ethereum',
      protocol: 'convex',
      address: '0xd18140b4b819b895a3dba5442f959fa44994af50', // CVX locker old
    },
    {
      chain: 'ethereum',
      protocol: 'convex',
      address: '0x72a19342e8f1838460ebfccef09f6585e32db86e', // CVX locker v2
    },
  ],
};
