import { Contract } from '../../types/configs';
import Pools from '../data/AgilityStakingPools.json';

export const AgilityContracts: Array<Contract> = [
  ...Pools.map((item) => {
    return {
      chain: item.chain,
      protocol: 'agility',
      abi: {},
      address: item.address,
      birthday: item.birthday,
      events: [],
      topics: [
        '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d', // Staked
        '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5', // Withdrawn
        '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486', // RewardPaid
      ],
    };
  }),
];
