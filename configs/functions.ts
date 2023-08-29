export const Functions: { [key: string]: string } = {
  // execute(address,bytes)
  dsProxyExecute: '0x1cff79cd',

  // defi saver | executeRecipe(Recipe)
  defisaverExecuteRecipe: '0x0c2c8750',

  // metamask swap router swap
  metamaskRouterSwap: '0x5f575529',
};

export const FunctionAbis: { [key: string]: any } = {
  // oneinch swap
  // sample tx: https://etherscan.io/tx/0x47e3de8b6584ef1f797fc8b5e116d9ff9a46e600ae82d472ac05f1e3169b854c
  '0x12aa3caf': {
    abi: [
      {
        internalType: 'contract IAggregationExecutor',
        name: 'executor',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'contract IERC20',
            name: 'srcToken',
            type: 'address',
          },
          {
            internalType: 'contract IERC20',
            name: 'dstToken',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'srcReceiver',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'dstReceiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minReturnAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
        ],
        internalType: 'struct GenericRouter.SwapDescription',
        name: 'desc',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'permit',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
  },

  // oneinch unoswap
  // sample tx: https://etherscan.io/tx/0x0defb803e46c4e435326896360a24b0b2664fe2e40782618781f9dca76b7b70d
  '0x0502b1c5': {
    abi: [
      {
        internalType: 'contract IERC20',
        name: 'srcToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minReturn',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'pools',
        type: 'uint256[]',
      },
    ],
  },

  // oneinch clipperSwap
  // sample tx: https://etherscan.io/tx/0xf3b1c38a21940434511fd5876bccf6c7a5b506a1d5d5fc9f968bcd487b5e4bcb
  '0x84bd6d29': {
    abi: [
      {
        internalType: 'contract IClipperExchangeInterface',
        name: 'clipperExchange',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: 'srcToken',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: 'dstToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'inputAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'outputAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'goodUntil',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'vs',
        type: 'bytes32',
      },
    ],
  },

  // oneinch swap router v3
  // sample tx: 0x248b1c32c61a1adb774788a7a3f77c0b25d9852b9dc10eef2259594277e530ae
  '0x7c025200': {
    abi: [
      {
        internalType: 'contract IAggregationExecutor',
        name: 'caller',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'contract IERC20',
            name: 'srcToken',
            type: 'address',
          },
          {
            internalType: 'contract IERC20',
            name: 'dstToken',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'srcReceiver',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'dstReceiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minReturnAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'permit',
            type: 'bytes',
          },
        ],
        internalType: 'struct AggregationRouterV3.SwapDescription',
        name: 'desc',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
  },

  // unibot uniV2_sell_pctFee v9
  // tx: 0x3b4381f440e4927f8dabedb33d36db38f92dacefd6090368361ce6a0da3a089e
  '0x8ee938a9': {
    abi: [
      {
        internalType: 'uint256',
        name: 'amt_in',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amt_out_min',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'pct_fee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'referral',
        type: 'string',
      },
    ],
  },

  // unibot uniV2_swapExactETHForTokens_pctFee_v9
  // tx: 0xdd6388ef1f687819aaad5e85ec2d2be94ae4646036528645b0e96c542db02319
  '0x19948479': {
    abi: [
      {
        internalType: 'uint256',
        name: 'amt_out_min',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'pct_fee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'referral',
        type: 'string',
      },
    ],
  },
};
