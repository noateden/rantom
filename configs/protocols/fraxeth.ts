import { ProtocolConfig } from '../../types/configs';

export const FraxethConfigs: ProtocolConfig = {
  protocol: 'fraxeth',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'fraxeth',
      address: '0xbafa44efe7901e04e39dad13167d089c559c1138', // frxETH minter
    },
    {
      chain: 'ethereum',
      protocol: 'fraxeth',
      address: '0xac3e018457b222d93114458476f3e3416abbe38f', // sfrxETH
    },
  ],
};
