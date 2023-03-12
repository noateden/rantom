import { Contract } from '../../types/configs';
import CowswapSettlementAbi from '../abi/cowswap/GPv2Settlement.json';

export const CowswapContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'cowswap',
    abi: CowswapSettlementAbi,
    address: '0x9008d19f58aabd9ed0d60971565aa8510560ab41',
    birthday: 12593265,
    events: ['Trade'],
  },
];
