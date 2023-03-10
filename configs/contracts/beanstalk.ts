import { Contract } from '../../types/configs';
import BeanstalkAbi from '../abi/beanstalk/Beanstalk.json';

export const BeanstalkContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'beanstalk',
    abi: BeanstalkAbi,
    address: '0xc1e088fc1323b20bcbee9bd1b9fc9546db5624c5',
    birthday: 15274075,
    events: ['AddDeposit', 'AddWithdrawal', 'Sow', 'RemoveWithdrawal', 'RemoveWithdrawals', 'Harvest'],
  },
];
