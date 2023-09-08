import { Contract } from '../../types/configs';
import FluxfinanceMarkets from '../data/FluxfinanceMarkets.json';

export const FluxfinanceContracts: Array<Contract> = [
  ...FluxfinanceMarkets.map((item) => {
    return {
      chain: item.chain,
      protocol: 'fluxfinance',
      abi: {},
      address: item.address,
      birthday: 16521158,
      events: [],
      topics: [
        '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f', // Mint
        '0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929', // Redeem
        '0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80', // Borrow
        '0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1', // Repay
        '0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52', // Liquidate
      ],
    };
  }),
];
