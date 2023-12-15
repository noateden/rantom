import { EventMapping } from '../../../types/configs';

export const CrvusdEventSignatures = {
  Borrow: '0xe1979fe4c35e0cef342fef5668e2c8e7a7e9f5d5d1ca8fee0ac6c427fa4153af',
  Repay: '0x77c6871227e5d2dec8dadd5354f78453203e22e669cd0ec4c19d9a8c5edb31d0',
  RemoveCollateral: '0xe25410a4059619c9594dc6f022fe231b02aaea733f689e7ab0cd21b3d4d0eb54',
  Liquidate: '0x642dd4d37ddd32036b9797cec464c0045dd2118c549066ae6b0f88e32240c2d0',
};

export const CurveAbiMappings: { [key: string]: EventMapping } = {
  [CrvusdEventSignatures.Borrow]: {
    abi: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
      },
      {
        name: 'collateral_increase',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'loan_increase',
        type: 'uint256',
        indexed: false,
      },
    ],
  },
  [CrvusdEventSignatures.Repay]: {
    abi: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
      },
      {
        name: 'collateral_decrease',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'loan_decrease',
        type: 'uint256',
        indexed: false,
      },
    ],
  },
  [CrvusdEventSignatures.RemoveCollateral]: {
    abi: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
      },
      {
        name: 'collateral_decrease',
        type: 'uint256',
        indexed: false,
      },
    ],
  },
  [CrvusdEventSignatures.Liquidate]: {
    abi: [
      {
        name: 'liquidator',
        type: 'address',
        indexed: true,
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
      },
      {
        name: 'collateral_received',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'stablecoin_received',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'debt',
        type: 'uint256',
        indexed: false,
      },
    ],
  },
};
