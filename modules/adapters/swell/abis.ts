import { EventMapping } from '../../../types/configs';

export const SwellEventSignatures = {
  ETHDepositReceived: '0xcb2ce03599937ff3d73e67e71a0f37013a6d3b697487823e37bc94da69483986',
  ETHReceived: '0xbfe611b001dfcd411432f7bf0d79b82b4b2ee81511edac123a3403c357fb972a',
};

export const SwellAbiMappings: { [key: string]: EventMapping } = {
  [SwellEventSignatures.ETHDepositReceived]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
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
        name: 'swETHMinted',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newTotalETHDeposited',
        type: 'uint256',
      },
    ],
  },
  [SwellEventSignatures.ETHReceived]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
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
};
