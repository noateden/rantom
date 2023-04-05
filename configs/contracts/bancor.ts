import { Contract } from '../../types/configs';
import BancorNetworkV3Abi from '../abi/bancor/BancorNetworkV3.json';
import BancorNetworkV3PoolAbi from '../abi/bancor/PoolCollectionV3.json';

export const BancorContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'bancor',
    abi: BancorNetworkV3Abi,
    address: '0xeef417e1d5cc832e619ae18d2f140de2999dd4fb',
    birthday: 16308190,
    events: ['TokensTraded'],
  },
  {
    chain: 'ethereum',
    protocol: 'bancor',
    abi: BancorNetworkV3PoolAbi,
    address: '0xd982e001491d414c857f2a1aaa4b43ccf9f642b4',
    birthday: 16308190,
    events: ['TokensDeposited', 'TokensWithdrawn'],
  },
];
