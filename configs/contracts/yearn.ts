import { Contract } from '../../types/configs';
import YearnVaultData from '../data/YearnVaults.json';

export const YearnContracts: Array<Contract> = YearnVaultData.map((item) => {
  return {
    chain: 'ethereum',
    protocol: 'yearn',
    abi: {},
    address: item.address,
    birthday: item.birthday,
    token: item.token,
    events: [],
    topics: [
      '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15', // Deposit
      '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568', // Withdraw
    ],
  };
});
