import { Contract } from '../../types/configs';
import ConvexBoosterAbif from '../abi/convex/Booster.json';

export const ConvexContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'convex',
    abi: ConvexBoosterAbif,
    address: '0xf403c135812408bfbe8713b5a23a04b3d48aae31',
    birthday: 16308190,
    events: ['Deposited', 'Withdrawn'],
  },
];
