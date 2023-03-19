import { EventMapping } from '../types/configs';
import { Signatures } from './signatures';

export const EventSignatureMapping: { [key: string]: EventMapping } = {
  [Signatures['Transfer(address,address,uint256)']]: {
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
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Submitted(address,uint256,address)']]: {
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

  // Swap(address,uint256,uint256,uint256,uint256,address)
  [Signatures['Swap(address,uint256,uint256,uint256,uint256,address)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0In',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1In',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0Out',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1Out',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
  },

  [Signatures['Mint(address,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Burn(address,uint256,uint256,address)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
  },

  [Signatures['Swap(address,address,int256,int256,uint160,uint128,int24)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'amount0',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'amount1',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint160',
        name: 'sqrtPriceX96',
        type: 'uint160',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'liquidity',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'int24',
        name: 'tick',
        type: 'int24',
      },
    ],
  },

  [Signatures['Mint(address,address,int24,int24,uint128,uint256,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickLower',
        type: 'int24',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickUpper',
        type: 'int24',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Burn(address,int24,int24,uint128,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickLower',
        type: 'int24',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickUpper',
        type: 'int24',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Collect(address,address,int24,int24,uint128,uint128)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickLower',
        type: 'int24',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickUpper',
        type: 'int24',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'amount0',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'amount1',
        type: 'uint128',
      },
    ],
  },

  [Signatures['Swap(bytes32,address,address,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'poolId',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'tokenIn',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'tokenOut',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
  },

  [Signatures['FlashLoan(address,address,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'contract IFlashLoanRecipient',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'token',
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
        name: 'feeAmount',
        type: 'uint256',
      },
    ],
  },

  [Signatures['PoolBalanceChanged(bytes32,address,address[],int256[],uint256[])']]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'poolId',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'liquidityProvider',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'contract IERC20[]',
        name: 'tokens',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'deltas',
        type: 'int256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'protocolFeeAmounts',
        type: 'uint256[]',
      },
    ],
  },

  [Signatures['Deposit(address,address,uint256,uint16,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_reserve',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
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
        internalType: 'uint16',
        name: '_referral',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_timestamp',
        type: 'uint256',
      },
    ],
  },

  [Signatures['RedeemUnderlying(address,address,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_reserve',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
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
        name: '_timestamp',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Borrow(address,address,uint256,uint256,uint256,uint256,uint256,uint16,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_reserve',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
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
        name: '_borrowRateMode',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_borrowRate',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_originationFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_borrowBalanceIncrease',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint16',
        name: '_referral',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_timestamp',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Repay(address,address,address,uint256,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_reserve',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_repayer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amountMinusFees',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_fees',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_borrowBalanceIncrease',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_timestamp',
        type: 'uint256',
      },
    ],
  },

  [Signatures['FlashLoan(address,address,uint256,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_target',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_reserve',
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
        name: '_totalFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_protocolFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_timestamp',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Deposit(address,address,address,uint256,uint16)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'reserve',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'onBehalfOf',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint16',
        name: 'referral',
        type: 'uint16',
      },
    ],
  },

  [Signatures['Withdraw(address,address,address,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'reserve',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
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

  [Signatures['Borrow(address,address,address,uint256,uint256,uint256,uint16)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'reserve',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'onBehalfOf',
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
        name: 'borrowRateMode',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'borrowRate',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint16',
        name: 'referral',
        type: 'uint16',
      },
    ],
  },

  [Signatures['Repay(address,address,address,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'reserve',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'repayer',
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

  [Signatures['FlashLoan(address,address,address,uint256,uint256,uint16)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'initiator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
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
        name: 'premium',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'referralCode',
        type: 'uint16',
      },
    ],
  },

  [Signatures['Supply(address,address,address,uint256,uint16)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'reserve',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'onBehalfOf',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint16',
        name: 'referralCode',
        type: 'uint16',
      },
    ],
  },

  [Signatures['Borrow(address,address,address,uint256,uint8,uint256,uint16)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'reserve',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'onBehalfOf',
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
        internalType: 'enum DataTypes.InterestRateMode',
        name: 'interestRateMode',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'borrowRate',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint16',
        name: 'referralCode',
        type: 'uint16',
      },
    ],
  },

  [Signatures['Repay(address,address,address,uint256,bool)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'reserve',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'repayer',
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
        internalType: 'bool',
        name: 'useATokens',
        type: 'bool',
      },
    ],
  },

  [Signatures['FlashLoan(address,address,address,uint256,uint8,uint256,uint16)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'initiator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
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
        internalType: 'enum DataTypes.InterestRateMode',
        name: 'interestRateMode',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'premium',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint16',
        name: 'referralCode',
        type: 'uint16',
      },
    ],
  },

  //
  [Signatures['Redeem(address,uint256,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'redeemer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'redeemAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'redeemTokens',
        type: 'uint256',
      },
    ],
  },

  //
  [Signatures['Borrow(address,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'borrowAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'accountBorrows',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalBorrows',
        type: 'uint256',
      },
    ],
  },

  [Signatures['RepayBorrow(address,address,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'payer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'repayAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'accountBorrows',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalBorrows',
        type: 'uint256',
      },
    ],
  },

  [Signatures['LiquidateBorrow(address,address,uint256,address,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'repayAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'cTokenCollateral',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'seizeTokens',
        type: 'uint256',
      },
    ],
  },

  [Signatures['LiquidationCall(address,address,address,uint256,uint256,uint256,address,bool,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_collateral',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_reserve',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_purchaseAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_liquidatedCollateralAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_accruedBorrowInterest',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_receiveAToken',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_timestamp',
        type: 'uint256',
      },
    ],
  },

  [Signatures['LiquidationCall(address,address,address,uint256,uint256,address,bool)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collateralAsset',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'debtAsset',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'debtToCover',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'liquidatedCollateralAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'receiveAToken',
        type: 'bool',
      },
    ],
  },

  [Signatures['DistributedSupplierComp(address,address,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'contract CToken',
        name: 'cToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'supplier',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'compDelta',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'compSupplyIndex',
        type: 'uint256',
      },
    ],
  },

  [Signatures['DistributedBorrowerComp(address,address,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'contract CToken',
        name: 'cToken',
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
        name: 'compDelta',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'compBorrowIndex',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Flashloan(address,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
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
        name: 'totalFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reservesFee',
        type: 'uint256',
      },
    ],
  },

  [Signatures['TokensMinted(address,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
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
        name: 'ethAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'time',
        type: 'uint256',
      },
    ],
  },

  [Signatures['TokensBurned(address,uint256,uint256,uint256)']]: {
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
        name: 'ethAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'time',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Deposit(address,uint256,uint256)']]: {
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
        name: 'pid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Withdraw(address,uint256,uint256)']]: {
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
        name: 'pid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },

  [Signatures['EmergencyWithdraw(address,uint256,uint256)']]: {
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
        name: 'pid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },

  [Signatures['TokenExchange(address,int128,uint256,int128,uint256)']]: {
    abi: [
      {
        type: 'address',
        name: 'buyer',
        indexed: true,
      },
      {
        type: 'int128',
        name: 'sold_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_sold',
        indexed: false,
      },
      {
        type: 'int128',
        name: 'bought_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_bought',
        indexed: false,
      },
    ],
  },

  [Signatures['TokenExchangeUnderlying(address,int128,uint256,int128,uint256)']]: {
    abi: [
      {
        type: 'address',
        name: 'buyer',
        indexed: true,
      },
      {
        type: 'int128',
        name: 'sold_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_sold',
        indexed: false,
      },
      {
        type: 'int128',
        name: 'bought_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_bought',
        indexed: false,
      },
    ],
  },

  [Signatures['AddLiquidity(address,uint256[4],uint256[4],uint256,uint256)']]: {
    abi: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[4]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[4]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
  },

  [Signatures['AddLiquidity(address,uint256[3],uint256[3],uint256,uint256)']]: {
    abi: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[3]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[3]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
  },

  [Signatures['RemoveLiquidity(address,uint256[3],uint256[3],uint256)']]: {
    abi: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[3]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[3]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
  },

  [Signatures['RemoveLiquidityImbalance(address,uint256[3],uint256[3],uint256,uint256)']]: {
    abi: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[3]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[3]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
  },

  [Signatures['RemoveLiquidityOne(address,uint256,uint256)']]: {
    abi: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'token_amount',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'coin_amount',
        indexed: false,
      },
    ],
  },

  [Signatures['RemoveLiquidityOne(address,uint256,uint256,uint256)']]: {
    abi: [
      {
        name: 'provider',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token_amount',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'coin_index',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'coin_amount',
        type: 'uint256',
        indexed: false,
      },
    ],
  },

  [Signatures['TokenExchange(address,uint256,uint256,uint256,uint256)']]: {
    abi: [
      {
        name: 'buyer',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sold_id',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokens_sold',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bought_id',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokens_bought',
        type: 'uint256',
        indexed: false,
      },
    ],
  },

  [Signatures['AddLiquidity(address,uint256[3],uint256,uint256)']]: {
    abi: [
      {
        name: 'provider',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token_amounts',
        type: 'uint256[3]',
        indexed: false,
      },
      {
        name: 'fee',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'token_supply',
        type: 'uint256',
        indexed: false,
      },
    ],
  },

  [Signatures['RemoveLiquidity(address,uint256[3],uint256)']]: {
    abi: [
      {
        name: 'provider',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token_amounts',
        type: 'uint256[3]',
        indexed: false,
      },
      {
        name: 'token_supply',
        type: 'uint256',
        indexed: false,
      },
    ],
  },

  [Signatures['AddLiquidity(address,uint256[2],uint256[2],uint256,uint256)']]: {
    abi: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[2]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[2]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
  },

  [Signatures['RemoveLiquidity(address,uint256[2],uint256[2],uint256)']]: {
    abi: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[2]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[2]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
  },

  [Signatures['RemoveLiquidityImbalance(address,uint256[2],uint256[2],uint256,uint256)']]: {
    abi: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[2]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[2]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
  },

  [Signatures['AddLiquidity(address,uint256[2],uint256,uint256)']]: {
    abi: [
      {
        name: 'provider',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token_amounts',
        type: 'uint256[2]',
        indexed: false,
      },
      {
        name: 'fee',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'token_supply',
        type: 'uint256',
        indexed: false,
      },
    ],
  },

  [Signatures['RemoveLiquidity(address,uint256[2],uint256)']]: {
    abi: [
      {
        name: 'provider',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token_amounts',
        type: 'uint256[2]',
        indexed: false,
      },
      {
        name: 'token_supply',
        type: 'uint256',
        indexed: false,
      },
    ],
  },

  [Signatures['RemoveLiquidity(address,uint256[4],uint256[4],uint256)']]: {
    abi: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[4]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[4]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
  },

  [Signatures['Trade(address,address,address,uint256,uint256,uint256,bytes)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'sellToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'buyToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sellAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'buyAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'orderUid',
        type: 'bytes',
      },
    ],
  },

  [Signatures['DepositRequested(address,address,address,uint16,uint96)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'tokenId',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'amount',
        type: 'uint96',
      },
    ],
  },

  [Signatures['WithdrawalCompleted(uint8,address,address,address,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'category',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
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

  [Signatures['TokensTraded(bytes32,address,address,uint256,uint256,uint256,uint256,uint256,address)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'contextId',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'contract Token',
        name: 'sourceToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract Token',
        name: 'targetToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sourceAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bntAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetFeeAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bntFeeAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'trader',
        type: 'address',
      },
    ],
  },

  [Signatures['TokensDeposited(bytes32,address,address,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'contextId',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'provider',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract Token',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'poolTokenAmount',
        type: 'uint256',
      },
    ],
  },

  [Signatures['TokensWithdrawn(bytes32,address,address,uint256,uint256,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'contextId',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'provider',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract Token',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'poolTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'externalProtectionBaseTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bntAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'withdrawalFeeAmount',
        type: 'uint256',
      },
    ],
  },

  [Signatures['FlashLoanCompleted(address,address,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'contract Token',
        name: 'token',
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
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeAmount',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Deposited(address,uint256,uint256)']]: {
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
        name: 'poolid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Withdrawn(address,uint256,uint256)']]: {
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
        name: 'poolid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },

  [Signatures['RewardPaid(address,uint256)']]: {
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
        name: 'reward',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Supply(address,address,uint256)']]: {
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
        name: 'dst',
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

  [Signatures['Withdraw(address,address,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'src',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
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

  [Signatures['SupplyCollateral(address,address,address,uint256)']]: {
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
        name: 'dst',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
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

  [Signatures['WithdrawCollateral(address,address,address,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'src',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
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

  [Signatures['AbsorbCollateral(address,address,address,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'absorber',
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
        name: 'asset',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collateralAbsorbed',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'usdValue',
        type: 'uint256',
      },
    ],
  },

  [Signatures['NameRegistered(string,bytes32,address,uint256,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'label',
        type: 'bytes32',
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
        name: 'cost',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expires',
        type: 'uint256',
      },
    ],
  },

  [Signatures['NameRenewed(string,bytes32,uint256,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'label',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cost',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expires',
        type: 'uint256',
      },
    ],
  },

  [Signatures['SequencerBatchAppended(uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_startingQueueIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_numQueueElements',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_totalElements',
        type: 'uint256',
      },
    ],
  },

  [Signatures['TransferSentToL2(uint256,address,uint256,uint256,uint256,address,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
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
        name: 'amountOutMin',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'relayer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'relayerFee',
        type: 'uint256',
      },
    ],
  },

  [Signatures['LogAnySwapIn(bytes32,address,address,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'txhash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
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
        name: 'fromChainID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'toChainID',
        type: 'uint256',
      },
    ],
  },

  [Signatures['LogAnySwapOut(address,address,address,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
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
        name: 'fromChainID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'toChainID',
        type: 'uint256',
      },
    ],
  },

  [Signatures['AddDeposit(address,address,uint32,uint256,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'season',
        type: 'uint32',
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
        name: 'bdv',
        type: 'uint256',
      },
    ],
  },

  [Signatures['AddWithdrawal(address,address,uint32,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'season',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Sow(address,uint256,uint256,uint256)']]: {
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
        internalType: 'uint256',
        name: 'beans',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pods',
        type: 'uint256',
      },
    ],
  },

  [Signatures['Harvest(address,uint256[],uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'plots',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'beans',
        type: 'uint256',
      },
    ],
  },

  [Signatures['RemoveWithdrawal(address,address,uint32,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'season',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },

  [Signatures['RemoveWithdrawals(address,address,uint32[],uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32[]',
        name: 'seasons',
        type: 'uint32[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
  },

  // Blur.io https://etherscan.io/address/0x000000000000ad05ccc4f10045630fb830b95127
  // OrdersMatched event
  '0x61cbb2a3dee0b6064c2e681aadd61677fb4ef319f0b547508d495626f5a62f64': {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'trader',
            type: 'address',
          },
          {
            internalType: 'enum Side',
            name: 'side',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'matchingPolicy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'collection',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'paymentToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'listingTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTime',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint16',
                name: 'rate',
                type: 'uint16',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'extraParams',
            type: 'bytes',
          },
        ],
        indexed: false,
        internalType: 'struct Order',
        name: 'sell',
        type: 'tuple',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'sellHash',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'trader',
            type: 'address',
          },
          {
            internalType: 'enum Side',
            name: 'side',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'matchingPolicy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'collection',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'paymentToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'listingTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTime',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint16',
                name: 'rate',
                type: 'uint16',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'struct Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'extraParams',
            type: 'bytes',
          },
        ],
        indexed: false,
        internalType: 'struct Order',
        name: 'buy',
        type: 'tuple',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'buyHash',
        type: 'bytes32',
      },
    ],
  },

  [Signatures['TakerBid(bytes32,uint256,address,address,address,address,address,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'orderNonce',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'strategy',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
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
        name: 'price',
        type: 'uint256',
      },
    ],
  },

  [Signatures['TakerAsk(bytes32,uint256,address,address,address,address,address,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'orderNonce',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'strategy',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collection',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
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
        name: 'price',
        type: 'uint256',
      },
    ],
  },

  [Signatures['RoyaltyPayment(address,uint256,address,address,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'collection',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'royaltyRecipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'currency',
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

  // Opensea.io
  // OrderFulfilled event
  '0x9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f31': {
    abi: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'offerer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'zone',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'enum ItemType',
            name: 'itemType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'identifier',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct SpentItem[]',
        name: 'offer',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'enum ItemType',
            name: 'itemType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'identifier',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address payable',
            name: 'recipient',
            type: 'address',
          },
        ],
        indexed: false,
        internalType: 'struct ReceivedItem[]',
        name: 'consideration',
        type: 'tuple[]',
      },
    ],
  },

  // x2y2 exchange: https://etherscan.io/address/0x74312363e45dcaba76c59ec49a7aa8a65a67eed3
  // EvInventory event
  '0x3cbb63f144840e5b1b0a38a7c19211d2e89de4d7c5faf8b2d3c1776c302d1d33': {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'itemHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'orderSalt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'settleSalt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'intent',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'delegateType',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'contract IERC20Upgradeable',
        name: 'currency',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'dataMask',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        indexed: false,
        internalType: 'struct Market.OrderItem',
        name: 'item',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum Market.Op',
            name: 'op',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'orderIdx',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'itemIdx',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'itemHash',
            type: 'bytes32',
          },
          {
            internalType: 'contract IDelegate',
            name: 'executionDelegate',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'dataReplacement',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'bidIncentivePct',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'aucMinIncrementPct',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'aucIncDurationSecs',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'percentage',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
            ],
            internalType: 'struct Market.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
        ],
        indexed: false,
        internalType: 'struct Market.SettleDetail',
        name: 'detail',
        type: 'tuple',
      },
    ],
  },

  [Signatures['DepositEvent(bytes,bytes,bytes,bytes,bytes)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'bytes',
        name: 'pubkey',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'withdrawal_credentials',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'amount',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'index',
        type: 'bytes',
      },
    ],
  },

  [Signatures['NewTransmission(uint32,int192,address,int192[],bytes,bytes32)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'uint32',
        name: 'aggregatorRoundId',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'int192',
        name: 'answer',
        type: 'int192',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'transmitter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int192[]',
        name: 'observations',
        type: 'int192[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'observers',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'rawReportContext',
        type: 'bytes32',
      },
    ],
  },

  [Signatures['TransformedERC20(address,address,address,uint256,uint256)']]: {
    abi: [
      { indexed: true, internalType: 'address', name: 'taker', type: 'address' },
      { indexed: false, internalType: 'address', name: 'inputToken', type: 'address' },
      { indexed: false, internalType: 'address', name: 'outputToken', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'inputTokenAmount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'outputTokenAmount', type: 'uint256' },
    ],
  },

  [Signatures['Swapped2(bytes16,address,uint256,address,address,address,address,uint256,uint256,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'bytes16',
        name: 'uuid',
        type: 'bytes16',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feePercent',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'initiator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'srcToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'srcAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'receivedAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expectedAmount',
        type: 'uint256',
      },
    ],
  },
  [Signatures['Deposit(bytes32,uint32,uint256)']]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'commitment',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'leafIndex',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
  },
  [Signatures['Withdrawal(address,bytes32,address,uint256)']]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'nullifierHash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'relayer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
  },
};
