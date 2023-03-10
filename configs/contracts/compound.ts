import { Contract, Token } from '../../types/configs';
import cTokenAbi from '../abi/compound/cErc20.json';
import { Tokens } from '../constants';

export interface CompoundPool extends Contract {
  etherPool: boolean;
  underlying: Token;
}

export const CompoundContracts: Array<CompoundPool> = [
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c',
    birthday: 12848198,
    underlying: Tokens.ethereum.AAVE,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e',
    birthday: 7710735,
    underlying: Tokens.ethereum.BAT,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4',
    birthday: 10960099,
    underlying: Tokens.ethereum.COMP,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
    birthday: 8983575,
    underlying: Tokens.ethereum.DAI,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: true,
    address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
    birthday: 8983575,
    underlying: Tokens.ethereum.NativeCoin,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x7713dd9ca933848f6819f38b8352d9a15ea73f67',
    birthday: 7710758,
    underlying: Tokens.ethereum.FEI,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0xface851a4921ce59e912d19329929ce6da6eb0c7',
    birthday: 12286030,
    underlying: Tokens.ethereum.LINK,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x95b4ef2869ebd94beb4eee400a99824bf5dc325b',
    birthday: 12836064,
    underlying: Tokens.ethereum.MKR,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x158079ee67fce2f58472a96584a73c7ab9ac95c1',
    birthday: 7710755,
    underlying: Tokens.ethereum.REP,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0xf5dce57282a584d2746faf1593d3121fcac444dc',
    birthday: 7710752,
    underlying: Tokens.ethereum.SAI,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x4b0181102a0112a2ef11abee5563bb4a3176c9d7',
    birthday: 12848166,
    underlying: Tokens.ethereum.SUSHI,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x12392f67bdf24fae0af363c24ac620a2f67dad86',
    birthday: 11008385,
    underlying: Tokens.ethereum.TUSD,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x35a18000230da775cac24873d00ff85bccded550',
    birthday: 10921410,
    underlying: Tokens.ethereum.UNI,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
    birthday: 7710760,
    underlying: Tokens.ethereum.USDC,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x041171993284df560249b57358f931d9eb7b925d',
    birthday: 13258119,
    underlying: Tokens.ethereum.USDP,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9',
    birthday: 9879363,
    underlying: Tokens.ethereum.USDT,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0xc11b1268c1a384e55c48c2391d8d480264a3a7f4',
    birthday: 8163813,
    underlying: Tokens.ethereum.WBTC,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0xccf4429db6322d5c611ee964527d42e5d685dd6a',
    birthday: 12038653,
    underlying: Tokens.ethereum.WBTC,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946',
    birthday: 12848198,
    underlying: Tokens.ethereum.YFI,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
  {
    chain: 'ethereum',
    protocol: 'compound',
    abi: cTokenAbi,
    etherPool: false,
    address: '0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407',
    birthday: 7710733,
    underlying: Tokens.ethereum.ZRX,
    events: ['Mint', 'Redeem', 'Borrow', 'RepayBorrow', 'LiquidateBorrow'],
  },
];
