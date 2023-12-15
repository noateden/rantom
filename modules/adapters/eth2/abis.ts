import { EventMapping } from '../../../types/configs';

export const Eth2EventSignatures = {
  Deposit: '0x649bbc62d0e31342afea4e5cd82d4049e7e1ee912fc0889aa790803be39038c5',
};

export const Eth2AbiMappings: { [key: string]: EventMapping } = {
  [Eth2EventSignatures.Deposit]: {
    abi: [
      {
        indexed: false,
        internalType: 'bytes',
        name: 'pubkey',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'withdrawal_credentials',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'amount',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'index',
        type: 'bytes',
      },
    ],
  },
};
