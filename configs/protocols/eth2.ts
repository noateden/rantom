import { ProtocolConfig } from '../../types/configs';
import { BeaconDepositContract } from '../constants/addresses';

export const Eth2Configs: ProtocolConfig = {
  protocol: 'eth2',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'eth2',
      address: BeaconDepositContract, // ETH2 staking
    },
  ],
};
