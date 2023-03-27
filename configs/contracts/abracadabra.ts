import { Contract } from '../../types/configs';
import CauldronV2 from '../abi/abracadabra/CauldronV2.json';
import CauldronV3 from '../abi/abracadabra/CauldronV3.json';
import CauldronV4 from '../abi/abracadabra/CauldronV4.json';
import Cauldrons from '../data/AbracadabraCauldrons.json';

export const AbracadabraContracts: Array<Contract> = Cauldrons.map((item) => {
  return {
    chain: item.chain,
    protocol: 'abracadabra',
    abi: item.version === 'v2' ? CauldronV2 : item.version === 'v3' ? CauldronV3 : CauldronV4,
    address: item.address,
    birthday: 16308190,
    events:
      item.version === 'v2'
        ? ['LogBorrow', 'LogRepay', 'LogAddCollateral', 'LogRemoveCollateral']
        : ['LogBorrow', 'LogRepay', 'LogAddCollateral', 'LogRemoveCollateral', 'LogLiquidation'],
  };
});
