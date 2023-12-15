import { ProtocolConfig } from '../../types/configs';
import { ChainPolygonZkEVM, ChainZksyncEra } from '../constants/chains';

export const OdosConfigs: ProtocolConfig = {
  protocol: 'odos',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'odos',
      address: '0xcf5540fffcdc3d510b18bfca6d2b9987b0772559',
    },
    {
      chain: 'arbitrum',
      protocol: 'odos',
      address: '0xa669e7a0d4b3e4fa48af2de86bd4cd7126be4e13',
    },
    {
      chain: 'base',
      protocol: 'odos',
      address: '0x19ceead7105607cd444f5ad10dd51356436095a1',
    },
    {
      chain: 'polygon',
      protocol: 'odos',
      address: '0x4e3288c9ca110bcc82bf38f09a7b425c095d92bf',
    },
    {
      chain: 'optimism',
      protocol: 'odos',
      address: '0xca423977156bb05b13a2ba3b76bc5419e2fe9680',
    },
    {
      chain: 'bnbchain',
      protocol: 'odos',
      address: '0x89b8aa89fdd0507a99d334cbe3c808fafc7d850e',
    },
    {
      chain: 'avalanche',
      protocol: 'odos',
      address: '0x88de50b233052e4fb783d4f6db78cc34fea3e9fc',
    },
    {
      chain: 'fantom',
      protocol: 'odos',
      address: '0xd0c22a5435f4e8e5770c1fafb5374015fc12f7cd',
    },
    {
      chain: ChainPolygonZkEVM,
      protocol: 'odos',
      address: '0x2b8b3f0949dfb616602109d2aabba11311ec7aec',
    },
    {
      chain: ChainZksyncEra,
      protocol: 'odos',
      address: '0x4bba932e9792a2b917d47830c93a9bc79320e4f7',
    },
  ],
};
