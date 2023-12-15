import { EventMapping } from '../../../types/configs';

export const KyberswapEventSignatures = {
  Swapped: '0xd6d4f5681c246c9f42c203e287975af1601f8df8035a9251f79aab5c8f09e2f8',
};

export const KyberswapAbiMappings: { [key: string]: EventMapping } = {
  [KyberswapEventSignatures.Swapped]: {
    abi: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'srcToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'dstToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'dstReceiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'spentAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'returnAmount',
        type: 'uint256',
      },
    ],
  },
};
