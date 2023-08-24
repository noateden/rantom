import { Contract } from '../../types/configs';

export const BasinContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'basin',
    abi: {},
    address: '0xbea0e11282e2bb5893bece110cf199501e872bad',
    birthday: 17978134,
    events: [],
    topics: [
      '0xb39c9bc43f811e1a7ce159c5f147458fdb80266bf23c17322013316e27e086d0', // Swap
      '0x91a6d8e872c9887412278189089c9936e99450551cc971309ff282f79bfef56f', // AddLiquidity
      '0xf4358595ad4956678c919635516976c76f95de0ce5a56b61ef35931b8c05dc04', // RemoveLiquidity
      '0x6f08fb00dac40d918cc84a5080754603d4f9a13a2437d87e06fd75ab944c7575', // RemoveLiquidityOneToken
      '0x1ee4a8e2e74af07abadd6b0b5f8f8bd96a54656e3bb7d987c5075a0c8b9f0df5', // Shift
    ],
  },
];
