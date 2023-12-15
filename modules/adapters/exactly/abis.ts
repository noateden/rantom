import { EventMapping } from '../../../types/configs';

export const ExactlyEventSignatures = {
  Deposit: '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
  Withdraw: '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db',
  Borrow: '0x96558a334f4759f0e7c423d68c84721860bd8fbf94ddc4e55158ecb125ad04b5',
  Repay: '0xe4a1ae657f49cb1fb1c7d3a94ae6093565c4c8c0e03de488f79c377c3c3a24e0',
  DepositAtMaturity: '0xd9900507c64720c1a5e11858a42769b599616268b832495aa6afe8b9dc566e76',
  WithdrawAtMaturity: '0xe57dbac0e7c42ad5f3b0fadb9c065565377cf771054fca70d35c96e01f9ec53c',
  BorrowAtMaturity: '0x66866b472f27d55d69496091bbd651907b2fb1041b3eeaca6e565ae5b5af4013',
  RepayAtMaturity: '0xf17fce321dd9fb005136a80c0bfb3789e455b7a70be9eb8922f1ad20a80d1a33',
};

export const ExactlyAbiMappings: { [key: string]: EventMapping } = {
  [ExactlyEventSignatures.Deposit]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
  },
  [ExactlyEventSignatures.Withdraw]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
  },
  [ExactlyEventSignatures.Borrow]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
  },
  [ExactlyEventSignatures.Repay]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
  },
  [ExactlyEventSignatures.DepositAtMaturity]: {
    abi: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'maturity',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
  },
  [ExactlyEventSignatures.WithdrawAtMaturity]: {
    abi: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'maturity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'positionAssets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
    ],
  },
  [ExactlyEventSignatures.BorrowAtMaturity]: {
    abi: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'maturity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
  },
  [ExactlyEventSignatures.RepayAtMaturity]: {
    abi: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'maturity',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'positionAssets',
        type: 'uint256',
      },
    ],
  },
};
