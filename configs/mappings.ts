import { EventMapping } from '../types/configs';

export const EventSignatureMapping: { [key: string]: EventMapping } = {
  // Transfer(address,address,uint256)
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef': {
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
    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  },

  // Submitted(address,uint256,address)
  '0x96a25c8ce0baabc1fdefd93e9ed25d8e092a3332f3aa9a41722b5697231d1d1a': {
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
    signature: '0x96a25c8ce0baabc1fdefd93e9ed25d8e092a3332f3aa9a41722b5697231d1d1a',
  },

  // Swap(address,uint256,uint256,uint256,uint256,address)
  '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822': {
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
    signature: '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
  },

  // Mint(address,uint256,uint256)
  '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f': {
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
    signature: '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
  },

  // Burn(address,uint256,uint256,address)
  '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496': {
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
    signature: '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496',
  },

  // Swap(address,address,int256,int256,uint160,uint128,int24)
  '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67': {
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
    signature: '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67',
  },

  // Mint(address,address,int24,int24,uint128,uint256,uint256)
  '0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde': {
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
    signature: '0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde',
  },

  // Burn(address,int24,int24,uint128,uint256,uint256)
  '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c': {
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
    signature: '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c',
  },

  // Collect(address,address,int24,int24,uint128,uint128)
  '0x70935338e69775456a85ddef226c395fb668b63fa0115f5f20610b388e6ca9c0': {
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
    signature: '0x70935338e69775456a85ddef226c395fb668b63fa0115f5f20610b388e6ca9c0',
  },

  // Swap(bytes32,address,address,uint256,uint256)
  '0x2170c741c41531aec20e7c107c24eecfdd15e69c9bb0a8dd37b1840b9e0b207b': {
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
    signature: '0x2170c741c41531aec20e7c107c24eecfdd15e69c9bb0a8dd37b1840b9e0b207b',
  },

  // FlashLoan(address,address,uint256,uint256)
  '0x0d7d75e01ab95780d3cd1c8ec0dd6c2ce19e3a20427eec8bf53283b6fb8e95f0': {
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
    signature: '0x0d7d75e01ab95780d3cd1c8ec0dd6c2ce19e3a20427eec8bf53283b6fb8e95f0',
  },

  // PoolBalanceChanged(bytes32,address,address[],int256[],uint256[])
  '0xe5ce249087ce04f05a957192435400fd97868dba0e6a4b4c049abf8af80dae78': {
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
    signature: '0xe5ce249087ce04f05a957192435400fd97868dba0e6a4b4c049abf8af80dae78',
  },

  // Deposit(address,address,uint256,uint16,uint256)
  '0xc12c57b1c73a2c3a2ea4613e9476abb3d8d146857aab7329e24243fb59710c82': {
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
    signature: '0xc12c57b1c73a2c3a2ea4613e9476abb3d8d146857aab7329e24243fb59710c82',
  },

  // RedeemUnderlying(address,address,uint256,uint256)
  '0x9c4ed599cd8555b9c1e8cd7643240d7d71eb76b792948c49fcb4d411f7b6b3c6': {
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
    signature: '0x9c4ed599cd8555b9c1e8cd7643240d7d71eb76b792948c49fcb4d411f7b6b3c6',
  },

  // Borrow(address,address,uint256,uint256,uint256,uint256,uint256,uint16,uint256)
  '0x1e77446728e5558aa1b7e81e0cdab9cc1b075ba893b740600c76a315c2caa553': {
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
    signature: '0x1e77446728e5558aa1b7e81e0cdab9cc1b075ba893b740600c76a315c2caa553',
  },

  // Repay(address,address,address,uint256,uint256,uint256,uint256)
  '0xb718f0b14f03d8c3adf35b15e3da52421b042ac879e5a689011a8b1e0036773d': {
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
    signature: '0xb718f0b14f03d8c3adf35b15e3da52421b042ac879e5a689011a8b1e0036773d',
  },

  // FlashLoan(address,address,uint256,uint256,uint256,uint256)
  '0x5b8f46461c1dd69fb968f1a003acee221ea3e19540e350233b612ddb43433b55': {
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
    signature: '0x5b8f46461c1dd69fb968f1a003acee221ea3e19540e350233b612ddb43433b55',
  },

  // Deposit(address,address,address,uint256,uint16)
  '0xde6857219544bb5b7746f48ed30be6386fefc61b2f864cacf559893bf50fd951': {
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
    signature: '0xde6857219544bb5b7746f48ed30be6386fefc61b2f864cacf559893bf50fd951',
  },

  // Withdraw(address,address,address,uint256)
  '0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7': {
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
    signature: '0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7',
  },

  // Borrow(address,address,address,uint256,uint256,uint256,uint16)
  '0xc6a898309e823ee50bac64e45ca8adba6690e99e7841c45d754e2a38e9019d9b': {
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
    signature: '0xc6a898309e823ee50bac64e45ca8adba6690e99e7841c45d754e2a38e9019d9b',
  },

  // Repay(address,address,address,uint256)
  '0x4cdde6e09bb755c9a5589ebaec640bbfedff1362d4b255ebf8339782b9942faa': {
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
    signature: '0x4cdde6e09bb755c9a5589ebaec640bbfedff1362d4b255ebf8339782b9942faa',
  },

  // FlashLoan(address,address,address,uint256,uint256,uint16)
  '0x631042c832b07452973831137f2d73e395028b44b250dedc5abb0ee766e168ac': {
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
    signature: '0x631042c832b07452973831137f2d73e395028b44b250dedc5abb0ee766e168ac',
  },

  // Supply(address,address,address,uint256,uint16)
  '0x2b627736bca15cd5381dcf80b0bf11fd197d01a037c52b927a881a10fb73ba61': {
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
    signature: '0x2b627736bca15cd5381dcf80b0bf11fd197d01a037c52b927a881a10fb73ba61',
  },

  // Borrow(address,address,address,uint256,uint8,uint256,uint16)
  '0xb3d084820fb1a9decffb176436bd02558d15fac9b0ddfed8c465bc7359d7dce0': {
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
    signature: '0xb3d084820fb1a9decffb176436bd02558d15fac9b0ddfed8c465bc7359d7dce0',
  },

  // Repay(address,address,address,uint256,bool)
  '0xa534c8dbe71f871f9f3530e97a74601fea17b426cae02e1c5aee42c96c784051': {
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
    signature: '0xa534c8dbe71f871f9f3530e97a74601fea17b426cae02e1c5aee42c96c784051',
  },

  // FlashLoan(address,address,address,uint256,uint8,uint256,uint16)
  '0xefefaba5e921573100900a3ad9cf29f222d995fb3b6045797eaea7521bd8d6f0': {
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
    signature: '0xefefaba5e921573100900a3ad9cf29f222d995fb3b6045797eaea7521bd8d6f0',
  },
};
