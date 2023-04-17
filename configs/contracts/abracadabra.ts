import { Contract } from '../../types/configs';
import Cauldrons from '../data/AbracadabraCauldrons.json';

export const AbracadabraContracts: Array<Contract> = [
  ...Cauldrons.map((item) => {
    return {
      chain: item.chain,
      protocol: 'abracadabra',
      abi: {},
      address: item.address,
      birthday: 16308190,
      events: [],
      topics:
        item.version === 'v2'
          ? [
              '0x9ed03113de523cebfe5e49d5f8e12894b1c0d42ce805990461726444c90eab87', // LogAddCollateral
              '0x8ad4d3ff00da092c7ad9a573ea4f5f6a3dffc6712dc06d3f78f49b862297c402', // LogRemoveCollateral
              '0xb92cb6bca8e3270b9170930f03b17571e55791acdb1a0e9f339eec88bdb35e24', // LogBorrow
              '0xc8e512d8f188ca059984b5853d2bf653da902696b8512785b182b2c813789a6e', // LogRepay
            ]
          : [
              '0x9ed03113de523cebfe5e49d5f8e12894b1c0d42ce805990461726444c90eab87', // LogAddCollateral
              '0x8ad4d3ff00da092c7ad9a573ea4f5f6a3dffc6712dc06d3f78f49b862297c402', // LogRemoveCollateral
              '0xb92cb6bca8e3270b9170930f03b17571e55791acdb1a0e9f339eec88bdb35e24', // LogBorrow
              '0xc8e512d8f188ca059984b5853d2bf653da902696b8512785b182b2c813789a6e', // LogRepay
              '0x66b108dc29b952efc76dccea9b82dce6b59fab4d9af73d8dcc9789afcad5daf6', // LogLiquidation
            ],
    };
  }),
  {
    chain: 'ethereum',
    protocol: 'abracadabra',
    abi: {},
    address: '0x26fa3fffb6efe8c1e69103acb4044c26b9a106a9',
    birthday: 16308190,
    events: [],
    topics: [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'abracadabra',
    abi: {},
    address: '0xbd2fbaf2dc95bd78cf1cd3c5235b33d1165e6797',
    birthday: 16308190,
    events: [],
    topics: [
      '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c', // Deposit
      '0x884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364', // Withdraw
      '0xba8de60c3403ec381d1d484652ea1980e3c3e56359195c92525bff4ce47ad98e', // ClaimReward
    ],
  },
];
