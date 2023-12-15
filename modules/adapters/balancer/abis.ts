import { EventMapping } from '../../../types/configs';

export const BalancerEventSignatures = {
  // veBAL
  Deposit: '0x4566dfc29f6f11d13a418c26a02bef7c28bae749d4de47e4e6a7cddea6730d59',
  Withdraw: '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568',

  // Vault
  Swap: '0x2170c741c41531aec20e7c107c24eecfdd15e69c9bb0a8dd37b1840b9e0b207b',
  FlashLoan: '0x0d7d75e01ab95780d3cd1c8ec0dd6c2ce19e3a20427eec8bf53283b6fb8e95f0',
  PoolChanges: '0xe5ce249087ce04f05a957192435400fd97868dba0e6a4b4c049abf8af80dae78',
};

export const BalancerAbiMappings: { [key: string]: EventMapping } = {
  [BalancerEventSignatures.Deposit]: {
    abi: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'value',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'locktime',
        indexed: true,
      },
      {
        type: 'int128',
        name: 'type',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'ts',
        indexed: false,
      },
    ],
  },
  [BalancerEventSignatures.Withdraw]: {
    abi: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'value',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'ts',
        indexed: false,
      },
    ],
  },
  [BalancerEventSignatures.Swap]: {
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
  [BalancerEventSignatures.FlashLoan]: {
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
  [BalancerEventSignatures.PoolChanges]: {
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
};
