import { PancakeswapConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { Uniswapv2Adapter } from '../../../modules/adapters/uniswap/uniswapv2';
import { TestLog } from '../../types';

export const PancakeswapActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xcec7eb389dbe00cd33d24f95f28554f0926163ffcf767918e8d779a4b5829368',
    sender: normalizeAddress('0xcce38c8e97b13aed31cc7cb4d412d663c48ef816'),
    address: normalizeAddress('0x2e8135be71230c6b1b4045696d41c09db0414226'),
    log: {
      address: '0x2e8135be71230c6b1b4045696d41c09db0414226',
      topics: [
        '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
        '0x000000000000000000000000eff92a263d31888d860bd50809a8d171709b7b1c',
        '0x000000000000000000000000eff92a263d31888d860bd50809a8d171709b7b1c',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000001ca436ec80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000042f0f11b549f932b',
      blockNumber: '0xfdd246',
      transactionHash: '0xcec7eb389dbe00cd33d24f95f28554f0926163ffcf767918e8d779a4b5829368',
      transactionIndex: '0x5',
      blockHash: '0xc3c9eeee272893619c2cfd9a5f403558528f6bed8e4dc0e8f1eff9b46067ca93',
      logIndex: '0x1d',
      removed: false,
    },
    adapter: new Uniswapv2Adapter(PancakeswapConfigs, null),
    action: 'swap',
  },
  {
    chain: 'ethereum',
    hash: '0xa1e3f8092ecc4c1fe90541975d152157ac385b89c7b78530589ebea3be7363d5',
    sender: normalizeAddress('0x37f15a799ad1d410565e10061c89de1c7de47688'),
    address: normalizeAddress('0x2e8135be71230c6b1b4045696d41c09db0414226'),
    log: {
      address: '0x2e8135be71230c6b1b4045696d41c09db0414226',
      topics: [
        '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
        '0x000000000000000000000000eff92a263d31888d860bd50809a8d171709b7b1c',
      ],
      data: '0x0000000000000000000000000000000000000000000000000000000003af169e000000000000000000000000000000000000000000000000008dc1993474625d',
      blockNumber: '0xfdcd7f',
      transactionHash: '0xa1e3f8092ecc4c1fe90541975d152157ac385b89c7b78530589ebea3be7363d5',
      transactionIndex: '0x48',
      blockHash: '0x63b3a5b0cddced439bbac04cce0e4b7a38246106fe0d275645ba18c9967347a7',
      logIndex: '0x88',
      removed: false,
    },
    adapter: new Uniswapv2Adapter(PancakeswapConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x4d5ca5479311f6b54a5e8c4c86dd0eb4388360e90e630b4ceba5e8d94b641191',
    sender: normalizeAddress('0xbbc906668627dbea2bc25b52c62c9cb90b560249'),
    address: normalizeAddress('0x2e8135be71230c6b1b4045696d41c09db0414226'),
    log: {
      address: '0x2e8135be71230c6b1b4045696d41c09db0414226',
      topics: [
        '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496',
        '0x000000000000000000000000eff92a263d31888d860bd50809a8d171709b7b1c',
        '0x000000000000000000000000eff92a263d31888d860bd50809a8d171709b7b1c',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000f48966c100000000000000000000000000000000000000000000000023e57146d6de7826',
      blockNumber: '0xfdd1b3',
      transactionHash: '0x4d5ca5479311f6b54a5e8c4c86dd0eb4388360e90e630b4ceba5e8d94b641191',
      transactionIndex: '0xf8',
      blockHash: '0xa37df166c5144f7924e9bdcb004913efcefd243176b64db0281eed8d290b8c42',
      logIndex: '0x213',
      removed: false,
    },
    adapter: new Uniswapv2Adapter(PancakeswapConfigs, null),
    action: 'withdraw',
  },
];
