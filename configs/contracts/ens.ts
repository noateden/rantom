import { Contract } from '../../types/configs';
import RegistrationControllerAbi from '../abi/ens/RegistrationController.json';

export const EnsContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'ens',
    abi: RegistrationControllerAbi,
    address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
    birthday: 9380471,
    events: ['NameRegistered', 'NameRenewed'],
  },
];
