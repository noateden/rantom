import { Contract } from '../../types/configs';

export const StakewiseContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'stakewise',
    abi: {},
    address: '0xfe2e637202056d30016725477c5da089ab0a043a',
    birthday: 16308190,
    events: [],
    topics: [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'stakewise',
    abi: {},
    address: '0xa3f21010e8b9a3930996c8849df38f9ca3647c20',
    birthday: 16308190,
    events: [],
    topics: [
      '0xc4687ac57d0a9636a21381dada24ff811c5652e7f9ee442caede1927ecebcb9b', // Claimed
    ],
  },
];
