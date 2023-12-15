import { EventMapping } from '../../../types/configs';

export const GravitaEventSignatures = {
  VesselUpdated: '0xd03b2126581644d5026a8e77091b71644f3f16efe9d9e5930c4d533301c731e8',
};

export const GravitaAbiMappings: { [key: string]: EventMapping } = {
  [GravitaEventSignatures.VesselUpdated]: {
    abi: [
      {
        indexed: true,
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_debt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_coll',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'stake',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum IBorrowerOperations.BorrowerOperation',
        name: 'operation',
        type: 'uint8',
      },
    ],
  },
};
