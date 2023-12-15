import { EventMapping } from '../../../types/configs';

export const StakewiseEventSignatures = {
  Claimed: '0xc4687ac57d0a9636a21381dada24ff811c5652e7f9ee442caede1927ecebcb9b',
};

export const StakewiseAbiMappings: { [key: string]: EventMapping } = {
  [StakewiseEventSignatures.Claimed]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'tokens',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
  },
};
