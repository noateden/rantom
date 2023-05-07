import { Contract } from '../../types/configs';
import UniLiquidityPools from '../data/UniLiquidityPools.json';

const SushiV3Pools = UniLiquidityPools.filter((item) => item.protocol === 'sushiv3');

export const SushiContracts: Array<Contract> = [
  ...SushiV3Pools.map((item) => {
    return {
      chain: 'ethereum',
      protocol: 'sushiv3',
      abi: {},
      address: item.address,
      birthday: 16955547, // where sushi v3 factory was created
      events: [],
      topics: [
        '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67',
        '0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde',
        '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c',
        '0x70935338e69775456a85ddef226c395fb668b63fa0115f5f20610b388e6ca9c0',
        '0x783cca1c0412dd0d695e784568c96da2e9c22ff989357a2e8b1d9b2b4e6b7118',
      ],
    };
  }),
];
