import { EventMapping } from '../../../types/configs';

export const IronbankEventSignatures = {
  Flashloan: '0x33c8e097c526683cbdb29adf782fac95e9d0fbe0ed635c13d8c75fdf726557d9',
};

export const IronbankAbiMappings: { [key: string]: EventMapping } = {
  [IronbankEventSignatures.Flashloan]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
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
        name: 'totalFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reservesFee',
        type: 'uint256',
      },
    ],
  },
};
