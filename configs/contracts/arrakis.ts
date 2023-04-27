import { Contract } from '../../types/configs';
import Vaults from '../data/ArrakisVaults.json';

export const ArrakisContracts: Array<Contract> = [
  ...Vaults.map((item) => {
    return {
      chain: item.chain,
      protocol: 'arrakis',
      abi: {},
      address: item.address,
      birthday: item.birthday,
      events: [],
      topics:
        item.version === 1
          ? [
              '0x55801cfe493000b734571da1694b21e7f66b11e8ce9fdaa0524ecb59105e73e7', // Minted
              '0x7239dff1718b550db7f36cbf69c665cfeb56d0e96b4fb76a5cba712961b65509', // Burned
            ]
          : [
              '0x5f11830295067c4bcc7d02d4e3b048cd7427be50a3aeb6afc9d3d559ee64bcfa', // LogMint
              '0x86dacd5ce62967ebd3d915a82b22ad7e159538e50c7ba451e073fec048d9f127', // LogBurn
            ],
    };
  }),
];
