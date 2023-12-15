import { EventMapping } from '../../../types/configs';

export const AirswapEventSignatures = {
  SwapV2: '0xd5fe17cd50e0d3d39b905ea598bbabccf2f8cda62a3b2fc64e09de00247a4724',
  SwapV3: '0x06dfeb25e76d44e08965b639a9d9307df8e1c3dbe2a6364194895e9c3992f033',
  SwapV4: '0xb651f2787ff61b5ab14f3936f2daebdad3d84aeb74438e82870cc3b7aee71e90',
};

export const AirswapAbiMappings: { [key: string]: EventMapping } = {
  [AirswapEventSignatures.SwapV2]: {
    abi: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'signerWallet',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'signerAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'signerId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'signerToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'senderWallet',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'senderAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'senderId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'senderToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'affiliateWallet',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'affiliateAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'affiliateId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'affiliateToken',
        type: 'address',
      },
    ],
  },
  [AirswapEventSignatures.SwapV3]: {
    abi: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'signerWallet',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'signerToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'signerAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolFee',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'senderWallet',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'senderToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'senderAmount',
        type: 'uint256',
      },
    ],
  },
  [AirswapEventSignatures.SwapV4]: {
    abi: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'signerWallet',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'signerToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'signerAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolFee',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'senderWallet',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'senderToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'senderAmount',
        type: 'uint256',
      },
    ],
  },
};
