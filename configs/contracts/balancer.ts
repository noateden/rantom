import { Contract } from '../../types/configs';
import BalancerVaultAbi from '../abi/balancer/Vault.json';
import { WorkerGenesisBlocks } from '../index';

export const BalancerContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'balancer',
    abi: BalancerVaultAbi,
    address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
    birthday: WorkerGenesisBlocks.ethereum,
    events: ['Swap', 'PoolBalanceChanged', 'FlashLoan'],
  },
];
