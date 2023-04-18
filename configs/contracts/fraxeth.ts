import { Contract } from '../../types/configs';

export const FraxethContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'fraxeth',
    abi: {},
    address: '0xbafa44efe7901e04e39dad13167d089c559c1138',
    birthday: 16308190,
    events: [],
    topics: [
      '0x29b3e86ecfd94a32218997c40b051e650e4fd8c97fc7a4d266be3f7c61c5205b', // ETHSubmitted
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'fraxeth',
    abi: {},
    address: '0xac3e018457b222d93114458476f3e3416abbe38f',
    birthday: 16308190,
    events: [],
    topics: [
      '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7', // Deposit
      '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db', // Withdraw
    ],
  },
];
