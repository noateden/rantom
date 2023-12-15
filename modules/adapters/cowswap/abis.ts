import { EventMapping } from '../../../types/configs';

export const CowswapEventSignatures = {
  Trade: '0xa07a543ab8a018198e99ca0184c93fe9050a79400a0a723441f84de1d972cc17',
};

export const CowswapAbiMappings: { [key: string]: EventMapping } = {
  [CowswapEventSignatures.Trade]: {
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
};
