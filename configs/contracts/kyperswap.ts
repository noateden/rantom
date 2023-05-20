import { Contract } from '../../types/configs';
import UniLiquidityPools from '../data/UniLiquidityPools.json';

export const KyberswapAggregatorContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'kyberswap-aggregator',
    abi: {},
    address: '0x6131b5fae19ea4f9d964eac0408e4408b66337b5',
    birthday: 16366767,
    events: [],
    topics: [
      '0xd6d4f5681c246c9f42c203e287975af1601f8df8035a9251f79aab5c8f09e2f8', // Swapped
    ],
  },
];

export const KyberswapClassicContracts: Array<Contract> = [
  ...UniLiquidityPools.filter((item) => item.protocol === 'kyberswap-classic').map((item) => {
    return {
      chain: 'ethereum',
      protocol: 'kyberswap-classic',
      abi: {},
      address: item.address,
      birthday: 17192033,
      events: [],
      topics: [
        '0x606ecd02b3e3b4778f8e97b2e03351de14224efaa5fa64e62200afc9395c2499', // Swap
        '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f', // Mint
        '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496', // Burn
      ],
    };
  }),
];
