import { EventMapping } from '../../../types/configs';

export const LidoEventSignatures = {
  Submitted: '0x96a25c8ce0baabc1fdefd93e9ed25d8e092a3332f3aa9a41722b5697231d1d1a',
  SubmitEvent: '0x98d2bc018caf34c71a8f920d9d93d4ed62e9789506b74087b48570c17b28ed99',
  ClaimTokensEvent: '0xaca94a3466fab333b79851ab29b0715612740e4ae0d891ef8e9bd2a1bf5e24dd',
  WithdrawalClaimed: '0x6ad26c5e238e7d002799f9a5db07e81ef14e37386ae03496d7a7ef04713e145b',
};

export const LidoAbiMappings: { [key: string]: EventMapping } = {
  [LidoEventSignatures.Submitted]: {
    abi: [
      {
        indexed: true,
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'referral',
        type: 'address',
      },
    ],
  },
  [LidoEventSignatures.SubmitEvent]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_referral',
        type: 'address',
      },
    ],
  },
  [LidoEventSignatures.ClaimTokensEvent]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_amountClaimed',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountBurned',
        type: 'uint256',
      },
    ],
  },
  [LidoEventSignatures.WithdrawalClaimed]: {
    abi: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountOfETH',
        type: 'uint256',
      },
    ],
  },
};
