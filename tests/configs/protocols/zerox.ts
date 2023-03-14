import { ZeroxConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { ZeroxAdapter } from '../../../modules/adapters/zerox/zerox';
import { TestLog } from '../../types';

export const ZeroxActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xc065c6f1a0e33a85dc241c731349be5a91f57373f3324c2948fbf9290ed379a2',
    sender: normalizeAddress('0x4193736954b08006bf4deeec9771ddaf2a624309'),
    address: normalizeAddress('0xdef1c0ded9bec7f1a1670819833240f027b25eff'),
    log: {
      address: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
      topics: [
        '0x0f6672f78a59ba8e5e5b5d38df3ebc67f3c792e2c9259b8d97d7f00dd78ba1b3',
        '0x0000000000000000000000004193736954b08006bf4deeec9771ddaf2a624309',
      ],
      data: '0x0000000000000000000000005f98805a4e8be255a32880fdec7f6728c6568ba0000000000000000000000000853d955acef822db058eb8505911ed77f175b99e00000000000000000000000000000000000000000000350f226768812fe28e660000000000000000000000000000000000000000000035b1c3bf1246342fae49',
      blockNumber: '0x100c194',
      transactionHash: '0xc065c6f1a0e33a85dc241c731349be5a91f57373f3324c2948fbf9290ed379a2',
      transactionIndex: '0x5a',
      blockHash: '0x08ae875da4ab27dc8936f6673c300c93b1fcaa65e21abeaa287cadc692863960',
      logIndex: '0x92',
      removed: false,
    },
    adapter: new ZeroxAdapter(ZeroxConfigs, null),
    action: 'trade',
  },
];
