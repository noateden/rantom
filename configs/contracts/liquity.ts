import { Contract } from '../../types/configs';
import BorrowOperationsAbi from '../abi/liquity/BorrowOperations.json';
import TroveManagerAbi from '../abi/liquity/TroveManager.json';

export const LiquityContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'liquity',
    abi: BorrowOperationsAbi,
    address: '0x24179cd81c9e782a4096035f7ec97fb8b783e007',
    birthday: 12178582,
    events: ['TroveUpdated'],
  },
  {
    chain: 'ethereum',
    protocol: 'liquity',
    abi: TroveManagerAbi,
    address: '0xa39739ef8b0231dbfa0dcda07d7e29faabcf4bb2',
    birthday: 12178557,
    events: ['TroveLiquidated'],
  },
];
