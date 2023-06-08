import { Contract } from '../../types/configs';

export const CrvusdContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'crvusd',
    abi: {},
    address: '0x8472a9a7632b173c8cf3a86d3afec50c35548e76',
    birthday: 17258064,
    events: [],
    topics: [
      '0xe1979fe4c35e0cef342fef5668e2c8e7a7e9f5d5d1ca8fee0ac6c427fa4153af', // Borrow
      '0x77c6871227e5d2dec8dadd5354f78453203e22e669cd0ec4c19d9a8c5edb31d0', // Repay
      '0xe25410a4059619c9594dc6f022fe231b02aaea733f689e7ab0cd21b3d4d0eb54', // RemoveCollateral
      '0x642dd4d37ddd32036b9797cec464c0045dd2118c549066ae6b0f88e32240c2d0', // Liquidate
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'crvusd',
    abi: {},
    address: '0x100daa78fc509db39ef7d04de0c1abd299f4c6ce',
    birthday: 17432225,
    events: [],
    topics: [
      '0xe1979fe4c35e0cef342fef5668e2c8e7a7e9f5d5d1ca8fee0ac6c427fa4153af', // Borrow
      '0x77c6871227e5d2dec8dadd5354f78453203e22e669cd0ec4c19d9a8c5edb31d0', // Repay
      '0xe25410a4059619c9594dc6f022fe231b02aaea733f689e7ab0cd21b3d4d0eb54', // RemoveCollateral
      '0x642dd4d37ddd32036b9797cec464c0045dd2118c549066ae6b0f88e32240c2d0', // Liquidate
    ],
  },
];
