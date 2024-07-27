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

export const YearnV3VaultConfigs: ProtocolConfig = {
  protocol: 'yearn',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'yearn',
      address: '0x444045c5c13c246e117ed36437303cac8e250ab0', // v3 vaults factory
    },
    {
      chain: 'ethereum',
      protocol: 'yearn',
      address: '0xe9e8c89c8fc7e8b8f23425688eb68987231178e5', // v3 vaults factory
    },
    {
      chain: 'arbitrum',
      protocol: 'yearn',
      address: '0x444045c5c13c246e117ed36437303cac8e250ab0', // v3 vaults factory
    },
    {
      chain: 'arbitrum',
      protocol: 'yearn',
      address: '0xe9e8c89c8fc7e8b8f23425688eb68987231178e5', // v3 vaults factory
    },
    {
      chain: 'polygon',
      protocol: 'yearn',
      address: '0x444045c5c13c246e117ed36437303cac8e250ab0', // v3 vaults factory
    },
    {
      chain: 'polygon ',
      protocol: 'yearn',
      address: '0xe9e8c89c8fc7e8b8f23425688eb68987231178e5', // v3 vaults factory
    },
  ],
};
