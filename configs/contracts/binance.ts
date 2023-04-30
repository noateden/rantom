import { Contract } from '../../types/configs';

export const BinanceContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'binance-staked-eth',
    abi: {},
    address: '0xa2e3356610840701bdf5611a53974510ae27e2e1',
    birthday: 17080241,
    events: [],
    topics: [
      '0xe32c4b34261b430739ef30d727d062f9fdd6410be2080e6fd875a6015f40de83', // DepositEth
    ],
  },
];
