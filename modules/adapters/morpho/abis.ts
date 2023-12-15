import { EventMapping } from '../../../types/configs';

export const MorphoEventSignatures = {
  Supplied: '0x11adb3570ba55fd255b1f04252ca0071ae6639c86d4fd69e7c1bf1688afb493f',
  Withdrawn: '0x378f9d375cd79e36c19c26a9e57791fe7cd5953b61986c01ebf980c0efb92801',
  Borrowed: '0xc1cba78646fef030830d099fc25cb498953709c9d47d883848f81fd207174c9f',
  Repaid: '0x7b417e520d2b905fc5a1689d29d329358dd55efc60ed115aa165b0a2b64232c6',
  Liquidated: '0xc2c75a73164c2efcbb9f74bfa511cd0866489d90687831a7217b3dbeeb697088',

  // new signatures from Aave v3 optimizer
  CollateralSupplied: '0x4d1fc6dc36972a1eeab2351fae829d06c827d7ee429880dbf762ec00b805fb2f',
  CollateralWithdrawn: '0xb49f4cffa4b6674963440a1fb6cb419c233a9341280f44d8543571eca1306577',
  AaveV3Borrowed: '0xf99275e3db7a3400181f0bd088002bba02b833be9187bccc88fbbc79fb52f2f1',
  AaveV3Withdrawn: '0x6a9c828ef646db99cc7a20bbfb02fdf8f7dcc183400a28daab4968e47b9a21e0',
};

export const MorphoAbiMappings: { [key: string]: EventMapping } = {
  [MorphoEventSignatures.Supplied]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_onBehalf',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_poolToken',
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
        internalType: 'uint256',
        name: '_balanceOnPool',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_balanceInP2P',
        type: 'uint256',
      },
    ],
  },
  [MorphoEventSignatures.Withdrawn]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_supplier',
        type: 'address',
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
        name: '_poolToken',
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
        internalType: 'uint256',
        name: '_balanceOnPool',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_balanceInP2P',
        type: 'uint256',
      },
    ],
  },
  [MorphoEventSignatures.Borrowed]: {
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
        name: '_poolToken',
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
        internalType: 'uint256',
        name: '_balanceOnPool',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_balanceInP2P',
        type: 'uint256',
      },
    ],
  },
  [MorphoEventSignatures.Repaid]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_repayer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_onBehalf',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_poolToken',
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
        internalType: 'uint256',
        name: '_balanceOnPool',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_balanceInP2P',
        type: 'uint256',
      },
    ],
  },
  [MorphoEventSignatures.Liquidated]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: '_liquidator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_liquidated',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_poolTokenBorrowed',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountRepaid',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_poolTokenCollateral',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountSeized',
        type: 'uint256',
      },
    ],
  },
};

export const MorphoAavev3AbiMappings: { [key: string]: EventMapping } = {
  [MorphoEventSignatures.Supplied]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'onBehalf',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'underlying',
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
        name: 'scaledOnPool',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'scaledInP2P',
        type: 'uint256',
      },
    ],
  },
  [MorphoEventSignatures.Repaid]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'repayer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'onBehalf',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'underlying',
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
        name: 'scaledOnPool',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'scaledInP2P',
        type: 'uint256',
      },
    ],
  },
  [MorphoEventSignatures.Liquidated]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'underlyingBorrowed',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountLiquidated',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'underlyingCollateral',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountSeized',
        type: 'uint256',
      },
    ],
  },
  [MorphoEventSignatures.CollateralSupplied]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'onBehalf',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'underlying',
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
        name: 'scaledBalance',
        type: 'uint256',
      },
    ],
  },
  [MorphoEventSignatures.CollateralWithdrawn]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'onBehalf',
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
        name: 'underlying',
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
        name: 'scaledBalance',
        type: 'uint256',
      },
    ],
  },
  [MorphoEventSignatures.AaveV3Borrowed]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'onBehalf',
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
        name: 'underlying',
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
        name: 'scaledOnPool',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'scaledInP2P',
        type: 'uint256',
      },
    ],
  },
  [MorphoEventSignatures.AaveV3Withdrawn]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'onBehalf',
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
        name: 'underlying',
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
        name: 'scaledOnPool',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'scaledInP2P',
        type: 'uint256',
      },
    ],
  },
};
