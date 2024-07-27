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

export const CurveSwapEvents = {
  VersionCurveStableSwapNG: {
    TokenExchange: '0x8b3e96f2b889fa771c53c981b40daf005f63f637f1869f707052d15a3dd97140',
    TokenExchangeUnderlying: '0xd013ca23e77a65003c2c659c5442c00c805371b7fc1ebd4c206c41d1536bd90b',
    AddLiquidity: '0x189c623b666b1b45b83d7178f39b8c087cb09774317ca2f53c2d3c3726f222a2',
    RemoveLiquidity: '0x347ad828e58cbe534d8f6b67985d791360756b18f0d95fd9f197a66cc46480ea',
  },
  VersionCurveUsdAmm: {
    TokenExchange: '0xb2e76ae99761dc136e598d4a629bb347eccb9532a5f8bbd72e18467c3c34cc98',
  },
};
