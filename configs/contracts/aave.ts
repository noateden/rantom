import { Contract } from '../../types/configs';
import AaveV2PoolAbi from '../abi/aave/LendingPoolV2.json';
import AaveV3PoolAbi from '../abi/aave/LendingPoolV3.json';

export const AaveContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'aavev2',
    abi: AaveV2PoolAbi,
    address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
    birthday: 11362579,
    events: ['Deposit', 'Borrow', 'Withdraw', 'Repay', 'LiquidationCall', 'FlashLoan'],
  },
  {
    chain: 'ethereum',
    protocol: 'aavev3',
    abi: AaveV3PoolAbi,
    address: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
    birthday: 16291127,
    events: ['Supply', 'Borrow', 'Withdraw', 'Repay', 'LiquidationCall', 'FlashLoan'],
  },
];
