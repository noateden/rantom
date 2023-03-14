import { Contract, Token } from '../../types/configs';
import CurvePool010Abi from '../abi/curve/pool-0.1.0.json';
import CurvePool024Abi from '../abi/curve/pool-0.2.4.json';
import CurvePool028Abi from '../abi/curve/pool-0.2.8.json';
import CurvePool0212Abi from '../abi/curve/pool-0.2.12.json';
import CurvePool030Abi from '../abi/curve/pool-0.3.0.json';
import CurvePool031Abi from '../abi/curve/pool-0.3.1.json';
import { Tokens } from '../constants';
import { WorkerGenesisBlocks } from '../index';

export interface CurvePool extends Contract {
  // meta pools are pool which coin pair with 3crv pool (USDC, USDT, DAI)
  isMetaPool: boolean;

  tokens: Array<Token>; // match index value on contract
}

export const CurveContracts: Array<CurvePool> = [
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool024Abi,
    address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: false,
    events: ['TokenExchange', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne', 'RemoveLiquidityImbalance'],
    tokens: [Tokens.ethereum.DAI, Tokens.ethereum.USDC, Tokens.ethereum.USDT],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool0212Abi,
    address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: false,
    events: ['TokenExchange', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.USDT, Tokens.ethereum.WBTC, Tokens.ethereum.WETH],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool028Abi,
    address: '0xdc24316b9ae028f1497c275eb9192a3ea0f67022',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: false,
    events: ['TokenExchange', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.ETH, Tokens.ethereum.stETH],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool031Abi,
    address: '0xdcef968d416a41cdac0ed8702fac8128a64241a2',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: false,
    events: ['TokenExchange', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne', 'RemoveLiquidityImbalance'],
    tokens: [Tokens.ethereum.FRAX, Tokens.ethereum.USDC],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool030Abi,
    address: '0x8301ae4fc9c624d1d396cbdaa1ed877821d7c511',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: false,
    events: ['TokenExchange', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.WETH, Tokens.ethereum.CRV],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool010Abi,
    address: '0xa5407eae9ba41422680e2e00537571bcc53efbfd',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: false,
    events: ['TokenExchange', 'TokenExchangeUnderlying', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.DAI, Tokens.ethereum.USDC, Tokens.ethereum.USDT, Tokens.ethereum.sUSD],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool028Abi,
    address: '0xd632f22692fac7611d2aa1c0d552930d43caed3b',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: true,
    events: ['TokenExchange', 'TokenExchangeUnderlying', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.FRAX, Tokens.ethereum.DAI, Tokens.ethereum.USDC, Tokens.ethereum.USDT],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool028Abi,
    address: '0xc9c32cd16bf7efb85ff14e0c8603cc90f6f2ee49',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: true,
    events: ['TokenExchange', 'TokenExchangeUnderlying', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.BEAN, Tokens.ethereum.DAI, Tokens.ethereum.USDC, Tokens.ethereum.USDT],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool028Abi,
    address: '0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: true,
    events: ['TokenExchange', 'TokenExchangeUnderlying', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.LUSD, Tokens.ethereum.DAI, Tokens.ethereum.USDC, Tokens.ethereum.USDT],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool028Abi,
    address: '0x4f062658eaaf2c1ccf8c8e36d6824cdf41167956',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: true,
    events: ['TokenExchange', 'TokenExchangeUnderlying', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.GUSD, Tokens.ethereum.DAI, Tokens.ethereum.USDC, Tokens.ethereum.USDT],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool028Abi,
    address: '0x5a6a4d54456819380173272a5e8e9b9904bdf41b',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: true,
    events: ['TokenExchange', 'TokenExchangeUnderlying', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.MIM, Tokens.ethereum.DAI, Tokens.ethereum.USDC, Tokens.ethereum.USDT],
  },
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: CurvePool028Abi,
    address: '0xdebf20617708857ebe4f679508e7b7863a8a8eee',
    birthday: WorkerGenesisBlocks.ethereum,
    isMetaPool: true,
    events: ['TokenExchange', 'TokenExchangeUnderlying', 'AddLiquidity', 'RemoveLiquidity', 'RemoveLiquidityOne'],
    tokens: [Tokens.ethereum.aDAI, Tokens.ethereum.aUSDC, Tokens.ethereum.aUSDT],
  },
];
