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
};
