import { Contract } from '../../types/configs';

export const BalancerContracts: Array<Contract> = [
  // {
  //   chain: 'ethereum',
  //   protocol: 'balancer',
  //   abi: {},
  //   address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
  //   birthday: 16308190,
  //   events: [],
  //   topics: [
  //     '0x2170c741c41531aec20e7c107c24eecfdd15e69c9bb0a8dd37b1840b9e0b207b', // Swap
  //     '0x0d7d75e01ab95780d3cd1c8ec0dd6c2ce19e3a20427eec8bf53283b6fb8e95f0', // FlashLoan
  //     '0xe5ce249087ce04f05a957192435400fd97868dba0e6a4b4c049abf8af80dae78', // PoolChanges
  //   ]
  // },
  {
    chain: 'ethereum',
    protocol: 'balancer',
    abi: {},
    address: '0xc128a9954e6c874ea3d62ce62b468ba073093f25',
    birthday: 14457013,
    events: [],
    topics: [
      '0x4566dfc29f6f11d13a418c26a02bef7c28bae749d4de47e4e6a7cddea6730d59', // Deposit
      '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568', // Withdraw
    ],
  },
];
