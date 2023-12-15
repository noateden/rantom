import { EventMapping } from '../../../types/configs';

export const FraxlendEventSignatures = {
  Deposit: '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
  Withdraw: '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db',
  BorrowAsset: '0x01348584ec81ac7acd52b7d66d9ade986dd909f3d513881c190fc31c90527efe',
  RepayAsset: '0x9dc1449a0ff0c152e18e8289d865b47acc6e1b76b1ecb239c13d6ee22a9206a7',
  AddCollateral: '0xa32435755c235de2976ed44a75a2f85cb01faf0c894f639fe0c32bb9455fea8f',
  RemoveCollateral: '0xbc290bb45104f73cf92115c9603987c3f8fd30c182a13603d8cffa49b5f59952',
  Liquidate: '0x35f432a64bd3767447a456650432406c6cacb885819947a202216eeea6820ecf',
};

export const FraxlendAbiMappings: { [key: string]: EventMapping } = {
  [FraxlendEventSignatures.Deposit]: {
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
  [FraxlendEventSignatures.Withdraw]: {
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
  [FraxlendEventSignatures.BorrowAsset]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_borrower',
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
        name: '_borrowAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_sharesAdded',
        type: 'uint256',
      },
    ],
  },
  [FraxlendEventSignatures.AddCollateral]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_collateralAmount',
        type: 'uint256',
      },
    ],
  },
  [FraxlendEventSignatures.RemoveCollateral]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_collateralAmount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_borrower',
        type: 'address',
      },
    ],
  },
  [FraxlendEventSignatures.RepayAsset]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_payer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountToRepay',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256',
      },
    ],
  },
  [FraxlendEventSignatures.Liquidate]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_collateralForLiquidator',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_sharesToLiquidate',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountLiquidatorToRepay',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_sharesToAdjust',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountToAdjust',
        type: 'uint256',
      },
    ],
  },
};
