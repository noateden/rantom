import { Contract } from '../../types/configs';

export const DefisaverContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'defisaver',
    abi: {},
    address: '0xce7a977cac4a481bc84ac06b2da0df614e621cf3',
    birthday: 14082028,
    events: [],
    topics: [
      '0xb6cd938f99beba85b61cc813aa1c12ba1b95f797dfb6ddd567c0f361f3e77574', // RecipeEvent
      '0xf28c1e8e1a8c97027796e625e1ed041028c9642e14da6e7ad2c18838a59a2d8c', // ActionDirectEvent
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'defisaver',
    abi: {},
    address: '0x1d6dedb49af91a11b5c5f34954fd3e8cc4f03a86',
    birthday: 14243145,
    events: [],
    topics: [
      '0xb6cd938f99beba85b61cc813aa1c12ba1b95f797dfb6ddd567c0f361f3e77574', // RecipeEvent
      '0xf28c1e8e1a8c97027796e625e1ed041028c9642e14da6e7ad2c18838a59a2d8c', // ActionDirectEvent
    ],
  },
];
