import { EventMapping } from '../../../types/configs';

export const ApecoinEventSignatures = {
  Deposit: '0xe31c7b8d08ee7db0afa68782e1028ef92305caeea8626633ad44d413e30f6b2f',
  DepositNft: '0x8863bdbe28273fa04cbc67c9e51785cff607a419b43ee367e4c3c01edb1d7b56',
  Withdraw: '0x56c54ba9bd38d8fd62012e42c7ee564519b09763c426d331b3661b537ead19b2',
  WithdrawNft: '0x46916533b23d6665275e4143ec7eeb4b6b4ae92178ebbfe99f112564d2c7b1aa',
  ClaimRewards: '0x030f754a3e747235920c21afeca14e881b260d41c7e657ada6c0b049f7eebca9',
  ClaimRewardsNft: '0xd334b3114fc25cbd72389ff9c361d5f8b0924e35fa237c65ac209a2cdcf4ba13',
};

export const ApecoinAbiMappings: { [key: string]: EventMapping } = {
  [ApecoinEventSignatures.Deposit]: {
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
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
  },
  [ApecoinEventSignatures.DepositNft]: {
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
        name: 'poolId',
        type: 'uint256',
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
        name: 'tokenId',
        type: 'uint256',
      },
    ],
  },
  [ApecoinEventSignatures.Withdraw]: {
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
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
  },
  [ApecoinEventSignatures.WithdrawNft]: {
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
        name: 'poolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
  },
  [ApecoinEventSignatures.ClaimRewards]: {
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
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
  },
  [ApecoinEventSignatures.ClaimRewardsNft]: {
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
        name: 'poolId',
        type: 'uint256',
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
        name: 'tokenId',
        type: 'uint256',
      },
    ],
  },
};
