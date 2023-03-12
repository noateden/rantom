import { Contract, Token } from '../../types/configs';
import CurvePool010Abi from '../abi/curve/pool-0.1.0.json';
import CurvePool024Abi from '../abi/curve/pool-0.2.4.json';
import CurvePool028Abi from '../abi/curve/pool-0.2.8.json';
import CurvePool0212Abi from '../abi/curve/pool-0.2.12.json';
import CurvePool030Abi from '../abi/curve/pool-0.3.0.json';
import CurvePool031Abi from '../abi/curve/pool-0.3.1.json';
import { Tokens } from '../constants';

export interface CurvePool extends Contract {
  tokens: Array<Token>; // match index value on contract
}

export const CurveContracts: Array<CurvePool> = [
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool024Abi,
    address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
    birthday: 10809473,
    events: ['TokenExchange', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne', 'RemoveLiquidityImbalance'],
    tokens: [Tokens.ethereum.DAI, Tokens.ethereum.USDC, Tokens.ethereum.USDT],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool0212Abi,
    address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
    birthday: 12821148,
    events: ['TokenExchange', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.USDT, Tokens.ethereum.WBTC, Tokens.ethereum.WETH],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool028Abi,
    address: '0xdc24316b9ae028f1497c275eb9192a3ea0f67022',
    birthday: 11592551,
    events: ['TokenExchange', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.ETH, Tokens.ethereum.stETH],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool031Abi,
    address: '0xdcef968d416a41cdac0ed8702fac8128a64241a2',
    birthday: 14939588,
    events: ['TokenExchange', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne', 'RemoveLiquidityImbalance'],
    tokens: [Tokens.ethereum.FRAX, Tokens.ethereum.USDC],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool030Abi,
    address: '0x8301ae4fc9c624d1d396cbdaa1ed877821d7c511',
    birthday: 13676995,
    events: ['TokenExchange', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.WETH, Tokens.ethereum.CRV],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool010Abi,
    address: '0xa5407eae9ba41422680e2e00537571bcc53efbfd',
    birthday: 13676995,
    events: ['TokenExchange', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.DAI, Tokens.ethereum.USDC, Tokens.ethereum.USDT, Tokens.ethereum.sUSD],
  },
];
