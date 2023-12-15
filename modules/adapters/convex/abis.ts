import { EventMapping } from '../../../types/configs';

export const ConvexEventSignatures = {
  // booster
  Deposit: '0x73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca',
  Withdraw: '0x92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc6',

  Staked: '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d', // CVX stake
  Withdrawn: '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5', // CVX unstake
  RewardPaid: '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486', // CVX RewardPaid

  // https://arbiscan.io/address/0xD1fdd572dBBc6F53375C9834DEcc1F489F4D04e7#code
  RewardPaidV2: '0xce405e67b4d6e56e438257e15f160ae28b450e6e7659bbc4c1f4e09a1ac846cb', // CVX RewardPaid

  CvxLockerStaked: '0xb4caaf29adda3eefee3ad552a8e85058589bf834c7466cae4ee58787f70589ed',
  CvxLockerStakedV2: '0x9cfd25589d1eb8ad71e342a86a8524e83522e3936c0803048c08f6d9ad974f40',
  CvxLockerUnstaked: '0x2fd83d5e9f5d240bed47a97a24cf354e4047e25edc2da27b01fd95e5e8a0c9a5',
  CvxLockerRewardPaid: '0x540798df468d7b23d11f156fdb954cb19ad414d150722a7b6d55ba369dea792e',

  // support for aura finance locker
  AuraLockerStakedV2: '0x1449c6dd7851abc30abf37f57715f492010519147cc2652fbc38202c18a6ee90',
};

export const ConvexAbiMappings: { [key: string]: EventMapping } = {
  [ConvexEventSignatures.Deposit]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'poolid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },
  [ConvexEventSignatures.Withdraw]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'poolid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },
  [ConvexEventSignatures.Staked]: {
    abi: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
    ],
  },
  [ConvexEventSignatures.Withdrawn]: {
    abi: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
    ],
  },
  [ConvexEventSignatures.RewardPaid]: {
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
        name: 'reward',
        type: 'uint256',
      },
    ],
  },
  [ConvexEventSignatures.RewardPaidV2]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_rewardToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_rewardAmount',
        type: 'uint256',
      },
    ],
  },

  [ConvexEventSignatures.CvxLockerStaked]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_paidAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lockedAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_boostedAmount',
        type: 'uint256',
      },
    ],
  },
  [ConvexEventSignatures.CvxLockerStakedV2]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_epoch',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_paidAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lockedAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_boostedAmount',
        type: 'uint256',
      },
    ],
  },
  [ConvexEventSignatures.AuraLockerStakedV2]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_paidAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lockedAmount',
        type: 'uint256',
      },
    ],
  },
  [ConvexEventSignatures.CvxLockerUnstaked]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_relocked',
        type: 'bool',
      },
    ],
  },
  [ConvexEventSignatures.CvxLockerRewardPaid]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_rewardsToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_reward',
        type: 'uint256',
      },
    ],
  },
};
