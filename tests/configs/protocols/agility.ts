import { AgilityConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { AgilityAdapter } from '../../../modules/adapters/agility/agility';
import { TestLog } from '../../types';

export const AgilityActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xd1b8032f15da038cac328abb9058ebf329f82592df123c6260ae7ed178fdfbc6',
    sender: normalizeAddress('0x4b2dcbba6fff4910c782479f70fdea7d1d4c58a0'),
    address: normalizeAddress('0x2090d4cda71e3e870b8756acee51481421806202'),
    log: {
      address: '0x2090d4cda71e3e870b8756acee51481421806202',
      topics: [
        '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d',
        '0x0000000000000000000000004b2dcbba6fff4910c782479f70fdea7d1d4c58a0',
      ],
      data: '0x00000000000000000000000000000000000000000000048022e40199a8ec73e2',
      blockNumber: '0x105d345',
      transactionHash: '0xd1b8032f15da038cac328abb9058ebf329f82592df123c6260ae7ed178fdfbc6',
      transactionIndex: '0x9d',
      blockHash: '0x41c0d3a55eabfefff0494dfc62b20281ae8552dec7c6d8da351e10c4c2867b1a',
      logIndex: '0x12b',
      removed: false,
    },
    adapter: new AgilityAdapter(AgilityConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0xb07223673e091f5f85c57fbe9676091d8a4b4598fe167dc4fa31fb59f053ae3e',
    sender: normalizeAddress('0x59a661f1c909ca13ba3e9114bfdd81e5a420705d'),
    address: normalizeAddress('0xb3db4e3238c1656fb6b832fb692643f4fa452010'),
    log: {
      address: '0xb3db4e3238c1656fb6b832fb692643f4fa452010',
      topics: [
        '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5',
        '0x00000000000000000000000059a661f1c909ca13ba3e9114bfdd81e5a420705d',
      ],
      data: '0x0000000000000000000000000000000000000000000001b1ae4d6e2ef5000000',
      blockNumber: '0x105d417',
      transactionHash: '0xb07223673e091f5f85c57fbe9676091d8a4b4598fe167dc4fa31fb59f053ae3e',
      transactionIndex: '0x9c',
      blockHash: '0x60c37be9b5a459cc1f68d970be4d22d510d38db215a0dce568d8528f1527c1fa',
      logIndex: '0xf7',
      removed: false,
    },
    adapter: new AgilityAdapter(AgilityConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0xb07223673e091f5f85c57fbe9676091d8a4b4598fe167dc4fa31fb59f053ae3e',
    sender: normalizeAddress('0x59a661f1c909ca13ba3e9114bfdd81e5a420705d'),
    address: normalizeAddress('0xb3db4e3238c1656fb6b832fb692643f4fa452010'),
    log: {
      address: '0xb3db4e3238c1656fb6b832fb692643f4fa452010',
      topics: [
        '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486',
        '0x00000000000000000000000059a661f1c909ca13ba3e9114bfdd81e5a420705d',
      ],
      data: '0x000000000000000000000000000000000000000000000b377160c9579ce348c0',
      blockNumber: '0x105d417',
      transactionHash: '0xb07223673e091f5f85c57fbe9676091d8a4b4598fe167dc4fa31fb59f053ae3e',
      transactionIndex: '0x9c',
      blockHash: '0x60c37be9b5a459cc1f68d970be4d22d510d38db215a0dce568d8528f1527c1fa',
      logIndex: '0xf9',
      removed: false,
    },
    adapter: new AgilityAdapter(AgilityConfigs, null),
    action: 'collect',
  },
];
