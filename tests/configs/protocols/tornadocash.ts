import { TornadocashConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { TornadocashAdapter } from '../../../modules/adapters/tornadocash/tornadocash';
import { TestLog } from '../../types';

export const TornadocashActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x2a3c43c481709126e50338fc0f4c69ae9a529e4f60c06560cd1e7233d5736230',
    sender: normalizeAddress('0xc76a04ec88a5dd3ba9174444c73bcd37bc9d2b10'),
    address: normalizeAddress('0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc'),
    log: {
      address: '0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc',
      topics: [
        '0xa945e51eec50ab98c161376f0db4cf2aeba3ec92755fe2fcd388bdbbb80ff196',
        '0x21f951523d1f14cdca65fdd3f3576273b1e8306f1faa014db40b8cea68d005a3',
      ],
      data: '0x0000000000000000000000000000000000000000000000000000000000006af6000000000000000000000000000000000000000000000000000000006412d27f',
      blockNumber: '0x100f22c',
      transactionHash: '0x2a3c43c481709126e50338fc0f4c69ae9a529e4f60c06560cd1e7233d5736230',
      transactionIndex: '0x36',
      blockHash: '0x9832a1f3a60127aa2fa38314474c7f23d3c237629527d4342d9c19f3f339f40b',
      logIndex: '0x94',
      removed: false,
    },
    adapter: new TornadocashAdapter(TornadocashConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0xc1352e7c2384ac28be018aeb489d7c9b39206c4b1fa85c8405fb187a11189fba',
    sender: normalizeAddress('0x155301c59ff55c74cc921da6745c86390ed13424'),
    address: normalizeAddress('0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc'),
    log: {
      address: '0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc',
      topics: [
        '0xe9e508bad6d4c3227e881ca19068f099da81b5164dd6d62b2eaf1e8bc6c34931',
        '0x000000000000000000000000a0109274f53609f6be97ec5f3052c659ab80f012',
      ],
      data: '0x00000000000000000000000042ac66e972d4949e1fa9037dc4941ab5af6a879611522d804ed48530313fa5698db01d8a495f33645e722be49339b23e6a27e5d40000000000000000000000000000000000000000000000000029aa8a516f6300',
      blockNumber: '0x100f1cf',
      transactionHash: '0xc1352e7c2384ac28be018aeb489d7c9b39206c4b1fa85c8405fb187a11189fba',
      transactionIndex: '0x12',
      blockHash: '0xaa179331e7ec8b64e98d3154cf7a65685245189e163e03ea7733fcf15cad3a00',
      logIndex: '0x49',
      removed: false,
    },
    adapter: new TornadocashAdapter(TornadocashConfigs, null),
    action: 'withdraw',
  },
];
