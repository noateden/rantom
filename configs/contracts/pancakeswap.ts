import { Contract } from '../../types/configs';
import UniLiquidityPools from '../data/UniLiquidityPools.json';

export const PancakeswapContracts: Array<Contract> = UniLiquidityPools.filter(
  (item) => item.protocol === 'pancakeswap' || item.protocol === 'pancakeswapv3'
).map((item) => {
  return {
    chain: 'ethereum',
    protocol: item.protocol,
    abi: {},
    address: item.address,
    birthday: 17320355,
    events: [],
    topics: [
      '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822', // v2 Swap
      '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f', // v2 Mint
      '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496', // v2 Burn

      '0x19b47279256b2a23a1665c810c8d55a1758940ee09377d4f8d26497a3577dc83', // v3 Swap
      '0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde', // v3 Mint
      '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c', // v3 Burn
      '0x70935338e69775456a85ddef226c395fb668b63fa0115f5f20610b388e6ca9c0', // v3 Collect
    ],
  };
});
