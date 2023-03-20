import { Contract, Token } from '../../types/configs';
import YearnVaultAbi from '../abi/yearn/YearnVault-0.3.3.json';
import YearnVaultData from '../data/YearnVaults.json';

export interface YearnVaultContract extends Contract {
  token: Token;
}

export const YearnContracts: Array<YearnVaultContract> = YearnVaultData.map((item) => {
  return {
    chain: 'ethereum',
    protocol: 'yearn',
    abi: YearnVaultAbi,
    address: item.address,
    birthday: 16308190,
    token: item.token,
    events: ['Deposit', 'Withdraw'],
  };
});
