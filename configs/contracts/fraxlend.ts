import { Contract } from '../../types/configs';
import FraxlendPairs from '../data/FraxlendPairs.json';

export const FraxlendContracts: Array<Contract> = [
  ...FraxlendPairs.map((item) => {
    return {
      chain: item.chain,
      protocol: 'fraxlend',
      abi: {},
      address: item.address,
      birthday: 16308190,
      events: [],
      topics: [
        '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7', // Deposit
        '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db', // Withdraw
        '0x01348584ec81ac7acd52b7d66d9ade986dd909f3d513881c190fc31c90527efe', // BorrowAsset
        '0x9dc1449a0ff0c152e18e8289d865b47acc6e1b76b1ecb239c13d6ee22a9206a7', // RepayAsset
        '0xa32435755c235de2976ed44a75a2f85cb01faf0c894f639fe0c32bb9455fea8f', // AddCollateral
        '0xbc290bb45104f73cf92115c9603987c3f8fd30c182a13603d8cffa49b5f59952', // RemoveCollateral
        '0x35f432a64bd3767447a456650432406c6cacb885819947a202216eeea6820ecf', // Liquidate
      ],
    };
  }),
];
