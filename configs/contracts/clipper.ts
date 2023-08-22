import { Contract } from '../../types/configs';

export const ClipperContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'clipper',
    abi: {},
    address: '0x655edce464cc797526600a462a8154650eee4b77',
    birthday: 16908406,
    events: [],
    topics: [
      '0x4be05c8d54f5e056ab2cfa033e9f582057001268c3e28561bb999d35d2c8f2c8', // Swapped
    ],
  },
  {
    chain: 'arbitrum',
    protocol: 'clipper',
    abi: {},
    address: '0xe7b0ce0526fbe3969035a145c9e9691d4d9d216c',
    birthday: 30861559,
    events: [],
    topics: [
      '0x4be05c8d54f5e056ab2cfa033e9f582057001268c3e28561bb999d35d2c8f2c8', // Swapped
    ],
  },
];
