import { EventMapping } from '../../../types/configs';

export const PancakeEventSignatures = {
  // v3
  SwapV3: '0x19b47279256b2a23a1665c810c8d55a1758940ee09377d4f8d26497a3577dc83',

  // stableswap
  TokenExchange: '0xb2e76ae99761dc136e598d4a629bb347eccb9532a5f8bbd72e18467c3c34cc98',
  AddLiquidity: '0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768',
  RemoveLiquidity: '0x7c363854ccf79623411f8995b362bce5eddff18c927edc6f5dbbb5e05819a82c',
  RemoveLiquidityOne: '0x5ad056f2e28a8cec232015406b843668c1e36cda598127ec3b8c59b8c72773a0',
  RemoveLiquidityImbalance: '0x2b5508378d7e19e0d5fa338419034731416c4f5b219a10379956f764317fd47e',
};

export const PancakeAbiMappings: { [key: string]: EventMapping } = {
  // v3 Swap
  [PancakeEventSignatures.SwapV3]: {
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
      {
        indexed: false,
        internalType: 'uint128',
        name: 'protocolFeesToken0',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'protocolFeesToken1',
        type: 'uint128',
      },
    ],
  },

  // stableswap
  [PancakeEventSignatures.TokenExchange]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sold_id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokens_sold',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bought_id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokens_bought',
        type: 'uint256',
      },
    ],
  },
  [PancakeEventSignatures.AddLiquidity]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[2]',
        name: 'token_amounts',
        type: 'uint256[2]',
      },
      {
        indexed: false,
        internalType: 'uint256[2]',
        name: 'fees',
        type: 'uint256[2]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'invariant',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'token_supply',
        type: 'uint256',
      },
    ],
  },
  [PancakeEventSignatures.RemoveLiquidity]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[2]',
        name: 'token_amounts',
        type: 'uint256[2]',
      },
      {
        indexed: false,
        internalType: 'uint256[2]',
        name: 'fees',
        type: 'uint256[2]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'token_supply',
        type: 'uint256',
      },
    ],
  },
  [PancakeEventSignatures.RemoveLiquidityOne]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'provider',
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
        name: 'token_amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'coin_amount',
        type: 'uint256',
      },
    ],
  },
  [PancakeEventSignatures.RemoveLiquidityImbalance]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[2]',
        name: 'token_amounts',
        type: 'uint256[2]',
      },
      {
        indexed: false,
        internalType: 'uint256[2]',
        name: 'fees',
        type: 'uint256[2]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'invariant',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'token_supply',
        type: 'uint256',
      },
    ],
  },
};
