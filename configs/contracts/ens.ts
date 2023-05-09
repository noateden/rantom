import { Contract } from '../../types/configs';

export const EnsContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'ens',
    abi: {},
    address: '0x253553366da8546fc250f225fe3d25d0c782303b',
    birthday: 16925618,
    events: [],
    topics: [
      '0x69e37f151eb98a09618ddaa80c8cfaf1ce5996867c489f45b555b412271ebf27', // Register
      '0x3da24c024582931cfaf8267d8ed24d13a82a8068d5bd337d30ec45cea4e506ae', // Renew
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'ens',
    abi: {},
    address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
    birthday: 16308190,
    events: [],
    topics: [
      '0xca6abbe9d7f11422cb6ca7629fbf6fe9efb1c621f71ce8f02b9f2a230097404f', // Register
      '0x3da24c024582931cfaf8267d8ed24d13a82a8068d5bd337d30ec45cea4e506ae', // Renew
    ],
  },
];
