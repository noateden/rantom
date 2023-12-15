import { EventMapping } from '../../../types/configs';

export const MetamaskFunctionSignatures = {
  Swap: '0x5f575529',
};

export const MetamaskAbiMappings: { [key: string]: EventMapping } = {
  [MetamaskFunctionSignatures.Swap]: {
    abi: [
      {
        internalType: 'string',
        name: 'aggregatorId',
        type: 'string',
      },
      {
        internalType: 'contract IERC20',
        name: 'tokenFrom',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
  },
};
