import { EventMapping } from '../../../types/configs';

export const StargateEventSignatures = {
  // emit when a bridge from src chain to dest chain
  Swap: '0x34660fc8af304464529f48a778e03d03e4d34bcd5f9b6f0cfbf3cd238c642f7f',

  // emit when withdraw from source chain to current chain
  SwapRemote: '0xfb2b592367452f1c437675bed47f5e1e6c25188c17d7ba01a12eb030bc41ccef',
  CreditChainPath: '0xdbdd25248751feb2f3b66721dfdd11662a68bc155af3771e661aabec92fba814',

  // add/remove liquidity on this chain
  Mint: '0xb4c03061fb5b7fed76389d5af8f2e0ddb09f8c70d1333abbb62582835e10accb',
  Burn: '0x49995e5dd6158cf69ad3e9777c46755a1a826a446c6416992167462dad033b2a',
};

export const StargateAbiMappings: { [key: string]: EventMapping } = {
  [StargateEventSignatures.Mint]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountLP',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountSD',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'mintFeeAmountSD',
        type: 'uint256',
      },
    ],
  },
  [StargateEventSignatures.Burn]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountLP',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountSD',
        type: 'uint256',
      },
    ],
  },
  [StargateEventSignatures.Swap]: {
    abi: [
      {
        indexed: false,
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dstPoolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountSD',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'eqReward',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'eqFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpFee',
        type: 'uint256',
      },
    ],
  },
  [StargateEventSignatures.SwapRemote]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountSD',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dstFee',
        type: 'uint256',
      },
    ],
  },
  [StargateEventSignatures.CreditChainPath]: {
    abi: [
      {
        indexed: false,
        internalType: 'uint16',
        name: 'chainId',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'srcPoolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountSD',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'idealBalance',
        type: 'uint256',
      },
    ],
  },
};
