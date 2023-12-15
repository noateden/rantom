import { EventMapping } from '../../../types/configs';

export const AnkrEventSignatures = {
  // ankrETH staking
  StakeConfirmed: '0x995d6cdbf356b73aa4dff24e951558cc155c9bb0397786ec4a142f9470f50007',
  PendingUnstake: '0xc5130045b6f6c9e2944ccea448ad17c279db68237b8aa856ee12cbfaa25f7715',
  RewardsClaimed: '0x9310ccfcb8de723f578a9e4282ea9f521f05ae40dc08f3068dfad528a65ee3c7',

  // ankrBNB staking
  Staked: '0x3df45cb339f96ae4bdb793efcb6e22100dd0dc4fd739a4ee2033fe67ea35af96',
  Unstaked: '0xad145f1b26afda04058ac140badd5b2ae9369e46bf2e2a519fcdb40b65289c4a',
};

export const AnkrAbiMappings: { [key: string]: EventMapping } = {
  [AnkrEventSignatures.StakeConfirmed]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'staker',
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
  [AnkrEventSignatures.PendingUnstake]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'ownerAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiverAddress',
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
        internalType: 'bool',
        name: 'isAETH',
        type: 'bool',
      },
    ],
  },
  [AnkrEventSignatures.RewardsClaimed]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiverAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'claimer',
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
  [AnkrEventSignatures.Staked]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'staker',
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
        name: 'shares',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'bool',
        name: 'isRebasing',
        type: 'bool',
      },
    ],
  },
  [AnkrEventSignatures.Unstaked]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'ownerAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiverAddress',
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
        name: 'shares',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'bool',
        name: 'isRebasing',
        type: 'bool',
      },
    ],
  },
};
