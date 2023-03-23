import { Contract } from '../../types/configs';
import EulerProtocolAbi from '../abi/euler/EulerProtocol.json';

export const EulerContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'euler',
    abi: EulerProtocolAbi,
    address: '0x27182842e098f60e3d576794a5bffb0777e025d3',
    birthday: 13687582,
    events: ['Deposit', 'Withdraw', 'Borrow', 'Repay', 'Liquidation'],
  },
];
