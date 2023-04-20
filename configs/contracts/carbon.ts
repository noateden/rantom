import { Contract } from '../../types/configs';

export const CarbonContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'bancor',
    abi: {},
    address: '0xc537e898cd774e2dcba3b14ea6f34c93d5ea45e1',
    birthday: 17087375,
    events: [],
    topics: [
      '0x95f3b01351225fea0e69a46f68b164c9dea10284f12cd4a907ce66510ab7af6a', // TokensTraded
      '0xff24554f8ccfe540435cfc8854831f8dcf1cf2068708cfaf46e8b52a4ccc4c8d', // StrategyCreated
      '0x4d5b6e0627ea711d8e9312b6ba56f50e0b51d41816fd6fd38643495ac81d38b6', // StrategyDeleted
    ],
  },
];
