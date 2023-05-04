import { Contract } from '../../types/configs';
import PendleAllContracts from '../data/PendleContracts.json';

export const PendleContracts: Array<Contract> = [
  ...PendleAllContracts.syTokens.map((item) => {
    return {
      chain: item.chain,
      protocol: 'pendle',
      abi: {},
      address: item.address,
      birthday: 16308190,
      events: [],
      topics: [
        '0x5fe47ed6d4225326d3303476197d782ded5a4e9c14f479dc9ec4992af4e85d59', // Deposit
        '0xaee47cdf925cf525fdae94f9777ee5a06cac37e1c41220d0a8a89ed154f62d1c', // Redeem
        '0x2193aa20a3717f5f4ac79482f4f553e5f0afe8f4e6ec3e3d1aa2e138adc4763f', // ClaimRewards
      ],
    };
  }),
  ...PendleAllContracts.markets.map((item) => {
    return {
      chain: item.chain,
      protocol: 'pendle',
      abi: {},
      address: item.address,
      birthday: 16308190,
      events: [],
      topics: [
        '0xb4c03061fb5b7fed76389d5af8f2e0ddb09f8c70d1333abbb62582835e10accb', // Mint
        '0x4cf25bc1d991c17529c25213d3cc0cda295eeaad5f13f361969b12ea48015f90', // Burn
        '0x829000a5bc6a12d46e30cdcecd7c56b1efd88f6d7d059da6734a04f3764557c4', // ClaimRewards
      ],
    };
  }),
];