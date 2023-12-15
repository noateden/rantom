import { ContractConfig, ProtocolConfig } from '../../types/configs';

const YearnVeYFIContract: ContractConfig = {
  chain: 'ethereum',
  protocol: 'yearn',
  address: '0x90c1f9220d90d3966fbee24045edd73e1d588ad5', // veFYI
};

export const YearnConfigs: ProtocolConfig = {
  protocol: 'yearn',
  contracts: [YearnVeYFIContract],
};

export const YearnyethConfig: ProtocolConfig = {
  protocol: 'yearnyeth',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'yearnyeth',
      address: '0x2cced4ffa804adbe1269cdfc22d7904471abde63', // Liquidity Pool
    },
    {
      chain: 'ethereum',
      protocol: 'yearnyeth',
      address: '0x583019ff0f430721ada9cfb4fac8f06ca104d0b4', // yETH Staking
    },
  ],
};
