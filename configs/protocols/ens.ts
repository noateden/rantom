import { ProtocolConfig } from '../../types/configs';

const protocol = 'ens';

export const EnsConfigs: ProtocolConfig = {
  protocol,
  contracts: [
    {
      chain: 'ethereum',
      protocol,
      address: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5', // Registration Controller
    },
    {
      chain: 'ethereum',
      protocol,
      address: '0x253553366da8546fc250f225fe3d25d0c782303b', // Registration Controller
    },
  ],
};
