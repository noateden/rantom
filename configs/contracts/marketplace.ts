import { Contract } from '../../types/configs';
import OpenseaSeaportAbi from '../abi/opensea/Seaport.json';

export const MarketplaceContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'opensea',
    abi: OpenseaSeaportAbi,
    address: '0x00000000006c3852cbef3e08e8df289169ede581',
    birthday: 14946474,
    events: ['OrderFulfilled'],
  },
];
