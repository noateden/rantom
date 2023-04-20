import { Contract } from '../../types/configs';

export const AurafinanceContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'aurafinance',
    abi: {},
    address: '0x00a7ba8ae7bca0b10a32ea1f8e2a1da980c6cad2',
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
    protocol: 'aurafinance',
    abi: {},
    address: '0x5e5ea2048475854a5702f5b8468a51ba1296efcc',
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
    protocol: 'aurafinance',
    abi: {},
    address: '0xa57b8d98dae62b26ec3bcc4a365338157060b234',
    birthday: 16308190,
    events: [],
    topics: [
      '0x73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca', // Deposit
      '0x92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc6', // Withdraw
    ],
  },
];
