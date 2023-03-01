import { LidoConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { LidoAdapter } from '../../../modules/adapters/lido/lido';
import { TestLog } from '../../types';

export const LidoActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x9db49a13181e9e175c151012c23d44abd90780e3c6b9f75e63294040b6b71c8c',
    sender: normalizeAddress('0x9dae4be9c669206a710484539bbf7daccce2ff53'),
    address: normalizeAddress('0xae7ab96520de3a18e5e111b5eaab095312d7fe84'),
    log: {
      address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
      topics: [
        '0x96a25c8ce0baabc1fdefd93e9ed25d8e092a3332f3aa9a41722b5697231d1d1a',
        '0x0000000000000000000000009dae4be9c669206a710484539bbf7daccce2ff53',
      ],
      data: '0x000000000000000000000000000000000000000000000000008a93e1abff54220000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0xfdd286',
      transactionHash: '0x9db49a13181e9e175c151012c23d44abd90780e3c6b9f75e63294040b6b71c8c',
      transactionIndex: '0x74',
      blockHash: '0xe6e61a7695905473c4164da9f39b15c66e666b90653f944ee3ed1f9dc551e182',
      logIndex: '0xdf',
      removed: false,
    },
    adapter: new LidoAdapter(LidoConfigs, null),
    action: 'deposit',
  },
];
