import { CowswapConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { CowswapAdapter } from '../../../modules/adapters/cowswap/cowswap';
import { TestLog } from '../../types';

export const CowswapActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x4321d6da9b26a15e401ba09aee8f035925f1b1210f1d3077ed6c9fe78ad27b46',
    sender: normalizeAddress('0xb20b86c4e6deeb432a22d773a221898bbbd03036'),
    address: normalizeAddress('0x9008d19f58aabd9ed0d60971565aa8510560ab41'),
    log: {
      address: '0x9008d19f58aabd9ed0d60971565aa8510560ab41',
      blockHash: '0x6899bcc722bc95089ba9938d833b90035bb53fcb3bcce126841fff13061ebf87',
      blockNumber: '0xfe0bcb',
      data: '0x000000000000000000000000616e8bfa43f920657b3497dbf40d6b1a02d4608d000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000001f8c9eff496d330000000000000000000000000000000000000000000000000000000000021f16b98c0000000000000000000000000000000000000000000000002d788cc43ceeba0000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000038d56ca6bb1e89a0673cea7c1b8e4104064084b122a098a4fc5704afd91bc251147c68c42de679ffb0f16216154c996c354cf1161b63efc6af0000000000000000',
      logIndex: '0x18f',
      removed: false,
      topics: [
        '0xa07a543ab8a018198e99ca0184c93fe9050a79400a0a723441f84de1d972cc17',
        '0x0000000000000000000000007c68c42de679ffb0f16216154c996c354cf1161b',
      ],
      transactionHash: '0x4321d6da9b26a15e401ba09aee8f035925f1b1210f1d3077ed6c9fe78ad27b46',
      transactionIndex: '0xb7',
    },
    adapter: new CowswapAdapter(CowswapConfigs, null),
    action: 'trade',
  },
];
