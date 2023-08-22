import { Contract } from '../../types/configs';

// import UniLiquidityPools from '../data/UniLiquidityPools.json';

// const SushiV3Pools = UniLiquidityPools.filter((item) => item.protocol === 'sushiv3');

export const SushiContracts: Array<Contract> = [
  // ...SushiV3Pools.map((item) => {
  //   return {
  //     chain: 'ethereum',
  //     protocol: 'sushiv3',
  //     abi: {},
  //     address: item.address,
  //     birthday: 16955547, // where sushi v3 factory was created
  //     events: [],
  //     topics: [
  //       '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67',
  //       '0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde',
  //       '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c',
  //       '0x70935338e69775456a85ddef226c395fb668b63fa0115f5f20610b388e6ca9c0',
  //       '0x783cca1c0412dd0d695e784568c96da2e9c22ff989357a2e8b1d9b2b4e6b7118',
  //     ],
  //   };
  // }),

  {
    chain: 'ethereum',
    protocol: 'sushi',
    abi: {},
    address: '0x8798249c2e607446efb7ad49ec89dd1865ff4272',
    birthday: 10801571,
    events: [],
    topics: [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'sushi',
    abi: {},
    address: '0xf5bce5077908a1b7370b9ae04adc565ebd643966',
    birthday: 12094175,
    events: [],
    topics: [
      '0xb2346165e782564f17f5b7e555c21f4fd96fbc93458572bf0113ea35a958fc55', // LogDeposit
      '0xad9ab9ee6953d4d177f4a03b3a3ac3178ffcb9816319f348060194aa76b14486', // LogWithdraw
      '0x3be9b85936d5d30a1655ea116a17ee3d827b2cd428cc026ce5bf2ac46a223204', // LogFlashLoan
    ],
  },
  {
    chain: 'arbitrum',
    protocol: 'sushi',
    abi: {},
    address: '0xf4d73326c13a4fc5fd7a064217e12780e9bd62c3',
    birthday: 226981,
    events: [],
    topics: [
      '0x02d7e648dd130fc184d383e55bb126ac4c9c60e8f94bf05acdf557ba2d540b47', // MinichefDeposit
      '0x8166bf25f8a2b7ed3c85049207da4358d16edbed977d23fa2ee6f0dde3ec2132', // MinichefWithdraw
      '0x2cac5e20e1541d836381527a43f651851e302817b71dc8e810284e69210c1c6b', // MinichefEmergencyWithdraw
      '0x71bab65ced2e5750775a0613be067df48ef06cf92a496ebf7663ae0660924954', // MinichefHarvest
    ],
  },
];
