import { Contract } from '../../types/configs';
import YearnVaultData from '../data/YearnVaults.json';

export const YearnContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'yearn',
    abi: {},
    address: '0x90c1f9220d90d3966fbee24045edd73e1d588ad5',
    birthday: 15974608,
    events: [],
    topics: [
      '0x01affbd18fb24fa23763acc978a6bb9b9cd159b1cc733a15f3ea571d691cabc1', // ModifyLock
      '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568', // Withdraw
    ],
  },
  ...YearnVaultData.filter((item) => item.chain === 'arbitrum' || item.chain === 'base').map((item) => {
    return {
      chain: item.chain,
      protocol: 'yearn',
      abi: {},
      address: item.address,
      birthday: item.birthday,
      events: [],
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer
      ],
    };
  }),
];
