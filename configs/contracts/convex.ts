import { Contract } from '../../types/configs';

export const ConvexContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'convex',
    abi: {},
    address: '0xcf50b810e57ac33b91dcf525c6ddd9881b139332',
    birthday: 16308190,
    events: [],
    topics: [
      '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d', // Staked
      '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5', // Withdrawn
      '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486', // RewardPaid
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'convex',
    abi: {},
    address: '0x3fe65692bfcd0e6cf84cb1e7d24108e434a7587e',
    birthday: 16308190,
    events: [],
    topics: [
      '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d', // Staked
      '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5', // Withdrawn
      '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486', // RewardPaid
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'convex',
    abi: {},
    address: '0xf403c135812408bfbe8713b5a23a04b3d48aae31',
    birthday: 16308190,
    events: [],
    topics: [
      '0x73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca', // Deposit
      '0x92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc6', // Withdraw
    ],
  },
];
